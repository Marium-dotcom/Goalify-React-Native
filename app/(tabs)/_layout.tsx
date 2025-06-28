import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#FFD600',
          tabBarInactiveTintColor: '#444B5A',
          tabBarStyle: { backgroundColor: '#181A20', borderTopWidth: 0, height: 64 },
          tabBarIcon: ({ color, size, focused }) => {
            const iconSize = size - 4;
            if (route.name === 'index') {
              return (
                <View className={`items-center justify-center ${focused ? 'bg-yellow-500/10' : ''} rounded-xl p-1`}>
                  {focused ? (
                    <Feather name="user-check" size={iconSize} color={color} />
                  ) : (
                    <Feather name="user" size={iconSize} color={color} />
                  )}
                </View>
              );
            }
            if (route.name === 'streaks') {
              return (
                <View className={`items-center justify-center ${focused ? 'bg-orange-500/10' : ''} rounded-xl p-1`}>
                  {focused ? (
                    <MaterialCommunityIcons name="fire" size={iconSize} color={color} />
                  ) : (
                    <MaterialCommunityIcons name="fire-off" size={iconSize} color={color} />
                  )}
                </View>
              );
            }
            if (route.name === 'addGoal') {
              return (
                <View className={`items-center justify-center ${focused ? 'bg-teal-400/10' : ''} rounded-xl p-1`}>
                  {focused ? (
                    <FontAwesome5 name="trophy" size={iconSize} color={color} solid />
                  ) : (
                    <FontAwesome5 name="plus-circle" size={iconSize} color={color} solid />
                  )}
                </View>
              );
            }
            return null;
          },
          tabBarLabel: ({ focused, color }) => {
            let label = '';
            if (route.name === 'index') label = 'Home';
            if (route.name === 'streaks') label = 'Streak';
            if (route.name === 'addGoal') label = 'Goal';
            return (
              <Text className={`font-bold text-xs ${focused ? 'text-yellow-400' : 'text-gray-400'}`}>{label}</Text>
            );
          },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{ title: 'Home' }}
        />
        <Tabs.Screen
          name="streaks"
          options={{ title: 'Streak' }}
        />
        <Tabs.Screen
          name="addGoal"
          options={{ title: 'Goal' }}
        />
      </Tabs>

    </>
  );
}
