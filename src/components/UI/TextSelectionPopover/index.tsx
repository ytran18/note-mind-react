import { CustomTooltip } from "../ToolTip";
import { copyTextToClipboard } from "@utils/funciton";

import IconHighlighter from "@icons/iconHighlighter.svg";
import IconClipboardCopy from "@icons/iconClipboardCopy.svg";
import IconLightbulb from "@icons/iconLightbulb.svg";
import IconBookOpenCheck from "@icons/iconBookOpenCheck.svg";

interface TextSelectionPopoverProps {
    content: {
        text?: string | undefined;
        image?: string | undefined;
    };
    position: any;
    // addHighlight: () => void;
    hideTipAndSelection: () => void;
    // sendMessage: ((message: string) => void) | null;
}

const TextSelectionPopover = (props: TextSelectionPopoverProps) => {
    const { content, position } = props;
    const { /*addHighlight,*/ hideTipAndSelection,/* sendMessage */ } = props;

    const switchSidebarTabToChat = () => {};

    const OPTIONS = [
        {
            onClick: () => {
                // addHighlight();
                hideTipAndSelection();
            },
            icon: IconHighlighter,
            tooltip: "Highlight",
        },
        {
            onClick: () => {
                copyTextToClipboard(content.text, hideTipAndSelection);
                hideTipAndSelection();
            },
            icon: IconClipboardCopy,
            tooltip: "Copy the text",
        },
        /*sendMessage && */{
            onClick: () => {
                // sendMessage("**Explain**: " + content.text);
                switchSidebarTabToChat();
                hideTipAndSelection();
            },
            icon: IconLightbulb,
            tooltip: "Explain the text",
        },
        /*sendMessage && */{
            onClick: () => {
                // sendMessage("**Summarise**: " + content.text);
                switchSidebarTabToChat();
                hideTipAndSelection();
            },
            icon: IconBookOpenCheck,
            tooltip: "Summarise the text",
        },
    ].filter(Boolean);

    return (
        <div className="relative rounded-md bg-black">
            <div className="absolute -bottom-[7px] left-[50%] h-0 w-0 -translate-x-[50%] border-l-[7px] border-r-[7px] border-t-[7px] border-solid border-black border-l-transparent border-r-transparent " />

            <div className="flex divide-x divide-gray-800">
                {OPTIONS.map((option, id) => {
                    if (!option) return null;
                    return (
                        <div
                            className="group px-[0.5rem] pb-[0.2rem] pt-[0.5rem] hover:cursor-pointer"
                            key={id}
                            onClick={option.onClick}
                        >
                            <CustomTooltip content={option.tooltip}>
                                <div className="text-gray-300 group-hover:text-gray-50">
                                    <option.icon />
                                </div>
                            </CustomTooltip>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TextSelectionPopover;
