import React, { useEffect, useState } from "react";
import { message } from "antd";
import html2canvas from "html2canvas";

import { doc, collection, updateDoc } from 'firebase/firestore';
import { fireStore } from "@core/firebase/firebase";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../Resizable";
import SVGCodeEditor from "../SVGCodeEditor";
import SVGPreview from "../SVGPreview";

import { svgRotate } from "@constants/constants";
import { svgr, convertSvgToPng } from "@utils/funciton";

interface SVGEditorState {
    previewBg: '#F7F8F9' | 'transparent' | '#FFFFFF' | '#161B1D';
    svgCode: string | undefined;
    dimensions: string | null;
    rotate: number;
    isFlipY: boolean;
    isFlipX: boolean;
    isFirstTimeLoad: boolean;
    transformSVGCode: string;
    transformTab: string;
    pngScale: string;
    scale: number;
};

interface SVGCodeEditorProps {
    title: string;
    docId: string;
    code: string;
}

const SVGEditor = (props: SVGCodeEditorProps) => {

    const { title, docId, code } = props;

    const [state, setState] = useState<SVGEditorState>({
        previewBg: 'transparent',
        svgCode: '',
        dimensions: '',
        rotate: 0,
        isFlipX: false,
        isFlipY: false,
        isFirstTimeLoad: true,
        transformSVGCode: '',
        transformTab: 'Preview',
        pngScale: '1',
        scale: 100,
    });

    useEffect(() => {
        if (code) setState(prev => ({...prev, svgCode: code}));
    },[]);

    const handleChangeBg = (bg: '#F7F8F9' | 'transparent' | '#FFFFFF' | '#161B1D') => {
        setState(prev => ({...prev, previewBg: bg}))
    };

    const handleChangeSVGCode = (value: string | undefined) => {
        setState(prev => ({...prev, svgCode: value, isFirstTimeLoad: false}));
    };

    const handleUpdateCode = async (code: string) => {
        const docRef = doc(collection(fireStore, 'documents'), docId);
        await updateDoc(docRef, {
            code: code,
        });
    };

    useEffect(() => {
        const { svgCode, isFirstTimeLoad } = state;
        if (isFirstTimeLoad) return;

        const searchTimeout = setTimeout(() => {
            if (svgCode) handleUpdateCode(svgCode);
        }, 1000);

        return () => clearTimeout(searchTimeout);
    },[state.svgCode]);

    const handleChangeDimensions = (value: string | null) => {
        setState(prev => ({...prev, dimensions: value}));
    };

    const handleRotate = () => {
        const { svgCode, rotate, isFlipX, isFlipY } = state;
        if (!svgCode) return;

        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgCode, 'image/svg+xml');
        const svgElement = svgDoc.getElementsByTagName('svg')[0];

        if (svgElement) {
            const isRotate = svgElement.getAttribute('transform');
            if (isRotate !== null) {
                const nextStep = rotate + 1 > 3 ? 0 : rotate + 1;
                if (nextStep === 0 && !isFlipX && !isFlipY) {
                    svgElement.removeAttribute('transform');
                } else {
                    const nextRotate = svgRotate(nextStep, isFlipX, isFlipY);
                    svgElement.setAttribute('transform', nextRotate!);
                };
            } else {
                svgElement.setAttribute('transform', 'matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,0,0)')
            };

            const serializer = new XMLSerializer();
            const modifiedSVGString = serializer.serializeToString(svgElement);
            const nextRotate = rotate + 1 > 3 ? 0 : rotate + 1;

            setState(prev => ({...prev, svgCode: modifiedSVGString, rotate: nextRotate}));
        };
    };

    const handleFlipY = () => {
        const { svgCode } = state;
        if (!svgCode) return;

        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgCode, 'image/svg+xml');
        const svgElement = svgDoc.getElementsByTagName('svg')[0];
        let isFlipY: boolean = true;

        if (svgElement) {
            const isFlip = svgElement.getAttribute('transform');
            if (isFlip !== null) {
                const arrValue = isFlip.replace(/^matrix\(|\)$/g, '').split(',').map(Number);
                if (arrValue[0] === 1 && arrValue[3] === -1) {
                    svgElement.removeAttribute('transform');
                    isFlipY = false;
                } else {
                    arrValue[3] = -arrValue[3];
                    if (arrValue[3] === 1) isFlipY = false;
                    const result = `matrix(${arrValue.join(',')})`;
                    svgElement.setAttribute('transform', result);
                }
            } else {
                svgElement.setAttribute('transform', 'matrix(1,0,0,-1,0,0)')
            };

            const serializer = new XMLSerializer();
            const modifiedSVGString = serializer.serializeToString(svgElement);

            setState(prev => ({...prev, svgCode: modifiedSVGString, isFlipY: isFlipY}));
        };
    };

    const handleFlipX = () => {
        const { svgCode } = state;
        if (!svgCode) return;

        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgCode, 'image/svg+xml');
        const svgElement = svgDoc.getElementsByTagName('svg')[0];
        let isFlipX: boolean = true;

        if (svgElement) {
            const isFlip = svgElement.getAttribute('transform');
            if (isFlip !== null) {
                const arrValue = isFlip.replace(/^matrix\(|\)$/g, '').split(',').map(Number);
                if (arrValue[3] === 1 && arrValue[0] === -1) {
                    svgElement.removeAttribute('transform');
                    isFlipX = false;
                } else {
                    arrValue[0] = -arrValue[0];
                    if (arrValue[0] === 1) isFlipX = false;
                    const result = `matrix(${arrValue.join(',')})`;
                    svgElement.setAttribute('transform', result);
                }
            } else {
                svgElement.setAttribute('transform', 'matrix(-1,0,0,1,0,0)');
            };

            const serializer = new XMLSerializer();
            const modifiedSVGString = serializer.serializeToString(svgElement);

            setState(prev => ({...prev, svgCode: modifiedSVGString, isFlipX: isFlipX}));
        };
    };

    const handleCopySVG = () => {
        const { svgCode } = state;
        if (!svgCode) return;
        try {
            navigator.clipboard.writeText(svgCode);
            message.success('Copied to clipboard')
        } catch (error) {
            console.log({error});
            message.error('Failed to copy to clipboard!')
        };
    };

    const handleDownloadSVG = () => {
        const { svgCode } = state;
        if (!svgCode) return;

        try {
            const svgBlob = new Blob([svgCode], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(svgBlob);
    
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title}.svg`;
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            message.error('Something went wrong!')            
        };
    };

    const handleDownloadPNG = async () => {
        const element = document.getElementById('svg-png');
        if (element) {
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL('image/png');

            const link = document.createElement('a');
            link.href = imgData;
            link.download = `${title}.png`;
            link.click();
        } else {
            message.error('Something went wrong!')
        }
    };

    const handleCopyDataURI = () => {
        const { transformSVGCode } = state;
        if (!transformSVGCode) return;
        try {
            navigator.clipboard.writeText(transformSVGCode);
            message.success('Copied to clipboard')
        } catch (error) {
            console.log({error});
            message.error('Failed to copy to clipboard!')
        };
    };

    const handleChangeTransformTab = async (tag: string, checked: boolean) => {
        if (!checked) return;
        const { svgCode } = state;
        if (!svgCode) return;

        try {
            let output: any;
            if (tag === 'React' || tag === 'React Native') {
                output = tag === 'React' ? await svgr(svgCode) : await svgr(svgCode, {native: true});
            };
    
            if (tag === 'PNG' || tag === 'Data URI') {
                output = await convertSvgToPng(svgCode);
            };
            
            setState(prev => ({...prev, transformTab: tag, transformSVGCode: output}));
        } catch (error) {
            console.log({error});
        }
    };
    
    const handleCopyTransformCode = () => {
        const { transformSVGCode } = state;
        if (!transformSVGCode) return;
        try {
            navigator.clipboard.writeText(transformSVGCode);
            message.success('Copied to clipboard')
        } catch (error) {
            console.log({error});
            message.error('Failed to copy to clipboard!')
        };
    };

    const handleChangePngScale = (value: string) => {
        setState(prev => ({...prev, pngScale: value}));
    };

    const handleScaleChange = (event: any) => {
        setState(prev => ({...prev, scale: Math.round(event?.state?.scale * 100)}));
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <ResizablePanelGroup autoSaveId="window-layout" direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="h-full flex items-center justify-center border border-[rgb(229,230,230)] rounded-md">
                        <SVGCodeEditor
                            svgCode={state.svgCode}
                            dimensions={state.dimensions}
                            handleChangeSVGCode={handleChangeSVGCode}
                            handleChangeDimensions={handleChangeDimensions}
                            handleRotate={handleRotate}
                            handleFlipY={handleFlipY}
                            handleFlipX={handleFlipX}
                            handleCopySVG={handleCopySVG}
                            handleDownloadSVG={handleDownloadSVG}
                        />
                    </div>
                </ResizablePanel>
                <div className='group flex w-2 cursor-col-resize items-center justify-center rounded-md bg-gray-50'>
                    <ResizableHandle className='h-1 w-24 rounded-full bg-neutral-400 duration-300 group-hover:bg-primaryb group-active:duration-75 lg:h-24 lg:w-1' />
                </div>
                <ResizablePanel defaultSize={50} minSize={30}>
                    <div className='flex h-full justify-center items-center border rounded-md border-[rgb(229,230,230)]'>
                        <SVGPreview
                            previewBg={state.previewBg}
                            svgCode={state.svgCode}
                            dimensions={state.dimensions}
                            transformTab={state.transformTab}
                            transformSVGCode={state.transformSVGCode}
                            pngScale={state.pngScale}
                            scale={state.scale}
                            handleChangeBg={handleChangeBg}
                            handleDownloadSVG={handleDownloadSVG}
                            handleChangeTransformTab={handleChangeTransformTab}
                            handleCopyTransformCode={handleCopyTransformCode}
                            handleDownloadPNG={handleDownloadPNG}
                            handleChangePngScale={handleChangePngScale}
                            handleCopyDataURI={handleCopyDataURI}
                            handleScaleChange={handleScaleChange}
                        />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default SVGEditor;