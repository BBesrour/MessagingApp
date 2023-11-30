import React, { useCallback, useContext, useEffect } from 'react';
import ChatBubble, { type ChatBubbleProps } from './MessageBubble';
import { ScrollShadow } from '@nextui-org/react';
import { type Message } from '../../models/Message';
import { AuthContext } from '../../contexts/AuthContext';
import { type User } from '../../models/User';
import { SocketContext } from '../../contexts/SocketContext';
import { SocketEvents } from '../../socketEvents';

interface ChatMessagesProps {
    messages: Message[];
}

const ChatMessages = (props: ChatMessagesProps) => {
    const { user } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

    const [messages, setMessages] = React.useState<Message[]>(props.messages);

    const handleNewMessage = useCallback(
        (message: { content: string; from: string; fromEmail: string }) => {
            console.log(message);
            const newMessage: Message = {
                to: user?.email,
                sentAt: new Date(),
                from: message.fromEmail,
                content: message.content,
            };
            setMessages((messages) => [...messages, newMessage]);
        },
        [],
    );

    useEffect(() => {
        if (socket) {
            socket.on(SocketEvents.MESSAGE, handleNewMessage);
        }

        return () => {
            if (socket) {
                socket.off(SocketEvents.MESSAGE);
            }
        };
    }, [socket]);

    return (
        <ScrollShadow className="h-full">
            <div className="flex-grow">
                {messagesGrouper(messages, user).map((message, index) => {
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

const messagesGrouper = (
    messages: Message[],
    user?: User,
): ChatBubbleProps[] => {
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
                if (currentGroup.messages.length > 0) {
                    groupedMessages.push(currentGroup);
                }
                currentGroup = {
                    side: 'right',
                    avatar: '',
                    messages: [],
                };
            }
            currentGroup.messages.push(message?.content);
        } else {
            if (currentGroup.side === 'right') {
                if (currentGroup.messages.length > 0) {
                    groupedMessages.push(currentGroup);
                }
                currentGroup = {
                    side: 'left',
                    avatar: '',
                    messages: [],
                };
            }
            currentGroup.messages.push(message?.content);
        }
    }
    groupedMessages.push(currentGroup);
    return groupedMessages;
};
