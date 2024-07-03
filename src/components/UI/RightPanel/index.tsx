interface RightPanelProps {
    tabActive: number;
    handleChangeTab: (tab: number) => void;
};

const RightPanel = (props: RightPanelProps) => {

    const { tabActive, handleChangeTab } = props;

    return (
        <div>right panel</div>
    );
};

export default RightPanel;