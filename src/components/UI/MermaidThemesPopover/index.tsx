interface MermaidThemesPopoverProps {
    themeSelect: string;
    handleSelectTheme: (theme: string) => void;
}

const MermaidThemesPopover = (props: MermaidThemesPopoverProps) => {

    const {themeSelect, handleSelectTheme  } = props;

    const menu = [
        { label: 'Mermaid Chart', key: 'default' },
        { label: 'Forest', key: 'forest' },
        { label: 'Base', key: 'base' },
        { label: 'Dark', key: 'dark' },
        { label: 'Neutral', key: 'neutral' },
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