import { View, Text, FlatList } from 'react-native'

interface PostTypes {
    id: string | number;
}

interface TrendingProps {
    posts: PostTypes[]
}

const Trending = (props: TrendingProps) => {
    const { posts } = props

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <Text className='text-3xl text-white'>{ item.id }</Text>
            )}
            horizontal
        />
    )
}

export default Trending