// Disables eslint for this file
// eslint-disable @typescript-eslint/no-explicit-any
import { type Server, type Socket } from 'socket.io';
import logger from '../utils/logger';

export const listenToSocketEvents = (io: Server, socket: Socket): void => {
    const handleDisconnect = () => {
        logger.debug('user disconnected');
    };

    socket.on(SocketEvents.DISCONNECT, handleDisconnect);
};

export const onConnection = (io: Server) => {
    return (socket: Socket): void => {
        logger.debug('a user connected');
        listenToSocketEvents(io, socket);

        const users: any[] = [];
        const emitUsers = (socket: Socket, users: any[]) => {
            for (const [id, socket] of io.of('/').sockets) {
                users.push({
                    userID: id,
                    username: socket.handshake.auth.email,
                });
            }
            socket.emit(SocketEvents.USERS_ONLINE, users);
            socket.broadcast.emit(SocketEvents.USER_JOINED, {
                userID: socket.id,
                username: socket.handshake.auth.email,
            });
        };
        emitUsers(socket, users);
    };
};
