import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Select } from 'antd';
import FileCard from '@components/UI/FileCard';
import ModalCreateNote from '@components/UI/ModalCreateNote';
import SearchModal from '@components/UI/SearchModal';

import { getUserDocuments, fileterUserDocuments } from '@utils/funciton';
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
    filter: string;
    isOpenSearchModal: boolean;
    searchResults: Document[];
};

const MainPage = () => {

    const [state, setState] = useState<DashboardStateTypes>({
        isModalUploadOpen: false,
        file: [],
        confirmLoading: false,
        isModalCreateNote: false,
        cards: [],
        filter: 'all',
        isOpenSearchModal: false,
        searchResults: [],
    });

    const user = useAuth().user;
    const userLoading = useAuth().loading;
    const navigate = useNavigate();

    const getCards = async (user: any) => {
        const documents = await getUserDocuments(user!);
        setState(prev => ({...prev, cards: documents}));
    };

    useEffect(() => {
        !userLoading && getCards(user);
    },[userLoading]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.shiftKey && event.code === 'Space') {
                event.preventDefault();
                setState(prev => ({...prev, isOpenSearchModal: !prev.isOpenSearchModal}));
            };
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    
    const onCancelSearchModal = () => {
        setState(prev => ({...prev, isOpenSearchModal: false}));
    };

    const handleModalCreateNote = () => {
        setState(prev => ({...prev, isModalCreateNote: !prev.isModalCreateNote}));
    };

    const handleNavigateBack = () => {
        navigate('/');
    };

    const handleNavigateEditor = ( /* e: React.MouseEvent<HTMLSpanElement>, */ cardId: string) => {
        // const cardElement = document?.getElementById(cardId);
        // const actionsElement = cardElement?.getElementsByClassName('ant-card-actions')?.[0];
        // console.log(e.target);

        // if (actionsElement && actionsElement?.contains(e.target as Node)) return;
        navigate(`/editor/${cardId}`);
    };

    const handleFilter = async (value: string) => {
        const documents = await fileterUserDocuments(user!, value);
        setState(prev => ({
            ...prev,
            filter: value,
            cards: documents,
        }));
    };

    const handleSearch = async (searchValue: string) => {
        const searchResults = await getUserDocuments(user!, searchValue);
        setState(prev => ({ ...prev, searchResults }));
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
                        <div className='w-full flex flex-col gap-2 sm:flex-row sm:items-center justify-between'>
                            <div className=''>
                                <div className='text-xl font-semibold'>{`Hello, ${user?.name}`}</div>
                                {state.cards.length === 0 && (
                                    <div className='text-sm opacity-65'>You have no note yet, create one now!</div>
                                )}
                            </div>
                            <div className='flex items-center gap-3'>
                                <Select
                                    value={state.filter}
                                    style={{ width: 120 }}
                                    className='!font-semibold'
                                    onChange={handleFilter}
                                    options={[
                                        { value: 'all', label: 'All' },
                                        { value: 'mermaid', label: 'Mermaid' },
                                        { value: 'pdf', label: 'PDF' },
                                        { value: 'note', label: 'Note' },
                                        { value: 'mindmap', label: 'Mindmap' },
                                        { value: 'svg', label: 'SVG' },
                                    ]}
                                />
                                <Button
                                    className='!bg-black !text-white !font-semibold'
                                    onClick={handleModalCreateNote}
                                >
                                    Create note
                                    <IconPlus />
                                </Button>
                            </div>
                        </div>
                        <div className='text-xs font-medium'>* Press Shift + Space to search your cards</div>
                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 place-items-center pb-5'>
                            {state.cards.map((item) => {
                                return (
                                    <div className='w-full' key={item._id}>
                                        <FileCard
                                            docId={item._id}
                                            title={item.title}
                                            previewImg={item?.previewImg}
                                            noteType={item?.noteType}
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
                        <SearchModal
                            open={state.isOpenSearchModal}
                            onCancelSearchModal={onCancelSearchModal}
                            onSearch={handleSearch}
                            searchResults={state.searchResults}
                            handleNavigateEditor={handleNavigateEditor}
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