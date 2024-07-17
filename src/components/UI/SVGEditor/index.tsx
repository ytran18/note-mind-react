import { Result } from 'antd';
import IconComingSoon from '@icons/iconCommingSoon.svg';

const SVGEditor = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Result
                icon={<IconComingSoon />}
                title="SVG editor will coming soon!"
            />
        </div>
    );
};

export default SVGEditor;