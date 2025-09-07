<template>
  <div class="space-y-8">
    <!-- Welcome Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">
        Welcome back, {{ authStore.user?.username }}! 👋
      </h1>
      <p class="text-gray-600 text-lg">
        Ready to spread some kindness today?
      </p>
    </div>

    <!-- User Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="card">
        <div class="flex items-center">
          <div class="p-3 bg-primary-100 rounded-lg">
            <span class="text-2xl">🏆</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Points</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ userStats?.totalPoints || 0 }}
            </p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 bg-success-100 rounded-lg">
            <span class="text-2xl">🔥</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Streak Days</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ userStats?.streakDays || 0 }}
            </p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 bg-warning-100 rounded-lg">
            <span class="text-2xl">📊</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Deeds</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ userStats?.totalDeeds || 0 }}
            </p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-lg">
            <span class="text-2xl">📅</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">This Week</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ userStats?.thisWeekDeeds || 0 }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Daily Challenge Section -->
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Today's Challenge</h2>
          <p class="text-gray-600">Complete this act of kindness to earn points!</p>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-500">{{ today }}</p>
          <div v-if="deedsStore.getCompletedToday" class="badge badge-success mt-1">
            ✅ Completed Today
          </div>
        </div>
      </div>

      <div v-if="deedsStore.loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        <p class="text-gray-600 mt-2">Loading today's challenge...</p>
      </div>

      <div v-else-if="deedsStore.dailyChallenge" class="space-y-6">
        <!-- Challenge Card -->
        <div class="bg-gradient-to-r from-primary-50 to-success-50 rounded-xl p-6 border border-primary-200">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                {{ deedsStore.dailyChallenge.title }}
              </h3>
              <p class="text-gray-700 mb-4">
                {{ deedsStore.dailyChallenge.description }}
              </p>
              <div class="flex items-center space-x-4">
                <span class="badge badge-primary">
                  {{ deedsStore.dailyChallenge.points }} points
                </span>
                <span class="badge badge-warning">
                  {{ deedsStore.dailyChallenge.category }}
                </span>
              </div>
            </div>
            <div class="ml-4">
              <div class="w-16 h-16 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center">
                <span class="text-white text-2xl">❤️</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Completion Form -->
        <div v-if="!deedsStore.getCompletedToday" class="space-y-4">
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              How did you complete this challenge? (Optional)
            </label>
            <textarea
              id="description"
              v-model="completionDescription"
              rows="3"
              class="input-field"
              placeholder="Share your experience or leave blank..."
            ></textarea>
          </div>

          <button
            @click="completeChallenge"
            :disabled="deedsStore.loading"
            class="btn-success w-full flex justify-center items-center"
          >
            <span v-if="deedsStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
            {{ deedsStore.loading ? 'Completing...' : 'Complete Challenge' }}
          </button>
        </div>

        <div v-else class="text-center py-4">
          <div class="inline-flex items-center px-4 py-2 bg-success-100 text-success-800 rounded-full">
            <span class="text-xl mr-2">🎉</span>
            <span class="font-medium">Challenge completed today!</span>
          </div>
          <p class="text-gray-600 mt-2">Come back tomorrow for a new challenge!</p>
        </div>
      </div>

      <div v-else class="text-center py-8">
        <div class="text-gray-400 text-6xl mb-4">😔</div>
        <p class="text-gray-600">No challenge available today. Check back later!</p>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Recent Activity</h2>
        <router-link to="/profile" class="text-primary-600 hover:text-primary-500 text-sm font-medium">
          View All →
        </router-link>
      </div>

      <div v-if="deedHistory.length === 0" class="text-center py-8">
        <div class="text-gray-400 text-4xl mb-2">📝</div>
        <p class="text-gray-600">No recent activity yet. Complete your first challenge to see it here!</p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="deed in deedHistory.slice(0, 5)"
          :key="deed.id"
          class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center">
              <span class="text-white text-sm">❤️</span>
            </div>
            <div>
              <p class="font-medium text-gray-900">{{ deed.deed_type }}</p>
              <p class="text-sm text-gray-600">{{ formatDate(deed.completed_at) }}</p>
            </div>
          </div>
          <div class="text-right">
            <span class="badge badge-success">+{{ deed.points_earned }} pts</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <router-link
        to="/challenges"
        class="card hover:shadow-md transition-shadow cursor-pointer group"
      >
        <div class="text-center">
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
            <span class="text-2xl">🎯</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">All Challenges</h3>
          <p class="text-gray-600 text-sm">Browse all available kindness challenges</p>
        </div>
      </router-link>

      <router-link
        to="/leaderboard"
        class="card hover:shadow-md transition-shadow cursor-pointer group"
      >
        <div class="text-center">
          <div class="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-success-200 transition-colors">
            <span class="text-2xl">🏆</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Leaderboard</h3>
          <p class="text-gray-600 text-sm">See how you rank among kind people</p>
        </div>
      </router-link>

      <router-link
        to="/profile"
        class="card hover:shadow-md transition-shadow cursor-pointer group"
      >
        <div class="text-center">
          <div class="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-warning-200 transition-colors">
            <span class="text-2xl">👤</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Profile</h3>
          <p class="text-gray-600 text-sm">View your stats and achievements</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useDeedsStore } from '@/stores/deeds'

const authStore = useAuthStore()
const deedsStore = useDeedsStore()

const completionDescription = ref('')
const deedHistory = ref([])

const today = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const userStats = computed(() => deedsStore.userStats)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const completeChallenge = async () => {
  if (!deedsStore.dailyChallenge) return

  const result = await deedsStore.completeChallenge(
    deedsStore.dailyChallenge.id,
    completionDescription.value
  )

  if (result.success) {
    completionDescription.value = ''
    await loadDeedHistory()
  }
}

const loadDeedHistory = async () => {
  const pagination = await deedsStore.fetchDeedHistory(1, 5)
  deedHistory.value = deedsStore.deedHistory
}

onMounted(async () => {
  await Promise.all([
    deedsStore.fetchDailyChallenge(),
    deedsStore.fetchUserStats(),
    loadDeedHistory()
  ])
})
</script> 