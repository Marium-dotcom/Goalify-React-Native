import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Award, BarChart3, CheckCircle, Clock, Flame, Target, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/lib/auth-context';
import { databases } from '@/lib/appwrite';
import { Query } from 'react-native-appwrite';

const DB_ID = '6860a0d100098a25345c';
const COLLECTION_ID = '6860a0f0002e2a54c8f1';

export default function AnalyticsScreen() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('week');
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch goals from Appwrite
  useEffect(() => {
    if (!user) return;
    const fetchGoals = async () => {
      setLoading(true);
      try {
        const res = await databases.listDocuments(DB_ID, COLLECTION_ID, [
          Query.equal('userId', user.$id)
        ]);
        setGoals(res.documents);
      } catch (err) {
        console.error('Failed to fetch goals:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, [user]);

  // Calculate stats from real data
  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => Number(g.currentValue) >= Number(g.targetValue)).length;
  const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;


  // Weekly data (for the current week)
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday

  // Category progress
  const categoryMap: Record<string, { completed: number; total: number; color: string }> = {};
  goals.forEach(g => {
    const cat = g.category || 'Other';
    if (!categoryMap[cat]) categoryMap[cat] = { completed: 0, total: 0, color: '#6366F1' };
    categoryMap[cat].total += 1;
    if (Number(g.currentValue) >= Number(g.targetValue)) categoryMap[cat].completed += 1;
    // Optionally, set color based on category
    if (cat === 'Health') categoryMap[cat].color = '#10B981';
    if (cat === 'Learning') categoryMap[cat].color = '#3B82F6';
    if (cat === 'Financial') categoryMap[cat].color = '#F59E0B';
    if (cat === 'Personal') categoryMap[cat].color = '#EF4444';
  });
  const categoryProgress = Object.entries(categoryMap).map(([name, v]) => ({
    name,
    completed: v.completed,
    total: v.total,
    color: v.color,
  }));

  const stats = {
    totalGoals,
    completedGoals,
    completionRate,
    averageDaily: 0, // You can compute this if you store daily completion data
  };


  // Define periods for the period selector
  const periods = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' },
  ];

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