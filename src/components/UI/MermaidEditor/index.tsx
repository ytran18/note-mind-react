import { useState, useRef, useEffect } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../Resizable";

import { doc, collection, updateDoc } from 'firebase/firestore';
import { fireStore } from "@core/firebase/firebase";

import { mermaidTemplate } from "@constants/constants";

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
};

interface MermaidChartProps {
    code: string;
    mermaidType: string;
    docId: string;
};

const MermaidEditor = (props: MermaidChartProps) => {

    const { code, mermaidType, docId } = props;

    const [state, setState] = useState<MermaidEditorState>({
        codeValue: '',
        mermaidType: '',
        themeSelect: 'theme-mermaid',
        autoSync: true,
        isFirstTimeLoad: true,
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
        setState(prev => ({...prev, codeValue: value, isFirstTimeLoad: false}));
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
    };
    
    const handleSwitchAutoSync = (checked: boolean) => {
        setState(prev => ({...prev, autoSync: checked}));
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
                />
            </div>
            <div className="h-full flex flex-grow gap-[3px]">
                <ResizablePanelGroup autoSaveId="window-layout" direction="horizontal">
                    <ResizablePanel defaultSize={50} minSize={25}>
                        <div id="monaco-editor" className="h-full flex items-center justify-center border border-[rgb(229,230,230)] rounded-tr-md rounded-br-md">
                            <MonacoEditor
                                code={state.codeValue}
                                handleChangeCode={handleChangeCode}
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