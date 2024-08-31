import { View, Text, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'

import CustomButton from '@/components/CustomButton'

const App = () => {
    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView
                contentContainerStyle={{
                    height: '100%'
                }}
            >
                <View className='w-full justify-center items-center h-full px-4'>
                    <View className='items-center'>
                        <Ionicons name="logo-dribbble" size={64} color="white" />
                        <Text className='text-white text-2xl'>Basketball</Text>
                    </View>
                    <CustomButton
                        title='Continue with Email'
                        handlePress={() => router.push('/sign-in')}
                        containerStyles='w-full mt-7'
                    />
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style='light' />
        </SafeAreaView>
    )
}

export default App