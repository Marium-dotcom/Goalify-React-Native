// app/_layout.tsx
import './globals.css'
import { AuthProvider, useAuth } from '@/lib/auth-context';
import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';

function RouteGuard({ children }: { children: React.ReactNode }) {

  const {user, isLoading} = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const isReady = segments.length > 0; // مهم جداً

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
  return (
    <AuthProvider>
      <RouteGuard>
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
      </RouteGuard>
    </AuthProvider>
  );
}
