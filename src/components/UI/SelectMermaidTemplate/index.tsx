import React from "react";
import { Tag, Flex } from "antd";

// icon
import IconC4 from '@icons/mermaid/c4.svg';
import IconClass from '@icons/mermaid/class.svg';
import IconER from '@icons/mermaid/er.svg';
import IconFlow from '@icons/mermaid/flow.svg';
import IconGantt from '@icons/mermaid/gantt.svg';
import IconGit from '@icons/mermaid/git.svg';
import IconJourney from '@icons/mermaid/journey.svg';
import IconMindmap from '@icons/mermaid/mindmap.svg';
import IconPie from '@icons/mermaid/pie.svg';
import IconQuadrant from '@icons/mermaid/quadrant.svg';
import IconRequirement from '@icons/mermaid/requirement.svg';
import IconSankey from '@icons/mermaid/sankey.svg';
import IconSequence from '@icons/mermaid/sequence.svg';
import IconState from '@icons/mermaid/state.svg';
import IconTimeline from '@icons/mermaid/timeline.svg';

interface SelectMermaidTemplateProps {
    selectedMermaidTemplate: string;
    handleSelectMermaidTemplate: (tag: string, checked: boolean) => void;
}

const tagsData = ['Flow', 'Sequence', 'Class', 'State', 'ER', 'User Journey', 'Gantt', 'Pie', 'Quadrant Chart', 'Requirement', 'Git', 'C4', 'Mindmap', 'Timeline', 'Sankey'];

const SelectMermaidTemplate = (props: SelectMermaidTemplateProps) => {

    const { selectedMermaidTemplate } = props;
    const { handleSelectMermaidTemplate } = props;

    const renderMermaidPreviewSVG = (type: string) => {
        const returnIcon = {
            'Flow': <IconFlow />,
            'Sequence': <IconSequence />,
            'Class': <IconClass />,
            'State': <IconState />,
            'ER': <IconER />,
            'User Journey' : <IconJourney />,
            'Gantt': <IconGantt />,
            'Pie': <IconPie />,
            'Quadrant Chart' : <IconQuadrant />,
            'Requirement': <IconRequirement />,
            'Git': <IconGit />,
            'C4': <IconC4 />,
            'Mindmap': <IconMindmap />,
            'Timeline': <IconTimeline />,
            'Sankey': <IconSankey />
        }[type];
    
        return returnIcon;
    };

    return (
        <div className="w-full">
            <div className="flex flex-col w-full gap-1">
                <Flex gap={4} wrap align="center">
                    {tagsData.map<React.ReactNode>((tag) => (
                        <Tag.CheckableTag
                            key={tag}
                            className="font-medium"
                            checked={selectedMermaidTemplate.includes(tag)}
                            onChange={(checked) => handleSelectMermaidTemplate(tag, checked)}
                        >
                            {tag}
                        </Tag.CheckableTag>
                    ))}
                </Flex>
                <div className="max-w-full h-[450px] max-h-[450px] flex justify-center items-center">
                    {renderMermaidPreviewSVG(selectedMermaidTemplate)}
                </div>
            </div>
        </div>
    );
};

export default SelectMermaidTemplate;