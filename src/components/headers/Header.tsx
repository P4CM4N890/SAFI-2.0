import React from 'react';
import { Text, View } from 'react-native';

import { UserImageButton } from '../buttons/UserImageButton';
import { NotificationsButton } from '../buttons/NotificationsButton';

interface Props {
    title: string;
    extraClass?: string;
}

export const Header = ({ title, extraClass }: Props) => {
    return (
        <View className='w-full'>
            <View className='w-full flex-row justify-between'>
                <UserImageButton />
                <NotificationsButton />
            </View>

            <Text className={`text-black text-xl text-center font-bold uppercase ${ extraClass }`}>{ title }</Text>
        </View>
    );
}