import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import { filterSuggestionItems } from '@blocknote/core';
import { SuggestionMenuController, getDefaultReactSlashMenuItems, useCreateBlockNote } from '@blocknote/react';
import '@blocknote/mantine/style.css';

const NoteSpace = () => {
    const editor = useCreateBlockNote();

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