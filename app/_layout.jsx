// app/_layout.tsx
import './globals.css'
import { Tabs } from 'expo-router'
import { SafeAreaProvider  } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'

export default function Layout() {
  return (
    <SafeAreaProvider>
              <StatusBar
        barStyle="dark-content"
        backgroundColor="blue"
        translucent={false}
      />

         <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#2f95dc',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home' }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile' }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: 'Settings' }}
      />
    </Tabs></SafeAreaProvider>
   
  )
}
