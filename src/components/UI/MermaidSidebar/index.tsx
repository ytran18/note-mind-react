import { useEffect, useState, useRef } from 'react';

import { Popover } from 'antd';

import MermaidTemplatePopover from '../MermaidTemplatePopover';
import MermaidThemesPopover from '../MermaidThemesPopover';
import MermaidExportPopover from '../MermaidExportPopover';
import MermaidSettingsPopover from '../MermaidSettingsPopover';

import { getMermaidUrlDiagramHelp } from '@utils/funciton';
import useWindowSize from '@hooks/useWindowSize';

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
    tabActive: number | null;
};

interface MermaidSidebarProps {
    mermaidType: string;
    themeSelect: string;
    autoSync: boolean;
    handleSelectMermaidTemplate: (tag: string, checked: boolean) => void;
    handleSelectTheme: (theme: string) => void;
    handleExport: (type: string) => void;
    handleSwitchAutoSync: (checked: boolean) => void;
    handleApplyTemplate: () => void;
    handleSyncCode: () => void;
}

const MermaidSidebar = (props: MermaidSidebarProps) => {

    const { mermaidType, themeSelect, autoSync } = props;
    const { handleSelectTheme, handleSelectMermaidTemplate, handleExport, handleSwitchAutoSync, handleApplyTemplate, handleSyncCode } = props;

    const [state, setState] = useState<MermaidSidebarState>({
        isCollapase: false,
        tabActive: null,
    });

    const sidebarRef = useRef<HTMLDivElement>(null);
    const iw = useWindowSize().width;

    useEffect(() => {
        if (sidebarRef.current) {
            sidebarRef.current.style.width = state.isCollapase ? '53px' : '200px';
        }
    }, [state.isCollapase]);

    const handleToggleSidebar = () => {
        setState(prev => ({...prev, isCollapase: !prev.isCollapase}));
    };

    useEffect(() => {
        setState(prev => ({...prev, isCollapase: iw < 900 ? true : false}));
    },[iw]);

    const menu = [
        { label: 'Collapse menu', icon: state.isCollapase ? <IconExpand /> : <IconCollapse />, key: 'collapse-menu' },
        { label: 'Templates', icon: <IconTemplate />, key: 'templates' },
        { label: 'Themes', icon: <IconThemes />, key: 'themes' },
        { label: 'Export', icon: <IconExport />, key: 'export' },
        { label: 'Settings', icon: <IconSetting />, key: 'settings' },
        { label: 'Diagram help', icon: <IconDoc />, key: 'help' },
    ];

    const handleMenuClick = (key: string, index: number) => {
        setState(prev => ({...prev, tabActive: index}));

        if (key === 'collapse-menu') {
            setState(prev => ({...prev, isCollapase: !prev.isCollapase}));
            return;
        };

        if (key === 'help') {
            const url = getMermaidUrlDiagramHelp(mermaidType);
            window.open(url, '_blank');
        };
    };

    const renderPopover = (key: string) => {
        const popover = {
            'templates' : (
                <MermaidTemplatePopover
                    mermaidType={mermaidType}
                    handleSelectMermaidTemplate={handleSelectMermaidTemplate}
                    handleApplyTemplate={handleApplyTemplate}
                />
            ),
            'themes' : (
                <MermaidThemesPopover
                    themeSelect={themeSelect}
                    handleSelectTheme={handleSelectTheme}
                />
            ),
            'export' : (
                <MermaidExportPopover
                    handleExport={handleExport}
                />
            ),
            'settings' : (
                <MermaidSettingsPopover
                    autoSync={autoSync}
                    handleSwitchAutoSync={handleSwitchAutoSync}
                    handleSyncCode={handleSyncCode}
                />
            )
        }[key];

        return popover;
    };

    return (
        <div
            className="mermaid-sidebar h-full w-fit flex flex-col border border-[rgb(229,230,230)] rounded-tl-md rounded-bl-md p-2 gap-2 bg-[rgba(229,237,255,0.3)] transition-all duration-300 ease-in-out overflow-hidden"
            ref={sidebarRef}
        >
            <div 
                className="w-full flex flex-nowrap whitespace-nowrap p-2 gap-2 items-center cursor-pointer text-[#00237a] font-medium hover:bg-[rgb(204,218,255)] rounded-md transition-colors duration-200"
                onClick={handleToggleSidebar}
            >
                <div className='flex h-5 w-5 gap-2 align-middle'>
                    {state.isCollapase ? <IconExpand /> : <IconCollapse />}
                </div>
                {!state.isCollapase && (
                    <div className='text-sm'>Collapse menu</div>
                )}
            </div>
            {menu.slice(1).map((item, index) => {
                return (
                    <div key={item.key}>
                        {item.key === 'help' ? (
                            <div
                                className={`w-full flex flex-nowrap whitespace-nowrap p-2 gap-2 items-center cursor-pointer text-[#00237a] font-medium hover:bg-[rgb(204,218,255)] rounded-md transition-colors duration-200 ${(state.tabActive === index && index !== 0) ? 'bg-[rgb(47,66,235)] text-white' : ''}`}
                                onClick={() => handleMenuClick(item.key, index)}
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
                                    className={`w-full flex flex-nowrap whitespace-nowrap p-2 gap-2 items-center cursor-pointer text-[#00237a] font-medium hover:bg-[rgb(204,218,255)] rounded-md transition-colors duration-200 ${state.tabActive === index ? 'bg-[rgb(47,66,235)] text-white' : ''}`}
                                    id={`mermaid-sidebar-${item.key}`}
                                    onClick={() => handleMenuClick(item.key, index)}
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
                    </div>
                )
            })}
        </div>
    );
};

export default MermaidSidebar;