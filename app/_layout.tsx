import { AuthProvider } from '@/lib/auth-context';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';

function RouteGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = false; // Replace with actual authentication check
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth');
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
}


export default function Layout() {
  return (
    <AuthProvider>
      <RouteGuard>
        <Stack>
          <Stack.Screen
            name="auth"
            options={{
              headerShown: false,
            }}
          />
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
