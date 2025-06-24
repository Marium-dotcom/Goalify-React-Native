import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, useColorScheme } from 'react-native';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
    } else {
      Alert.alert('Success', `Logged in as ${email}`);
    }
  };

  return (
    <View
      className={`flex-1 justify-center px-6 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}
    >
      <Text
        className={`text-2xl font-bold text-center mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
      >
        Login
      </Text>

      <Text className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        placeholderTextColor={isDark ? '#bbb' : '#666'}
        keyboardType="email-address"
        autoCapitalize="none"
        className={`border rounded-lg px-4 py-2 mb-4 ${isDark ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
      />

      <Text className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        placeholderTextColor={isDark ? '#bbb' : '#666'}
        secureTextEntry
        className={`border rounded-lg px-4 py-2 mb-6 ${isDark ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        className={`rounded-lg py-3 items-center ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`}
      >
        <Text className="text-white font-semibold">Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
