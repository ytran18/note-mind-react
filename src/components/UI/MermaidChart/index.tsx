import { useEffect, useRef, useState, forwardRef, MutableRefObject } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import mermaid from 'mermaid';

import IconZoomIn from '@icons/iconZoomIn.svg';
import IconReset from '@icons/iconReset.svg';
import IconZoomOut from '@icons/iconZoomOut.svg';

import './style.scss';

interface MermaidChartState {
    isErr: boolean;
    errMessage: string;
    errArray: any[];
    codeNotErr: string,
    errMode: boolean,
};

interface MermaidChartProps {
    code: string;
};

mermaid.initialize({
    startOnLoad: true,
});

const MermaidChart = forwardRef<HTMLDivElement, MermaidChartProps>((props: MermaidChartProps, ref) => {

    const { code } = props;

    const [state, setState] = useState<MermaidChartState>({
        errMessage: '',
        isErr: false,
        errArray: [],
        codeNotErr: ``,
        errMode: false,
    });

    const counterRef = useRef(0);

    const onCheckError = async (value: string) => {
        let syntaxTree;
        try {
            syntaxTree = await mermaid.parse(value);
            return syntaxTree;
        } catch (error) {
            return false;
        }
    };

    useEffect(() => {
        const onHandleMermaidData = async (value: string) => {
            const mermaidChart = document.getElementById("mermaid-chart");
            
            if (mermaidChart && ref && 'current' in ref && ref.current) {
                const isValidContent = await onCheckError(value);
                if (isValidContent) {
                    counterRef.current = 0;
                    ref.current.innerHTML = value;
                    setState(prev => ({ ...prev, codeNotErr: value, isErr: false }));
                } else {
                    counterRef.current = counterRef.current + 1;
                    setState(prev => ({ ...prev, isErr: true }));
                    if (counterRef.current > 2) return;
                    ref.current.innerHTML = state.codeNotErr;
                }
            }

            mermaid.parseError = (err: any) => {
                if (code === '') return;
                setState(prev => ({ ...prev, errMessage: err?.message }));
            };

            mermaid.contentLoaded();
            mermaidChart?.removeAttribute("data-processed");
        };
        onHandleMermaidData(code);
    }, [code, state.isErr, ref]);

    useEffect(() => {
        const lines = state.errMessage.split('\n');
        setState(prev => ({...prev, errArray: lines}));
    },[state.errMessage]);

    return (
        <div className='w-full h-full'>
            <TransformWrapper minScale={0.5}>
                {
                    ({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                        <>
                            <div className='absolute w-[100px] h-[35px] flex justify-between px-[5px] right-[15px] bottom-[15px] bg-[rgb(67,153,225)] rounded z-[100]'>
                                <div
                                    className="h-full flex items-center cursor-pointer text-[rgb(238,238,238)] hover:text-white"
                                    onClick={() => zoomIn()}
                                >
                                    <IconZoomIn />
                                </div>
                                <div
                                    className="h-full flex items-center cursor-pointer text-[rgb(238,238,238)] hover:text-white"
                                    onClick={() => resetTransform()}
                                >
                                    <IconReset />
                                </div>
                                <div
                                    className="h-full flex items-center cursor-pointer text-[rgb(238,238,238)] hover:text-white"
                                    onClick={() => zoomOut()}
                                >
                                    <IconZoomOut />
                                </div>
                            </div>
                            <TransformComponent>
                                <div ref={ref} id="mermaid-chart" className={`mermaid not-pie-chart ${state.isErr ? 'opacity-[0.4]' : ''}`}></div>
                                <div className="err-wrapper">
                                    {state.isErr && (
                                        state.errArray?.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className="err-message">{item}</div>
                                                    {index !== state.errArray.length - 1 && <br />}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </TransformComponent>
                        </>
                    )
                }
            </TransformWrapper>
        </div>
    );
});

export default MermaidChart;