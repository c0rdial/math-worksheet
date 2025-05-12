<template>
  <div class="mb-6">
    <div class="flex justify-between text-sm mb-1">
      <span>Progress</span>
      <span class="text-purple-600 font-medium">{{ progressPercentage }}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
      <div 
        class="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500" 
        :style="{ width: `${progressPercentage}%` }"
      ></div>
    </div>
    <div class="flex justify-between text-sm mt-1 text-gray-600">
      <span>Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</span>
      <span>{{ questions.length - currentQuestionIndex - 1 }} remaining</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  progressPercentage: Number,
  currentQuestionIndex: Number,
  questions: Array
});
</script>
