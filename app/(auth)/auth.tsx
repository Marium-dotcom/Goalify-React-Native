import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { router, Stack } from 'expo-router'
import { useAuth } from '@/lib/auth-context'

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const {signIn , signUp, user} =  useAuth()
  
  const handleError = (message: string) => {
    setError(message)
    setTimeout(() => setError(null), 3000)
  }

  const handleAuth = async () => {
    if (!email || !password) {
      handleError('Email and password are required.')
      return
    }

    if (password.length < 6) {
      handleError('Password must be at least 6 characters long.')
      return
    }
    try {
      if (isSignUp) {
        await signUp(email, password)
      } else {
        await signIn(email, password)
        router.push('/') // Nav
        // igate to the home screen after successful sign-in

      }
    } catch (error) {
      if (error instanceof Error) {
        handleError(error.message)
      } else {
        handleError('An unexpected error occurred.')
      }
      return
    }
    // Clear input fields on success
    setEmail('')
    setPassword('')
    setError(null)


    
    // Handle sign-in/sign-up logic here
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className='bg-black h-screen w-screen items-center justify-center'>
        <Text className='text-blue-200 text-2xl mb-6'>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
        {error && (
          <Text className='text-red-400 mb-2'>{error}</Text>
        )}
        <TextInput
          className='bg-gray-800 text-white px-4 py-2 rounded mb-4 w-64'
          placeholder='Email'
          placeholderTextColor='#aaa'
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
        />
        {isSignUp && (
          <>
            <TextInput
              className='bg-gray-800 text-white px-4 py-2 rounded mb-4 w-64'
              placeholder='First Name'
              placeholderTextColor='#aaa'
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              className='bg-gray-800 text-white px-4 py-2 rounded mb-4 w-64'
              placeholder='Last Name'
              placeholderTextColor='#aaa'
              value={lastName}
              onChangeText={setLastName}
            />
          </>
        )}
        <TextInput
          className='bg-gray-800 text-white px-4 py-2 rounded mb-4 w-64'
          placeholder='Password'
          placeholderTextColor='#aaa'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity className='bg-blue-600 px-6 py-2 rounded mb-4 w-64 items-center' onPress={handleAuth}>
          <Text className='text-white font-bold'>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
        </TouchableOpacity>
    {!isSignUp && (
  <>
    <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
      <Text className='text-blue-400 underline mb-4'>Forgot Password?</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setIsSignUp(true)}>
      <Text className='text-blue-300'>
        Don’t have an account? <Text className='underline'>Sign up</Text>
      </Text>
    </TouchableOpacity>
  </>
)}

        {isSignUp && (
          <TouchableOpacity onPress={() => setIsSignUp(false)}>
            <Text className='text-blue-300'>Already have an account? <Text className='underline'>Sign in</Text></Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  )
}