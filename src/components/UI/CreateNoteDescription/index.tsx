import UploadFile from "../UploadFile";
import SelectMermaidTemplate from "../SelectMermaidTemplate";

interface CreateNoteDescriptionProps {
    noteType: 'pdf' | 'mermaid' | 'note';
    selectedMermaidTemplate: string;
    handleUploadFile: (file: any) => void;
    handleSelectMermaidTemplate: (tag: string, checked: boolean) => void;
};

const CreateNoteDescription = (props: CreateNoteDescriptionProps) => {

    const { noteType, selectedMermaidTemplate } = props;
    const { handleUploadFile, handleSelectMermaidTemplate } = props;

    return (
        <>
            {noteType === 'pdf' && (
                <UploadFile
                    handleUploadFile={handleUploadFile}
                />
            )}
            {noteType === 'mermaid' && (
                <SelectMermaidTemplate
                    selectedMermaidTemplate={selectedMermaidTemplate}
                    handleSelectMermaidTemplate={handleSelectMermaidTemplate}
                />
            )}
        </>
    );
};

export default CreateNoteDescription;