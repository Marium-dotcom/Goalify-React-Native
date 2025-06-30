// app/(auth)/forgot-password.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, router } from 'expo-router';
import { useAuth } from '@/lib/auth-context';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { forgotPassword } = useAuth();

  const handleForgot = async () => {
    if (!email) {
      setError('Email is required.');
      return;
    }

    try {
      await forgotPassword(email);
      setSuccess(true);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        className="flex-1 bg-dark-900 items-center justify-center px-6"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text className="text-white text-2xl font-bold mb-6">Forgot Password</Text>

        {success ? (
          <Text className="text-emerald-400 text-center mb-6">
            Password reset email sent! Check your inbox.
          </Text>
        ) : (
          <>
            {error && (
              <Text className="text-red-400 mb-4 text-center">{error}</Text>
            )}
            <TextInput
              className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-4 text-white text-base w-full mb-4"
              placeholder="Enter your email"
              placeholderTextColor="#64748B"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TouchableOpacity
              className="bg-indigo-600 px-6 py-4 rounded-xl w-full items-center"
              onPress={handleForgot}
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold">Send Reset Email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-4"
              onPress={() => router.replace('/auth')}
            >
              <Text className="text-indigo-400 underline">Back to Login</Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </>
  );
}
