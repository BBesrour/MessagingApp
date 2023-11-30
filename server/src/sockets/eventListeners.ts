import { type Server, type Socket } from 'socket.io';
import logger from '../utils/logger';

export const listenToSocketEvents = (io: Server, socket: Socket): void => {
    const handleDisconnect = () => {
        logger.debug('user disconnected');
    };

    socket.on('disconnect', handleDisconnect);
};

export const onConnection =
    (io: Server) =>
        (socket: Socket): void => {
            logger.debug('a user connected');
            logger.debug('socket', socket);
            listenToSocketEvents(io, socket);

            const users: any[] = [];
            const emitUsers = (socket: Socket, users: any[]) => {
                for (const [id, socket] of io.of('/').sockets) {
                    users.push({
                        userID: id,
                        username: socket.handshake.auth.email,
                    });
                }
                socket.emit('users', users);
                socket.broadcast.emit('user connected', {
                    userID: socket.id,
                    username: socket.handshake.auth.email,
                });
            };
            emitUsers(socket, users);
        };
