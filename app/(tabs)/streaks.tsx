import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function Streaks() {
  // Example streak data
  const streak = 7;
  const maxStreak = 30;
  const progress = (streak / maxStreak) * 100;

  // Generate a row of gems (like Duolingo)
  const renderGems = () => {
    const gems = [];
    for (let i = 0; i < maxStreak; i++) {
      gems.push(
        <MaterialCommunityIcons
          key={i}
          name={i < streak ? 'diamond-stone' : 'diamond-outline'}
          size={24}
          color={i < streak ? '#FFD600' : '#444B5A'}
          style={{ marginHorizontal: 2 }}
        />
      );
    }
    return (
      <View className="flex-row items-center justify-center flex-wrap w-full mb-4">
        {gems}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#181A20] items-center justify-center px-4 py-8">
      <View className="items-center mb-8">
        <MaterialCommunityIcons name="fire" size={56} color="#FFD600" style={{ marginBottom: 8 }} />
        <Text className="text-4xl font-extrabold text-yellow-400 mb-1 tracking-wide drop-shadow-lg">{streak} Day Streak!</Text>
        <Text className="text-lg text-gray-300 mb-2">Keep your streak alive and earn rewards!</Text>
      </View>
      <View className="bg-[#23263a] rounded-2xl p-6 items-center shadow-lg w-full max-w-md mb-8">
        {renderGems()}
        <View className="w-full h-4 bg-gray-700 rounded-full overflow-hidden mb-4">
          <View style={{ width: `${progress}%` }} className="h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
        </View>
        <Text className="text-blue-400 font-semibold text-center">Reach {maxStreak} days for a special badge!</Text>
      </View>
      <View className="flex-row items-center mt-6 bg-[#23263a] rounded-xl p-4 w-full max-w-md justify-center">
        <FontAwesome5 name="medal" size={28} color="#00FFB4" style={{ marginRight: 10 }} />
        <View>
          <Text className="text-green-400 font-bold text-lg mb-1">+10 XP</Text>
          <Text className="text-gray-300">Daily streak bonus</Text>
        </View>
      </View>
      <View className="absolute bottom-8 left-0 right-0 items-center">
        <Text className="text-gray-500 text-xs">Stay consistent to unlock more rewards and badges!</Text>
      </View>
    </View>
  );
}