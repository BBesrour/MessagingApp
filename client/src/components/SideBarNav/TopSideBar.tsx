import React, { useCallback } from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';
import UserPreview from './UserPreview';
import { SocketContext } from '../../contexts/SocketContext';
import { SocketEvents } from '../../socketEvents';
import { Link } from 'react-router-dom';

interface ChatUser {
    userId: string;
    username: string;
}
const TopSideBar = () => {
    const { socket, setSelectedChat } = React.useContext(SocketContext);
    const [chatUsers, setChatUsers] = React.useState<ChatUser[]>([]);

    const handleUsersOnline = useCallback((users: ChatUser[]) => {
        setChatUsers(users);
    }, []);

    const handleUserJoined = useCallback((user: ChatUser) => {
        setChatUsers((users) => [...users, user]);
    }, []);

    const handleUserLeft = useCallback((user: ChatUser) => {
        setChatUsers((users) => users.filter((u) => u.userId !== user.userId));
    }, []);

    React.useEffect(() => {
        if (socket) {
            socket.on(SocketEvents.USERS_ONLINE, handleUsersOnline);
            socket.on(SocketEvents.USER_JOINED, handleUserJoined);
            socket.on(SocketEvents.USER_LEFT, handleUserLeft);

            // Clean up the event listener when the component unmounts
            return () => {
                socket.off(SocketEvents.USERS_ONLINE, handleUsersOnline);
                socket.off(SocketEvents.USER_JOINED, handleUserJoined);
                socket.off(SocketEvents.USER_LEFT, handleUserLeft);
            };
        }
    }, [socket, handleUsersOnline]);

    return (
        <Listbox
            aria-label="Select a chat"
            onAction={(item) => {
                setSelectedChat(item.toString());
            }}
            itemClasses={{
                base: 'text-lg p-3',
            }}
        >
            {chatUsers.map((user) => {
                return (
                    <ListboxItem key={user.userId} textValue={user.username}>
                        <Link to={`/chat/${user.username}`}>
                            <UserPreview
                                userId={user.userId}
                                username={user.username}
                            />
                        </Link>
                        {/* TODO: Change this to use UserPreviewProps */}
                    </ListboxItem>
                );
            })}
        </Listbox>
    );
};

export default TopSideBar;
