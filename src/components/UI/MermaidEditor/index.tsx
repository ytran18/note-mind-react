import { useState, useRef, useEffect } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../Resizable";

import MonacoEditor from "../MonacoEditor";
import MermaidChart from "../MermaidChart";

import './style.scss';

interface MermaidEditorState {
    codeValue: string;
};

interface MermaidChartProps {
    code: string;
};

const MermaidEditor = (props: MermaidChartProps) => {

    const { code } = props;

    const [state, setState] = useState<MermaidEditorState>({
        codeValue: '',
    });

    useEffect(() => {
        if (code) setState(prev => ({...prev, codeValue: code}));
    },[]);

    const diagramRef = useRef<HTMLDivElement | null>(null);

    const handleChangeCode = (value: string) => {
        setState(prev => ({...prev, codeValue: value}));
    };

    return (
        <div className="w-full h-full flex gap-[3px] relative">
            <ResizablePanelGroup autoSaveId="window-layout" direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={30}>
                    <div id="monaco-editor" className="h-full flex items-center justify-center border rounded-md border-[rgb(229,230,230)]">
                        <MonacoEditor
                            code={state.codeValue}
                            handleChangeCode={handleChangeCode}
                        />
                    </div>
                </ResizablePanel>
                <div className='group flex w-2 cursor-col-resize items-center justify-center rounded-md bg-gray-50'>
                    <ResizableHandle className='h-1 w-24 rounded-full bg-neutral-400 duration-300 group-hover:bg-primaryb group-active:duration-75 lg:h-24 lg:w-1' />
                </div>
                <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="flex h-full justify-center items-center border rounded-md border-[rgb(229,230,230)]">
                        <MermaidChart
                            code={state.codeValue}
                            ref={diagramRef}
                        />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default MermaidEditor;