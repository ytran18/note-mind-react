import { message } from "antd";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from "@core/firebase/firebase";

// tailwind merge
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
};

export const handleUploadPDF = async (file: any): Promise<string | void> => {
    console.log("running");
    
    // Check if the file is a PDF
    if (file.type !== 'application/pdf') {
        message.error('Only PDF files are allowed!');
        return;
    }

    const pdfRef = ref(storage, `pdf/${file.uid}`);
    const metadata = {
        contentType: 'application/pdf'
    };

    try {
        // Upload the PDF file with metadata
        const snapshot = await uploadBytes(pdfRef, file, metadata);
        // Get the download URL
        const downloadUrl = await getDownloadURL(pdfRef);
        return downloadUrl;
    } catch (error) {
        // Show error message on upload failure
        message.error('Upload PDF failed!');
        console.error('Error uploading PDF:', error);
    }
};