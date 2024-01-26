import { Text, View } from 'react-native';

interface Props {
    message: string;
    showMessage: boolean;
}

export const ErrorMessage = ({ message, showMessage }: Props) => {
    return (
        <View style={{ display: showMessage ? undefined : 'none' }} >
            <Text className="text-l text-red font-bold pt-4">
                { message }
            </Text>
        </View>
    )
}

