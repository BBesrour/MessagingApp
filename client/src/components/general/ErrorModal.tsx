import React from 'react';
import {
    Modal,
    ModalBody,
    Button,
    ModalFooter,
    ModalContent,
    ModalHeader,
} from '@nextui-org/react';

interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    errorMessage: string;
}

function ErrorModal(props: ErrorModalProps) {
    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalContent>
                    <ModalHeader>
                        <h2 className="text-red-600">Error</h2>
                    </ModalHeader>
                    <ModalBody>
                        <p className={'text-foreground'}>
                            {props.errorMessage}
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={props.onClose} color="danger">
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ErrorModal;
