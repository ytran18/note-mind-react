import { useEffect, useRef } from "react";
import { Input, InputRef, Select } from "antd";

const NOTE_TYPE = [
    { label: 'PDF Editor', value: 'pdf' },
    { label: 'Mermaid Editor', value: 'mermaid' },
    { label: 'Basic Note', value: 'note' },
    { label: 'Mindmap', value: 'mindmap' },
    { label: 'SVG Editor', value: 'svg' },
];

interface CreateNoteInfoProps {
    noteType: 'pdf' | 'note' | 'mermaid' | 'mindmap' | 'svg';
    noteTitle: string;
    onChange: (value: 'pdf' | 'note' | 'mermaid' | 'mindmap' | 'svg') => void;
    handleNoteTitleChange: (value: string) => void;
};

const CreateNoteInfo = (props: CreateNoteInfoProps) => {

    const { noteType, noteTitle } = props;
    const { onChange, handleNoteTitleChange } = props;

    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (inputRef.current) inputRef.current!.focus();
    },[]);

    return (
        <div className="">
            <div className="flex flex-col gap-1 mb-4">
                Note title
                <Input
                    value={noteTitle}
                    ref={inputRef}
                    onChange={(e) => handleNoteTitleChange(e.target.value)}
                    placeholder="Enter your note title"
                />
            </div>
            <div className="flex flex-col gap-1">
                Select note type
                <Select
                    showSearch
                    placeholder="Select your note type"
                    value={noteType}
                    onChange={onChange}
                    options={NOTE_TYPE}
                />
            </div>
        </div>
    );
};

export default CreateNoteInfo;