export interface Message {
    _id?: string;
    to?: string;
    from?: string;
    content?: string;
    sentAt?: Date;
}

export interface Chat {
    id: string;
    email: string;
    messages: Message[];
}
