import { Result } from 'antd';
import IconCommingSoon from '@icons/iconCommingSoon.svg';

const FlashCardSpace = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Result
                icon={<IconCommingSoon />}
                title="Comming soon!"
                subTitle="Flash card will comming soon!"
            />
        </div>
    );
};

export default FlashCardSpace;