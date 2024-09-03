import { useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'
import VideoCard from '@/components/VideoCard'

import useAppwrite from '@/lib/useAppwrite'
import { searchPosts } from '@/lib/appwrite'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
    const { query } = useLocalSearchParams()
    const { data: posts, refetch } = useAppwrite(() => searchPosts(query as string))

    useEffect(() => {
        refetch()
    }, [query])

    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={posts}
                keyExtractor={(item: any) => item.$id}
                renderItem={({item}: any) => (<VideoCard video={item} />)}
                ListHeaderComponent={() => {
                    return (
                        <View className='my-6 px-4'>
                            <Text className='text-sm text-gray-100'>Search results</Text>
                            <Text className='text-2xl text-white'>{ query }</Text>
                            <View className='mt-6 mb-8'>
                                <SearchInput initialQuery={query} />
                            </View>
                        </View>
                    )
                }}
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

export default Search