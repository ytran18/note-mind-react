import { useState,  useRef, useEffect } from "react";
import { Modal } from "antd";
import { Document } from "@utils/interface";

import IconDocument from '@icons/iconDocument.svg';
import IconSearch from '@icons/iconSearch.svg';
import IconFilter from '@icons/iconFilterCircle.svg';
import IconEnter from '@icons/iconEnter.svg';

import './style.scss';

interface SearchModalState {
    searchValue: string;
    searchResult: Document[];
}

interface SearchModalProps {
    open: boolean;
    onCancelSearchModal: () => void;
}

const SearchModal = (props: SearchModalProps) => {

    const { open } = props;
    const { onCancelSearchModal } = props;

    const [state, setState] = useState<SearchModalState>({
        searchValue: '',
        searchResult: [],
    });

    const inputSearchRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputSearchRef.current && open) {
            inputSearchRef.current.focus();
        }
    },[open]);

    const handleNavigatePage = (card: Document) => {

    };

    return (
        <Modal
            open={open}
            closeIcon={false}
            onCancel={() => {onCancelSearchModal(); setState(prev => ({...prev, searchValue: '', searchResult: []}))}}
            className="!w-[755px]"
            style={{
                height: 'auto',
                maxHeight: 'max(70vh, 570px)'
            }}
            styles={{
                body: {height: '100%', maxHeight: 'max(70vh, 546px)'}
            }}
            rootClassName="modal-search"
            footer={[]}
        >
            <div className="w-full h-full flex flex-col gap-4 bg-white rounded-lg" style={{maxHeight: 'max(70vh, 546px)'}}>
                <div className="w-full flex items-center justify-between p-3 border-b border-[rgb(237,237,236)]">
                    {state.searchValue.length > 0 ? <IconDocument /> : <IconSearch />}
                    <input 
                        type="text"
                        ref={inputSearchRef}
                        value={state.searchValue}
                        onChange={(e) => setState(prev => ({...prev, searchValue: e.target.value}))}
                        className="outline-none w-full mx-4 placeholder:opacity-70"
                        placeholder="Search your cards"
                    />
                    <IconFilter />
                </div>
                <div className="w-full overflow-y-auto scrollbar-hide" style={{height: 'calc(100% - 87px)'}}>
                    {state.searchResult.map((item, index) => {
                        return (
                            <div
                                className="w-full flex items-center justify-between cursor-pointer transition-colors duration-200 rounded-lg hover:bg-[rgb(241,240,240)] visible-icon h-10 px-4 py-1"
                                key={`search-result-${index}`}
                                onClick={() => {
                                    handleNavigatePage(item);
                                    setState(prev => ({...prev, isShowModalSearch: false, searchValue: '', searchResult: []}))}
                                }
                            >
                                <div className="flex items-center gap-3">
                                    {/* <div className="">{item.icon}</div> */}
                                    <div className="font-medium">{item.title}</div>
                                </div>
                                <div className="hidden icon-enter">
                                    <IconEnter />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Modal>
    );
};

export default SearchModal;