import React, { useEffect } from 'react';
import io, { type Socket } from 'socket.io-client';
import { createContext, type ReactNode } from 'react';
import { AuthContext } from './AuthContext'; // Add this

export interface SocketContextState {
    socket?: Socket;
    setSocket?: (socket: Socket) => void;
}

const initializeSocket = (email: string) => {
    const socket = io('http://localhost:3000', { autoConnect: false });
    socket.auth = { email };
    socket.connect();

    socket.on('connect_error', (err) => {
        if (err.message === 'invalid username') {
            console.log('invalid username');
        }
    });

    socket.on('user connected', (user) => {
        console.log('user connected', user);
    });

    socket.onAny((event, ...args) => {
        console.log(event, args);
    });
    return socket;
};

export const SocketContext = createContext<SocketContextState>({});

export const SocketContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [socket, setSocket] = React.useState<Socket>();
    const { user } = React.useContext(AuthContext);

    useEffect(() => {
        if (user?.email) {
            const initialSocket = initializeSocket(user.email);
            setSocket(initialSocket);
        }

        return () => {
            socket?.disconnect();
        };
    }, [user]);

    return (
        <SocketContext.Provider
            value={{
                socket,
                setSocket,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
