import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
    return (
        <>
            <StatusBar backgroundColor='#1616122' style='light' />
            <Stack>
                <Stack.Screen
                    name='sign-in'
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='sign-up'
                    options={{
                        headerShown: false
                    }}
                />
            </Stack>
        </>
    )
}

export default AuthLayout