import { View, Text } from 'react-native'

interface InfoBoxProps {
    title: string | number;
    subtitle?: string;
    containerStyles?: string;
    titleStyles?: string;
}

const InfoBox = (props: InfoBoxProps) => {
    const { title, subtitle, containerStyles, titleStyles } = props;

    return (
        <View className={containerStyles}>
            <Text className={`text-white text-center ${titleStyles}`}>{ title }</Text>
            <Text className='text-sm text-gray-100 text-center'>{ subtitle }</Text>
        </View>
    )
}

export default InfoBox