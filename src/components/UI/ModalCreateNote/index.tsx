import { useState } from "react";
import { message, Tour } from "antd";
import type { TourProps } from 'antd';
import useAuth from "@hooks/useAuth";

import { Document } from "@utils/interface";
import { handleUploadPDF } from "@utils/funciton";
import { mermaidTemplate } from "@constants/constants";

import { collection, doc, setDoc } from 'firebase/firestore';
import { fireStore } from "@core/firebase/firebase";

import CreateNoteInfo from "../CreateNoteInfo";
import CreateNoteDescription from "../CreateNoteDescription";
import ReviewNote from "../ReviewNote";

const { v4 } = require('uuid');

interface ModalCreateNoteProps {
    open: boolean;
    onClose: () => void;
    getCards: (user: any) => void;
};

interface ModalCreateNoteState {
    noteType: 'pdf' | 'note' | 'mermaid' | 'mindmap' | 'svg';
    noteTitle: string;
    currentStep: number;
    selectedMermaidTemplate: string;
    file: any[];
};

const ModalCreateNote = (props: ModalCreateNoteProps) => {

    const { open, onClose, getCards } = props;

    const [state, setState] = useState<ModalCreateNoteState>({
        noteType: 'note',
        noteTitle: '',
        currentStep: 0,
        selectedMermaidTemplate: 'Flow',
        file: [],
    });

    const user = useAuth();

    const handleChangeNoteType = (value: 'pdf' | 'note' | 'mermaid' | 'mindmap' | 'svg') => {
        setState(prev => ({...prev, noteType: value}));
    };

    const handleChangeNoteTitle = (value: string) => {
        setState(prev => ({...prev, noteTitle: value}))
    };

    const handleCloseTour = () => {
        setState(prev => ({...prev, currentStep: 0, noteTitle: ''}));
        onClose();
    };

    const handleUploadFile = (file: any) => {
        setState(prev => ({...prev, file: [file]}));
    };

    const handleSelectMermaidTemplate = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? tag : '';
        setState(prev => ({...prev, selectedMermaidTemplate: nextSelectedTags}))
    };

    const steps: TourProps['steps'] = [
        {
            title: 'Create your new note',
            description: (
                <CreateNoteInfo
                    noteType={state.noteType}
                    noteTitle={state.noteTitle}
                    onChange={handleChangeNoteType}
                    handleNoteTitleChange={handleChangeNoteTitle}
                />
            ),
            target: null,
            nextButtonProps: {
                onClick() {
                    const { noteTitle, noteType } = state;
                    if (!noteTitle) {
                        message.warning('Please enter your note title!');
                    } else {
                        const isSecondStep = {
                            'mermaid': 1,
                            'pdf': 1,
                            'note': 2,
                            'mindmap': 2,
                            'svg': 2,
                        }[noteType];
                        const nextStep = isSecondStep;
                        setState(prev => ({...prev, currentStep: nextStep}));
                    };
                },
            }
        },
        {
            title: state.noteType === 'mermaid' ? 'Select your template' : 'Upload (or embed) your pdf',
            description: (
                <CreateNoteDescription
                    noteType={state.noteType}
                    selectedMermaidTemplate={state.selectedMermaidTemplate}
                    handleUploadFile={handleUploadFile}
                    handleSelectMermaidTemplate={handleSelectMermaidTemplate}
                />
            ),
            target: null,
            nextButtonProps: {
                onClick() {
                    const { file, selectedMermaidTemplate, noteType } = state;
                    const isValid = noteType === 'mermaid' ? selectedMermaidTemplate === '' ? false : true : file.length === 0 ? false : true;
                    if (!isValid) {
                        message.warning(noteType === 'mermaid' ? 'Please select your mermaid template' : 'Please upload your pdf');
                        return;
                    };
                    setState(prev => ({...prev, currentStep: 2}));
                },
            },
            prevButtonProps: {
                onClick() {
                    setState(prev => ({...prev, currentStep: 0}));
                },
            }
        },
        {
            title: 'Review your note',
            description: (
                <ReviewNote
                    noteTitle={state.noteTitle}
                    noteType={state.noteType}
                    selectedMermaidTemplate={state.selectedMermaidTemplate}
                    file={state.file}
                />
            ),
            target: null,
            async onFinish () {
                try {
                    const pdfUrl = state.noteType === 'pdf' && await handleUploadPDF(state.file?.[0]);
                    const code = state.noteType === 'mermaid' && mermaidTemplate(state.selectedMermaidTemplate);
    
                    const Doc: Document = {
                        _id: v4(),
                        title: state.noteTitle,
                        owner: user.user?._id!,
                        noteType: state.noteType,
                        createdAt: new Date().getTime(),
                        code: code || '',
                        note: [
                            {
                                "content": [],
                                "id": v4(),
                                "type": "paragraph",
                                "children": [],
                                "props": {
                                    "textColor": "default",
                                    "textAlignment": "left",
                                    "backgroundColor": "default"
                                }
                            }
                        ],
                        pdfUrl: pdfUrl || '',
                        mermaidType: state.noteType === 'mermaid' ? state.selectedMermaidTemplate : '',
                        mermaidTheme: 'default',
                        previewImg: '',
                    };
    
                    const docRef = doc(collection(fireStore, 'documents'), Doc._id);
                    setDoc(docRef, Doc);
                    message.success('Create note successfully!')
                    await getCards(user.user);
                    handleCloseTour();
                } catch (error) {
                    console.log({error});
                    message.error('Create note failed!')
                }
            },
            prevButtonProps: {
                onClick() {
                    const { noteType } = state;
                    const previousStep = {
                        'mermaid': 1,
                        'pdf': 1,
                        'note': 0,
                        'mindmap': 0,
                        'svg': 0,
                    }[noteType];
                    setState(prev => ({...prev, currentStep: previousStep}));
                },
            }
        },
    ];

    return (
        <Tour
            open={open}
            steps={steps}
            current={state.currentStep}
            onClose={handleCloseTour}
            
        />
    );
};

export default ModalCreateNote;