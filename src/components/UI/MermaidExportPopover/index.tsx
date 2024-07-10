interface MermaidExportPopoverProps {
    handleExport: (type: string) => void;
};

const MermaidExportPopover = (props: MermaidExportPopoverProps) => {

    const { handleExport } = props;

    const menu = [
        { label: 'Export as PNG', key: 'export-png' },
        { label: 'Export as SVG', key: 'export-svg' },
        { label: 'Copy to Clipboard', key: 'export-clipboard' },
    ];

    return (
        <div className="flex flex-col gap-2">
            {menu.map((item) => {
                return (
                    <div
                        className={`px-3 py-[5px] cursor-pointer hover:bg-[rgb(204,218,255)] text-[#00237a] transition-colors duration-200 rounded-md font-medium`}
                        key={item.key}
                        onClick={() => handleExport(item.key)}
                    >
                        {item.label}
                    </div>
                )
            })}
        </div>
    );
};

export default MermaidExportPopover;