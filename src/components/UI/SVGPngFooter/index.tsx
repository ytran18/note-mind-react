import { Button, Select } from "antd";

import IconDownload from '@icons/iconDownloadSVG.svg';

interface SVGPngFooterProps {
    pngScale: string;
    handleDownloadPNG: () => void;
    handleChangePngScale: (value: string) => void;
}

const SVGPngFooter = (props: SVGPngFooterProps) => {

    const { pngScale } = props;
    const { handleDownloadPNG, handleChangePngScale } = props;
    
    return (
        <div className="w-full h-full flex items-center justify-end">
            <div className="flex items-center gap-3">
                <Select
                    value={pngScale}
                    className="font-medium"
                    style={{ width: 80 }}
                    onChange={(value) => handleChangePngScale(value)}
                    options={[
                        { value: '0.5', label: '0.5x' },
                        { value: '1', label: '1x' },
                        { value: '1.5', label: '1.5x' },
                        { value: '2', label: '2x' },
                    ]}
                />
                <Button
                    icon={<IconDownload />}
                    className="font-medium"
                    onClick={handleDownloadPNG}
                >
                    Download PNG
                </Button>
            </div>
        </div>
    );
};

export default SVGPngFooter;