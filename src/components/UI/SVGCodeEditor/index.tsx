import { useState } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { Tag, Button, Popover, InputNumber } from "antd";

import IconRotate from '@icons/iconRotate.svg';
import IconFlipY from '@icons/iconFlipY.svg';
import IconFlipX from '@icons/iconFlipX.svg';
import IconDimensions from '@icons/iconDimensions.svg';
import IconSetting from '@icons/iconSVGSetting.svg';
import IconUpload from '@icons/iconUpload.svg';
import IconCopy from '@icons/iconCopySVG.svg';
import IconDownload from '@icons/iconDownloadSVG.svg';
import IconShare from '@icons/iconShare.svg';

import './style.scss';

const options = {
    readOnly: false,
    minimap: {
        enabled: false
    },
    fontWeight: '600',
    fontSize: 14,
    overviewRulerLanes: 0,
    quickSuggestions: true,
    scrollBeyondLastLine: false,
    wordWrap: "on" as "on",
    insertSpace: true,
    tabSize: 4
};

const tagsData = ['Optimize', 'Prettify'];

interface SVGCodeEditorState {
    selectedTags: string[];
}

interface SVGCodeEditorProps {
    svgCode: string | undefined;
    dimensions: string | null;
    handleChangeSVGCode: (value: string | undefined) => void;
    handleChangeDimensions: (value: string | null) => void;
}

const SVGCodeEditor = (props: SVGCodeEditorProps) => {

    const { svgCode, dimensions } = props;
    const { handleChangeSVGCode, handleChangeDimensions } = props;

    const [state, setState] = useState<SVGCodeEditorState>({
        selectedTags: [],
    });

    const editorTop = [
        { key: 'svg-rotate', icon: <IconRotate /> },
        { key: 'svg-flipy', icon: <IconFlipY /> },
        { key: 'svg-flipx', icon: <IconFlipX /> },
        { key: 'svg-dimensions', icon: <IconDimensions /> },
    ];

    return (
        <div className="w-full h-full flex flex-col">
            <div className="h-[64px] w-full flex items-center justify-between px-9 border-b border-[#e3e5e8]">
                <div className="flex items-center">
                    {editorTop.map((item) => {
                        return (
                            <>
                                {item.key === 'svg-dimensions' ? (
                                    <Popover
                                        placement="bottomLeft"
                                        trigger={"click"}
                                        arrow={false}
                                        title="DIMENSIONS"
                                        content={
                                            <div className="flex items-center gap-3 text-sm">
                                                <InputNumber
                                                    prefix='W'
                                                    rootClassName="input-dimensions"
                                                    className="font-medium"
                                                    value={dimensions}
                                                    onChange={handleChangeDimensions}
                                                />
                                                <InputNumber
                                                    prefix='H'
                                                    rootClassName="input-dimensions"
                                                    className="font-medium"
                                                    value={dimensions}
                                                    onChange={handleChangeDimensions}
                                                />
                                            </div>
                                        }
                                    >
                                        <div
                                            key={item.key}
                                            className="h-8 w-fit min-w-8 flex items-center justify-center cursor-pointer hover:bg-[#f1f2f4] rounded transition-colors duration-200 px-1"
                                        >
                                            {item.icon}
                                            {Number(dimensions) > 0 && (
                                                <span className="text-sm ml-2 font-medium">{`${dimensions}px x ${dimensions}px`}</span>
                                            )}
                                        </div>
                                    </Popover>
                                ) : (
                                    <div
                                        key={item.key}
                                        className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-[#f1f2f4] rounded transition-colors duration-200"
                                    >
                                        {item.icon}
                                    </div>
                                )}
                            </>
                        )
                    })}
                </div>
                <div className="flex items-center select-none">
                    {tagsData.map<React.ReactNode>((tag) => (
                        <Tag.CheckableTag
                            key={tag}
                            className="font-medium"
                            checked={state.selectedTags.includes(tag)}
                        >
                        {tag}
                        </Tag.CheckableTag>
                    ))}
                    <div className="w-8 h-8 flex items-center justify-center cursor-pointer">
                        <IconSetting />
                    </div>
                </div>
            </div>
            <div className="flex flex-grow w-full">
                <MonacoEditor 
                    defaultLanguage="html"
                    className="w-full h-full py-[5px]"
                    options={options}
                    value={svgCode}
                    onChange={handleChangeSVGCode}
                />
            </div>
            <div className="h-[64px] w-full flex items-center justify-between px-9 border-t border-[#e3e5e8]">
                <Button
                    icon={<IconUpload />}
                    className="font-medium"
                >
                    Upload
                </Button>
                <div className="flex items-center gap-2">
                    <Button
                        icon={<IconCopy />}
                        className="font-medium"
                    >
                        Copy
                    </Button>
                    <Button
                        icon={<IconDownload />}
                        className="font-medium"
                    >
                        Download
                    </Button>
                    <Button
                        icon={<IconShare />}
                        className="font-medium"
                    >
                        Share
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SVGCodeEditor;