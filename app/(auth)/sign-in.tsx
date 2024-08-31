import { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Link } from 'expo-router'

import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'

const SignIn = () => {
    const [ form, setForm ] = useState({
        email: '',
        password: ''
    })
    const [ isSubmitting, setIsSubmitting ] = useState(false)

    const submit = () => {

    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView>
                <View className='w-full justify-center h-full px-4 my-6'>
                    <Ionicons name="logo-dribbble" size={64} color="white" />
                    <Text className='text-2xl text-white mt-5'>Login in to Basketball</Text>
                    <FormField
                        title='Email'
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e})}
                        otherStyles='mt-7'
                        keyboardType='email-address'
                    />
                    <FormField
                        title='Password'
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e})}
                        otherStyles='mt-7'
                        keyboardType='email-address'
                    />
                    <CustomButton
                        title='Sign In'
                        handlePress={submit}
                        containerStyles='mt-7'
                        isLoading={isSubmitting}
                    />
                    <View className='justify-center pt-5 flex-row gap-2'>
                        <Text className='text-lg text-white'>
                            Don't have account?
                        </Text>
                        <Link href='/sign-up' className='text-lg text-secondary'>Sign Up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn