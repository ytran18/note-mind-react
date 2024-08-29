import { useState, useRef, useEffect } from "react";
import { Modal } from "antd";
import { Document } from "@utils/interface";

import IconDocument from '@icons/iconDocument.svg';
import IconSearch from '@icons/iconSearch.svg';
import IconFilter from '@icons/iconFilterCircle.svg';
import IconEnter from '@icons/iconEnter.svg';

import './style.scss';

interface SearchModalProps {
    open: boolean;
    onCancelSearchModal: () => void;
    onSearch: (searchValue: string) => void;
    searchResults: Document[];
    handleNavigateEditor: (cardId: string) => void;
}

const SearchModal = (props: SearchModalProps) => {
    const { open, onCancelSearchModal, onSearch, searchResults, handleNavigateEditor } = props;

    const [searchValue, setSearchValue] = useState('');
    const inputSearchRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                inputSearchRef.current?.focus();
            }, 0);
        }
    }, [open]);

    useEffect(() => {
        if (searchValue.length > 0) {
            onSearch(searchValue);
        }
    }, [searchValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleClose = () => {
        onCancelSearchModal();
        setSearchValue('');
    };

    return (
        <Modal
            open={open}
            closeIcon={false}
            onCancel={handleClose}
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
                    {searchValue.length > 0 ? <IconDocument /> : <IconSearch />}
                    <input 
                        type="text"
                        ref={inputSearchRef}
                        value={searchValue}
                        onChange={handleInputChange}
                        className="outline-none w-full mx-4 placeholder:opacity-70"
                        placeholder="Search your cards"
                    />
                    <IconFilter />
                </div>
                <div className="w-full overflow-y-auto scrollbar-hide" style={{height: 'calc(100% - 87px)'}}>
                    {searchResults.map((item, index) => (
                        <div
                            className="w-full flex items-center justify-between cursor-pointer transition-colors duration-200 rounded-lg hover:bg-[rgb(241,240,240)] visible-icon h-10 px-4 py-1"
                            key={`search-result-${index}`}
                            onClick={() => {
                                handleNavigateEditor(item._id);
                                handleClose();
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="font-medium">{item.title}</div>
                            </div>
                            <div className="hidden icon-enter">
                                <IconEnter />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default SearchModal;