import { useState } from "react";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../Resizable";
import SVGCodeEditor from "../SVGCodeEditor";
import SVGPreview from "../SVGPreview";

interface SVGEditorState {
    previewBg: '#F7F8F9' | 'transparent' | '#FFFFFF' | '#161B1D';
    svgCode: string | undefined;
    dimensions: string | null;
};

const SVGEditor = () => {

    const [state, setState] = useState<SVGEditorState>({
        previewBg: 'transparent',
        svgCode: '',
        dimensions: '',
    });

    const handleChangeBg = (bg: '#F7F8F9' | 'transparent' | '#FFFFFF' | '#161B1D') => {
        setState(prev => ({...prev, previewBg: bg}))
    };

    const handleChangeSVGCode = (value: string | undefined) => {
        setState(prev => ({...prev, svgCode: value}));
    };

    const handleChangeDimensions = (value: string | null) => {
        setState(prev => ({...prev, dimensions: value}));
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <ResizablePanelGroup autoSaveId="window-layout" direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="h-full flex items-center justify-center border border-[rgb(229,230,230)] rounded-md">
                        <SVGCodeEditor
                            svgCode={state.svgCode}
                            dimensions={state.dimensions}
                            handleChangeSVGCode={handleChangeSVGCode}
                            handleChangeDimensions={handleChangeDimensions}
                        />
                    </div>
                </ResizablePanel>
                <div className='group flex w-2 cursor-col-resize items-center justify-center rounded-md bg-gray-50'>
                    <ResizableHandle className='h-1 w-24 rounded-full bg-neutral-400 duration-300 group-hover:bg-primaryb group-active:duration-75 lg:h-24 lg:w-1' />
                </div>
                <ResizablePanel defaultSize={50} minSize={30}>
                    <div className='flex h-full justify-center items-center border rounded-md border-[rgb(229,230,230)]'>
                        <SVGPreview
                            previewBg={state.previewBg}
                            svgCode={state.svgCode}
                            dimensions={state.dimensions}
                            handleChangeBg={handleChangeBg}
                        />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default SVGEditor;