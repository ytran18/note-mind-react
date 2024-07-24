import { Tag, Flex, Result } from "antd";
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import SVGReactTransform from "../SVGReactTransform";
import SVGDataURITransform from "../SVGDataURITransform";
import SVGReactNativeTransform from "../SVGReactNativeTransform";
import SVGPngTransform from "../SVGPngTransform";

import SVGPreviewFooter from "../SVGPreviewFooter";
import SVGReactFooter from "../SVGReactFooter";
import SVGReactNativeFooter from "../SVGReactNativeFooter";
import SVGPngFooter from "../SVGPngFooter";

import IconNoSVG from '@icons/iconNoSVG.svg';

import ImageBgTransparent from '@images/imageBgTransparent.png';

import './style.scss';

interface SVGPreviewProps {
    previewBg: '#F7F8F9' | 'transparent' | '#FFFFFF' | '#161B1D';
    svgCode: string | undefined;
    dimensions: string | null;
    transformTab: string;
    transformSVGCode: string;
    pngScale: string;
    scale: number;
    handleChangeBg: (bg: '#F7F8F9' | 'transparent' | '#FFFFFF' | '#161B1D') => void;
    handleDownloadSVG: () => void;
    handleChangeTransformTab: (tag: string, checked: boolean) => void;
    handleCopyTransformCode: () => void;
    handleDownloadPNG: () => void;
    handleChangePngScale: (value: string) => void;
    handleCopyDataURI: () => void;
    handleScaleChange: (event: any) => void;
}

const tagsData = ['Preview', 'React', 'React Native', 'PNG', 'Data URI'];

const SVGPreview = (props: SVGPreviewProps) => {

    const { previewBg, svgCode, dimensions, transformTab, transformSVGCode, pngScale, scale } = props;
    const { handleChangeBg, handleDownloadSVG, handleChangeTransformTab, handleCopyTransformCode, handleChangePngScale, handleDownloadPNG, handleCopyDataURI, handleScaleChange } = props;

    // const { zoomIn, zoomOut, resetTransform } = useControls();

    const handleZoomOut = () => {
        const element = document.getElementById('svg-preview-zoomout');
        if (element) element.click();
    };
    
    const handleZoomIn = () => {
        const element = document.getElementById('svg-preview-zoomin');
        if (element) element.click();
    };

    const renderSVGRTab = () => {
        const tab = {
            'Preview' : (
                <TransformWrapper onTransformed={handleScaleChange} smooth minScale={0.5}>
                        {
                            ({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                <>
                                    <div className="hidden" id="svg-preview-zoomin" onClick={() => zoomIn(0.5)}></div>
                                    <div className="hidden" id="svg-preview-zoomout" onClick={() => zoomOut(0.5)}></div>
                                    <TransformComponent>
                                        <div
                                            style={{
                                                width: (dimensions !== null) ? `${dimensions}px` : '500px',
                                                height: (dimensions !== null) ? `${dimensions}px` : '500px',
                                            }}
                                            className="w-[500px] h-[500px] flex items-center justify-center cursor-grab"
                                            dangerouslySetInnerHTML={{__html: svgCode || ''}}
                                        />
                                    </TransformComponent>
                                </>
                            )
                        }
                    </TransformWrapper>
            ),
            'React': (
                <SVGReactTransform
                    transformSVGCode={transformSVGCode}
                />
            ),
            'React Native': (
                <SVGReactNativeTransform
                    transformSVGCode={transformSVGCode}
                />
            ),
            'PNG': (
                <SVGPngTransform
                    pngScale={pngScale}
                    transformSVGCode={transformSVGCode}
                />
            ),
            'Data URI': (
                <SVGDataURITransform
                    transformSVGCode={transformSVGCode}
                    handleCopyDataURI={handleCopyDataURI}
                />
            )
        }[transformTab];

        return tab;
    };

    const renderSVGFooter = () => {
        const tab = {
            'Preview' : (
                <SVGPreviewFooter
                    previewBg={previewBg}
                    scale={scale}
                    handleChangeBg={handleChangeBg}
                    handleDownloadSVG={handleDownloadSVG}
                    handleZoomOut={handleZoomOut}
                    handleZoomIn={handleZoomIn}
                />
            ),
            'React': (
                <SVGReactFooter
                    handleCopyTransformCode={handleCopyTransformCode}
                />
            ),
            'React Native': (
                <SVGReactNativeFooter
                    handleCopyTransformCode={handleCopyTransformCode}
                />
            ),
            'PNG': (
                <SVGPngFooter
                    pngScale={pngScale}
                    handleDownloadPNG={handleDownloadPNG}
                    handleChangePngScale={handleChangePngScale}
                />
            ),
        }[transformTab];

        return tab;
    };

    return (
        <div className="w-full h-full flex flex-col svg-preview">
            <div className="w-full h-[64px] flex items-center gap-5 p-3 border-b border-[#e3e5e8]">
                <Flex gap={4} wrap align="center">
                    {tagsData.map<React.ReactNode>((tag) => (
                        <Tag.CheckableTag
                            key={tag}
                            className="font-medium"
                            checked={transformTab === tag}
                            onChange={(checked) => handleChangeTransformTab(tag, checked)}
                        >
                            {tag}
                        </Tag.CheckableTag>
                    ))}
                </Flex>
            </div>
            <div
                className="flex flex-grow w-full items-center justify-center"
                style={{
                    backgroundColor: (svgCode?.length === 0 || transformTab !== 'Preview') ? '#F7F8F9' : previewBg !== 'transparent' ? previewBg : '',
                    backgroundImage: (svgCode?.length === 0 || transformTab !== 'Preview') ? '' : previewBg === 'transparent' ? `url(${ImageBgTransparent})` : '',
                }}
            >
                {svgCode?.length !== 0 && renderSVGRTab()}
                {svgCode?.length === 0 && (
                    <Result
                        icon={<IconNoSVG />}
                        title='SVG Empty'
                        subTitle='Please enter an SVG on the left'
                    />
                )}
            </div>
            <div className="w-full h-[64px] p-3 border-t border-[#e3e5e8]">
                {svgCode?.length !== 0 && renderSVGFooter()}
            </div>
        </div>
    );
};

export default SVGPreview;