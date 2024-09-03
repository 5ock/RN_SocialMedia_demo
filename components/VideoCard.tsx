import { useState } from 'react'
import { View, Text, Image, TouchableOpacity} from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import AntDesign from '@expo/vector-icons/AntDesign'

interface CreatorTypes {
    username: string;
    avatar: string;
}

interface VideoTypes {
    title: string;
    thumbnail: string;
    video: string;
    creator: CreatorTypes;
}

interface VideoCardProps {
    video: VideoTypes
}

const VideoCard = (props: VideoCardProps) => {
    const { video: { title, thumbnail, video, creator: { username, avatar }} } = props

    const [ play, setPlay ] = useState(false)

    return (
        <View className='flex-col items-center px-4 mb-14'>
            <View className='flex-row gap-3 items-start'>
                <View className='justify-center items-center flex-row flex-1'>
                    <View className='w-[46px] h-[46px] rounded-lg border border-secondary 
                        justify-center items-center p-0.5'
                    >
                        <Image source={{ uri: avatar}} 
                            className='w-full h-full rounded-lg'
                            resizeMode='cover'
                        />
                    </View>
                    <View className='justify-center flex-1 ml-3 gap-y-1'>
                        <Text className='text-white text-sm'
                            numberOfLines={1}
                        >
                            { title }
                        </Text>
                        <Text className='text-xs text-gray-100'>
                            { username }
                        </Text>
                    </View>
                </View>
                <View className='pt-2'>
                    <Feather name='menu' size={24} color='white' />
                </View>
            </View>

            { play 
                ? (<Text className='text-white'>Playing</Text>)
                : (<TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
                >
                    <Image source={{ uri: thumbnail }}
                        className='w-full h-full rounded-xl mt-3'
                        resizeMode='cover'
                    />
                    <AntDesign 
                        style={{
                            position: 'absolute',
                            alignSelf: 'center'
                        }}
                        name='playcircleo' size={64} color='white' />
                </TouchableOpacity>)
            }
        </View>
    )
}

export default VideoCard