// app/_layout.tsx
import './globals.css'
import { AuthProvider, useAuth } from '@/lib/auth-context';
import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';

function RouteGuard({ children }: { children: React.ReactNode }) {

  const {user, isLoading} = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {      
const isAuthRoute = segments[0] === '(auth)'

      if (!isAuthRoute && !user && !isLoading ) {
      router.replace('/(auth)/auth')
    } else if (isAuthRoute && user && !isLoading) {
      router.replace('/')
    }

      }, [segments, user, isLoading, router]);
  
  return <>{children}</>;
}


export default function RootLayout() {
  React.useEffect(() => {
    // Set Android navigation bar color
    SystemUI.setBackgroundColorAsync('black'); // match your dark theme
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#0F172A" />
      <AuthProvider>
        <RouteGuard>
          <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
            <Stack>
      
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(auth)"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </SafeAreaView>
        </RouteGuard>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
