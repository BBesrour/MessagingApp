import { type Chat } from '../models/Message';

const mockChat: Chat[] = [
    {
        email: 'john@doe.com',
        messages: [
            {
                content: 'Hi Jenny, How r u today?',
                from: 'john@doe.com',
                to: 'bilel@test.com',
                sentAt: new Date(),
            },
            {
                content: 'am doing great ;D',
                from: 'john@doe.com',
                to: 'bilel@test.com',
                sentAt: new Date(),
            },
            {
                content: 'doing fine too ;D was thinking about going for a run',
                from: 'bilel@test.com',
                to: 'john@doe.com',
                sentAt: new Date(),
            },
            {
                content: 'was thinking about going for a run',
                from: 'bilel@test.com',
                to: 'john@doe.com',
                sentAt: new Date(),
            },
            {
                content: 'sounds great ;D',
                from: 'john@doe.com',
                to: 'bilel@test.com',
                sentAt: new Date(),
            },
        ],
    },
    {
        email: 'john2@doe.com',
        messages: [
            {
                content: 'Hi Jenny, How r u today?',
                from: 'john2@doe.com',
                to: 'bilel@test.com',
                sentAt: new Date(),
            },
            {
                content: 'am doing great ;D',
                from: 'john2@doe.com',
                to: 'bilel@test.com',
                sentAt: new Date(),
            },
            {
                content: 'doing fine too ;D was thinking about going for a run',
                from: 'bilel@test.com',
                to: 'john2@doe.com',
                sentAt: new Date(),
            },
            {
                content: 'was thinking about going for a run',
                from: 'bilel@test.com',
                to: 'john2@doe.com',
                sentAt: new Date(),
            },
            {
                content: 'sounds great ;D',
                from: 'john2@doe.com',
                to: 'bilel@test.com',
                sentAt: new Date(),
            },
        ],
    },
];

export const getChatData = async ({ params }: { params: any }) => {
    return mockChat.find((chat) => chat.email === params.userId);
};
