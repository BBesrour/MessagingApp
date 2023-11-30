import { type Socket } from 'socket.io';

export const socketAuthMiddleware = (socket: Socket, next: any) => {
    const email = socket.handshake.auth.email;
    if (!email) {
        next(new Error('invalid email'));
        return;
    }
    console.log('email', email);
    next();
};
