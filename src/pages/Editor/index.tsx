import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { doc, getDoc } from 'firebase/firestore';
import { fireStore } from "@core/firebase/firebase";

import LoadingPage from "@components/Layout/LoadingPage";
import PdfEditor from "@components/UI/PdfEditor";

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

    const handleChangeTab = (tab: number) => {
        setState(prev => ({...prev, tabActive: tab}));
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
                        <div>
                            <PdfEditor
                                doc={state.document}
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