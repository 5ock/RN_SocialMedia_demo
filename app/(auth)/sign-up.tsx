import { useState } from 'react'
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Link, router } from 'expo-router'

import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { createUer } from '@/lib/appwrite'

const SingUp = () => {
    const [ form, setForm ] = useState({
        email: '',
        password: '',
        username: ''
    })
    const [ isSubmitting, setIsSubmitting ] = useState(false)

    const submit = async() => {
        if(!form.username || !form.password || !form.email)
            return Alert.alert('Error', 'Please fill in all the fields')

        setIsSubmitting(true)

        try {
            const result = await createUer(form.email, form.password, form.username)

            router.replace('/home')
        } catch (error: any) {
            Alert.alert('Error', error.message)
        } finally {
            setIsSubmitting(false)
        }
    }
 
    return (
        <SafeAreaView className='bg-primary h-full'>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    <View className='w-full justify-center h-full px-4 my-6'>
                        <Ionicons name="logo-dribbble" size={64} color="white" />
                        <Text className='text-2xl text-white mt-5'>Sign up to Basketball</Text>
                        <FormField
                            title='Username'
                            value={form.username}
                            handleChangeText={(e) => setForm({ ...form, username: e})}
                            otherStyles='mt-10'
                        />
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
                            title='Sign Up'
                            handlePress={submit}
                            containerStyles='mt-7'
                            isLoading={isSubmitting}
                        />
                        <View className='justify-center pt-5 flex-row gap-2'>
                            <Text className='text-lg text-white'>
                                Have an account already?
                            </Text>
                            <Link href='/sign-in' className='text-lg text-secondary'>Sign In</Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SingUp