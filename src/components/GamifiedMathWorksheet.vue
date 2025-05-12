<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex justify-center items-center p-4">
    <div class="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative overflow-hidden">
      <!-- Confetti animation when getting correct answers -->
      <Confetti :showConfetti="showConfetti" :getConfettiStyle="getConfettiStyle" />
      
      <!-- Header with avatar and stats -->
      <HeaderStats 
        :userName="userName" 
        :userLevel="userLevel" 
        :streak="streak" 
        :stars="stars"
        @scoreboard="goToScoreboard"
      />
      
      <h1 class="text-2xl font-bold text-center mb-6">
        Rounding Off to Nearest 10
      </h1>
      
      <!-- Welcome screen -->
      <WelcomeScreen v-if="currentScreen === 'welcome'"
        :userName="userName"
        :showNameError="showNameError"
        :startWorksheet="startWorksheet"
        @update:userName="val => userName = val"
      />
      
      <!-- Question screen -->
      <div v-if="currentScreen === 'question'">
        <ProgressBar :progressPercentage="progressPercentage" :currentQuestionIndex="currentQuestionIndex" :questions="questions" />
        <QuestionCard
          :currentQuestion="currentQuestion"
          :currentQuestionIndex="currentQuestionIndex"
          :userAnswers="userAnswers"
          :answerSubmitted="answerSubmitted"
          :isCorrect="isCorrect"
          :questionTimer="questionTimer"
          :formatTime="formatTime"
          :getOptionClass="getOptionClass"
          :getRadioClass="getRadioClass"
          :selectAnswer="selectAnswer"
        />
        <!-- Navigation buttons -->
        <div class="flex gap-3 justify-between">
          <button 
            v-if="!answerSubmitted"
            @click="skipQuestion" 
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Skip
          </button>
          <button 
            v-else
            @click="previousQuestion" 
            class="bg-gray-600 text-white rounded-lg flex items-center gap-2 hover:bg-gray-700 px-4 py-2 min-w-0 w-auto whitespace-nowrap font-medium shadow-sm transition-all duration-150"
            :disabled="currentQuestionIndex === 0"
            :class="{ 'opacity-50 cursor-not-allowed': currentQuestionIndex === 0 }"
            style="width: auto; min-width: 0;"
          >
            <ChevronLeft class="w-5 h-5 -ml-1" />
            <span class="inline-block align-middle">Previous</span>
          </button>
          <button 
            v-if="!answerSubmitted" 
            @click="checkAnswer" 
            class="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
            :disabled="userAnswers[currentQuestionIndex] === undefined || userAnswers[currentQuestionIndex] === null"
            :class="{ 'opacity-50 cursor-not-allowed': userAnswers[currentQuestionIndex] === undefined || userAnswers[currentQuestionIndex] === null }"
          >
            Check Answer
          </button>
          <button 
            v-else-if="currentQuestionIndex < questions.length - 1" 
            @click="nextQuestion" 
            class="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg flex items-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-colors"
          >
            Next
            <ChevronRight class="w-5 h-5" />
          </button>
          <button 
            v-else
            @click="finishWorksheet" 
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Finish
          </button>
        </div>
      </div>
      
      <!-- Scoreboard component -->
      <Scoreboard v-if="currentScreen === 'scoreboard'" />
      <div v-if="currentScreen === 'scoreboard'" class="flex justify-center mt-4">
        <button @click="goBackFromScoreboard" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
          ← Back
        </button>
      </div>
      <!-- Results screen -->
      <ResultsScreen v-if="currentScreen === 'results'"
        :userName="userName"
        :score="score"
        :questions="questions"
        :scoreMessage="scoreMessage"
        :earnedStars="earnedStars"
        :streak="streak"
        :userAnswers="userAnswers"
        :resetWorksheet="resetWorksheet"
        :saveScore="saveScore"
      />
      
      <!-- Copyright footer -->
      <div class="mt-8 pt-4 border-t text-center text-xs text-gray-500">
        <p>Content and questions provided by <a href="https://www.mathinenglish.com" class="text-purple-600 hover:underline">www.mathinenglish.com</a></p>
        <p class="mt-1">Front End Assesment for Bridge International</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue';
import HeaderStats from './HeaderStats.vue';
import WelcomeScreen from './WelcomeScreen.vue';
import Confetti from './Confetti.vue';
import ProgressBar from './ProgressBar.vue';
import QuestionCard from './QuestionCard.vue';
import ResultsScreen from './ResultsScreen.vue';
import Scoreboard from './Scoreboard.vue';
import { Trophy, CheckCircle, XCircle, ChevronLeft, ChevronRight, Check, Star, Flame, Award, Clock, Zap, AlertCircle, Save, Users } from 'lucide-vue-next';

