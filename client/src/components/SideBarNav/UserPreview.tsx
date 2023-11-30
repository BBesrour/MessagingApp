import React from 'react';
import { User as UserNextUI } from '@nextui-org/react';
import { type User } from '../../models/User';

export interface UserPreviewProps {
    user: User;
}

// TODO: Remove this
export interface UserPreviewPropsTemp {
    username: string;
    userId: string;
}

const UserPreview = (props: UserPreviewPropsTemp) => {
    return (
        <UserNextUI
            name={props.username}
            description={props.userId ?? 'No date'}
        />
    );
};

export default UserPreview;
