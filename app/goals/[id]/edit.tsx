// app/goals/[id]/edit.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Heart,
  DollarSign,
  BookOpen,
  Briefcase,
  Star,
  Users,
  Calendar,
  Flag,
  Sparkles,
  X as CloseIcon,
  Zap,
} from 'lucide-react-native';
import { databases } from '@/lib/appwrite';
import { ID } from 'react-native-appwrite';
import { useAuth } from '@/lib/auth-context';

const DB_ID = '6860a0d100098a25345c';
const COLLECTION_ID = '6860a0f0002e2a54c8f1';

type Category = { id: string; label: string; icon: React.ComponentType<any>; color: string; bgColor: string };
type Frequency = { id: string; label: string; icon: React.ComponentType<any>; description: string };
type Priority = { id: string; label: string; color: string; bgColor: string; description: string };

export default function EditGoalScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  const [goalTitle, setGoalTitle] = useState<string>('');
  const [goalDescription, setGoalDescription] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('daily');
  const [selectedPriority, setSelectedPriority] = useState<string>('medium');
  const [targetValue, setTargetValue] = useState<number>(0);
  const [reward, setReward] = useState<string>('');
  const [motivationalQuote, setMotivationalQuote] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [customUnit, setCustomUnit] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const categories: Category[] = [
    { id: 'health', label: 'Health', icon: Heart, color: '#10B981', bgColor: 'bg-emerald-500' },
    { id: 'financial', label: 'Financial', icon: DollarSign, color: '#F59E0B', bgColor: 'bg-amber-500' },
    { id: 'learning', label: 'Learning', icon: BookOpen, color: '#3B82F6', bgColor: 'bg-blue-500' },
    { id: 'career', label: 'Career', icon: Briefcase, color: '#8B5CF6', bgColor: 'bg-purple-500' },
    { id: 'personal', label: 'Personal', icon: Star, color: '#EF4444', bgColor: 'bg-red-500' },
    { id: 'relationships', label: 'Social', icon: Users, color: '#06B6D4', bgColor: 'bg-cyan-500' },
  ];
  const frequencies: Frequency[] = [
    { id: 'daily', label: 'Daily', icon: Calendar, description: 'Every day' },
    { id: 'weekly', label: 'Weekly', icon: Calendar, description: 'Once a week' },
    { id: 'monthly', label: 'Monthly', icon: Calendar, description: 'Once a month' },
    { id: 'yearly', label: 'Yearly', icon: Calendar, description: 'Once a year' },
  ];
  const priorities: Priority[] = [
    { id: 'low', label: 'Low', color: '#10B981', bgColor: 'bg-emerald-500', description: 'Nice to have' },
    { id: 'medium', label: 'Medium', color: '#F59E0B', bgColor: 'bg-amber-500', description: 'Important' },
    { id: 'high', label: 'High', color: '#EF4444', bgColor: 'bg-red-500', description: 'Critical' },
  ];

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const doc = await databases.getDocument(DB_ID, COLLECTION_ID, id);
        setGoalTitle(doc.title);
        setGoalDescription(doc.description || '');
        setSelectedCategory(doc.category);
        setSelectedFrequency(doc.frequency);
        setSelectedPriority(doc.priority);
        setTargetValue(doc.targetValue);
        setReward(doc.reward || '');
        setMotivationalQuote(doc.motivationalQuote || '');
        setUnit(doc.unit || '');
        setCustomUnit(doc.customUnit || '');

      } catch (err:any) {
        console.error(err);
        setErrorMessage('Failed to load goal.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSave = async () => {
    if (!user) return;
    if (!goalTitle.trim() || !selectedCategory) return;
    setSaving(true);
    try {
    await databases.updateDocument(
  DB_ID,
  COLLECTION_ID,
  id!,
  {
    title: goalTitle,
    description: goalDescription,
    category: selectedCategory,
    frequency: selectedFrequency,
    priority: selectedPriority,
    targetValue,
    reward,
    motivationalQuote,
    unit,
    customUnit,
  }
);

      router.push('/');
    } catch (err:any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-dark-900 justify-center items-center">
        <ActivityIndicator size="large" color="#6366F1" />
        <Text className="mt-2 text-gray-400">Loading goal…</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-dark-900"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
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
          Edit Goal
        </Text>
        <View style={{ width: 32 }} />
      </LinearGradient>

      <ScrollView
        className="flex-1 px-5 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {errorMessage && (
          <View className="bg-red-500/20 border border-red-500 rounded-xl px-4 py-3 mb-4">
            <Text className="text-red-400 text-base text-center">{errorMessage}</Text>
          </View>
        )}

        {/* Title */}
        <View className="mb-6">
          <Text className="text-white text-lg mb-2">Goal Title *</Text>
          <TextInput
            className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-white"
            value={goalTitle}
            onChangeText={setGoalTitle}
            placeholder="What do you want to achieve?"
            placeholderTextColor="#64748B"
          />
        </View>

        {/* Description */}
        <View className="mb-6">
          <Text className="text-white text-lg mb-2">Description</Text>
          <TextInput
            className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-white h-24"
            value={goalDescription}
            onChangeText={setGoalDescription}
            placeholder="Why is this goal important?"
            placeholderTextColor="#64748B"
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Category */}
        <View className="mb-6">
          <Text className="text-white text-lg mb-2">Category *</Text>
          <View className="flex-row flex-wrap justify-between">
            {categories.map(cat => {
              const Icon = cat.icon;
              const sel = selectedCategory === cat.id;
              return (
   <TouchableOpacity
  key={cat.id}
  onPress={() => setSelectedCategory(cat.id)}
  className={`w-[48%] rounded-xl p-3 mb-3 items-center ${
    sel ? `${cat.bgColor} border-indigo-500` : 'bg-dark-800 border-dark-700'
  }`}
  activeOpacity={0.7}
>
  <View className={`rounded-full p-3 mb-2 ${sel ? cat.bgColor : 'bg-dark-700'}`}>
    <Icon size={24} color={sel ? '#FFF' : cat.color} strokeWidth={2} />
  </View>
  <Text className={`text-center ${sel ? 'text-white' : 'text-gray-400'}`}>
    {cat.label}
  </Text>
</TouchableOpacity>

              );
            })}
          </View>
        </View>

        {/* Frequency */}
        <View className="mb-6">
          <Text className="text-white text-lg mb-2">Frequency</Text>
          <View className="flex-row justify-between">
            {frequencies.map(freq => {
              const sel = selectedFrequency === freq.id;
              return (
                <TouchableOpacity
                  key={freq.id}
                  onPress={() => setSelectedFrequency(freq.id)}
                  className={`flex-1 mx-1 rounded-xl p-3 items-center ${
                    sel?'border-indigo-500 bg-indigo-500/10':'border-dark-700 bg-dark-800'
                  }`}
                  activeOpacity={0.7}
                >
                  <Text className={sel?'text-indigo-400':'text-gray-400'}>
                    {freq.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Priority */}
        <View className="mb-6">
          <Text className="text-white text-lg mb-2">Priority Level</Text>
          <View className="flex-row justify-between">
            {priorities.map(pri => {
              const sel = selectedPriority === pri.id;
              return (
                <TouchableOpacity
                  key={pri.id}
                  onPress={() => setSelectedPriority(pri.id)}
                  className={`flex-1 mx-1 rounded-xl p-3 flex-row justify-center items-center ${
                    sel?`${pri.bgColor}/20 border-[${pri.color}]`:'bg-dark-800 border-dark-700'
                  }`}
                  activeOpacity={0.7}
                  style={sel?{ borderColor: pri.color }:undefined}
                >
                  <Flag size={16} color={sel?pri.color:'#64748B'} strokeWidth={2}/>
                  <Text className={`ml-2 ${sel?'text-white':'text-gray-400'}`}>
                    {pri.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

      {/* Target Value */}
<View className="mb-6">
  <Text className="text-white text-lg mb-2">Target Value</Text>
  <TextInput
    className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-4 text-white text-base font-inter mb-3"
    value={targetValue ? String(targetValue) : ''}
    onChangeText={text => setTargetValue(Number(text))}
    keyboardType="numeric"
    placeholder="Enter the number e.g. 10000"
    placeholderTextColor="#64748B"
  />

  <Text className="text-white text-lg font-inter-semibold mb-2 mt-4">Unit</Text>
  <View className="bg-dark-800 border border-dark-700 rounded-xl mb-3">
    {['steps', 'USD', 'minutes', 'km', 'sessions', 'custom'].map((unitOption) => (
      <TouchableOpacity
        key={unitOption}
        className={`px-4 py-3 ${
          unit === unitOption ? 'bg-indigo-500/20 border-l-4 border-indigo-500' : ''
        }`}
        onPress={() => {
          setUnit(unitOption);
          if (unitOption !== 'custom') setCustomUnit('');
        }}
      >
        <Text className={`text-base font-inter ${
          unit === unitOption ? 'text-indigo-400' : 'text-gray-400'
        }`}>
          {unitOption === 'custom' ? 'Custom Unit' : unitOption}
        </Text>
      </TouchableOpacity>
    ))}
  </View>

  {unit === 'custom' && (
    <TextInput
      className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-4 text-white text-base font-inter"
      value={customUnit}
      onChangeText={setCustomUnit}
      placeholder="Enter your custom unit (e.g. pages, reps)"
      placeholderTextColor="#64748B"
    />
  )}
</View>


        {/* Reward */}
        <View className="mb-6">
          <Text className="text-white text-lg mb-2">Reward</Text>
          <TextInput
            className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-white"
            value={reward}
            onChangeText={setReward}
            placeholder="How will you celebrate?"
            placeholderTextColor="#64748B"
          />
        </View>

        {/* Mantra */}
        <View className="mb-12">
          <Text className="text-white text-lg mb-2">Personal Mantra</Text>
          <TextInput
            className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-white"
            value={motivationalQuote}
            onChangeText={setMotivationalQuote}
            placeholder="A motivating quote"
            placeholderTextColor="#64748B"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          disabled={saving || !goalTitle.trim() || !selectedCategory}
          className={`${saving||!goalTitle.trim()||!selectedCategory?'opacity-50':''} mb-24`}
        >
          <LinearGradient
            colors={saving?['#334155','#334155']:['#6366F1','#8B5CF6']}
            start={{ x:0,y:0 }}
            end={{ x:1,y:1 }}
            className="flex-row items-center justify-center py-4 rounded-xl"
          >
            <Zap size={20} color="#FFF" strokeWidth={2}/>
            <Text className="ml-2 text-white font-semibold">
              {saving ? 'Saving…' : 'Save Changes'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
