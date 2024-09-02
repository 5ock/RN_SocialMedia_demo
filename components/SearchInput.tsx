import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import EvilIcons from '@expo/vector-icons/EvilIcons'

interface FormFieldProps {
    value?: string;
    handleChangeText?: (val: string) => void;
}

const SearchInput = (props: FormFieldProps) => {
    const { value, handleChangeText } = props

    return (
        <View className='border-2 border-[#222] focus:border-secondary w-full h-16 px-4 bg-[#1F1B2D]
            rounded-2xl items-center flex-row space-x-4'>
            <TextInput
                className='text-base mt-0.5 text-white flex-1'
                value={value}
                placeholderTextColor='#7b7b8b'
                placeholder='Search for a video topic'
                onChangeText={handleChangeText}
            />
            <TouchableOpacity>
                <EvilIcons name='search' size={30} color='white' />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput