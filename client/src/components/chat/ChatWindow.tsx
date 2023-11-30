import React from 'react';
import SendMessageBar from './SendMessageBar';
import ChatMessages from './ChatMessages';
import { type Chat } from '../../models/Message';
import { useLoaderData } from 'react-router-dom';
const ChatWindow = () => {
    const message = useLoaderData() as Chat;

    return (
        <div className="flex flex-col h-full w-full gap-4">
            <ChatMessages messages={message.messages} />
            <SendMessageBar />
        </div>
    );
};

export default ChatWindow;
