import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import Feather from '@expo/vector-icons/Feather'
import Entypo from '@expo/vector-icons/Entypo'

interface FormFieldProps {
    title: string;
    // value: { [key: string]: string};
    value: string;
    handleChangeText: (val: string) => void;
    otherStyles?: string;
    keyboardType?: string;
    placeholder?: string;
}

const FormField = (props: FormFieldProps) => {
    const { title, value, handleChangeText, otherStyles, keyboardType, placeholder } = props
    const [ showPassword, setShowpassword ] = useState(false)

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className='text-base text-gray-100'>{ title }</Text>
            <View className='border-2 border-[#222] focus:border-secondary w-full h-16 px-4 bg-[#1F1B2D]
                rounded-2xl items-center flex-row'>
                <TextInput
                    className='flex-1 text-white h-full'
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor='#7b7b8b'
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && showPassword}
                />
                { title === 'Password' &&
                    <TouchableOpacity onPress={() => setShowpassword(!showPassword)}>
                        {
                            !showPassword 
                                ? <Feather name="eye" size={24} color='#666' />
                                : <Entypo name="eye-with-line" size={24} color='#666' />
                        }
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default FormField