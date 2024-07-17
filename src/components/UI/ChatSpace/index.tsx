import { Result } from 'antd';
import IconCommingSoon from '@icons/iconCommingSoon.svg';

const ChatSpace = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Result
                icon={<IconCommingSoon />}
                title="Comming soon!"
                subTitle="Chat with AI will comming soon!"
            />
        </div>
    );
};

export default ChatSpace;