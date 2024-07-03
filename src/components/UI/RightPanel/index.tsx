import NoteSpace from "../NoteSpace";
import ChatSpace from "../ChatSpace";
import FlashCardSpace from "../FlashCardSpace";

import IconNote from '@icons/iconNote.svg';
import IconChat from '@icons/iconChat.svg';
import IconFlashCard from '@icons/iconFlashcard.svg';

const tabs = [
    { tippy: 'Take notes', icon: <IconNote /> },
    { tippy: 'Chat with the pdf', icon: <IconChat /> },
    { tippy: 'Generate flashcards from the pdf', icon: <IconFlashCard /> },
];

interface RightPanelProps {
    tabActive: number;
    handleChangeTab: (tab: number) => void;
};

const RightPanel = (props: RightPanelProps) => {

    const { tabActive, handleChangeTab } = props;

    const renderTab = {
        0: <NoteSpace />,
        1: <ChatSpace />,
        2: <FlashCardSpace />,
    }[tabActive];

    return (
        <div className="w-full h-full flex flex-col gap-3">
            <div className="w-fit flex gap-4 bg-[#e5e7eb] px-3 py-2 rounded-md">
                {tabs.map((item, index) => {
                    return (
                        <div
                            className={`cursor-pointer px-2 py-1 ${tabActive === index ? 'bg-white rounded-md' : ''}`}
                            onClick={() => handleChangeTab(index)}
                            key={`tabs-${index}`}
                        >
                            {item.icon}
                        </div>
                    )
                })}
            </div>
            <div className="border border-stone-200 rounded-lg h-full py-3 overflow-y-auto">
                {renderTab}
            </div>
        </div>
    );
};

export default RightPanel;