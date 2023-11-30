import React from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';
import UserPreview from './UserPreview';
import { SocketContext } from '../../contexts/SocketContext';

type ChatUser = Array<{ userId: string; username: string }>;
const TopSideBar = () => {
    const { socket } = React.useContext(SocketContext);
    const [chatUsers, setChatUsers] = React.useState<ChatUser>([]);

    React.useEffect(() => {
        socket?.on(SocketEvents.USERS_ONLINE, (users) => {
            console.log(users);
            setChatUsers(users);
        });
    }, [socket]);

    return (
        <Listbox
            aria-label="Select a chat"
            onAction={(item) => {
                console.log(item);
            }}
            itemClasses={{
                base: 'text-lg p-3',
            }}
        >
            {chatUsers.map((user) => {
                return (
                    <ListboxItem key={user.userId}>
                        <UserPreview
                            userId={user.userId}
                            username={user.username}
                        />{' '}
                        {/* TODO: Change this to use UserPreviewProps */}
                    </ListboxItem>
                );
            })}
        </Listbox>
    );
};

export default TopSideBar;
