import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AddGoal() {
  const [goal, setGoal] = useState('');
  const [success, setSuccess] = useState(false);

  const handleAddGoal = () => {
    if (goal.trim().length > 0) {
      setSuccess(true);
      setGoal('');
      setTimeout(() => setSuccess(false), 2000);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#181A20] justify-center items-center p-6"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="items-center mb-8">
        <MaterialCommunityIcons name="target" size={72} color="#2f95dc" style={{ marginBottom: 8 }} />
        <Text className="text-white text-2xl font-bold mb-1">Add a New Goal</Text>
        <Text className="text-blue-400 text-base mb-1">Set your next achievement!</Text>
      </View>
      <View className="bg-[#23263a] rounded-2xl p-6 items-center w-full max-w-xs mb-6">
        <TextInput
          value={goal}
          onChangeText={setGoal}
          placeholder="Enter your goal..."
          placeholderTextColor="#888"
          className="text-white bg-[#181A20] rounded-xl px-4 py-3 w-full text-base mb-4 border border-blue-400"
        />
        <TouchableOpacity
          onPress={handleAddGoal}
          className="bg-blue-600 py-3 px-8 rounded-xl mt-1 w-full items-center"
        >
          <Text className="text-white font-bold text-base">Add Goal</Text>
        </TouchableOpacity>
        {success && (
          <View className="flex-row items-center mt-4">
            <MaterialCommunityIcons name="check-circle" size={24} color="#00FFB4" style={{ marginRight: 6 }} />
            <Text className="text-[#00FFB4] font-bold text-base">Goal Added!</Text>
          </View>
        )}
      </View>
      <View className="items-center mt-4">
        <Text className="text-gray-400 text-xs">Stay focused and track your progress every day!</Text>
      </View>
    </KeyboardAvoidingView>
  );
}