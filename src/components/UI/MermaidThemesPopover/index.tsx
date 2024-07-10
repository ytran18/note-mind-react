interface MermaidThemesPopoverProps {
    themeSelect: string;
    handleSelectTheme: (theme: string) => void;
}

const MermaidThemesPopover = (props: MermaidThemesPopoverProps) => {

    const {themeSelect, handleSelectTheme  } = props;

    const menu = [
        { label: 'Mermaid Chart', key: 'theme-mermaid' },
        { label: 'Default', key: 'theme-default' },
        { label: 'Forest', key: 'theme-forest' },
        { label: 'Base', key: 'theme-base' },
        { label: 'Dark', key: 'theme-dark' },
        { label: 'Neutral', key: 'theme-neutral' },
    ];

    return (
        <div className="flex flex-col gap-2">
            {menu.map((item) => {
                return (
                    <div
                        className={`px-3 py-[5px] cursor-pointer hover:bg-[rgb(204,218,255)] text-[#00237a] transition-colors duration-200 rounded-md font-medium ${themeSelect === item.key ? 'bg-[rgb(204,218,255)]' : ''}`}
                        key={item.key}
                        onClick={() => handleSelectTheme(item.key)}
                    >
                        {item.label}
                    </div>
                )
            })}
        </div>
    );
};

export default MermaidThemesPopover;