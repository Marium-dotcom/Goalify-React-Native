import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#2f95dc',
          tabBarStyle: { backgroundColor: '#222831' },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{ title: 'Home' }}
        />
      </Tabs>

    </>
  );
}
