import { useState } from 'react'
import { View, Text, FlatList, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'

const Home = () => {
    const [ refreshing, setRefreshing ] = useState(false)

    const onRefresh = async() => {
        setRefreshing(true)
        // re call videos - if any new videos appeard

        setRefreshing(false)
    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={[{id: '1'}, {id: '2'}, {id: '3'}]}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <Text className='text-3xl text-white'>{ item.id }</Text>
                )}
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