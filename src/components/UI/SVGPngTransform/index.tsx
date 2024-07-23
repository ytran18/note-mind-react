import { Image } from "antd";

interface SVGPngTransformProps {
    transformSVGCode: string;
    pngScale: string;
}

const SVGPngTransform = (props: SVGPngTransformProps) => {

    const { transformSVGCode, pngScale } = props;

    const scale = {
        '0.5': 'scale-50',
        '1': '',
        '1.5': 'scale-[1.5]',
        '2': 'scale-[2]',
    }[pngScale]

    return (
        <div
            id="svg-png"
            className={`transform ${scale}`}
        >
            <Image
                src={transformSVGCode}
                preview={false}
            />
        </div>
    );
};

export default SVGPngTransform;