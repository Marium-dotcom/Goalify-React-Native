import { useAuth } from '@/lib/auth-context';
import { Button } from '@react-navigation/elements';
import React from 'react';
import { View, Text } from 'react-native';

// Replace this with your actual user context or prop

export default function WelcomePage() {
  const  {signOut, user} = useAuth();
  const userName = user?.email || 'User'; // Fallback to 'User' if name is not available
  return (
    <View style={{ flex: 1, backgroundColor: '#181A20', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 12 }}>
        Welcome
      </Text>
      <Text style={{ color: '#2f95dc', fontSize: 24 }}>
        {userName}
      </Text>
      <Button onPress={signOut}>Sign Out</Button>
    </View>
  );
}