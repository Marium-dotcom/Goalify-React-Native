// app/goal/[id].tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { databases } from '@/lib/appwrite';
import * as Progress from 'react-native-progress';
import { LinearGradient } from 'expo-linear-gradient';
import {
  X as CloseIcon,
  Heart,
  DollarSign,
  BookOpen,
  Briefcase,
  Star,
  Users,
  Sparkles,
  EditIcon,
  Trash2 as DeleteIcon, // <-- add delete icon
} from 'lucide-react-native';
import { useAuth } from '@/lib/auth-context';

const DB_ID = '6860a0d100098a25345c';
const COLLECTION_ID = '6860a0f0002e2a54c8f1';
const SCREEN_WIDTH = Dimensions.get('window').width;

type Goal = {
  $id: string;
  title: string;
  description?: string;
  category: string;
  frequency: string;
  priority: string;
  targetValue: number;
  currentValue: number;
  unit?: string;
  reward?: string;
  motivationalQuote?: string;
  completedDates?: string[];
  createdAt: string;
};

export default function GoalDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [incrementValue, setIncrementValue] = useState<number>(0);
  const { signOut } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const doc = await databases.getDocument(DB_ID, COLLECTION_ID, id);
        setGoal({
          $id: doc.$id,
          title: doc.title,
          description: doc.description,
          category: doc.category,
          frequency: doc.frequency,
          priority: doc.priority,
          targetValue: Number(doc.targetValue),
          currentValue: Number(doc.currentValue ?? 0),
          unit: doc.unit,
          reward: doc.reward,
          motivationalQuote: doc.motivationalQuote,
          completedDates: doc.completedDates || [],
          createdAt: doc.createdAt,
        });
      } catch (err) {
        console.error('Error fetching goal', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleUpdateProgress = async () => {
    if (!goal || incrementValue <= 0) return;

    const updatedValue = goal.currentValue + incrementValue;

    try {
      await databases.updateDocument(DB_ID, COLLECTION_ID, goal.$id, {
        currentValue: updatedValue,
      });

      setGoal({ ...goal, currentValue: updatedValue });
      setIncrementValue(0);
      router.back();
    } catch (err) {
      console.error('Failed to update progress', err);
    }
  };

  const handleDeleteGoal = async () => {
    if (!goal) return;
    try {
      await databases.deleteDocument(DB_ID, COLLECTION_ID, goal.$id);
      router.back();
    } catch (err) {
      Alert.alert('Error', 'Failed to delete goal.');
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-dark-900 justify-center items-center">
        <ActivityIndicator size="large" color="#6366F1" />
        <Text className="mt-2 text-gray-400 text-base">Loading details…</Text>
      </View>
    );
  }

  if (!goal) {
    return (
      <View className="flex-1 bg-dark-900 justify-center items-center px-6">
        <Text className="text-gray-400 text-lg text-center">
          Couldn’t load this goal.
        </Text>
      </View>
    );
  }

  const meta: Record<string, { icon: React.FC<any>; color: string }> = {
    health: { icon: Heart, color: '#10B981' },
    financial: { icon: DollarSign, color: '#F59E0B' },
    learning: { icon: BookOpen, color: '#3B82F6' },
    career: { icon: Briefcase, color: '#8B5CF6' },
    personal: { icon: Star, color: '#EF4444' },
    relationships: { icon: Users, color: '#06B6D4' },
  };

  const { icon: CategoryIcon, color } =
    meta[goal.category] || { icon: Star, color: '#6366F1' };

  const targetNum = goal.targetValue || 1;
  const doneCount = (goal.completedDates || []).length;
  const progress = Math.min(goal.currentValue / goal.targetValue, 1);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-dark-900"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Gradient Header */}
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="pt-16 pb-6 px-4 flex-row items-center"
      >
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <CloseIcon size={24} color="#FFF" strokeWidth={2} />
        </TouchableOpacity>

        <Text className="flex-1 text-white text-2xl font-bold text-center">
          Goal Details
        </Text>

        <TouchableOpacity
          onPress={() => router.push(`/goals/${id}/edit`)}
          className="p-2 ml-2"
        >
          <EditIcon size={22} color="#FFF" strokeWidth={2} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Delete Goal',
              'Are you sure you want to delete this goal? This action cannot be undone.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: handleDeleteGoal },
              ]
            );
          }}
          className="p-2 ml-2"
        >
          <DeleteIcon size={22} color="#F87171" strokeWidth={2} />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView
        className="px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Title + Icon */}
        <View className="flex-row items-center mt-6 mb-6">
          <View
            className="rounded-full p-4 bg-dark-800"
            style={{ borderWidth: 2, borderColor: color }}
          >
            <CategoryIcon size={32} color={color} strokeWidth={2} />
          </View>
          <Text className="ml-4 text-white text-3xl font-semibold flex-shrink">
            {goal.title}
          </Text>
          {progress === 1 && (
            <Sparkles
              size={28}
              color="#FACC15"
              strokeWidth={2}
              className="ml-2"
            />
          )}
        </View>
        {/* Update Progress */}
        <View className="mb-8">
          <Text className="text-white text-base font-inter-semibold mb-2">
            Add to progress
          </Text>
          <View className="flex-row items-center space-x-2">
            <TextInput
              className=" w-80 bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-white text-base font-inter"
              placeholder={`e.g., 30 ${goal.unit || ''}`}
              placeholderTextColor="#64748B"
              keyboardType="numeric"
              onChangeText={(text) => setIncrementValue(Number(text))}
            />
            <TouchableOpacity
              className="bg-indigo-600 rounded-xl px-4 py-3 ml-5"
              onPress={handleUpdateProgress}
            >
              <Text className="text-white font-inter">Update</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Description */}
        {goal.description && (
          <View className="bg-dark-800 rounded-2xl p-4 mb-6 shadow">
            <Text className="text-white text-base font-medium mb-2">
              Description
            </Text>
            <Text className="text-gray-300 text-sm">{goal.description}</Text>
          </View>
        )}

        {/* Meta Info */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-dark-800 rounded-xl px-3 py-1">
            <Text className="text-gray-400 text-xs">{goal.category}</Text>
          </View>
          <View className="bg-dark-800 rounded-xl px-3 py-1">
            <Text className="text-gray-400 text-xs">{goal.frequency}</Text>
          </View>
          <View className="bg-dark-800 rounded-xl px-3 py-1">
            <Text className="text-gray-400 text-xs">
              Priority: {goal.priority}
            </Text>
          </View>
        </View>

        {/* Progress */}
        <View className="mb-8">
          <Text className="text-gray-300 text-sm mb-2">
            <Text className="text-gray-300 text-sm mb-2">
              Progress ({goal.currentValue} / {goal.targetValue} {goal.unit || ''})
            </Text>
          </Text>
          <Progress.Bar
            progress={progress}
            width={SCREEN_WIDTH - 48}
            height={10}
            color={color}
            unfilledColor="#2E3A47"
            borderWidth={0}
          />
        </View>

        {/* Reward */}
        {goal.reward && (
          <View className="bg-dark-800 rounded-2xl p-4 mb-6 shadow">
            <Text className="text-white text-base font-medium mb-2">
              Reward
            </Text>
            <Text className="text-gray-300 text-sm">{goal.reward}</Text>
          </View>
        )}

        {/* Mantra */}
        {goal.motivationalQuote && (
          <View className="bg-dark-800 rounded-2xl p-4 mb-6 shadow">
            <Text className="text-white text-base font-medium mb-2">
              Personal Mantra
            </Text>
            <Text className="text-gray-300 text-sm italic">
              “{goal.motivationalQuote}”
            </Text>
          </View>
        )}

        {/* Created Date */}
        <View className="items-center mt-4 mb-8">
          <Text className="text-gray-500 text-xs">
            Created on{' '}
            {new Date(goal.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
