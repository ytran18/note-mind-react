import { Image } from "antd";

interface SVGPngTransformProps {
    transformSVGCode: string;
}

const SVGPngTransform = (props: SVGPngTransformProps) => {

    const { transformSVGCode } = props;

    return (
        <div className="">
            <Image
                src={transformSVGCode}
                preview={false}
            />
        </div>
    );
};

export default SVGPngTransform;