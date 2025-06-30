import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Target, Calendar, Clock, Flag, Heart, DollarSign, BookOpen, Briefcase, Users, Zap, Star, CircleCheck as CheckCircle, X, Sparkles } from 'lucide-react-native';
import { useAuth } from '@/lib/auth-context';
import { Databases, ID } from 'react-native-appwrite';
import { databases } from '@/lib/appwrite';
import { router } from 'expo-router';

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

interface Frequency {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
}

interface Priority {
  id: string;
  label: string;
  color: string;
  bgColor: string;
  description: string;
}

export default function AddGoalScreen() {
  const [goalTitle, setGoalTitle] = useState<string>('');
  const [goalDescription, setGoalDescription] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('daily');
  const [selectedPriority, setSelectedPriority] = useState<string>('medium');
  const [targetValue, setTargetValue] = useState<number>(0);
  const [unit, setUnit] = useState<string>('');
  const [customUnit, setCustomUnit] = useState<string>('');

  const [reward, setReward] = useState<string>('');
  const [motivationalQuote, setMotivationalQuote] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {user} = useAuth(); 

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

  const handleAddGoal = (): void => {
        if (!user) {
      return;
    }
    if (goalTitle.trim() && selectedCategory) {
      handleSubmit();
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form
        // setGoalTitle('');
        // setGoalDescription('');
        // setSelectedCategory('');
        // setTargetValue('');
        // setReward('');
        setMotivationalQuote('');
      }, 2500);
    }
  };

  const handleSubmit = async () => {

 
    try {
      await databases.createDocument(
        '6860a0d100098a25345c',      // database ID
        '6860a0f0002e2a54c8f1',      // collection ID (Goals)
        ID.unique(),                // document ID
        {
          title: goalTitle,
          description: goalDescription,
          category: selectedCategory,
          frequency: selectedFrequency,
          priority: selectedPriority,
          targetValue,
          customUnit,
          unit ,
          reward,
          motivationalQuote,
          userId: user?.$id,
          createdAt: new Date().toISOString(),
        }
      );
      setShowSuccess(true);
      router.push('/'); // Navigate to home after successful goal creation

    } catch (error: any) {
      console.error('Failed to save goal:', error);
      setErrorMessage(error.message || 'An unexpected error occurred while saving the goal.');
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-dark-900"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
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
          <Text className="text-white text-2xl font-poppins-bold mb-2">Create New Goal</Text>
          <Text className="text-white/80 text-base font-inter text-center">
            Transform your dreams into achievable milestones
          </Text>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {/* Error Message */}
        {errorMessage && (
          <View className="bg-red-500/20 border border-red-500 rounded-xl px-4 py-3 mb-4">
            <Text className="text-red-400 text-base font-inter text-center">{errorMessage}</Text>
          </View>
        )}

        {/* Goal Title */}
        <View className="mb-6">
          <Text className="text-white text-lg font-inter-semibold mb-3">Goal Title *</Text>
          <TextInput
            className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-4 text-white text-base font-inter"
            value={goalTitle}
            onChangeText={setGoalTitle}
            placeholder="What do you want to achieve?"
            placeholderTextColor="#64748B"
          />
        </View>

        {/* Goal Description */}
        <View className="mb-6">
          <Text className="text-white text-lg font-inter-semibold mb-3">Description</Text>
          <TextInput
            className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-4 text-white text-base font-inter h-20"
            value={goalDescription}
            onChangeText={setGoalDescription}
            placeholder="Why is this goal important to you?"
            placeholderTextColor="#64748B"
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Category Selection */}
        <View className="mb-6">
          <Text className="text-white text-lg font-inter-semibold mb-3">Category *</Text>
          <View className="flex-row flex-wrap justify-between">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
<TouchableOpacity
  key={category.id}
  className={`w-[48%] rounded-xl p-4 items-center mb-3 
    ${isSelected ? `${category.bgColor} border-indigo-500` : 'bg-dark-800 border-dark-700'}
  `}
  onPress={() => setSelectedCategory(category.id)}
  activeOpacity={0.7}
>


                  <View className={`rounded-full p-3 mb-2 ${isSelected ? category?.bgColor : 'bg-dark-700'}`}>
                    <IconComponent 
                      size={24} 
                      color={isSelected ? '#FFFFFF' : category.color} 
                      strokeWidth={2} 
                    />
                  </View>
                  <Text className={`text-sm font-inter-medium ${isSelected ? 'text-white' : 'text-dark-400'}`}>
                    {category.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Frequency */}
        <View className="mb-6">
          <Text className="text-white text-lg font-inter-semibold mb-3">Frequency</Text>
          <View className="flex-row justify-between">
            {frequencies.map((freq) => {
              const isSelected = selectedFrequency === freq.id;
              return (
                <TouchableOpacity
                  key={freq.id}
                  className={`flex-1 mx-1 bg-dark-800 border rounded-xl p-3 items-center ${
                    isSelected ? 'border-indigo-500 bg-indigo-500/10' : 'border-dark-700'
                  }`}
                  onPress={() => setSelectedFrequency(freq.id)}
                  activeOpacity={0.7}
                >
                  <Text className={`text-sm font-inter-semibold ${isSelected ? 'text-indigo-400' : 'text-dark-400'}`}>
                    {freq.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Priority */}
        <View className="mb-6">
          <Text className="text-white text-lg font-inter-semibold mb-3">Priority Level</Text>
          <View className="flex-row justify-between">
            {priorities.map((priority) => {
              const isSelected = selectedPriority === priority.id;
              return (
                <TouchableOpacity
                  key={priority.id}
                  className={`flex-1 mx-1 bg-dark-800 border rounded-xl p-3 items-center flex-row justify-center ${
                    isSelected ? `border-[${priority.color}]` : 'border-dark-700'
                  }`}
                  onPress={() => setSelectedPriority(priority.id)}
                  activeOpacity={0.7}
                  style={isSelected ? { backgroundColor: priority.color + '20', borderColor: priority.color } : {}}
                >
                  <Flag 
                    size={16} 
                    color={isSelected ? priority.color : '#64748B'} 
                    strokeWidth={2} 
                  />
                  <Text 
                    className={`text-sm font-inter-semibold ml-2 ${isSelected ? 'text-white' : 'text-dark-400'}`}
                    style={isSelected ? { color: priority.color } : {}}
                  >
                    {priority.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

{/* Target Value */}
<View className="mb-6">
  <Text className="text-white text-lg font-inter-semibold mb-3">Target Value</Text>
  <TextInput
    className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-4 text-white text-base font-inter mb-3"
    value={targetValue ? String(targetValue) : ''}
    onChangeText={text => setTargetValue(Number(text))}
    keyboardType="numeric"
    placeholder="Enter the number e.g. 10000"
    placeholderTextColor="#64748B"
  />

  <Text className="text-white text-lg font-inter-semibold mb-3">Unit</Text>
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
        <Text
          className={`text-base font-inter ${
            unit === unitOption ? 'text-indigo-400' : 'text-gray-400'
          }`}
        >
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
          <Text className="text-white text-lg font-inter-semibold mb-3">Reward for Completion</Text>
          <TextInput
            className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-4 text-white text-base font-inter"
            value={reward}
            onChangeText={setReward}
            placeholder="How will you celebrate achieving this goal?"
            placeholderTextColor="#64748B"
          />
        </View>

        {/* Motivational Quote */}
        <View className="mb-6">
          <Text className="text-white text-lg font-inter-semibold mb-3">Personal Mantra</Text>
          <TextInput
            className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-4 text-white text-base font-inter"
            value={motivationalQuote}
            onChangeText={setMotivationalQuote}
            placeholder="A quote or phrase that motivates you"
            placeholderTextColor="#64748B"
          />
        </View>

        {/* Create Button */}
        <TouchableOpacity
          className={`mb-24 ${(!goalTitle.trim() || !selectedCategory) ? 'opacity-50' : ''}`}
          onPress={handleAddGoal}
          disabled={!goalTitle.trim() || !selectedCategory}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={(!goalTitle.trim() || !selectedCategory) ? ['#334155', '#334155'] : ['#6366F1', '#8B5CF6']}
            className="flex-row items-center justify-center py-4 px-8 rounded-xl"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Sparkles size={20} color="#FFFFFF" strokeWidth={2} />
            <Text className="text-white text-lg font-inter-semibold ml-2">Create Goal</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* Success Modal */}
      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
      >
        <View className="flex-1 bg-black/80 justify-center items-center px-10">
          <View className="bg-dark-800 border border-dark-700 rounded-2xl p-8 items-center max-w-sm w-full">
            <View className="bg-emerald-500/20 rounded-full p-4 mb-4">
              <CheckCircle size={48} color="#10B981" strokeWidth={2} />
            </View>
            <Text className="text-white text-2xl font-poppins-bold mb-2">Goal Created!</Text>
            <Text className="text-dark-400 text-base font-inter text-center leading-6">
              Your goal has been added successfully. Time to start achieving greatness!
            </Text>
            <View className="flex-row items-center mt-4">
              <Zap size={16} color="#F59E0B" strokeWidth={2} />
              <Text className="text-amber-400 text-sm font-inter-medium ml-1">Ready to conquer!</Text>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}