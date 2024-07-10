import { useState } from 'react';

import { Popover } from 'antd';

import MermaidTemplatePopover from '../MermaidTemplatePopover';
import MermaidThemesPopover from '../MermaidThemesPopover';
import MermaidExportPopover from '../MermaidExportPopover';
import MermaidSettingsPopover from '../MermaidSettingsPopover';

import IconExpand from '@icons/iconExpand.svg';
import IconCollapse from '@icons/iconCollapse.svg';
import IconThemes from '@icons/iconTheme.svg';
import IconExport from '@icons/iconExport.svg';
import IconSetting from '@icons/iconSetting.svg';
import IconDoc from '@icons/iconDoc.svg';
import IconTemplate from '@icons/iconTemplate.svg';

import './style.scss';

interface MermaidSidebarState {
    isCollapase: boolean;
};

interface MermaidSidebarProps {
    mermaidType: string;
    themeSelect: string;
    handleSelectMermaidTemplate: (tag: string, checked: boolean) => void;
    handleSelectTheme: (theme: string) => void;
}

const MermaidSidebar = (props: MermaidSidebarProps) => {

    const { mermaidType, themeSelect } = props;
    const { handleSelectTheme, handleSelectMermaidTemplate } = props;

    const [state, setState] = useState<MermaidSidebarState>({
        isCollapase: false,
    });

    const menu = [
        { label: 'Collapse menu', icon: state.isCollapase ? <IconExpand /> : <IconCollapse />, key: 'collapse-menu' },
        { label: 'Templates', icon: <IconTemplate />, key: 'templates' },
        { label: 'Themes', icon: <IconThemes />, key: 'themes' },
        { label: 'Export', icon: <IconExport />, key: 'export' },
        { label: 'Settings', icon: <IconSetting />, key: 'settings' },
        { label: 'Diagram help', icon: <IconDoc />, key: 'help' },
    ];

    const handleMenuClick = (key: string) => {
        if (key === 'collapse-menu') {
            setState(prev => ({...prev, isCollapase: !prev.isCollapase}));
            return;
        };

        if (key === 'themes') {
            const popoverElement = document.querySelector(`.mermaid-sidebar-themes`);

            if (popoverElement) {
                popoverElement.classList.remove('ant-popover-hidden')
            };
        };
    };

    const renderPopover = (key: string) => {
        const popover = {
            'templates' : (
                <MermaidTemplatePopover
                    mermaidType={mermaidType}
                    handleSelectMermaidTemplate={handleSelectMermaidTemplate}
                />
            ),
            'themes' : (
                <MermaidThemesPopover
                    themeSelect={themeSelect}
                    handleSelectTheme={handleSelectTheme}
                />
            ),
            'export' : <MermaidExportPopover />,
            'settings' : <MermaidSettingsPopover />,
        }[key];

        return popover;
    };

    return (
        <div className="mermaid-sidebar h-full w-fit flex flex-col border border-[rgb(229,230,230)] rounded-tl-md rounded-bl-md p-2 gap-2 bg-[rgba(229,237,255,0.3)]">
            {menu.map((item) => {
                return (
                    <>
                        {(item.key === 'collapse-menu' || item.key === 'help') ? (
                            <div
                                className='w-full flex flex-nowrap whitespace-nowrap p-2 gap-2 items-center cursor-pointer text-[#00237a] font-medium hover:bg-[rgb(204,218,255)] rounded-md transition-colors duration-200'
                                key={item.key}
                                onClick={() => handleMenuClick(item.key)}
                            >
                                <div className='flex h-5 w-5 gap-2 align-middle'>
                                    {item.icon}
                                </div>
                                {!state.isCollapase && (
                                    <div className='text-sm'>{item.label}</div>
                                )}
                            </div>
                        ) : (
                            <Popover
                                trigger={'click'}
                                arrow={false}
                                rootClassName={`mermaid-sidebar-${item.key}`}
                                content={
                                    <div className=''>
                                        {renderPopover(item.key)}
                                    </div>
                                }
                                placement='bottomRight'
                            >
                                <div
                                    className='w-full flex flex-nowrap whitespace-nowrap p-2 gap-2 items-center cursor-pointer text-[#00237a] font-medium hover:bg-[rgb(204,218,255)] rounded-md transition-colors duration-200'
                                    key={item.key}
                                    id={`mermaid-sidebar-${item.key}`}
                                    onClick={() => handleMenuClick(item.key)}
                                >
                                    <div className='flex h-5 w-5 gap-2 align-middle'>
                                        {item.icon}
                                    </div>
                                    {!state.isCollapase && (
                                        <div className='text-sm'>{item.label}</div>
                                    )}
                                </div>
                            </Popover>
                        )}
                    </>
                )
            })}
        </div>
    );
};

export default MermaidSidebar;