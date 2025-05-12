<template>
  <div class="py-4">
    <div class="text-center mb-8">
      <div class="inline-block p-4 rounded-full bg-purple-100 mb-4">
        <Award class="w-12 h-12 text-purple-600" />
      </div>
      <h2 class="text-2xl font-bold mb-2">Great Job!</h2>
      <p class="text-gray-600 mb-4">
        You've completed the worksheet, {{ userName }}!
      </p>
      <div class="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
        {{ score }} / {{ questions.length }}
      </div>
      <p class="text-gray-600 mb-6">
        {{ scoreMessage }}
      </p>
      <div class="bg-purple-50 rounded-lg p-4 mb-6 inline-block">
        <h3 class="font-medium mb-2">Rewards Earned:</h3>
        <div class="flex gap-4 justify-center">
          <div class="text-center">
            <div class="flex items-center justify-center">
              <Star class="w-6 h-6 text-yellow-500" fill="currentColor" />
              <span class="text-lg font-bold ml-1">+{{ earnedStars }}</span>
            </div>
            <div class="text-xs text-gray-600">Stars</div>
          </div>
          <div class="text-center">
            <div class="flex items-center justify-center">
              <Zap class="w-6 h-6 text-blue-500" fill="currentColor" />
              <span class="text-lg font-bold ml-1">+{{ Math.round(score * 10) }}</span>
            </div>
            <div class="text-xs text-gray-600">XP</div>
          </div>
          <div v-if="streak > 0" class="text-center">
            <div class="flex items-center justify-center">
              <Flame class="w-6 h-6 text-orange-500" fill="currentColor" />
              <span class="text-lg font-bold ml-1">{{ streak }}</span>
            </div>
            <div class="text-xs text-gray-600">Day Streak</div>
          </div>
        </div>
      </div>
    </div>
    <div class="border rounded-lg overflow-hidden mb-6">
      <div class="bg-gray-50 p-3 border-b">
        <h3 class="font-medium">Question Summary</h3>
      </div>
      <div class="divide-y">
        <div v-for="(question, index) in questions" :key="index" class="flex justify-between items-center p-3 hover:bg-gray-50 transition-colors">
          <div>
            <span class="font-medium">Round {{ question.number }} to nearest 10:</span>
          </div>
          <div class="flex items-center gap-3">
            <span :class="userAnswers[index] === question.correctAnswer ? 'text-green-600 font-medium' : 'text-red-600'">
              {{ userAnswers[index] || 'Skipped' }}
            </span>
            <CheckCircle v-if="userAnswers[index] === question.correctAnswer" class="w-5 h-5 text-green-600" />
            <XCircle v-else-if="userAnswers[index]" class="w-5 h-5 text-red-600" />
            <AlertCircle v-else class="w-5 h-5 text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-3 justify-between">
      <button @click="resetWorksheet" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
        Try Again
      </button>
      <button @click="saveScore" class="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors">
        Save & Continue
      </button>
    </div>
  </div>
</template>

<script setup>
import { Award, Star, Zap, Flame, CheckCircle, XCircle, AlertCircle } from 'lucide-vue-next';
const props = defineProps({
  userName: String,
  score: Number,
  questions: Array,
  scoreMessage: String,
  earnedStars: Number,
  streak: Number,
  userAnswers: Array,
  resetWorksheet: Function,
  saveScore: Function
});
</script>
