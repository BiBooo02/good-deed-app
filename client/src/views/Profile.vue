<template>
  <div class="space-y-8">
    <!-- Profile Header -->
    <div class="card">
      <div class="flex items-center space-x-6">
        <div
          class="w-20 h-20 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center"
        >
          <span class="text-white text-3xl">👤</span>
        </div>
        <div class="flex-1">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            {{ authStore.user?.username }}
          </h1>
          <p class="text-gray-600 mb-4">
            Member since {{ formatDate(authStore.user?.created_at) }}
          </p>
          <div class="flex items-center space-x-4">
            <span class="badge badge-primary">
              🏆 {{ userStats?.totalPoints || 0 }} points
            </span>
            <span class="badge badge-success">
              🔥 {{ userStats?.streakDays || 0 }} day streak
            </span>
            <span class="badge badge-warning">
              📊 {{ userStats?.totalDeeds || 0 }} total deeds
            </span>
          </div>
        </div>
        <button @click="showEditProfile = true" class="btn-secondary">
          Edit Profile
        </button>
      </div>
    </div>

    <!-- Statistics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="card text-center">
        <div class="text-3xl font-bold text-primary-600 mb-2">
          {{ userStats?.totalPoints || 0 }}
        </div>
        <p class="text-gray-600">Total Points</p>
      </div>

      <div class="card text-center">
        <div class="text-3xl font-bold text-success-600 mb-2">
          {{ userStats?.streakDays || 0 }}
        </div>
        <p class="text-gray-600">Current Streak</p>
      </div>

      <div class="card text-center">
        <div class="text-3xl font-bold text-warning-600 mb-2">
          {{ userStats?.totalDeeds || 0 }}
        </div>
        <p class="text-gray-600">Total Deeds</p>
      </div>

      <div class="card text-center">
        <div class="text-3xl font-bold text-purple-600 mb-2">
          {{ userStats?.thisWeekDeeds || 0 }}
        </div>
        <p class="text-gray-600">This Week</p>
      </div>
    </div>

    <!-- Detailed Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="card">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">
          Activity Overview
        </h3>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">This Week</span>
            <span class="font-semibold"
              >{{ userStats?.thisWeekDeeds || 0 }} deeds</span
            >
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">This Month</span>
            <span class="font-semibold"
              >{{ userStats?.thisMonthDeeds || 0 }} deeds</span
            >
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Total Points Earned</span>
            <span class="font-semibold">{{
              userStats?.totalPointsEarned || 0
            }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Average per Deed</span>
            <span class="font-semibold">
              {{
                userStats?.totalDeeds > 0
                  ? Math.round(
                      userStats.totalPointsEarned / userStats.totalDeeds
                    )
                  : 0
              }}
            </span>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Achievements</h3>
        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <div
              class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center"
            >
              <span class="text-yellow-600 text-sm">🏆</span>
            </div>
            <div>
              <p class="font-medium text-gray-900">First Deed</p>
              <p class="text-sm text-gray-600">
                Complete your first act of kindness
              </p>
            </div>
            <div class="ml-auto">
              <span v-if="userStats?.totalDeeds > 0" class="badge badge-success"
                >✓</span
              >
              <span v-else class="badge badge-warning">-</span>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <div
              class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center"
            >
              <span class="text-orange-600 text-sm">🔥</span>
            </div>
            <div>
              <p class="font-medium text-gray-900">7-Day Streak</p>
              <p class="text-sm text-gray-600">
                Complete deeds for 7 consecutive days
              </p>
            </div>
            <div class="ml-auto">
              <span
                v-if="userStats?.streakDays >= 7"
                class="badge badge-success"
                >✓</span
              >
              <span v-else class="badge badge-warning"
                >{{ userStats?.streakDays || 0 }}/7</span
              >
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <div
              class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center"
            >
              <span class="text-purple-600 text-sm">💎</span>
            </div>
            <div>
              <p class="font-medium text-gray-900">100 Points</p>
              <p class="text-sm text-gray-600">Earn 100 total points</p>
            </div>
            <div class="ml-auto">
              <span
                v-if="userStats?.totalPoints >= 100"
                class="badge badge-success"
                >✓</span
              >
              <span v-else class="badge badge-warning"
                >{{ userStats?.totalPoints || 0 }}/100</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Deed History -->
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-semibold text-gray-900">Recent Deeds</h3>
        <div class="flex items-center space-x-2">
          <button
            @click="currentPage > 1 && currentPage--"
            :disabled="currentPage === 1"
            class="btn-secondary text-sm px-3 py-1"
          >
            Previous
          </button>
          <span class="text-sm text-gray-600">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button
            @click="currentPage < totalPages && currentPage++"
            :disabled="currentPage === totalPages"
            class="btn-secondary text-sm px-3 py-1"
          >
            Next
          </button>
        </div>
      </div>

      <div v-if="deedHistory.length === 0" class="text-center py-8">
        <div class="text-gray-400 text-4xl mb-2">📝</div>
        <p class="text-gray-600">
          No deeds completed yet. Start your kindness journey!
        </p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="deed in deedHistory"
          :key="deed.id"
          class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center"
            >
              <span class="text-white text-sm">❤️</span>
            </div>
            <div>
              <p class="font-medium text-gray-900">{{ deed.deed_type }}</p>
              <p v-if="deed.description" class="text-sm text-gray-600 mt-1">
                {{ deed.description }}
              </p>
              <p class="text-xs text-gray-500 mt-1">
                {{ formatDate(deed.completed_at) }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <span class="badge badge-success"
              >+{{ deed.points_earned }} pts</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div
      v-if="showEditProfile"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="closeEditModal"
    >
      <div class="bg-white rounded-xl max-w-md w-full p-6" @click.stop>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-gray-900">Edit Profile</h3>
          <button
            @click="closeEditModal"
            class="text-gray-400 hover:text-gray-600"
          >
            <span class="text-2xl">×</span>
          </button>
        </div>

        <form @submit.prevent="updateProfile" class="space-y-4">
          <div>
            <label
              for="edit-username"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="edit-username"
              v-model="editForm.username"
              type="text"
              class="input-field"
              placeholder="Enter new username"
            />
          </div>

          <div>
            <label
              for="edit-email"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Email (Optional)
            </label>
            <input
              id="edit-email"
              v-model="editForm.email"
              type="email"
              class="input-field"
              placeholder="Enter new email"
            />
          </div>

          <div class="flex space-x-3">
            <button
              type="button"
              @click="closeEditModal"
              class="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="authStore.loading"
              class="btn-primary flex-1 flex justify-center items-center"
            >
              <span
                v-if="authStore.loading"
                class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
              ></span>
              {{ authStore.loading ? "Updating..." : "Update Profile" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useDeedsStore } from "@/stores/deeds";

const authStore = useAuthStore();
const deedsStore = useDeedsStore();

const showEditProfile = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const deedHistory = ref([]);

const editForm = ref({
  username: "",
  email: "",
});

const userStats = computed(() => deedsStore.userStats);

const formatDate = (dateString) => {
  if (!dateString) return "Unknown";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const loadDeedHistory = async () => {
  const pagination = await deedsStore.fetchDeedHistory(currentPage.value, 10);
  deedHistory.value = deedsStore.deedHistory;
  totalPages.value = pagination?.pages || 1;
};

const closeEditModal = () => {
  showEditProfile.value = false;
  editForm.value = {
    username: authStore.user?.username || "",
    email: authStore.user?.email || "",
  };
};

const updateProfile = async () => {
  const result = await authStore.updateProfile(editForm.value);
  if (result.success) {
    closeEditModal();
  }
};

onMounted(async () => {
  await Promise.all([deedsStore.fetchUserStats(), loadDeedHistory()]);

  // Initialize edit form
  editForm.value = {
    username: authStore.user?.username || "",
    email: authStore.user?.email || "",
  };
});
</script>
