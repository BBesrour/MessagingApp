// Disables eslint for this file
// eslint-disable @typescript-eslint/no-explicit-any
import { type Server, type Socket } from 'socket.io';
import logger from '../utils/logger';
import { SocketEvents } from '../socketEvents';

export const listenToSocketEvents = (io: Server, socket: Socket): void => {
    const handleDisconnect = () => {
        logger.debug('user disconnected');
        io.emit(SocketEvents.USER_LEFT, {
            userId: socket.id,
            username: socket.handshake.auth.email,
        });
    };

    const handleMessage = (data: { content: string; to: string }) => {
        // TODO: Fix this, remove inline type
        logger.debug(
            `Emitting ${SocketEvents.MESSAGE}`,
            data,
            socket.id,
            socket.handshake.auth.email,
        );
        io.to(data.to).emit(SocketEvents.MESSAGE, {
            // TODO: Fix this, remove inline type
            content: data.content,
            from: socket.id,
            fromEmail: socket.handshake.auth.email,
        });
    };

    socket.on(SocketEvents.DISCONNECT, handleDisconnect);
    socket.on(SocketEvents.MESSAGE, handleMessage);
};

export const onConnection = (io: Server) => {
    return (socket: Socket): void => {
        logger.debug('a user connected');
        listenToSocketEvents(io, socket);

        const users: any[] = [];
        const emitUsers = (socket: Socket, users: any[]) => {
            for (const [id, socket] of io.of('/').sockets) {
                users.push({
                    userId: id,
                    username: socket.handshake.auth.email,
                });
            }
            logger.debug(`Emitting ${SocketEvents.USERS_ONLINE}`, users);
            socket.emit(SocketEvents.USERS_ONLINE, users);
            socket.broadcast.emit(SocketEvents.USER_JOINED, {
                userId: socket.id,
                username: socket.handshake.auth.email,
            });
        };
        emitUsers(socket, users);
    };
};
