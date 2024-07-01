import { useState } from 'react';

import { Button, message } from 'antd';
import FileCard from '@components/UI/FileCard';
import ModalUploadFile from '@components/UI/ModalUploadFile';

import { handleUploadPDF } from '@utils/funciton';
import { cards } from '@constants/mock';

import IconLeft from '@icons/iconArrowLeft.svg';
import IconPlus from '@icons/iconPlus.svg';

interface DashboardStateTypes {
    isModalUploadOpen: boolean;
    file: any[];
    confirmLoading: boolean;
};

const MainPage = () => {

    const [state, setState] = useState<DashboardStateTypes>({
        isModalUploadOpen: false,
        file: [],
        confirmLoading: false,
    });

    const handleModalOk = async () => {
        try {
            setState(prev => ({...prev, confirmLoading: true}));
            const res = await handleUploadPDF(state.file?.[0]?.originFileObj);
            message.success('Upload file successfully!')
            setState(prev => ({...prev, confirmLoading: false, isModalUploadOpen: false}));
        } catch (error) {
            message.error('Internal server error!');
        }
    };

    const handleModal = () => {
        setState(prev => ({...prev, isModalUploadOpen: !prev.isModalUploadOpen}));
    };

    const handleUploadFile = (file: any) => {
        setState(prev => ({...prev, file: [file]}));
    };

    return (
        <div className="h-full max-w-3xl w-[48rem] 2xl:max-w-5xl 2xl:w-[64rem] mx-auto">
            <div className="w-full h-full pt-4 flex flex-col gap-4 px-16 sm:px-0">
                <div
                    className='flex items-center w-fit p-2 gap-3 text-sm font-medium cursor-pointer hover:bg-[#f1f5f9] transition-colors duration-200 rounded-md select-none'
                >
                    <IconLeft />
                    Back                
                </div>
                <div className='w-full flex items-center justify-between'>
                    <div className=''>
                        <div className='text-xl font-semibold'>Hello, Min Yoon Gi</div>
                        <div className='text-sm opacity-65'>You have no file yet, upload one now!</div>
                    </div>
                    <Button
                        className='!bg-black !text-white'
                        onClick={handleModal}
                    >
                        Upload file
                        <IconPlus />
                    </Button>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 place-items-center'>
                    {cards.map((item) => {
                        return (
                            <div key={item.id}>
                                <FileCard
                                    docId={item.id}
                                    title={item.title}
                                />
                            </div>
                        )
                    })}
                </div>
                <ModalUploadFile
                    open={state.isModalUploadOpen}
                    confirmLoading={state.confirmLoading}
                    title='Upload file'
                    handleOk={handleModalOk}
                    handleCancel={handleModal}
                    handleUploadFile={handleUploadFile}
                />
            </div>
        </div>
    );
};

export default MainPage;