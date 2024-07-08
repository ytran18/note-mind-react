import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import FileCard from '@components/UI/FileCard';
import ModalCreateNote from '@components/UI/ModalCreateNote';

import { getUserDocuments } from '@utils/funciton';
import { Document } from '@utils/interface';

import useAuth from '@hooks/useAuth';
import LoadingPage from '@components/Layout/LoadingPage';

import IconLeft from '@icons/iconArrowLeft.svg';
import IconPlus from '@icons/iconPlus.svg';

interface DashboardStateTypes {
    isModalUploadOpen: boolean;
    file: any[];
    confirmLoading: boolean;
    isModalCreateNote: boolean;
    cards: Document[];
};

const MainPage = () => {

    const [state, setState] = useState<DashboardStateTypes>({
        isModalUploadOpen: false,
        file: [],
        confirmLoading: false,
        isModalCreateNote: false,
        cards: [],
    });

    const user = useAuth().user;
    const userLoading = useAuth().loading;

    const getCards = async (user: any) => {
        const documents = await getUserDocuments(user!);
        setState(prev => ({...prev, cards: documents}));
    };

    useEffect(() => {
        !userLoading && getCards(user);
    },[userLoading]);
    
    const navigate = useNavigate();

    const handleModalCreateNote = () => {
        setState(prev => ({...prev, isModalCreateNote: !prev.isModalCreateNote}));
    };

    const handleNavigateBack = () => {
        navigate('/');
    };

    const handleNavigateEditor = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
        navigate(`/editor/${cardId}`);
    };

    return (
        <>
            {!userLoading && (
                <div className="h-full max-w-3xl w-[48rem] 2xl:max-w-5xl 2xl:w-[64rem] mx-auto">
                    <div className="w-full h-full pt-4 flex flex-col gap-4 px-16 sm:px-0">
                        <div
                            className='flex items-center w-fit p-2 gap-3 text-sm font-medium cursor-pointer hover:bg-[#f1f5f9] transition-colors duration-200 rounded-md select-none'
                            onClick={handleNavigateBack}
                        >
                            <IconLeft />
                            Back                
                        </div>
                        <div className='w-full flex items-center justify-between'>
                            <div className=''>
                                <div className='text-xl font-semibold'>{`Hello, ${user?.name}`}</div>
                                <div className='text-sm opacity-65'>You have no file yet, upload one now!</div>
                            </div>
                            <Button
                                className='!bg-black !text-white !font-semibold'
                                onClick={handleModalCreateNote}
                            >
                                Create note
                                <IconPlus />
                            </Button>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 place-items-center'>
                            {state.cards.map((item) => {
                                return (
                                    <div key={item._id}>
                                        <FileCard
                                            docId={item._id}
                                            title={item.title}
                                            getCards={getCards}
                                            handleNavigateEditor={handleNavigateEditor}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        <ModalCreateNote
                            open={state.isModalCreateNote}
                            onClose={handleModalCreateNote}
                            getCards={getCards}
                        />
                    </div>
                </div>
            )}
            {userLoading && (
                <div className='h-full w-full'>
                    <LoadingPage />
                </div>
            )}
        </>
    );
};

export default MainPage;