import { message } from "antd";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { storage, fireStore } from "@core/firebase/firebase";

import html2canvas from 'html2canvas';

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
};

export const getMermaidUrlDiagramHelp = (mermaidType: string) => {
    const url = {
        'Flow' : 'https://mermaid.js.org/syntax/flowchart.html',
        'Sequence': 'https://mermaid.js.org/syntax/sequenceDiagram.html',
        'Class': 'https://mermaid.js.org/syntax/classDiagram.html',
        'State': 'https://mermaid.js.org/syntax/stateDiagram.html',
        'ER': 'https://mermaid.js.org/syntax/entityRelationshipDiagram.html',
        'User Journey': 'https://mermaid.js.org/syntax/userJourney.html',
        'Gantt': 'https://mermaid.js.org/syntax/gantt.html',
        'Pie': 'https://mermaid.js.org/syntax/pie.html',
        'Quadrant Chart': 'https://mermaid.js.org/syntax/quadrantChart.html',
        'Requirement': 'https://mermaid.js.org/syntax/requirementDiagram.html',
        'Git': 'https://mermaid.js.org/syntax/gitgraph.html',
        'C4': 'https://mermaid.js.org/syntax/c4.html',
        'Mindmap': 'https://mermaid.js.org/syntax/mindmap.html',
        'Timeline': 'https://mermaid.js.org/syntax/timeline.html',
        'Sankey': 'https://mermaid.js.org/syntax/sankey.html',
    }[mermaidType];

    return url;
};

const handleGetBlob = async (): Promise<Blob | null> => {
    const element = document.getElementById('mermaid-chart');

    if (!element) return null;

    const canvas = await html2canvas(element);

    return new Promise(resolve => {
        canvas.toBlob(function(blob) {
            resolve(blob);
        });
    });
};

export const handleGetUrlPreview = async (noteId: string): Promise<string> => {
    let previewURL = '';
    const blob = await handleGetBlob();
    if (!blob) return '';
    
    const imageRef = ref(storage, `preview/mermaid/${noteId}`);
    const snapshot = await uploadBytes(imageRef, blob);
    previewURL = await getDownloadURL(imageRef);

    return previewURL;
};