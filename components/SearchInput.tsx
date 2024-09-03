import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import { router, usePathname } from 'expo-router'

interface FormFieldProps {
    value?: string;
    handleChangeText?: (val: string) => void;
    initialQuery?: string | string[];
}

const SearchInput = (props: FormFieldProps) => {
    const { value, handleChangeText, initialQuery } = props
    const pathname = usePathname()

    const [ query, setQuery ] = useState(initialQuery as string || '')

    return (
        <View className='border-2 border-[#222] focus:border-secondary w-full h-16 px-4 bg-[#1F1B2D]
            rounded-2xl items-center flex-row space-x-4'>
            <TextInput
                className='text-base mt-0.5 text-white flex-1'
                value={query}
                placeholder='Search for a video topic'
                placeholderTextColor='#CDCDE0'
                onChangeText={(e) => setQuery(e)}
            />
            <TouchableOpacity
                onPress={() => {
                    if(!query)
                        return Alert.alert('Missing query', 'Please input something to search results acroos database')

                    if(pathname.startsWith('/search'))
                        router.setParams({ query})
                    else
                        router.push(`/search/${query}`)
                }}
            >
                <EvilIcons name='search' size={30} color='white' />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput