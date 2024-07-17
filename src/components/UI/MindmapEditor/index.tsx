import { Result } from 'antd';
import IconCommingSoon from '@icons/iconCommingSoon.svg';

const MindmapEditor = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Result
                icon={<IconCommingSoon />}
                title="Mindmap editor will coming soon!"
            />
        </div>
    );
};

export default MindmapEditor;