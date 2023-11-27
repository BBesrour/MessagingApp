import io, { type Socket } from 'socket.io-client'; // Add this

export interface SocketContextType {
    socket: Socket;
}

export const initSocket = (email: string) => {
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
