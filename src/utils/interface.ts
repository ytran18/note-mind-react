// collection

export interface User {
    _id: string;
    name: string;
    email: string;
    image: string;
    createdAt: number;
}

export interface Document {
    _id: string;
    pdfUrl?: string;
    title: string;
    owner: string;
    noteType: 'note' | 'mermaid' | 'pdf';
    mermaidType?: string;
    createdAt: number;
    note?: any[];
    code?: string;
    mermaidTheme?: string;
    previewImg: string;
}

// type

export interface actionTypes {
    type: string;
    payload?: any;   
}

export interface UserTypes {
    user: User | any | null;
};