<template>
  <div class="text-center py-6">
    <img src="/src/assets/math.png" alt="Math worksheet" class="mx-auto mb-6" />
    <h2 class="text-xl font-bold mb-4">Welcome to Math Rounding!</h2>
    <p class="text-gray-600 mb-6">Master the skill of rounding numbers to the nearest 10 with this interactive worksheet.</p>
    <div class="mb-6">
      <label class="block text-sm font-medium text-left mb-1">Your Name:</label>
      <input 
        :value="userName"
        @input="$emit('update:userName', $event.target.value)"
        type="text" 
        placeholder="Enter your name" 
        class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        :class="{ 'border-red-500': showNameError }"
        autocomplete="off"
      />
    </div>
    <div class="flex justify-center">
      <button 
        @click="startWorksheet" 
        class="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
      >
        Start Worksheet
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  userName: String,
  showNameError: Boolean,
  startWorksheet: Function
});
</script>
