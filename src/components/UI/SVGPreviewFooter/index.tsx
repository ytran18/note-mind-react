import { Button } from "antd";

import IconDownload from '@icons/iconDownloadSVG.svg';
import IconMinus from '@icons/iconMinus.svg';
import IconPlus from '@icons/iconPlus.svg';
import IconBgTransparent from '@icons/iconBgTransparent.svg';

interface SVGPreviewFooterProps {
    previewBg: '#F7F8F9' | 'transparent' | '#FFFFFF' | '#161B1D';
    scale: number;
    handleChangeBg: (bg: '#F7F8F9' | 'transparent' | '#FFFFFF' | '#161B1D') => void;
    handleDownloadSVG: () => void;
    handleZoomOut: () => void;
    handleZoomIn: () => void;
}

const classNameBg = 'flex justify-around items-center w-[26px] h-[26px] box-border cursor-pointer rounded-[5px] border border-[#c7cad1]';

const SVGPreviewFooter = (props: SVGPreviewFooterProps) => {

    const { previewBg, scale } = props;
    const { handleChangeBg, handleDownloadSVG, handleZoomOut, handleZoomIn } = props;

    const listBg: ('#F7F8F9' | 'transparent' | '#FFFFFF' | '#161B1D')[] = ['#F7F8F9', '#FFFFFF', '#161B1D', 'transparent'];

    return (
        <div className="w-full h-full flex items-center justify-between">
            <div className="flex items-center gap-5">
                    <div className="text-sm font-medium flex items-center gap-2">
                        <Button
                            icon={<IconMinus />}
                            onClick={handleZoomOut}
                        />
                        <span>{`${scale}%`}</span>
                        <Button
                            icon={<IconPlus />}
                            onClick={handleZoomIn}
                        />
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
                        onClick={handleDownloadSVG}
                    >
                        Download
                    </Button>
                </div>
        </div>
    );
};

export default SVGPreviewFooter;