import { Text, View } from "react-native";

interface Props {
    place: number;
    username: string;
    score: number;
    extraClass?: string;
}

export const ScoreCard = ({ place, username, score, extraClass }: Props) => {
    return (
        <View 
            className={ `w-5/6 items-center bg-white 
            rounded-2xl p-2 border-2 border-slate-200 mt-4 ${extraClass}` }
        >
            <View className="flex-row space-x-16">
                <Text 
                    className={
                        `${ place === 1 ? 'text-amber-400' : place === 2 ? 
                        'text-dark-gray' : place === 3 ? 'text-orange' : 'text-black'} text-xl 
                        tracking-widest font-bold`
                    }
                >
                    { place }°
                </Text>
                <Text className="text-black text-xl tracking-widest">
                    { username }
                </Text>
                <Text className="text-black text-xl tracking-widest">
                    { score }
                </Text>
            </View>
            
        </View>
    );
}