// User data
const userName = ref('');
const showNameError = ref(false);
const highScore = ref(0);
const userLevel = ref(1);
const stars = ref(0);
const streak = ref(0);
const earnedStars = ref(0);

// Game state
const currentScreen = ref('welcome');
const currentQuestionIndex = ref(0);
const userAnswers = ref([]);
const score = ref(0);
const answerSubmitted = ref(false);
const isCorrect = ref(false);
const showConfetti = ref(false);

// Timer
const questionTimer = ref(30);
const timerInterval = ref(null);

// Define the questions
const questions = [
  { number: 17, options: [10, 20, 17], correctAnswer: 20 },
  { number: 42, options: [40, 50, 42], correctAnswer: 40 },
  { number: 25, options: [20, 30, 25], correctAnswer: 30 },
  { number: 78, options: [70, 80, 78], correctAnswer: 80 },
  { number: 35, options: [30, 40, 35], correctAnswer: 40 },
  { number: 61, options: [60, 70, 61], correctAnswer: 60 },
  { number: 95, options: [90, 100, 95], correctAnswer: 100 },
  { number: 12, options: [10, 20, 12], correctAnswer: 10 },
  { number: 55, options: [50, 60, 55], correctAnswer: 60 },
  { number: 88, options: [80, 90, 88], correctAnswer: 90 },
  { number: 3, options: [0, 10, 3], correctAnswer: 0 },
  { number: 74, options: [70, 80, 74], correctAnswer: 70 }
];

// Computed properties
const currentQuestion = computed(() => questions[currentQuestionIndex.value]);

const progressPercentage = computed(() => {
  const answeredCount = userAnswers.value.filter(answer => answer !== undefined).length;
  return Math.round((answeredCount / questions.length) * 100);
});

const scoreMessage = computed(() => {
  const percentage = (score.value / questions.length) * 100;
  if (percentage >= 90) return 'Excellent! You have mastered rounding!';
  if (percentage >= 70) return 'Good job! Keep practicing!';
  if (percentage >= 50) return 'Not bad! You\'re getting there!';
  return 'Keep practicing! You\'ll get better!';
});

// Methods
function startWorksheet() {
  if (!userName.value.trim()) {
    showNameError.value = true;
    return;
  }
  
  showNameError.value = false;
  currentScreen.value = 'question';
  startTimer();
}

function selectAnswer(option) {
  const answers = [...userAnswers.value];
  answers[currentQuestionIndex.value] = option;
  userAnswers.value = answers;
  if (!answerSubmitted.value) {
    clearInterval(timerInterval.value);
    answerSubmitted.value = true;
    isCorrect.value = userAnswers.value[currentQuestionIndex.value] === currentQuestion.value.correctAnswer;
    if (isCorrect.value) {
      showConfetti.value = true;
      setTimeout(() => {
        showConfetti.value = false;
      }, 2000);
    }
  }
}

function checkAnswer() {
  if (userAnswers.value[currentQuestionIndex.value] === undefined || userAnswers.value[currentQuestionIndex.value] === null) return;
  
  clearInterval(timerInterval.value);
  answerSubmitted.value = true;
  isCorrect.value = userAnswers.value[currentQuestionIndex.value] === currentQuestion.value.correctAnswer;
  
  if (isCorrect.value) {
    showConfetti.value = true;
    setTimeout(() => {
      showConfetti.value = false;
    }, 2000);
  }
}

function skipQuestion() {
  const answers = [...userAnswers.value];
  answers[currentQuestionIndex.value] = null;
  userAnswers.value = answers;
  
  if (currentQuestionIndex.value < questions.length - 1) {
    currentQuestionIndex.value++;
    answerSubmitted.value = false;
    resetTimer();
  } else {
    finishWorksheet();
  }
}

function nextQuestion() {
  if (currentQuestionIndex.value < questions.length - 1) {
    currentQuestionIndex.value++;
    answerSubmitted.value = false;
    resetTimer();
  } else {
    finishWorksheet();
  }
}

function previousQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    answerSubmitted.value = true; // Keep the answer submitted state when going back
  }
}

function finishWorksheet() {
  clearInterval(timerInterval.value);
  
  // Calculate score
  let correctCount = 0;
  questions.forEach((question, index) => {
    if (userAnswers.value[index] === question.correctAnswer) {
      correctCount++;
    }
  });
  
  score.value = correctCount;
  
  // Calculate rewards
  earnedStars.value = Math.ceil(score.value / 3);
  stars.value += earnedStars.value;
  
  // Update streak
  const lastPlayed = localStorage.getItem('mathWorksheetLastPlayed');
  const today = new Date().toDateString();
  
  if (lastPlayed) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastPlayed === yesterday.toDateString() || lastPlayed === today) {
      streak.value = parseInt(localStorage.getItem('mathWorksheetStreak') || '0') + 1;
    } else if (lastPlayed !== today) {
      streak.value = 1;
    }
  } else {
    streak.value = 1;
  }
  
  localStorage.setItem('mathWorksheetStreak', streak.value);
  localStorage.setItem('mathWorksheetLastPlayed', today);
  localStorage.setItem('mathWorksheetStars', stars.value);
  
  // Check if this is a new high score
  if (score.value > highScore.value) {
    highScore.value = score.value;
    localStorage.setItem('mathWorksheetHighScore', highScore.value);
    localStorage.setItem('mathWorksheetHighScoreName', userName.value);
  }
  
  // Calculate level based on total stars
  userLevel.value = Math.floor(stars.value / 10) + 1;
  localStorage.setItem('mathWorksheetLevel', userLevel.value);
  
  currentScreen.value = 'results';
}

