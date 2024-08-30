import { ReactNode } from 'react'
import { View, Text } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import {  } from '@react-navigation/bottom-tabs'

import { Entypo, FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons'

interface TabIconProps {
    icon: ReactNode;
    name: string;
    color: string;
    focused: boolean;
}

const TabIcon = ({icon, color, name, focused}: TabIconProps) => {
    return (
        <View className='items-center justify-center gap-1'>
            {icon}
            <Text style={{ color: color }}>{ name }</Text>
        </View>
    )
}

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFA001',
                    // tabBarInactiveBackgroundColor: '#CDCDE0',
                    tabBarStyle: {
                        backgroundColor: '#161622',
                        // borderTopWidth: 1,
                        borderTopColor: '#232533',
                        height: 84
                    }
                }}
            >
                <Tabs.Screen
                    name='home'
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={<Entypo name='home' size={24} color={color} />}
                                color={color}
                                name='home'
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name='bookmark'
                    options={{
                        title: 'bookmark',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={<FontAwesome name='bookmark' size={24} color={color} />}
                                color={color}
                                name='Boolmark'
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name='create'
                    options={{
                        title: 'create',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={<AntDesign name='pluscircle' size={24} color={color} />}
                                color={color}
                                name='Create'
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name='profile'
                    options={{
                        title: 'profile',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={<Ionicons name='person' size={24} color={color} />}
                                color={color}
                                name='Profile'
                                focused={focused}
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabsLayout