import { useState, useEffect } from 'react'
import { View, Text, FlatList, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'

import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import VideoCard from '@/components/VideoCard'

import useAppwrite from '@/lib/useAppwrite'
import { getAllPosts } from '@/lib/appwrite'

const Home = () => {
    const [ refreshing, setRefreshing ] = useState(false)
    const { data: posts, refetch } = useAppwrite(getAllPosts)

    const onRefresh = async() => {
        setRefreshing(true)
        await refetch()
        setRefreshing(false)
    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={posts}
                keyExtractor={(item: any) => item.title}
                renderItem={({item}: any) => (<VideoCard video={item} />)}
                ListHeaderComponent={() => {
                    return (
                        <View className='my-6 px-4 space-y-6'>
                            <View className='justify-between items-start flex-row mb-6'>
                                <View>
                                    <Text className='text-sm text-gray-100'>Welcom back</Text>
                                    <Text className='text-2xl text-white'>Mastery</Text>
                                </View>
                                <View className='mt-1.5'>
                                    <Ionicons name="logo-dribbble" size={48} color="white" />
                                </View>
                            </View>
                            <SearchInput />

                            <View className='w-full flex-1 pt-5 pb-8'>
                                <Text className='text-gray-100 text-lg mb-3'>
                                    Latest Videos
                                </Text>
                                <Trending posts={[{id: 1}, {id: 2}, {id: 3}] ?? []} />
                            </View>
                        </View>
                    )
                }}
                ListEmptyComponent={() => (
                    <EmptyState
                        title='No Videos found'
                        subtitle='Be the first one to upload a video'
                    />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    )
}

export default Home