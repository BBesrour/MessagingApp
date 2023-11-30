import React, { useContext } from 'react';
import ChatBubble, { type ChatBubbleProps } from './MessageBubble';
import { ScrollShadow } from '@nextui-org/react';
import { type Message } from '../../models/Message';
import { AuthContext } from '../../contexts/AuthContext';

interface ChatMessagesProps {
    messages: Message[];
}

const ChatMessages = (props: ChatMessagesProps) => {
    const { user } = useContext(AuthContext);

    const messagesGrouper = (messages: Message[]): ChatBubbleProps[] => {
        const groupedMessages: ChatBubbleProps[] = [];
        let currentGroup: ChatBubbleProps = {
            side: 'left',
            avatar: '',
            messages: [],
        };
        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            if (!message.content) {
                continue;
            }
            if (message.from === user?.email) {
                if (currentGroup.side === 'left') {
                    groupedMessages.push(currentGroup);
                    currentGroup = {
                        side: 'right',
                        avatar: '',
                        messages: [],
                    };
                }
                currentGroup.messages.push(message?.content);
            } else {
                if (currentGroup.side === 'right') {
                    groupedMessages.push(currentGroup);
                    currentGroup = {
                        side: 'left',
                        avatar: '',
                        messages: [],
                    };
                }
                currentGroup.messages.push(message.content);
            }
        }
        groupedMessages.push(currentGroup);
        return groupedMessages;
    };

    return (
        <ScrollShadow className="h-full">
            <div className="flex-grow">
                {messagesGrouper(props.messages).map((message, index) => {
                    return (
                        <ChatBubble
                            key={index}
                            side={message.side}
                            avatar={message.avatar}
                            messages={message.messages}
                        />
                    );
                })}
            </div>
        </ScrollShadow>
    );
};

export default ChatMessages;
