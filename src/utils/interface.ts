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
    pdfUrl: string;
    title: string;
    owner: string;
    note: string;
    createdAt: number;
}

// type

export interface actionTypes {
    type: string;
    payload?: any;   
}

export interface UserTypes {
    user: User | any | null;
};