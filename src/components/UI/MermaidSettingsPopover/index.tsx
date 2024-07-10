import { Switch, Button } from 'antd';

import IconSync from '@icons/iconSync.svg';

const MermaidSettingsPopover = () => {
    return (
        <div className="flex flex-col gap-3 font-medium">
            <div className='flex items-center w-full justify-between'>
                <div className="">Auto sync</div>
                <div className="">
                    <Switch />
                </div>
            </div>
            <Button
                className='font-medium'
                icon={<IconSync />}
            >
                Sync diagram
            </Button>
        </div>
    );
};

export default MermaidSettingsPopover;