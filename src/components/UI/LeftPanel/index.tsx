import { PdfHighlighter, PdfLoader } from 'react-pdf-highlighter';
import { SpinnerPage } from '../Spinner';
import TextSelectionPopover from '../TextSelectionPopover';

import './style.scss';

const resetHash = () => {
    document.location.hash = "";
};

interface LeftPanelProps {
    docUrl: string;
}

const LeftPanel = (props: LeftPanelProps) => {

    const { docUrl } = props;

    return (
        <div className="w-full h-full">
            <PdfLoader url={docUrl} beforeLoad={<SpinnerPage />}>
                {(pdfDocument) => {
                    return (
                        <PdfHighlighter
                            pdfDocument={pdfDocument}
                            enableAreaSelection={(event) => event.altKey}
                            onScrollChange={resetHash}
                            scrollRef={(scrollTo) => {}}
                            onSelectionFinished={(position, content, hideTipAndSelection, transformSelection) => {
                                return (
                                    <TextSelectionPopover
                                        content={content}
                                        position={position}
                                        hideTipAndSelection={hideTipAndSelection}
                                    />
                                );
                            }}
                            highlightTransform={( highlight, index, setTip, hideTip, viewportToScaled, screenshot, isScrolledTo ) => {
                                return <></>
                            }}
                            // @ts-ignore
                            highlights={[]}
                        />
                    )
                }}
            </PdfLoader>
        </div>
    );
};

export default LeftPanel;