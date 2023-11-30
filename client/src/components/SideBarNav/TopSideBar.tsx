import React from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';
import UserPreview from './UserPreview';

const mockChat = [
    { email: 'john1@doe.com' },
    { email: 'john2@doe.com' },
    { email: 'john3@doe.com' },
];

const TopSideBar = () => {
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
            {mockChat.map((user) => {
                return (
                    <ListboxItem key={user.email}>
                        <UserPreview user={user} />
                    </ListboxItem>
                );
            })}
        </Listbox>
    );
};

export default TopSideBar;
