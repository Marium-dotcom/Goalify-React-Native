import React from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 16 }} className="flex-grow">
        {/* Avatar & Name */}
        <View className="items-center mb-6">
          <Image
            source={{ uri: 'https://example.com/avatar.jpg' }}
            className="w-24 h-24 rounded-full"
          />
          <Text className="mt-4 text-2xl font-bold text-gray-800">Marium Magdy</Text>
          <Text className="text-gray-500 mt-1">Full-stack Developer</Text>
        </View>

        {/* Bio Section */}
        <View className="bg-gray-100 p-4 rounded-lg mb-6">
          <Text className="text-gray-700 font-semibold">Bio</Text>
          <Text className="mt-2 text-gray-600">
            Hey there! I&apos;m a passionate developer specializing in the MERN
            stack. I love building intuitive UIs and scalable backends.
          </Text>
        </View>

        {/* Stats */}
        <View className="flex-row justify-between mb-6">
          <View className="items-center">
            <Text className="text-xl font-semibold text-gray-800">120</Text>
            <Text className="text-gray-500">Posts</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-semibold text-gray-800">250</Text>
            <Text className="text-gray-500">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-semibold text-gray-800">180</Text>
            <Text className="text-gray-500">Following</Text>
          </View>
        </View>

        {/* Action Button */}
        <Pressable className="bg-blue-500 py-3 rounded-lg items-center">
          <Text className="text-white font-medium">Edit Profile</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
