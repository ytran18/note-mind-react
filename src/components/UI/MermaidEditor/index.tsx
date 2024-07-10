import { useState, useRef, useEffect } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../Resizable";

import { message } from "antd";

import { doc, collection, updateDoc } from 'firebase/firestore';
import { fireStore } from "@core/firebase/firebase";

import { mermaidTemplate } from "@constants/constants";
import { dataURItoBlob } from "@utils/funciton";

import MonacoEditor from "../MonacoEditor";
import MermaidChart from "../MermaidChart";
import MermaidSidebar from "../MermaidSidebar";

import './style.scss';

interface MermaidEditorState {
    codeValue: string;
    mermaidType: string;
    themeSelect: string;
    autoSync: boolean;
    isFirstTimeLoad: boolean;
    isSync: boolean;
};

interface MermaidChartProps {
    code: string;
    mermaidType: string;
    docId: string;
    title: string;
};

const MermaidEditor = (props: MermaidChartProps) => {

    const { code, mermaidType, docId, title } = props;

    const [state, setState] = useState<MermaidEditorState>({
        codeValue: '',
        mermaidType: '',
        themeSelect: 'theme-mermaid',
        autoSync: false,
        isFirstTimeLoad: true,
        isSync: true,
    });

    useEffect(() => {
        if (code) setState(prev => ({...prev, codeValue: code, mermaidType: mermaidType}));
    },[]);

    const handleSelectMermaidTemplate = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? tag : '';
        setState(prev => ({...prev, mermaidType: nextSelectedTags}))
    };

    const handleApplyTemplate = () => {
        const { mermaidType } = state;

        const sidebarElement = document.getElementById('mermaid-sidebar-templates')

        if (sidebarElement) {
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            sidebarElement.dispatchEvent(clickEvent);
        };

        const templateCode: string = mermaidTemplate(mermaidType);
        setState(prev => ({...prev, codeValue: templateCode, isFirstTimeLoad: false}));
    };

    const diagramRef = useRef<HTMLDivElement | null>(null);

    const handleChangeCode = (value: string) => {
        setState(prev => ({
            ...prev,
            codeValue: value,
            isFirstTimeLoad: false,
            isSync: state.autoSync ? true : false,
        }));
    };

    const handleUpdateCode = async (code: string) => {
        const docRef = doc(collection(fireStore, 'documents'), docId);
        await updateDoc(docRef, {
            code: code,
        });
    };

    useEffect(() => {
        const { codeValue, isFirstTimeLoad } = state;
        if (isFirstTimeLoad) return;

        const searchTimeout = setTimeout(() => {
            if (codeValue) handleUpdateCode(codeValue);
        }, 1000);

        return () => clearTimeout(searchTimeout);
    },[state.codeValue]);

    const handleSelectTheme = (theme: string) => {
        const sidebarElement = document.getElementById('mermaid-sidebar-themes')

        if (sidebarElement) {
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            sidebarElement.dispatchEvent(clickEvent);
        };

        setState(prev => ({...prev, themeSelect: theme}));
    };

    const handleExport = (type: string) => {
        const sidebarElement = document.getElementById('mermaid-sidebar-export')

        if (sidebarElement) {
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            sidebarElement.dispatchEvent(clickEvent);
        };

        if (type === 'export-svg' && diagramRef.current) {
            const svg = diagramRef.current.innerHTML;
            const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(svgBlob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `${title}.svg`;
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
        };

        if (type === 'export-png' || type === 'export-clipboard') {
            const svgContainer = document.querySelector('svg[id^="mermaid-"]') as SVGElement | null;

            if (!svgContainer) {
                message.error('SVG container not found')
                return;
            };
        
            const canvas = document.createElement('canvas');
            const viewBox = svgContainer.getAttribute('viewBox')?.split(' ') || [];
            const w = parseFloat(viewBox[2]);
            const h = parseFloat(viewBox[3]);
        
            canvas.width = w;
            canvas.height = h;
        
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                message.error('Canvas context not found');
                return;
            };
        
            const image = new Image();
            image.src = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(svgContainer));
            image.onload = async function () {
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                const imgData = canvas.toDataURL('image/png');

                if (type === 'export-png') {
                    const a = document.createElement('a');
                    a.href = imgData;
                    a.download = `${title}.png`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                };

                if (type === 'export-clipboard') {
                    const blob = dataURItoBlob(imgData);

                    try {
                        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
                        message.success('Image copied to clipboard');
                    } catch (error) {
                        message.error('Failed to copy image to clipboard');
                    }
                };
        
            }
            image.onerror = function (error) {
                message.error('Failed to load image');
            };
        };
    };
    
    const handleSwitchAutoSync = (checked: boolean) => {
        setState(prev => ({...prev, autoSync: checked}));
    };

    const handleSyncCode = () => {
        setState(prev => ({...prev, isSync: true}));
    };

    return (
        <div className="w-full h-full flex relative">
            <div className="h-full">
                <MermaidSidebar
                    mermaidType={state.mermaidType}
                    themeSelect={state.themeSelect}
                    autoSync={state.autoSync}
                    handleSelectMermaidTemplate={handleSelectMermaidTemplate}
                    handleSelectTheme={handleSelectTheme}
                    handleExport={handleExport}
                    handleSwitchAutoSync={handleSwitchAutoSync}
                    handleApplyTemplate={handleApplyTemplate}
                    handleSyncCode={handleSyncCode}
                />
            </div>
            <div className="h-full flex flex-grow gap-[3px]">
                <ResizablePanelGroup autoSaveId="window-layout" direction="horizontal">
                    <ResizablePanel defaultSize={50} minSize={25}>
                        <div id="monaco-editor" className="h-full flex items-center justify-center border border-[rgb(229,230,230)] rounded-tr-md rounded-br-md">
                            <MonacoEditor
                                code={state.codeValue}
                                autoSync={state.autoSync}
                                handleChangeCode={handleChangeCode}
                                handleSyncCode={handleSyncCode}
                            />
                        </div>
                    </ResizablePanel>
                    <div className='group flex w-2 cursor-col-resize items-center justify-center rounded-md bg-gray-50'>
                        <ResizableHandle className='h-1 w-24 rounded-full bg-neutral-400 duration-300 group-hover:bg-primaryb group-active:duration-75 lg:h-24 lg:w-1' />
                    </div>
                    <ResizablePanel defaultSize={50} minSize={25}>
                        <div className="flex h-full justify-center items-center border rounded-md border-[rgb(229,230,230)]">
                            <MermaidChart
                                code={state.codeValue}
                                isSync={state.isSync}
                                autoSync={state.autoSync}
                                ref={diagramRef}
                            />
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
};

export default MermaidEditor;