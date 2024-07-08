import React, { useState } from "react";
import { Card, Dropdown, Modal, Input, message } from "antd";

import { fireStore } from "@core/firebase/firebase";
import { doc, updateDoc, deleteDoc, setDoc, collection } from 'firebase/firestore';

import useAuth from "@hooks/useAuth";

import IconTitle from '@icons/iconTitle.svg';
import IconTrash from '@icons/iconTrash.svg';
import IconCopy from '@icons/iconCopy.svg';

interface FileCardProps {
    docId: string;
    title: string;
    getCards: (user: any) => void;
    handleNavigateEditor: (e: React.MouseEvent<HTMLDivElement>, cardId: string) => void;
};

interface FileCardState {
    isOpenModalRename: boolean;
    isOpenModalRemove: boolean;
    newName: string;
};

const FileCard = (props: FileCardProps) => {

    const { docId, title, getCards, handleNavigateEditor } = props;
    const user = useAuth();

    const [state, setState] = useState<FileCardState>({
        isOpenModalRemove: false,
        isOpenModalRename: false,
        newName: '',
    })

    const handleRename = async (status?: boolean, isSave?: boolean) => {
        state.isOpenModalRename = status !== undefined ? status : true;

        if (isSave && state.newName) {
            const docRef = doc(fireStore, 'documents', docId);
            await updateDoc(docRef, {title: state.newName});
            message.success('Change name successfully!', 3);
            getCards(user.user);
        };

        setState(prev => ({...prev}));
    };

    const handleRemove = async (status?: boolean, isDelete?: boolean) => {
        state.isOpenModalRemove = status !== undefined ? status : true;

        if (isDelete) {
            const docRef = doc(fireStore, 'documents', docId);
            await deleteDoc(docRef);
            message.success('Delete note successfully!', 3);
            getCards(user.user);
        };

        setState(prev => ({...prev}));
    };

    const handleClone = () => {

    };

    const contextMenu = [
        {
            label: 'Change title',
            key: '1',
            icon: <IconTitle />,
            onClick: () => handleRename(),
        },
        {
            label: 'Delete',
            key: '2',
            icon: <IconTrash />,
            onClick: () => handleRemove(),
        },
        {
            label: 'Clone',
            key: '3',
            icon: <IconCopy />,
            onClick: () => handleClone(),
        },
    ];

    return (
        <>
            <Dropdown
                menu={{items: contextMenu}}
                trigger={['contextMenu']}
                rootClassName="mainpage-contextmenu"
            >
                <Card
                    className="w-full sm:w-[300px]"
                    hoverable
                    onClick={(e) => handleNavigateEditor(e, docId)}
                >
                    <p className="text-sm font-medium truncate">{title}</p>
                </Card>
            </Dropdown>
            <Modal
                open={state.isOpenModalRename}
                okText="Change"
                title="Change title"
                cancelText="Cancel"
                onOk={() => handleRename(false, true)}
                onCancel={() => handleRename(false)}
            >
                <div className="flex flex-col gap-3">
                    <div>New title:</div>
                    <Input
                        placeholder="Enter your new title"
                        value={state.newName}
                        onChange={(e) => setState(prev => ({...prev, newName: e?.target?.value}))}
                    />
                </div>
            </Modal>
            <Modal
                open={state.isOpenModalRemove}
                okText="Delete"
                title="Delete note"
                cancelText="Cancel"
                onOk={() => handleRemove(false, true)}
                onCancel={() => handleRemove(false)}
            >
                <div>This note will be deleted, Are you sure?</div>
            </Modal>
        </>
    )
}

export default FileCard;