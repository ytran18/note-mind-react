import { Card } from "antd";

interface FileCardProps {
    docId: string;
    title: string;
};

const FileCard = (props: FileCardProps) => {

    const { docId, title } = props;

    return (
        <Card
            className="w-full sm:w-[300px]"
            hoverable
        >
            <p className="text-sm font-medium truncate">{title}</p>
        </Card>
    )
}

export default FileCard;