<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">Kindness Challenges</h1>
      <p class="text-gray-600 text-lg">
        Browse all available acts of kindness you can complete
      </p>
    </div>

    <!-- Search and Filter -->
    <div class="card">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <label for="search" class="block text-sm font-medium text-gray-700 mb-1">
            Search Challenges
          </label>
          <input
            id="search"
            v-model="searchQuery"
            type="text"
            class="input-field"
            placeholder="Search by title or description..."
          />
        </div>
        <div class="md:w-48">
          <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            v-model="selectedCategory"
            class="input-field"
          >
            <option value="">All Categories</option>
            <option value="courtesy">Courtesy</option>
            <option value="kindness">Kindness</option>
            <option value="helping">Helping</option>
            <option value="charity">Charity</option>
            <option value="communication">Communication</option>
            <option value="environment">Environment</option>
            <option value="education">Education</option>
            <option value="gratitude">Gratitude</option>
            <option value="random">Random</option>
            <option value="community">Community</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="deedsStore.loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Loading challenges...</p>
    </div>

    <!-- Challenges Grid -->
    <div v-else-if="filteredChallenges.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="challenge in filteredChallenges"
        :key="challenge.id"
        class="card hover:shadow-lg transition-shadow cursor-pointer group"
        @click="selectChallenge(challenge)"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              {{ challenge.title }}
            </h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ challenge.description }}
            </p>
          </div>
          <div class="ml-4">
            <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center">
              <span class="text-white text-lg">❤️</span>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="badge badge-primary">
              {{ challenge.points }} points
            </span>
            <span class="badge badge-warning">
              {{ challenge.category }}
            </span>
          </div>
          <button
            @click.stop="completeChallenge(challenge)"
            :disabled="deedsStore.loading"
            class="btn-success text-sm px-3 py-1"
          >
            Complete
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="text-gray-400 text-6xl mb-4">🔍</div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No challenges found</h3>
      <p class="text-gray-600">
        Try adjusting your search or filter criteria
      </p>
    </div>

    <!-- Challenge Completion Modal -->
    <div
      v-if="selectedChallenge"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="closeModal"
    >
      <div class="bg-white rounded-xl max-w-md w-full p-6" @click.stop>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-gray-900">Complete Challenge</h3>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600"
          >
            <span class="text-2xl">×</span>
          </button>
        </div>

        <div class="mb-6">
          <h4 class="font-medium text-gray-900 mb-2">{{ selectedChallenge.title }}</h4>
          <p class="text-gray-600 text-sm mb-4">{{ selectedChallenge.description }}</p>
          <div class="flex items-center space-x-2 mb-4">
            <span class="badge badge-primary">{{ selectedChallenge.points }} points</span>
            <span class="badge badge-warning">{{ selectedChallenge.category }}</span>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label for="modal-description" class="block text-sm font-medium text-gray-700 mb-2">
              How did you complete this challenge? (Optional)
            </label>
            <textarea
              id="modal-description"
              v-model="completionDescription"
              rows="3"
              class="input-field"
              placeholder="Share your experience or leave blank..."
            ></textarea>
          </div>

          <div class="flex space-x-3">
            <button
              @click="closeModal"
              class="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              @click="confirmComplete"
              :disabled="deedsStore.loading"
              class="btn-success flex-1 flex justify-center items-center"
            >
              <span v-if="deedsStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
              {{ deedsStore.loading ? 'Completing...' : 'Complete' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDeedsStore } from '@/stores/deeds'
import { useToast } from 'vue-toastification'

const deedsStore = useDeedsStore()
const toast = useToast()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedChallenge = ref(null)
const completionDescription = ref('')

const filteredChallenges = computed(() => {
  let challenges = deedsStore.challenges

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    challenges = challenges.filter(challenge =>
      challenge.title.toLowerCase().includes(query) ||
      challenge.description.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value) {
    challenges = challenges.filter(challenge =>
      challenge.category === selectedCategory.value
    )
  }

  return challenges
})

const selectChallenge = (challenge) => {
  selectedChallenge.value = challenge
  completionDescription.value = ''
}

const closeModal = () => {
  selectedChallenge.value = null
  completionDescription.value = ''
}

const completeChallenge = async (challenge) => {
  selectChallenge(challenge)
}

const confirmComplete = async () => {
  if (!selectedChallenge.value) return

  const result = await deedsStore.completeChallenge(
    selectedChallenge.value.id,
    completionDescription.value
  )

  if (result.success) {
    closeModal()
    toast.success(`Challenge completed! +${result.data.pointsEarned} points 🎉`)
  }
}

onMounted(async () => {
  await deedsStore.fetchChallenges()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 