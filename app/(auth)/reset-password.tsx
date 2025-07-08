import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { account } from '@/lib/appwrite';

export default function ResetPassword() {
  const router = useRouter();
  const { userId, secret } = useLocalSearchParams(); // Get from URL
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = async () => {
    if (!password || !confirm) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await account.updateRecovery(userId as string, secret as string, password);
      setSuccess(true);
      setError(null);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong.');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        className="flex-1 bg-dark-900 items-center justify-center px-6"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text className="text-white text-2xl font-bold mb-6">Reset Password</Text>

        {success ? (
          <>
            <Text className="text-emerald-400 text-center mb-6">
              Your password has been reset successfully!
            </Text>
            <TouchableOpacity onPress={() => router.replace('/auth')}>
              <Text className="text-indigo-400 underline">Go to Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {error && <Text className="text-red-400 mb-4 text-center">{error}</Text>}

            <TextInput
              className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-4 text-white text-base w-full mb-4"
              placeholder="New Password"
              placeholderTextColor="#64748B"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TextInput
              className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-4 text-white text-base w-full mb-4"
              placeholder="Confirm Password"
              placeholderTextColor="#64748B"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
            />

            <TouchableOpacity
className='bg-blue-600 px-6 py-2 rounded mb-4 w-64 items-center'                   onPress={handleReset}
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold">Reset Password</Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </>
  );
}
