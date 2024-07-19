import { Tag, Flex, Button } from "antd";

import IconDownload from '@icons/iconDownloadSVG.svg';
import IconMinus from '@icons/iconMinus.svg';
import IconPlus from '@icons/iconPlus.svg';
import IconBgTransparent from '@icons/iconBgTransparent.svg';

import ImageBgTransparent from '@images/imageBgTransparent.png';

interface SVGPreviewProps {
    previewBg: '#F7F8F9' | 'transparent' | '#FFFFFF' | '#161B1D';
    handleChangeBg: (bg: '#F7F8F9' | 'transparent' | '#FFFFFF' | '#161B1D') => void;
}

const tagsData = ['Preview', 'React', 'React Native', 'PNG', 'Data URI'];
const classNameBg = 'flex justify-around items-center w-[26px] h-[26px] box-border cursor-pointer rounded-[5px] border border-[#c7cad1]';

const SVGPreview = (props: SVGPreviewProps) => {

    const { previewBg } = props;
    const { handleChangeBg } = props;

    const listBg: ('#F7F8F9' | 'transparent' | '#FFFFFF' | '#161B1D')[] = ['#F7F8F9', '#FFFFFF', '#161B1D', 'transparent'];

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-[64px] flex items-center gap-5 p-3 border-b border-[#e3e5e8]">
                <Flex gap={4} wrap align="center">
                    {tagsData.map<React.ReactNode>((tag) => (
                        <Tag.CheckableTag
                            key={tag}
                            className="font-medium"
                            checked={tag === 'Preview'}
                            // checked={selectedMermaidTemplate.includes(tag)}
                            // onChange={(checked) => handleSelectMermaidTemplate(tag, checked)}
                        >
                            {tag}
                        </Tag.CheckableTag>
                    ))}
                </Flex>
            </div>
            <div
                className="flex flex-grow w-full"
                style={{
                    backgroundColor: previewBg !== 'transparent' ? previewBg : '',
                    backgroundImage: previewBg === 'transparent' ? `url(${ImageBgTransparent})` : '',
                }}
            >
            </div>
            <div className="w-full h-[64px] flex items-center justify-between p-3 border-t border-[#e3e5e8]">
                <div className="flex items-center gap-5">
                    <div className="text-sm font-medium flex items-center gap-2">
                        <Button icon={<IconMinus />} />
                        <span>100%</span>
                        <Button icon={<IconPlus />} />
                    </div>
                    <div className="flex items-center gap-2">
                        {listBg.map((item) => {
                            return (
                                <div
                                    key={item}
                                    style={{
                                        backgroundColor: item !== 'transparent' ? item : '',
                                        border: previewBg === item ? '2px solid #4096ff' : ''
                                    }}
                                    className={classNameBg}
                                    onClick={() => handleChangeBg(item)}
                                >
                                    {item === 'transparent' && <IconBgTransparent />}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="">
                    <Button
                        className="font-medium"
                        icon={<IconDownload />}
                    >
                        Download
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SVGPreview;