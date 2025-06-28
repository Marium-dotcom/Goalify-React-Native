import { useAuth } from '@/lib/auth-context';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function ProfilePage() {
  const { signOut, user } = useAuth();
  const userName = user?.name || user?.email || 'User';
  const userEmail = user?.email || 'No email';
  const userId = user?.$id || 'N/A';

  return (
    <View className="flex-1 bg-[#181A20] justify-center items-center p-6">
      <View className="items-center mb-8">
        <MaterialCommunityIcons name="account-circle" size={96} color="#FFD600" style={{ marginBottom: 8 }} />
        <Text className="text-white text-2xl font-bold mb-1">{userName}</Text>
        <Text className="text-blue-400 text-base mb-1">{userEmail}</Text>
        <Text className="text-gray-400 text-xs">ID: {userId}</Text>
      </View>
      <View className="bg-[#23263a] rounded-2xl p-6 items-center w-full max-w-xs mb-6">
        <View className="flex-row items-center mb-3">
          <FontAwesome5 name="medal" size={28} color="#00FFB4" style={{ marginRight: 10 }} />
          <Text className="text-[#00FFB4] font-bold text-lg">Level 3</Text>
        </View>
        <Text className="text-white text-base mb-2">XP: <Text className="text-[#FFD600] font-bold">1200</Text></Text>
        <Text className="text-blue-400 text-sm">Keep going to reach the next level!</Text>
      </View>
      <TouchableOpacity onPress={signOut} className="bg-blue-600 py-3 px-8 rounded-xl mt-3 w-full max-w-xs items-center">
        <Text className="text-white font-bold text-base">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}