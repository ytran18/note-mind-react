import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Block } from "@blocknote/core";

import { doc, getDoc, doc as firestoreDoc, collection, updateDoc } from 'firebase/firestore';
import { fireStore } from "@core/firebase/firebase";

import LoadingPage from "@components/Layout/LoadingPage";
import PdfEditor from "@components/UI/PdfEditor";
import MermaidEditor from "@components/UI/MermaidEditor";
import NoteEditor from "@components/UI/NoteEditor";
import MindmapEditor from "@components/UI/MindmapEditor";
import SVGEditor from "@components/UI/SVGEditor";

import IconArrowLeft from '@icons/iconArrowLeft.svg';

interface DocPageStateTypes {
    document: any;
};

const Editor = () => {

    const [state, setState] = useState<DocPageStateTypes>({
        document: {},
    });

    const navigate = useNavigate();
    const pathname = useParams();

    useEffect(() => {
        if (!pathname.editorId) return;

        const docRef = doc(fireStore, 'documents', pathname.editorId);
        getDoc(docRef).then((snapshot) => {
            let document: any = {};
            if (snapshot.data()) document = snapshot.data();
            setState(prev => ({...prev, document: document}));
        });
    },[pathname.editorId]);

    const handleUpdateNoteContent = async (document: Block[]) => {
        const docRef = firestoreDoc(collection(fireStore, 'documents'), state.document?._id);
        await updateDoc(docRef, {
            note: document,
        });
    };

    const handleNavigateBack = () => {
        navigate('/mainpage');  
    };

    return (
        <div className='w-screen !h-screen p-4 flex flex-col gap-3'>
            {Object.keys(state.document).length > 0 ? (
                <>
                    <div className='w-fit flex items-center gap-3'>
                        <div
                            className='p-1 hover:bg-[#f1f5f9] transition-colors duration-200 rounded-lg cursor-pointer'
                            onClick={handleNavigateBack}
                        >
                            <IconArrowLeft />
                        </div>
                        <div className='text-sm font-medium'>{state.document?.title}</div>
                    </div>
                    {state.document?.noteType === 'pdf' && (
                        <div
                            style={{height: 'calc(100% - 26px)'}}
                            className="w-full"
                        >
                            <PdfEditor
                                doc={state.document}
                                docId={state.document?._id}
                                docNote={state.document?.note}
                            />
                        </div>
                    )}
                    {state.document?.noteType === 'mermaid' && (
                        <div
                            style={{height: 'calc(100% - 26px)'}}
                            className="w-full"
                        >
                            <MermaidEditor
                                title={state.document?.title}
                                mermaidTheme={state.document?.mermaidTheme}
                                code={state.document?.code}
                                mermaidType={state.document?.mermaidType}
                                docId={state.document?._id}
                            />
                        </div>
                    )}
                    {state.document?.noteType === 'note' && (
                        <div
                            style={{height: 'calc(100% - 26px)'}}
                            className="w-full"
                        >
                            <NoteEditor
                                docNote={state.document?.note}
                                handleUpdateNoteContent={handleUpdateNoteContent}
                            />
                        </div>
                    )}
                    {state.document?.noteType === 'mindmap' && (
                        <div
                            style={{height: 'calc(100% - 26px)'}}
                            className="w-full"
                        >
                            <MindmapEditor />
                        </div>
                    )}
                    {state.document?.noteType === 'svg' && (
                        <div
                            style={{height: 'calc(100% - 26px)'}}
                            className="w-full"
                        >
                            <SVGEditor
                                title={state.document?.title}
                                docId={state.document?._id}
                                code={state.document?.code}
                            />
                        </div>
                    )}
                </>
            ) : (
                <LoadingPage />
            )}
        </div>
    );
};

export default Editor;