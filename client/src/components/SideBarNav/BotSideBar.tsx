import React, { useContext, useState } from 'react';
import { Listbox, ListboxItem, User } from '@nextui-org/react';
import { AuthContext } from '../../contexts/AuthContext';
import ThemeSwitcher from '../general/ThemeSwitcher';
import { logout } from '../../api/collections/auth';
import ErrorModal from '../general/ErrorModal';
import { AxiosError } from 'axios';
import { type ApiError } from '../../api/ApiClient';
import { useNavigate } from 'react-router-dom';
import useDarkMode from 'use-dark-mode';
import { SocketContext } from '../../contexts/SocketContext';

const BotSideBar = () => {
    const { user, setLoggedIn, setUser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

    const navigate = useNavigate();
    const darkMode = useDarkMode(true);

    const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onLogout = async () => {
        try {
            await logout();
            setLoggedIn(false);
            setUser(undefined);
            navigate('/auth');
        } catch (error) {
            setErrorModalOpen(true);
            if (error instanceof AxiosError) {
                const axiosError = error as AxiosError;
                const axiosErrorData = axiosError.response?.data as ApiError;
                setErrorMessage(axiosErrorData.message);
            }
        }
    };

    const onDisconnect = () => {
        socket?.disconnect();
    };

    return (
        <>
            <>
                <Listbox
                    aria-label="Select a chat"
                    onAction={(item) => {
                        console.log(item);
                    }}
                    itemClasses={{
                        base: 'p-3',
                    }}
                >
                    <ListboxItem
                        key="disconnect"
                        textValue={'Disconnect'}
                        color={'danger'}
                        onClick={() => {
                            onDisconnect();
                        }}
                    >
                        <span className={'text-lg'}>Disconnect</span>
                    </ListboxItem>
                    <ListboxItem key="settings" textValue={'Settings'}>
                        <span className={'text-lg'}>Settings</span>
                    </ListboxItem>
                    <ListboxItem
                        key="mode"
                        textValue="Switch dark mode"
                        endContent={<ThemeSwitcher size={'md'} />}
                        onClick={() => {
                            darkMode.toggle();
                        }}
                    >
                        <span className={'text-lg'}>Switch dark mode</span>
                    </ListboxItem>
                    <ListboxItem
                        key="logout"
                        className={'text-danger'}
                        color={'danger'}
                        onPress={() => {
                            void onLogout();
                        }}
                        textValue="Logout"
                        showDivider
                    >
                        <span className={'text-lg'}>Logout</span>
                    </ListboxItem>
                </Listbox>
                <User
                    name={user?.name ?? 'No name'}
                    description={new Date().toISOString() ?? 'No date'}
                    className="p-4"
                />
            </>
            <ErrorModal
                isOpen={errorModalOpen}
                onClose={() => {
                    setErrorModalOpen(false);
                }}
                errorMessage={errorMessage ?? 'No error message'}
            />
        </>
    );
};

export default BotSideBar;
