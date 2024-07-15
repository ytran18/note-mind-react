import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from '@hooks/useDebounce';

import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import { filterSuggestionItems, Block, BlockNoteEditor, BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core';
import { SuggestionMenuController, getDefaultReactSlashMenuItems, useCreateBlockNote } from '@blocknote/react';
import '@blocknote/mantine/style.css';

interface NoteSpaceState {
    note: Block[];
    isFirstTimeLoading: boolean;
}

interface NoteSpaceProps {
    docNote: Block[];
    handleUpdatePdfNote: (document: Block[]) => void;
}

const schema = BlockNoteSchema.create({
    blockSpecs: {
        ...defaultBlockSpecs,
    },
});

const NoteSpace = (props: NoteSpaceProps) => {
    const { docNote } = props;
    const { handleUpdatePdfNote } = props;

    const editor = useMemo(() => {
        return BlockNoteEditor.create({ schema, initialContent: docNote });
    }, [docNote]);

    const [state, setState] = useState<NoteSpaceState>({
        note: [],
        isFirstTimeLoading: true,
    });

    const pageContentChange = useDebounce(state.note, 1500);

    useEffect(() => {
        if (state.isFirstTimeLoading) return;
        handleUpdatePdfNote(state.note);
    }, [pageContentChange]);

    const onChange = () => {
        state.note = editor.document;
        state.isFirstTimeLoading = false;
        setState(prev => ({ ...prev }));
    };

    return (
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
    );
};

export default NoteSpace;