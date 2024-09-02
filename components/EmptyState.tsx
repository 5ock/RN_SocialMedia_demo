import { View, Text } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

interface EmptyStateProps {
    title: string;
    subtitle: string;
}

const EmptyState = (props: EmptyStateProps) => {
    const { title, subtitle } = props

    return (
        <View className='justify-center items-center px-4'>
            <MaterialIcons name='search-off' size={64} color='white' />
            <Text className='text-2xl text-white'>{ title }</Text>
            <Text className='text-sm text-gray-100'>{ subtitle }</Text>

            <CustomButton
                title='Create video'
                handlePress={() => router.push('/create')}
                containerStyles='w-full my-5'
            />
        </View>
    )
}

export default EmptyState