import { AuthProvider, useAuth } from '@/lib/auth-context';
import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';

function RouteGuard({ children }: { children: React.ReactNode }) {

  const {user, isLoading} = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const isReady = segments.length > 0; // مهم جداً

  useEffect(() => {      
    const isAuthRoute = segments[0] === 'auth'

      if (!isAuthRoute && !user && !isLoading ) {
      router.replace('/auth')
    } else if (isAuthRoute && user && !isLoading) {
      router.replace('/')
    }

      }, [segments, user, isLoading, router]);
        if (!isReady) {
    return null; // ممكن ترجع loading spinner هنا كمان
  }

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
        </Stack>
      </RouteGuard>
    </AuthProvider>
  );
}
