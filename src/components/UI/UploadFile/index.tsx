import type { UploadProps } from "antd";
import { Upload } from "antd";

import IconInbox from '@icons/iconInbox.svg';

const { Dragger } = Upload;

interface UploadFileProps {
    handleUploadFile: (file: any) => void;
}

const UploadFile = (props: UploadFileProps) => {

    const { handleUploadFile } = props;

    const UploadProps: UploadProps = {
        name: 'file',
        multiple: false,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            handleUploadFile(info.file);
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <>
            <div className="text-xs mb-3">Choose files under 6 pages to use AI, flashcard. (For now)</div>
            <Dragger {...UploadProps}>
                <p className="w-full flex justify-center text-blue-500">
                    <IconInbox />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Dragger>
        </>
    );
};

export default UploadFile;