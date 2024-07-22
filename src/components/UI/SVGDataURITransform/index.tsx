import { Input, Button } from "antd";

const { TextArea } = Input;

interface SVGDataURITransformProps {
    transformSVGCode: string;
}

const SVGDataURITransform = (props: SVGDataURITransformProps) => {

    const { transformSVGCode } = props;

    return (
        <div className="w-full h-full p-3 flex flex-col gap-2">
            <div className="text-sm flex items-center justify-between font-medium">
                <div>Data URI</div>
                <Button>Copy</Button>
            </div>
            <TextArea
                value={transformSVGCode}
                autoSize={{ minRows: 2, maxRows: 6 }}
            />
        </div>
    );
};

export default SVGDataURITransform;