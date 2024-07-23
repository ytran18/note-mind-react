import { Button } from "antd";

import IconCopy from '@icons/iconCopySVG.svg';

interface SVGReactNativeFooterProps {
    handleCopyTransformCode: () => void;
}

const SVGReactNativeFooter = (props: SVGReactNativeFooterProps) => {

    const { handleCopyTransformCode } = props;

    return (
        <div className="w-full h-full flex items-center justify-end">
            <Button
                className="font-medium"
                icon={<IconCopy />}
                onClick={handleCopyTransformCode}
            >
                Copy
            </Button>
        </div>
    );
};

export default SVGReactNativeFooter;