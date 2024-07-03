import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@components/UI/Resizable';

import LeftPanel from "@components/UI/LeftPanel";
import RightPanel from "@components/UI/RightPanel";

import IconArrowLeft from '@icons/iconArrowLeft.svg';

interface DocPageStateTypes {
    tabActive: number;
};

const Editor = () => {

    const [state, setState] = useState<DocPageStateTypes>({
        tabActive: 0,
    });

    const navigate = useNavigate();

    const handleChangeTab = (tab: number) => {
        setState(prev => ({...prev, tabActive: tab}));
    };

    const handleNavigateBack = () => {
        navigate('/mainpage');  
    };

    return (
        <div className='w-screen h-screen p-4 flex flex-col gap-3'>
            <div className='w-fit flex items-center gap-3'>
                <div
                    className='p-1 hover:bg-[#f1f5f9] transition-colors duration-200 rounded-lg cursor-pointer'
                    onClick={handleNavigateBack}
                >
                    <IconArrowLeft />
                </div>
                <div className='text-sm font-medium'>this is your pdf file name</div>
            </div>
            <ResizablePanelGroup autoSaveId="window-layout" direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={30}>
                    <div className='h-full min-w-[25vw] border border-stone-200 rounded-lg sm:shadow-lg'>
                        <LeftPanel docUrl='https://firebasestorage.googleapis.com/v0/b/note-mind-3f8ce.appspot.com/o/pdf%2Frc-upload-1719477772228-3?alt=media&token=4baa7683-f432-4325-a23e-380e48ad8d5f' />
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

export default Editor;