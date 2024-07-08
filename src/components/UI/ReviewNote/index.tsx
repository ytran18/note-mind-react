import { Input, Tag, Flex, Upload } from "antd";

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

interface ReviewNoteProps {
    noteType: 'pdf' | 'note' | 'mermaid';
    noteTitle: string;
    selectedMermaidTemplate: string;
    file: any[];
};

const tagsData = [
    {label: 'Basic Note', value: 'note'},
    {label: 'Mermaid Editor', value: 'mermaid'},
    {label: 'PDF Editor', value: 'pdf'}
];

const ReviewNote = (props: ReviewNoteProps) => {

    const { noteTitle, noteType, selectedMermaidTemplate, file } = props;

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
        <div className="review-note">
            <div className="flex flex-col gap-1 mb-4">
                Note Title
                <Input value={noteTitle} />
            </div>
            <div className="flex flex-col gap-1 mb-4">
                Note Type
                <Flex gap={4} wrap align="center">
                    {tagsData.map<React.ReactNode>((tag) => (
                        <Tag.CheckableTag
                            key={tag.value}
                            className="font-medium"
                            checked={noteType.includes(tag.value)}
                        >
                            {tag.label}
                        </Tag.CheckableTag>
                    ))}
                </Flex>
            </div>
            {noteType === 'mermaid' && (
                <div className="flex flex-col gap-1 mb-4">
                    Mermaid Template
                    <Tag color="#1677ff" className="font-medium !w-fit">{selectedMermaidTemplate}</Tag>
                    <div className="max-w-full h-[450px] max-h-[450px] flex justify-center items-center">
                        {renderMermaidPreviewSVG(selectedMermaidTemplate)}
                    </div>
                </div>
            )}
            {noteType === 'pdf' && (
                <div className="flex flex-col gap-1 mb-4">
                    Your pdf upload file
                    <Upload defaultFileList={file}></Upload>
                </div>
            )}
        </div>
    );
};

export default ReviewNote;