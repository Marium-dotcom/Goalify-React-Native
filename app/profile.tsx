import React from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Target, Sparkles, Star } from 'lucide-react-native';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'expo-router';

const SCREEN_WIDTH = Dimensions.get('window').width;

type Goal = {
  $id: string;
  title: string;
  category: string;
  frequency: string;
  priority: string;
  targetValue: number;
  currentValue: number;
  unit?: string;
};

type Props = {
  goals: Goal[];
};

const categoryMeta: Record<string, { icon: React.FC<any>; color: string }> = {
  health: { icon: Target, color: '#10B981' },
  financial: { icon: Target, color: '#F59E0B' },
  learning: { icon: Target, color: '#3B82F6' },
  career: { icon: Target, color: '#8B5CF6' },
  personal: { icon: Target, color: '#EF4444' },
  relationships: { icon: Target, color: '#06B6D4' },
};

const getGradientColors = (progress: number): [string, string] => {
  if (progress < 0.3) return ['#EF4444', '#F87171'];
  if (progress < 0.7) return ['#F59E0B', '#FBBF24'];
  return ['#10B981', '#34D399'];
};

export default function ProfileScreen({ goals }: Props) {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const goalCount = goals.length;

  return (
    <View className="flex-1 bg-dark-900">
      {/* Gradient Header */}
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        className="pt-16 pb-10 px-5 rounded-b-3xl"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="items-center">
          <View className="bg-white/20 rounded-full p-3 mb-4">
            <Target size={32} color="#FFFFFF" strokeWidth={2} />
          </View>
          <Text className="text-white text-xl font-bold mb-1">{user?.name || 'Anonymous'}</Text>
          <Text className="text-white/80 text-sm">{user?.email}</Text>
          <Text className="text-white mt-2">🎯 You have {goalCount} goals</Text>
        </View>
      </LinearGradient>

      {/* Goals */}
      <FlatList
        data={goals}
        keyExtractor={(g) => g.$id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24, paddingTop: 20 }}
        ItemSeparatorComponent={() => <View className="h-4" />}
        renderItem={({ item }) => {
          const { icon: Icon, color } = categoryMeta[item.category] || {
            icon: Star,
            color: '#6366F1',
          };
          const progress = Math.min(item.currentValue / item.targetValue, 1);

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              className="rounded-2xl bg-dark-800 p-4 w-full shadow-md"
              style={{ width: SCREEN_WIDTH - 32 }}
              onPress={() => router.push(`/goals/${item.$id}`)}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Icon size={24} color={color} strokeWidth={2} />
                  <Text className="ml-3 text-white text-lg font-semibold">
                    {item.title}
                  </Text>
                </View>
                {progress === 1 && (
                  <Sparkles size={20} color="#FACC15" strokeWidth={2} className="ml-2" />
                )}
              </View>

              <View className="flex-row justify-between mt-2">
                <Text className="text-gray-400">{item.category}</Text>
                <Text className="text-gray-400">{item.frequency}</Text>
              </View>

              <View className="mt-4">
                <View className="w-full h-3 rounded-full bg-dark-700 overflow-hidden">
                  <LinearGradient
                    colors={getGradientColors(progress)}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: (SCREEN_WIDTH - 64) * progress,
                      height: '100%',
                      borderRadius: 999,
                    }}
                  />
                </View>
                <Text className="text-gray-300 text-sm mt-1">
                  {item.currentValue} / {item.targetValue} {item.unit} {progress >= 1 ? '✔️' : ''}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
