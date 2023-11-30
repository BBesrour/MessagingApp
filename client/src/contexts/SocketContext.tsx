import React, { useEffect } from 'react';
import io, { type Socket } from 'socket.io-client';
import { createContext, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { SocketEvents } from '../socketEvents';

export interface SocketContextState {
    socket?: Socket;
    setSocket?: (socket: Socket) => void;
    selectedChat: string;
    setSelectedChat: (setSelectedChat: string) => void;
}

const initializeSocket = (email: string) => {
    const socket = io('http://localhost:3000', { autoConnect: false });
    socket.auth = { email };
    socket.connect();

    socket.on(SocketEvents.ERROR, (err: any) => {
        if (err.message === 'invalid username') {
            console.log('invalid username');
        }
    });

    // socket.onAny((event, ...args) => {
    //     console.log(event, args);
    // });
    return socket;
};

export const SocketContext = createContext<SocketContextState>({
    selectedChat: '',
    setSelectedChat: () => {},
});

export const SocketContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [socket, setSocket] = React.useState<Socket>();
    const { user } = React.useContext(AuthContext);
    const [selectedChat, setSelectedChat] = React.useState<string>('');

    useEffect(() => {
        let initialSocket: Socket;
        if (user?.email) {
            initialSocket = initializeSocket(user.email);
            setSocket(initialSocket);
        }

        return () => {
            if (initialSocket) {
                initialSocket.disconnect();
            }
            setSocket(initialSocket);
        };
    }, [user]);

    return (
        <SocketContext.Provider
            value={{
                socket,
                setSocket,
                selectedChat,
                setSelectedChat,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
