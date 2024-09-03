import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import EmptyState from '@/components/EmptyState'
import VideoCard from '@/components/VideoCard'
import InfoBox from '@/components/InfoBox'

import useAppwrite from '@/lib/useAppwrite'
import { getUserPosts, signOut } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import { router } from 'expo-router'

const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext()
    const { data: posts } = useAppwrite(() => getUserPosts(user!.$id))

    const logout = async() => {
        await signOut()
        setUser(null)
        setIsLoggedIn(false)

        router.replace('/sign-in')
    }

    return ( 
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={posts}
                keyExtractor={(item: any) => item.$id}
                renderItem={({item}: any) => (<VideoCard video={item} />)}
                ListHeaderComponent={() => (
                    <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
                        <TouchableOpacity
                            className='w-full items-end mb-10'
                            onPress={logout}
                        >
                            <MaterialIcons name='logout' size={24} color='red' />
                        </TouchableOpacity>
                        <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
                            <Image source={{ uri: user?.avatar }}
                                className='w-[90%] h-[90%] rounded-lg'
                                resizeMode='cover'
                            />
                        </View>

                        <InfoBox
                            title={user?.username}
                            containerStyles='mt-5'
                            titleStyles='text-lg'
                        />
                        <View className='flex-row'>
                            <InfoBox
                                title={posts.length || 0}
                                subtitle='Posts'
                                containerStyles='mr-10'
                                titleStyles='text-xl'
                            />
                            <InfoBox
                                title={'1.2k'}
                                subtitle='Followers'
                                titleStyles='text-xl'
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title='No Videos found'
                        subtitle='No videos found for this search query'
                    />
                )}
            />
        </SafeAreaView>
    )
}

export default Profile