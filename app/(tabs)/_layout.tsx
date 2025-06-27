// app/(tabs)/_layout.tsx
import '../globals.css'
import { Tabs } from 'expo-router'
import { SafeAreaProvider  } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'
import { hide } from 'expo-splash-screen'

export default function TabsLayout() {
  return (
    <SafeAreaProvider>
              <StatusBar
        barStyle="dark-content"
        backgroundColor="blue"
        translucent={false}
      />

         <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2f95dc',
        tabBarStyle: { backgroundColor: '#222831' }, // dark background
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home' }}
      />
    </Tabs></SafeAreaProvider>
   
  )
}
