import { TouchableOpacity, Text } from 'react-native'


interface ButtonProps {
    title: string;
    handlePress: () => void;
    containerStyles?: string;
    textStyles?: string;
    isLoading?: boolean;
}

const CustomButton = (props: ButtonProps) => {
    const { title, handlePress, containerStyles, textStyles, isLoading } = props

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center
                ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}
        >
            <Text className={`text-primary text-lg ${textStyles}`}>{ title }</Text>
        </TouchableOpacity>
    )
}

export default CustomButton