import { useState, memo } from 'react'
import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import * as Animatable from 'react-native-animatable'
import { Video, ResizeMode, AVPlaybackStatus  } from 'expo-av'

interface TrendingProps {
    posts: any[]
}

const zoomIn = {
    from: { transform: [{ scale: 0.9 }] },
    to: { transform: [{ scale: 1.1 }] }
}

const zoomOut = {
    from: { transform: [{ scale: 1.1 }] },
    to: { transform: [{ scale: 0.9 }] }
}

const TrendingItem = memo(({ activeItem, item }: any) => {
    const [ play, setPlay ] = useState(false)

    return (
        <Animatable.View
            className='mr-5'
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={200}
        >
            { play
                ? (<Video
                    source={{ uri: item.video }}
                    className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
                        if(status.isLoaded && status.didJustFinish) {
                            console.log(123123213)
                            setPlay(false)
                        }
                    }}
                />)
                : (<TouchableOpacity
                    className='relative justify-center items-center'
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <View>
                        <ImageBackground
                            source={{
                                uri: item.thumbnail
                            }}
                            className='w-52 h-72 my-5 ovweflow-hidden shadow-lg shadow-black/40'
                            imageStyle={{borderRadius: 36}}
                            resizeMode='cover'
                        />
                    </View>
                    <AntDesign 
                        style={{
                            position: 'absolute',
                            alignSelf: 'center'
                        }}
                        name='playcircleo' size={64} color='white' />
                </TouchableOpacity>)
            }
        </Animatable.View>
    )
})


const Trending = (props: TrendingProps) => {
    const { posts } = props
    const [ activeItem, setActiveItem ] = useState(posts[1])

    const viewableItemsChanged = (e:any) => {
        const { viewableItems } = e
        if(viewableItems.length > 0)
            setActiveItem(viewableItems[0].key)
    }

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({item}) => (
                <TrendingItem activeItem={activeItem} item={item} />
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70
            }}
            contentOffset={{ x: 170, y: 0 }}
            horizontal
        />
    )
}

export default Trending