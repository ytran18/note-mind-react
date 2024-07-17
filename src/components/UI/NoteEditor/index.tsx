import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from '@hooks/useDebounce';

import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import { filterSuggestionItems, Block, BlockNoteEditor, BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core';
import { SuggestionMenuController, getDefaultReactSlashMenuItems, useCreateBlockNote } from '@blocknote/react';
import '@blocknote/mantine/style.css';

interface NoteEditorState {
    note: Block[];
    isFirstTimeLoading: boolean;
};

interface NoteEditorProps {
    docNote: Block[];
    handleUpdateNoteContent: (document: Block[]) => void;
}

const schema = BlockNoteSchema.create({
    blockSpecs: {
        ...defaultBlockSpecs,
    },
});

const NoteEditor = (props: NoteEditorProps) => {

    const { docNote, handleUpdateNoteContent } = props;

    const [state, setState] = useState<NoteEditorState>({
        note: [],
        isFirstTimeLoading: true,
    });

    const editor = useMemo(() => {
        return BlockNoteEditor.create({ schema, initialContent: docNote });
    }, [docNote]);

    const pageContentChange = useDebounce(state.note, 1500);

    useEffect(() => {
        if (state.isFirstTimeLoading) return;
        handleUpdateNoteContent(state.note);
    }, [pageContentChange]);

    const onChange = () => {
        state.note = editor.document;
        state.isFirstTimeLoading = false;
        setState(prev => ({ ...prev }));
    };

    return (
        <div className="w-full h-full md:px-20 me:px-48 lg:px-72">
            <BlockNoteView
            className="text-sm"
            editor={editor}
            theme={"light"}
            editable={true}
            formattingToolbar={true}
            linkToolbar={false}
            sideMenu={true}
            slashMenu={true}
            filePanel={true}
            tableHandles={true}
            onChange={onChange}
        >
            <SuggestionMenuController
                triggerCharacter="/"
                getItems={async (query) => 
                    filterSuggestionItems(
                        [...getDefaultReactSlashMenuItems(editor)],
                        query
                    )
                }
            />
        </BlockNoteView>
        </div>
    );
};

export default NoteEditor;