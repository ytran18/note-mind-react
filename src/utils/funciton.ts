import { message } from "antd";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { storage, fireStore } from "@core/firebase/firebase";

// tailwind merge
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from "tailwind-merge";

interface User {
    _id: string;
    name: string;
    email: string;
    image: string;
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
};

export const handleUploadPDF = async (file: any): Promise<string | void> => {
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
        const snapshot = await uploadBytes(pdfRef, file?.originFileObj, metadata);
        // Get the download URL
        const downloadUrl = await getDownloadURL(pdfRef);
        return downloadUrl;
    } catch (error) {
        // Show error message on upload failure
        message.error('Upload PDF failed!');
        console.error('Error uploading PDF:', error);
    }
};

export const getUserDocuments = async (user: User) => {
    const userDocumentsRef = query(
        collection(fireStore, 'documents'),
        where('owner', '==', user?._id)
    );

    let documents:any = [];

    await getDocs(userDocumentsRef).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data()) documents.push(doc.data());
        });
    });
    
    documents = documents.sort(compare);

    return documents;
};

export const compare = (a: any, b: any) => {
    return b?.createdAt - a?.createdAt;
};

export const dataURItoBlob = (dataURI: string) => {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var uint8Array = new Uint8Array(arrayBuffer);
  
    for (var i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([arrayBuffer], { type: mimeString });
}