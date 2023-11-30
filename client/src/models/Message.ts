export interface Message {
    _id?: string;
    to?: string;
    from?: string;
    content?: string;
    sentAt?: Date;
}
