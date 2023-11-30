import React from 'react';
import SendMessageBar from './SendMessageBar';
import ChatMessages from './ChatMessages';
import { type Chat, type Message } from '../../models/Message';
import { useLoaderData } from 'react-router-dom';
const ChatWindow = () => {
    const message = useLoaderData() as Chat;
    let messages: Message[] = [];
    if (message) {
        messages = message.messages;
    }

    return (
        <div className="flex flex-col h-full w-full gap-4">
            <ChatMessages messages={messages} />
            <SendMessageBar />
        </div>
    );
};

export default ChatWindow;
