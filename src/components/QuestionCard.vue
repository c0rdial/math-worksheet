<template>
  <div 
    class="border rounded-lg p-6 mb-6 bg-white shadow-sm transition-all duration-300 transform"
    :class="{
      'border-purple-200': !answerSubmitted,
      'border-green-300': answerSubmitted && isCorrect,
      'border-red-300': answerSubmitted && !isCorrect
    }"
  >
    <!-- Timer -->
    <div class="flex justify-end mb-2">
      <div class="text-sm font-medium flex items-center">
        <Clock class="w-4 h-4 mr-1 text-gray-500" />
        <span>{{ formatTime(questionTimer) }}</span>
      </div>
    </div>
    <h2 class="text-lg font-medium mb-4">Question {{ currentQuestionIndex + 1 }}</h2>
    <div class="mb-6">
      <p class="text-lg font-medium">
        Round <span class="text-purple-600 font-bold text-xl">{{ currentQuestion.number }}</span> to the nearest 10 is..
      </p>
      <p class="text-gray-600 text-sm mt-2">
        Choose the number that is closest to the given number when rounded to the nearest 10
      </p>
    </div>
    <!-- Number line visualization -->
    <div class="relative h-16 mb-6 hidden sm:block">
      <div class="absolute top-8 left-0 right-0 h-1 bg-gray-300"></div>
      <div v-for="n in 11" :key="`tick-${n}`" class="absolute top-6 w-0.5 h-4 bg-gray-400" :style="{ left: `${(n-1) * 10}%` }"></div>
      <div v-for="n in 11" :key="`label-${n}`" class="absolute top-12 text-xs font-medium text-gray-600" :style="{ left: `${(n-1) * 10}%`, transform: 'translateX(-50%)' }">
        {{ (n-1) * 10 }}
      </div>
      <div class="absolute top-0 w-4 h-4 bg-purple-500 rounded-full transform -translate-x-1/2" :style="{ left: `${currentQuestion.number}%` }"></div>
      <div v-if="answerSubmitted" class="absolute top-0 w-6 h-6 border-2 rounded-full transform -translate-x-1/2 transition-all duration-500" :class="isCorrect ? 'border-green-500' : 'border-red-500'" :style="{ left: `${currentQuestion.correctAnswer}%` }"></div>
    </div>
    <!-- Answer options -->
    <div class="space-y-3 mt-6">
      <div v-for="option in currentQuestion.options" :key="option" class="border rounded-lg p-4 cursor-pointer transition-all duration-200 transform hover:scale-[1.02]" :class="getOptionClass(option)" @click="!answerSubmitted && selectAnswer(option)">
        <div class="flex items-center">
          <div class="w-5 h-5 rounded-full border mr-3 flex items-center justify-center transition-all" :class="getRadioClass(option)">
            <Check v-if="userAnswers[currentQuestionIndex] === option" class="w-3 h-3 text-white" />
          </div>
          <label class="text-lg font-medium cursor-pointer">{{ option }}</label>
        </div>
      </div>
    </div>
    <!-- Feedback after answering -->
    <div v-if="answerSubmitted" class="mt-4 p-3 rounded-lg text-sm" :class="isCorrect ? 'bg-green-50' : 'bg-red-50'">
      <p :class="isCorrect ? 'text-green-800' : 'text-red-800'">
        <span class="font-medium">{{ isCorrect ? 'Correct!' : 'Not quite right.' }}</span> 
        {{ currentQuestion.number }} rounded to the nearest 10 is {{ currentQuestion.correctAnswer }}.
        <span v-if="!isCorrect" class="block mt-1">
          The ones digit is {{ currentQuestion.number % 10 }}, which {{ currentQuestion.number % 10 >= 5 ? 'is 5 or greater, so we round up.' : 'is less than 5, so we round down.' }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { Clock, Check } from 'lucide-vue-next';
const props = defineProps({
  currentQuestion: Object,
  currentQuestionIndex: Number,
  userAnswers: Array,
  answerSubmitted: Boolean,
  isCorrect: Boolean,
  questionTimer: Number,
  formatTime: Function,
  getOptionClass: Function,
  getRadioClass: Function,
  selectAnswer: Function
});
</script>
