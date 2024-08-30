import { View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'

const App = () => {
    return (
        <View className='flex-1 items-center justify-center'>
            <Text className='text-3xl'>abcde</Text>
            <StatusBar style='dark' />
            <Link href='/home' style={{ color: 'blue'}}>Go to Profile</Link>
        </View>
    )
}

export default App