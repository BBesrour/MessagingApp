import { type Chat } from '../models/Message';

const mockChat: Chat[] = [
    {
        id: '1',
        email: 'test@test.com',
        messages: [
            {
                content: 'Hi Jenny, How r u today?',
                from: 'test@test.com',
                to: 'bilel@test.com',
                sentAt: new Date(),
            },
            {
                content: 'am doing great ;D',
                from: 'test@test.com',
                to: 'bilel@test.com',
                sentAt: new Date(),
            },
            {
                content: 'doing fine too ;D was thinking about going for a run',
                from: 'bilel@test.com',
                to: 'test@test.com',
                sentAt: new Date(),
            },
            {
                content: 'was thinking about going for a run',
                from: 'bilel@test.com',
                to: 'test@test.com',
                sentAt: new Date(),
            },
            {
                content: 'sounds great ;D',
                from: 'test@test.com',
                to: 'bilel@test.com',
                sentAt: new Date(),
            },
        ],
    },
    {
        id: '2',
        email: 'bilel@test.com',
        messages: [
            {
                content: 'Hi Jenny, How r u today?',
                from: 'test@test.com',
                to: 'bilel@test.com',
                sentAt: new Date(),
            },
            {
                content: 'am doing great ;D',
                from: 'test@test.com',
                to: 'bilel@test.com',
                sentAt: new Date(),
            },
            {
                content: 'doing fine too ;D was thinking about going for a run',
                from: 'bilel@test.com',
                to: 'test@test.com',
                sentAt: new Date(),
            },
            {
                content: 'was thinking about going for a run',
                from: 'bilel@test.com',
                to: 'test@test.com',
                sentAt: new Date(),
            },
            {
                content: 'sounds great ;D',
                from: 'test@test.com',
                to: 'bilel@test.com',
                sentAt: new Date(),
            },
        ],
    },
];

export const getChatData = async ({ params }: { params: any }) => {
    return mockChat.find((chat) => chat.email === params.userId);
};
