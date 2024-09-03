import { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Video, ResizeMode } from 'expo-av'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'

import AntDesign from '@expo/vector-icons/AntDesign'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { createVideo } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

type FormState = {
    title: string;
    video: { uri: string } | null;
    thumbnail: { uri: string } | null;
    prompt: string;
}

const Create = () => {
    const { user } = useGlobalContext()
    const [ uploading, setUploading ] = useState(false)
    const [ form, setForm ] = useState<FormState>({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
    })

    const openPicker = async(selectType: string) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: selectType === 'image' 
                    ? ImagePicker.MediaTypeOptions.Images
                    : ImagePicker.MediaTypeOptions.Videos,
            aspect: [4, 3],
            quality: 1
        })
        // const result = await DocumentPicker.getDocumentAsync({
        //     type: selectType === 'image'
        //         ? ['image/png', 'image/jpg', 'image/jpeg']
        //         : ['video/mp4', 'video/gif']
        // })

        if(!result.canceled) {
            if(selectType === 'image')
                setForm({ ...form, thumbnail: result.assets[0]})
            
            if(selectType === 'video')
                setForm({ ...form, video: result.assets[0]})
        }
    }

    const submit = async() => {
        if(!form.prompt || !form.title || !form.thumbnail || !form.video)
            return Alert.alert('Please fill in all the fields')

        setUploading(true)

        try {
            await createVideo({
                ...form, userId: user.$id
            })

            Alert.alert('Success', 'Post uploaded successfully')
            router.push('/home')
        } catch (error: any) {
            Alert.alert('Error', error.message)
            throw new Error(error)
        } finally {
            setForm({
                title: '',
                video: null,
                thumbnail:null,
                prompt: ''
            })
            setUploading(false)
        }
    }

    return (
        <SafeAreaView className='bg-primary h-full' >
            <ScrollView className='px-4 my-6' >
                <Text className='text-2xl text-white'>Create</Text>
                <FormField
                    title='Video Title'
                    value={form.title}
                    placeholder='Give your video a catch title...'
                    handleChangeText={(e) => setForm({... form, title: e})}
                    otherStyles='mt-10'
                />
                <View className='mt-7 space-y-2'>
                    <Text className='text-base text-gray-100'>
                        Upload Video
                    </Text>
                    <TouchableOpacity
                        onPress={() => openPicker('video')}
                    >
                        { form.video 
                            ? (
                                <Video
                                    source={{ uri: form.video.uri }}
                                    className='w-full h-64 rounded-2xl'
                                    // useNativeControls
                                    resizeMode={ResizeMode.COVER}
                                    // isLooping
                                />
                            )
                            : (
                                <View className='w-full h-40 px-4 bg-[#1F1B2D] rounded-2xl justify-center items-center'>
                                    <View className='w-14 h-14 border border-dashed border-secondary justify-center items-center'>
                                        <AntDesign name='upload' size={24} color='white' />
                                    </View>
                                </View>
                            )
                        
                        }
                    </TouchableOpacity>
                </View>
                <View className='mt-7 space-y-2'>
                    <Text className='text-base text-gray-100'>
                        Thumbnail Image
                    </Text>
                    <TouchableOpacity
                        onPress={() => openPicker('image')}
                    >
                        { form.thumbnail 
                            ? (
                                <Image
                                    source={{ uri: form.thumbnail.uri }}
                                    resizeMode='cover'
                                    className='w-full h-64 rounded-2xl'
                                />
                            )
                            : (
                                <View className='w-full h-16 px-4 bg-[#1F1B2D] rounded-2xl justify-center items-center flex-row'>
                                    <AntDesign name='upload' size={24} color='white' />
                                    <Text className='text-sm text-gray-100 ml-2'>Choose a file</Text>
                                </View>
                            )
                        
                        }
                    </TouchableOpacity>
                </View>
                <FormField
                    title='AI Prompt'
                    value={form.prompt}
                    placeholder='The prompt you used to create this video'
                    handleChangeText={(e) => setForm({... form, prompt: e})}
                    otherStyles='mt-7'
                />
                <CustomButton
                    title='Submit & Publish'
                    handlePress={submit}
                    containerStyles='mt-7'
                    isLoading={uploading}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Create