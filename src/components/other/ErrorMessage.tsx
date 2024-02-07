import { Text, View } from 'react-native';

interface Props {
    message: string;
    showMessage: boolean;
    extraClass?: string;
}

export const ErrorMessage = ({ message, showMessage, extraClass }: Props) => {
    return (
        <View className={`${extraClass}`} style={{ display: showMessage ? undefined : 'none' }} >
            <Text className="text-l text-red font-bold pt-4">
                { message }
            </Text>
        </View>
    )
}

