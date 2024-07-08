import { useState } from "react";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../Resizable";
import LeftPanel from "../LeftPanel";
import RightPanel from "../RightPanel";

interface PdfEditorstate {
    tabActive: number;
};

interface PdfEditorProps {
    doc: any;
};

const PdfEditor = (props: PdfEditorProps) => {

    const { doc } = props;

    const [state, setState] = useState<PdfEditorstate>({
        tabActive: 0,
    });

    const handleChangeTab = (tab: number) => {
        setState(prev => ({...prev, tabActive: tab}));
    };

    return (
        <div className="w-full h-full">
            <ResizablePanelGroup autoSaveId="window-layout" direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={30}>
                    <div className='h-full min-w-[25vw] border border-stone-200 rounded-lg sm:shadow-lg'>
                        <LeftPanel docUrl={doc?.pdfUrl} />
                    </div>
                </ResizablePanel>
                <div className='group flex w-2 cursor-col-resize items-center justify-center rounded-md bg-gray-50'>
                    <ResizableHandle className='h-1 w-24 rounded-full bg-neutral-400 duration-300 group-hover:bg-primaryb group-active:duration-75 lg:h-24 lg:w-1' />
                </div>
                <ResizablePanel defaultSize={50} minSize={30}>
                    <div className='h-full min-w-[25vw] flex-1'>
                        <RightPanel
                            tabActive={state.tabActive}
                            handleChangeTab={handleChangeTab}
                        />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default PdfEditor;