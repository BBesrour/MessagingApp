import React, { useEffect } from 'react';
import SendMessageBar from './SendMessageBar';
import ChatMessages from './ChatMessages';
import { type Message } from '../../models/Message';

const mockChat = [
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
];

const Chat = () => {
    const [messages, setMessages] = React.useState<Message[]>([]);

    useEffect(() => {
        setMessages(mockChat[0].messages);
    }, []);

    return (
        <div className="flex flex-col h-full w-full gap-4">
            <ChatMessages messages={messages} />
            <SendMessageBar />
        </div>
    );
};

export default Chat;
