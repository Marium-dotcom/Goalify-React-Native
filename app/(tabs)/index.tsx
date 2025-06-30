import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '@/lib/auth-context';
import { databases } from '@/lib/appwrite';
import * as Progress from 'react-native-progress';
import {
  Heart,
  DollarSign,
  BookOpen,
  Briefcase,
  Star,
  Users,
  Sparkles,
  Target,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const DB_ID = '6860a0d100098a25345c';
const COLLECTION_ID = '6860a0f0002e2a54c8f1';
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

export default function HomeScreen() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await databases.listDocuments(DB_ID, COLLECTION_ID);
        const mapped: Goal[] = (res.documents as any[]).map((d) => ({
          $id: d.$id,
          title: d.title,
          category: d.category,
          frequency: d.frequency,
          priority: d.priority,
          targetValue: Number(d.targetValue),
          currentValue: Number(d.currentValue ?? 0),
          unit: d.unit,
        }));
        setGoals(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const categoryMeta: Record<string, { icon: React.FC<any>; color: string }> = {
    health: { icon: Heart, color: '#10B981' },
    financial: { icon: DollarSign, color: '#F59E0B' },
    learning: { icon: BookOpen, color: '#3B82F6' },
    career: { icon: Briefcase, color: '#8B5CF6' },
    personal: { icon: Star, color: '#EF4444' },
    relationships: { icon: Users, color: '#06B6D4' },
  };

  if (loading) {
    return (
      <View className="flex-1 bg-dark-900 justify-center items-center">
        <ActivityIndicator size="large" color="#6366F1" />
        <Text className="text-gray-400 mt-2">Loading your goals…</Text>
      </View>
    );
  }

  if (!goals || goals.length === 0) {
    return (
      <View className="flex-1 bg-dark-900 justify-center items-center px-6">
        <Text className="text-gray-400 text-lg text-center">
          No goals yet. Tap “Create” to add your first one!
        </Text>
      </View>
    );
  }

const getGradientColors = (progress: number): [string, string] => {
  if (progress < 0.3) return ['#EF4444', '#F87171'];
  if (progress < 0.7) return ['#F59E0B', '#FBBF24'];
  return ['#10B981', '#34D399'];
};


  return (
    <View className="flex-1 bg-dark-900">
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        className="pt-16 pb-8 px-5"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="items-center">
          <View className="bg-white/20 rounded-full p-3 mb-4">
            <Target size={32} color="#FFFFFF" strokeWidth={2} />
          </View>
          <Text className="text-white text-2xl font-poppins-bold mb-1">
            Welcome back!
          </Text>
          <Text className="text-white/80 text-base font-inter text-center">
            {user?.email}
          </Text>
        </View>
      </LinearGradient>

      {/* Greeting */}
      <View className="px-5 pt-8 pb-4">
        <Text className="text-white text-2xl font-bold">Hello, {user?.name} 👋</Text>
        <Text className="text-gray-400 mt-1">
          Here&apos;s your progress so far:
        </Text>
      </View>

      {/* Goals List */}
      <FlatList
        data={goals}
        keyExtractor={(g) => g.$id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View className="h-4" />}
        renderItem={({ item }) => {
          const { icon: Icon, color } = categoryMeta[item.category] || {
            icon: Star,
            color: '#6366F1',
          };
          const targetNum = item.targetValue || 1;
          const progress = Math.min(item.currentValue / targetNum, 1);

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              className="rounded-2xl bg-dark-800 p-4 w-full shadow-md"
              style={{ width: SCREEN_WIDTH - 32 }}
              onPress={() => router.push(`/goals/${item.$id}`)}
            >
              {/* Title & Icon */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Icon size={24} color={color} strokeWidth={2} />
                  <Text className="ml-3 text-white text-lg font-semibold">
                    {item.title}
                  </Text>
                </View>
                {progress === 1 && (
                  <Sparkles
                    size={20}
                    color="#FACC15"
                    strokeWidth={2}
                    className="ml-2"
                  />
                )}
              </View>

              {/* Meta */}
              <View className="flex-row justify-between mt-2">
                <Text className="text-gray-400">{item.category}</Text>
                <Text className="text-gray-400">{item.frequency}</Text>
              </View>

              {/* Progress Bar */}
              <View className="mt-4">
<View
  className="w-full h-3 rounded-full bg-dark-700 overflow-hidden"
>
<LinearGradient
  colors={getGradientColors(progress)}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={{
    width: (SCREEN_WIDTH - 64) * progress, // عرض الشريط
    height: '100%',
    borderRadius: 999,
  }}
/>

</View>
                <Text className="text-gray-300 text-sm mt-1">
                  {item.currentValue} / {targetNum} {item.unit || ''}{' '}
                  {progress >= 1 ? '✔️' : ''}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
