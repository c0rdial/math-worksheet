<template>
  <div class="mb-8">
    <h3 class="text-lg font-bold mb-2">Scoreboard</h3>
    <div v-if="scores.length === 0" class="text-gray-500 text-sm">No scores yet. Be the first to complete the worksheet!</div>
    <table v-else class="min-w-full bg-white border rounded-lg overflow-hidden">
      <thead class="bg-purple-100">
        <tr>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">#</th>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Name</th>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Score</th>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Stars</th>
          <th class="px-4 py-2 text-left text-xs font-medium text-gray-700">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, idx) in scores" :key="entry.date + entry.name" :class="idx % 2 === 0 ? 'bg-white' : 'bg-purple-50'">
          <td class="px-4 py-2">{{ idx + 1 }}</td>
          <td class="px-4 py-2 font-medium">{{ entry.name }}</td>
          <td class="px-4 py-2">{{ entry.score }}</td>
          <td class="px-4 py-2">{{ entry.stars }}</td>
          <td class="px-4 py-2 text-xs text-gray-500">{{ formatDate(entry.date) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const scores = ref([]);

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

onMounted(() => {
  const savedScores = JSON.parse(localStorage.getItem('mathWorksheetScores') || '[]');
  // Sort by score descending, then by date descending
  scores.value = savedScores.sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date));
});
</script>
