import React, { useContext } from 'react';
import { Button, Textarea } from '@nextui-org/react';
import { FiSend } from 'react-icons/fi';
import { SocketContext } from '../../contexts/SocketContext';

const SendMessageBar = () => {
    const [message, setMessage] = React.useState<string>('');
    const { socket } = useContext(SocketContext);

    const sendMessage = () => {
        if (message) {
            socket?.emit('message', message);
            setMessage('');
        }
    };

    return (
        <div className="flex flex-grow-0 gap-4">
            <Textarea
                minRows={1}
                maxRows={3}
                classNames={{
                    label: 'h-0 p-0',
                    helperWrapper: 'h-0 p-0',
                }}
                variant="bordered"
                placeholder="Enter your message here"
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                }}
            />
            <Button
                isIconOnly
                color="primary"
                variant="solid"
                aria-label="Take a photo"
                className="h-full"
                onClick={sendMessage}
            >
                <FiSend />
            </Button>
        </div>
    );
};

export default SendMessageBar;