function resetWorksheet() {
  currentQuestionIndex.value = 0;
  userAnswers.value = [];
  score.value = 0;
  answerSubmitted.value = false;
  isCorrect.value = false;
  currentScreen.value = 'question';
  resetTimer();
}

function saveScore() {
  // In a real application, this would send the score to a backend
  alert(`Score saved for ${userName.value}: ${score.value}/${questions.length}`);
  
  // For demonstration purposes, we'll just save to localStorage
  const savedScores = JSON.parse(localStorage.getItem('mathWorksheetScores') || '[]');
  savedScores.push({
    name: userName.value,
    score: score.value,
    stars: earnedStars.value,
    date: new Date().toISOString()
  });
  localStorage.setItem('mathWorksheetScores', JSON.stringify(savedScores));
  
  // Reset for another round
  resetWorksheet();
}

function getOptionClass(option) {
  if (!answerSubmitted.value) {
    return userAnswers.value[currentQuestionIndex.value] === option 
      ? 'bg-purple-50 border-purple-300' 
      : 'hover:border-gray-400';
  }
  
  if (option === currentQuestion.value.correctAnswer) {
    return 'bg-green-50 border-green-300';
  }
  
  if (userAnswers.value[currentQuestionIndex.value] === option && option !== currentQuestion.value.correctAnswer) {
    return 'bg-red-50 border-red-300';
  }
  
  return 'opacity-70';
}

function getRadioClass(option) {
  if (!answerSubmitted.value) {
    return userAnswers.value[currentQuestionIndex.value] === option 
      ? 'bg-purple-500 border-purple-500' 
      : 'border-gray-400';
  }
  
  if (option === currentQuestion.value.correctAnswer) {
    return 'bg-green-500 border-green-500';
  }
  
  if (userAnswers.value[currentQuestionIndex.value] === option && option !== currentQuestion.value.correctAnswer) {
    return 'bg-red-500 border-red-500';
  }
  
  return 'border-gray-300';
}

function startTimer() {
  clearInterval(timerInterval.value);
  questionTimer.value = 30;
  timerInterval.value = setInterval(() => {
    if (questionTimer.value > 0) {
      questionTimer.value--;
    } else {
      clearInterval(timerInterval.value);
      if (!answerSubmitted.value) {
        skipQuestion();
      }
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval.value);
  questionTimer.value = 30;
}

function formatTime(seconds) {
  return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
}

function getConfettiStyle(i) {
  const colors = ['#FFC700', '#FF0058', '#2E3191', '#41EAD4', '#FBFF12'];
  const size = Math.random() * 10 + 5;
  return {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
    left: `${Math.random() * 100}%`,
    top: `-${Math.random() * 20 + 10}px`,
    transform: `rotate(${Math.random() * 360}deg)`,
    animationDuration: `${Math.random() * 3 + 2}s`,
    animationDelay: `${Math.random() * 0.5}s`
  };
}

function goToScoreboard() {
  currentScreen.value = 'scoreboard';
}

function goBackFromScoreboard() {
  currentScreen.value = userName.value ? 'question' : 'welcome';
}

// Watch for name input to clear error
watch(userName, () => {
  if (userName.value.trim()) {
    showNameError.value = false;
  }
});

// Load saved data on mount
onMounted(() => {
  const savedHighScore = localStorage.getItem('mathWorksheetHighScore');
  if (savedHighScore) {
    highScore.value = parseInt(savedHighScore);
  }
  
  const savedStars = localStorage.getItem('mathWorksheetStars');
  if (savedStars) {
    stars.value = parseInt(savedStars);
  }
  
  const savedStreak = localStorage.getItem('mathWorksheetStreak');
  if (savedStreak) {
    streak.value = parseInt(savedStreak);
  }
  
  const savedLevel = localStorage.getItem('mathWorksheetLevel');
  if (savedLevel) {
    userLevel.value = parseInt(savedLevel);
  }
});

// Clean up on unmount
onUnmounted(() => {
  clearInterval(timerInterval.value);
});
</script>

<style scoped>
/* Confetti animation */
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

/* Other animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.border-red-500 {
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}
</style>