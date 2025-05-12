<template>
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-3">
      <div class="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
        {{ userName ? userName.charAt(0).toUpperCase() : '?' }}
      </div>
      <div>
        <h2 class="font-medium">{{ userName || 'Student' }}</h2>
        <div class="flex items-center text-xs text-gray-500">
          <Star class="w-3.5 h-3.5 text-yellow-500 mr-1" fill="currentColor" />
          <span>Level {{ userLevel }}</span>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-3">
        <div class="text-center">
          <button @click="$emit('scoreboard')" class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-purple-100 transition-colors" aria-label="View Scoreboard">
            <Trophy class="w-6 h-6 text-purple-600" />
          </button>
        </div>
      <div class="text-center">
        <div class="text-sm font-medium">Streak</div>
        <div class="flex items-center justify-center">
          <Flame class="w-4 h-4 text-orange-500 mr-1" fill="currentColor" />
          <span class="font-bold">{{ streak }}</span>
        </div>
      </div>
      <div class="text-center">
        <div class="text-sm font-medium">Stars</div>
        <div class="flex items-center justify-center">
          <Star class="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
          <span class="font-bold">{{ stars }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Star, Flame, Trophy } from 'lucide-vue-next';
const props = defineProps({
  userName: String,
  userLevel: Number,
  streak: Number,
  stars: Number
});
</script>
