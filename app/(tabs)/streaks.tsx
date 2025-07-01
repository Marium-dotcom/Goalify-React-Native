import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Award, BarChart3, CheckCircle, Clock, Flame, Target, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';

export default function AnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const periods = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' },
  ];

  const weeklyData = [
    { day: 'Mon', completed: 3, total: 4 },
    { day: 'Tue', completed: 4, total: 4 },
    { day: 'Wed', completed: 2, total: 4 },
    { day: 'Thu', completed: 4, total: 4 },
    { day: 'Fri', completed: 3, total: 4 },
    { day: 'Sat', completed: 1, total: 4 },
    { day: 'Sun', completed: 2, total: 4 },
  ];

  const stats = {
    totalGoals: 12,
    completedGoals: 8,
    currentStreak: 15,
    longestStreak: 23,
    completionRate: 67,
    averageDaily: 2.3,
  };

  const categoryProgress = [
    { name: 'Health', completed: 12, total: 15, color: '#10B981' },
    { name: 'Learning', completed: 8, total: 12, color: '#3B82F6' },
    { name: 'Financial', completed: 5, total: 6, color: '#F59E0B' },
    { name: 'Personal', completed: 3, total: 8, color: '#EF4444' },
  ];

  const getMaxValue = () => {
    return Math.max(...weeklyData.map(d => d.total));
  };

  return (
    <>
<LinearGradient
  colors={['#10B981', '#059669']}
  className="pt-16 pb-10 px-6"
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
>
  <View className="items-center space-y-3">
    <View className="bg-white/20 p-4 rounded-2xl">
      <Target size={28} color="#FFFFFF" strokeWidth={2} />
    </View>
    <Text className="text-white text-3xl font-poppins-bold tracking-wide">
      Your Journey, Visualized
    </Text>
    <Text className="text-slate-100 text-center text-base font-inter leading-relaxed max-w-md">
      Dive into your progress stats, track your streaks, and celebrate every win—big or small.
    </Text>
  </View>
</LinearGradient>

      <ScrollView className="flex-1 bg-slate-900" contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center px-5 pt-16 pb-5">
          <View>
            <Text className="text-2xl font-poppins-bold text-white">Analytics</Text>
            <Text className="text-base font-inter text-slate-400 mt-1">
              Track your progress and insights
            </Text>
          </View>
          <BarChart3 size={32} color="#6366F1" strokeWidth={2} />
        </View>

        {/* Period Selector */}
        <View className="flex-row bg-slate-800 rounded-xl p-1 mb-6">
          {periods.map((period) => {
            const isActive = selectedPeriod === period.id;
            return (
              <TouchableOpacity
                key={period.id}
                className={`flex-1 py-2 rounded-lg items-center ${
                  isActive ? 'bg-indigo-500' : ''
                }`}
                onPress={() => setSelectedPeriod(period.id)}
              >
                <Text
                  className={`text-sm font-inter-medium ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {period.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="flex-row flex-wrap justify-between mb-6">
          <LinearGradient
            colors={['#10B981', '#059669']}
            className="w-[48%] p-5 rounded-2xl items-center mb-3"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <CheckCircle size={24} color="#FFFFFF" strokeWidth={2} />
            <Text className="text-2xl font-poppins-bold text-white mt-2">
              {stats.completedGoals}
            </Text>
            <Text className="text-xs font-inter text-white/80 mt-1">Completed</Text>
          </LinearGradient>

          <LinearGradient
            colors={['#F59E0B', '#D97706']}
            className="w-[48%] p-5 rounded-2xl items-center mb-3"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Flame size={24} color="#FFFFFF" strokeWidth={2} />
            <Text className="text-2xl font-poppins-bold text-white mt-2">
              {stats.currentStreak}
            </Text>
            <Text className="text-xs font-inter text-white/80 mt-1">Day Streak</Text>
          </LinearGradient>

          <LinearGradient
            colors={['#6366F1', '#4F46E5']}
            className="w-[48%] p-5 rounded-2xl items-center mb-3"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Target size={24} color="#FFFFFF" strokeWidth={2} />
            <Text className="text-2xl font-poppins-bold text-white mt-2">
              {stats.totalGoals}
            </Text>
            <Text className="text-xs font-inter text-white/80 mt-1">Total Goals</Text>
          </LinearGradient>

          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            className="w-[48%] p-5 rounded-2xl items-center mb-3"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <TrendingUp size={24} color="#FFFFFF" strokeWidth={2} />
            <Text className="text-2xl font-poppins-bold text-white mt-2">
              {stats.completionRate}%
            </Text>
            <Text className="text-xs font-inter text-white/80 mt-1">Success Rate</Text>
          </LinearGradient>
        </View>
        <View className="bg-dark-800 rounded-2xl p-5 mb-6 border border-dark-700">
          <Text className="text-lg font-poppins-semibold text-white mb-5">
            Weekly Progress
          </Text>

          <View className="flex-row justify-between items-end h-32">
            {weeklyData.map((data, index) => {
              const max = getMaxValue();
              const totalHeight = (data.total / max) * 80;
              const completedHeight = (data.completed / max) * 80;

              return (
                <View key={index} className="items-center flex-1">
                  <View className="relative w-5 justify-end">
                    {/* Total Bar */}
                    <View
                      className="absolute bottom-0 w-full bg-dark-600 rounded-sm"
                      style={{ height: totalHeight }}
                    />
                    {/* Completed Bar */}
                    <View
                      className="absolute bottom-0 w-full bg-indigo-500 rounded-sm"
                      style={{ height: completedHeight }}
                    />
                  </View>
                  <Text className="text-xs font-inter-medium text-slate-400 mt-2">
                    {data.day}
                  </Text>
                  <Text className="text-[10px] font-inter text-slate-500 mt-1">
                    {data.completed}/{data.total}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View className="bg-dark-800 rounded-2xl p-5 mb-6 border border-dark-700">
          <Text className="text-lg font-poppins-semibold text-white mb-4">
            Progress by Category
          </Text>

          {categoryProgress.map((cat, index) => (
            <View key={index} className="mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center">
                  <View
                    className="w-2 h-2 rounded-full mr-3"
                    style={{ backgroundColor: cat.color }}
                  />
                  <Text className="text-sm font-inter-medium text-white">
                    {cat.name}
                  </Text>
                </View>
                <Text className="text-sm font-inter-semibold text-slate-400">
                  {cat.completed}/{cat.total}
                </Text>
              </View>
              <View className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                <View
                  className="h-full rounded-full"
                  style={{
                    width: `${(cat.completed / cat.total) * 100}%`,
                    backgroundColor: cat.color,
                  }}
                />
              </View>
            </View>
          ))}
        </View>
        <View className="bg-dark-800 rounded-2xl p-5 mb-24 border border-dark-700">
          <Text className="text-lg font-poppins-semibold text-white mb-4">
            Key Insights
          </Text>

          <View className="flex-row items-center mb-3">
            <Award size={20} color="#10B981" strokeWidth={2} />
            <Text className="ml-3 text-sm font-inter text-slate-300 flex-1">
              You&apos;re on a {stats.currentStreak}-day streak! Keep it up!
            </Text>
          </View>

          <View className="flex-row items-center mb-3">
            <TrendingUp size={20} color="#3B82F6" strokeWidth={2} />
            <Text className="ml-3 text-sm font-inter text-slate-300 flex-1">
              Your completion rate improved by 12% this month
            </Text>
          </View>

          <View className="flex-row items-center">
            <Clock size={20} color="#F59E0B" strokeWidth={2} />
            <Text className="ml-3 text-sm font-inter text-slate-300 flex-1">
              Best performance on Tuesdays and Thursdays
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}