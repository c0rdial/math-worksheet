<template>
  <div v-if="showConfetti" class="confetti-container">
    <div v-for="i in 50" :key="i" class="confetti" :style="getConfettiStyle(i)"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  showConfetti: Boolean,
  getConfettiStyle: Function
});
</script>

<style scoped>
.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 10;
}
.confetti {
  position: absolute;
  border-radius: 0;
  animation: fall linear forwards;
}
@keyframes fall {
  0% {
    transform: translateY(-10px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}
</style>
