import { useEffect, useState } from "react";
import { Card, Dropdown, Modal, Input, message, Popover } from "antd";
import { EditOutlined, EllipsisOutlined, ShareAltOutlined } from '@ant-design/icons';

import { fireStore } from "@core/firebase/firebase";
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

import useAuth from "@hooks/useAuth";

import IconTitle from '@icons/iconTitle.svg';
import IconTrash from '@icons/iconTrash.svg';
import IconCopy from '@icons/iconCopy.svg';

import ImageEmptyDiagram from '@images/imageEmptyDiagram.png';

import './style.scss';

interface FileCardProps {
    docId: string;
    title: string;
    getCards: (user: any) => void;
    handleNavigateEditor: (/*e: React.MouseEvent<HTMLDivElement>, */ cardId: string) => void;
};

interface FileCardState {
    isOpenModalRename: boolean;
    isOpenModalRemove: boolean;
    newName: string;
    contextPopover: boolean;
};

const FileCard = (props: FileCardProps) => {

    const { docId, title, getCards, handleNavigateEditor } = props;
    const user = useAuth();

    const [state, setState] = useState<FileCardState>({
        isOpenModalRemove: false,
        isOpenModalRename: false,
        newName: '',
        contextPopover: false,
    });

    useEffect(() => {
        const handleClickOutsideContextPopover = (e: MouseEvent) => {
            const contextmenu = document.getElementById('card-context-menu-popover');
            const contexticon = document.getElementById(`context-menu-icon-${docId}`);

            if (contextmenu && contexticon && !contextmenu.contains(e.target as Node) && !contexticon.contains(e.target as Node)) {
                setState(prev => ({...prev, contextPopover: false}));
            };
        };

        document.addEventListener('click', handleClickOutsideContextPopover);

        return () => document.removeEventListener('click', handleClickOutsideContextPopover);
    },[]);

    const handleRename = async (status?: boolean, isSave?: boolean) => {
        state.isOpenModalRename = status !== undefined ? status : true;
        state.contextPopover = false;

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
        state.contextPopover = false;

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
        <div id={docId} className="file-card">
            <Dropdown
                menu={{items: contextMenu}}
                trigger={['contextMenu']}
                rootClassName="mainpage-contextmenu"
            >
                <Card
                    className="w-full sm:w-[300px] border border-[#f0f0f0]"
                    hoverable
                    cover={
                        <img
                            onClick={() => handleNavigateEditor(docId)}
                            alt="card-cover"
                            src={ImageEmptyDiagram}
                        />
                    }
                    actions={[
                        <EditOutlined
                            key="edit"
                            onClick={() => handleNavigateEditor(docId)}
                        />,
                        <ShareAltOutlined key="share" />,
                        <Popover
                            trigger={"click"}
                            arrow={false}
                            open={state.contextPopover}
                            id="card-context-menu-popover"
                            rootClassName="card-context-menu-popover"
                            content={
                                <div className="flex flex-col">
                                    {contextMenu.map((item) => (
                                        <div
                                            key={`context-popover-${item.key}`}
                                            onClick={item.onClick}
                                            className="flex items-center text-[14px] px-[12px] py-[5px] cursor-pointer rounded-lg hover:bg-[rgba(0,0,0,0.04)]"
                                        >
                                            <div className="min-w-[14px] me-2">{item.icon}</div>
                                            <div>{item.label}</div>
                                        </div>
                                    ))}
                                </div>
                            }
                        >
                            <EllipsisOutlined
                                key="ellipsis"
                                id={`context-menu-icon-${docId}`}
                                onClick={() => setState(prev => ({...prev, contextPopover: !prev.contextPopover}))}
                            />
                        </Popover>,
                    ]}
                >
                    <p
                        onClick={() => handleNavigateEditor(docId)}
                        className="text-sm font-medium truncate"
                    >
                        {title}
                    </p>
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
        </div>
    )
}

export default FileCard;