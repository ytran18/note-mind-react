import { Tag, Flex, Button } from "antd";

import IconDownload from '@icons/iconDownloadSVG.svg';
import IconMinus from '@icons/iconMinus.svg';
import IconPlus from '@icons/iconPlus.svg';
import IconBgTransparent from '@icons/iconBgTransparent.svg';

const tagsData = ['Preview', 'React', 'React Native', 'PNG', 'Data URI'];

const SVGPreview = () => {
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
            <div className="flex flex-grow w-full"></div>
            <div className="w-full h-[64px] flex items-center justify-between p-3 border-t border-[#e3e5e8]">
                <div className="flex items-center gap-5">
                    <div className="text-sm font-medium flex items-center gap-2">
                        <Button icon={<IconMinus />} />
                        <span>100%</span>
                        <Button icon={<IconPlus />} />
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            style={{backgroundColor: '#F7F8F9'}}
                            className="flex justify-around items-center w-[26px] h-[26px] box-border cursor-pointer rounded-[5px] border border-[#c7cad1]"
                        >
                        </div>
                        <div
                            style={{backgroundColor: '#FFFFFF'}}
                            className="flex justify-around items-center w-[26px] h-[26px] box-border cursor-pointer rounded-[5px] border border-[#c7cad1]"
                        >
                        </div>
                        <div
                            style={{backgroundColor: '#161B1D'}}
                            className="flex justify-around items-center w-[26px] h-[26px] box-border cursor-pointer rounded-[5px] border border-[#c7cad1]"
                        >
                        </div>
                        <div
                            className="flex justify-around items-center w-[26px] h-[26px] box-border cursor-pointer rounded-[5px] border border-[#c7cad1]"
                        >
                            <IconBgTransparent />
                        </div>
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