<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">Leaderboard</h1>
      <p class="text-gray-600 text-lg">
        See how you rank among the kindest people in the world
      </p>
    </div>

    <!-- Tab Navigation -->
    <div class="card">
      <div class="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors"
          :class="
            activeTab === tab.id
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          "
        >
          {{ tab.name }}
        </button>
      </div>
    </div>

    <!-- Global Leaderboard -->
    <div v-if="activeTab === 'global'" class="space-y-6">
      <div class="card">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Global Rankings</h2>

        <div v-if="loading" class="text-center py-8">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"
          ></div>
          <p class="text-gray-600 mt-2">Loading leaderboard...</p>
        </div>

        <div v-else-if="globalLeaderboard.length > 0" class="space-y-4">
          <div
            v-for="(user, index) in globalLeaderboard"
            :key="index"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center space-x-4">
              <div
                class="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm"
                :class="getRankColor(index)"
              >
                {{ index + 1 }}
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ user.username }}</p>
                <div class="flex items-center space-x-2 text-sm text-gray-600">
                  <span>🔥 {{ user.streak_days }} day streak</span>
                  <span>•</span>
                  <span>📊 {{ user.total_deeds }} total deeds</span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-primary-600">
                {{ user.points }}
              </p>
              <p class="text-sm text-gray-600">points</p>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8">
          <div class="text-gray-400 text-4xl mb-2">🏆</div>
          <p class="text-gray-600">No rankings available yet</p>
        </div>
      </div>
    </div>

    <!-- Weekly Leaderboard -->
    <div v-if="activeTab === 'weekly'" class="space-y-6">
      <div class="card">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">
          This Week's Top Performers
        </h2>

        <div v-if="loading" class="text-center py-8">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"
          ></div>
          <p class="text-gray-600 mt-2">Loading weekly rankings...</p>
        </div>

        <div v-else-if="weeklyLeaderboard.length > 0" class="space-y-4">
          <div
            v-for="(user, index) in weeklyLeaderboard"
            :key="index"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center space-x-4">
              <div
                class="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm"
                :class="getRankColor(index)"
              >
                {{ index + 1 }}
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ user.username }}</p>
                <div class="flex items-center space-x-2 text-sm text-gray-600">
                  <span>📅 {{ user.weekly_deeds }} deeds this week</span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-success-600">
                {{ user.weekly_points }}
              </p>
              <p class="text-sm text-gray-600">points</p>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8">
          <div class="text-gray-400 text-4xl mb-2">📅</div>
          <p class="text-gray-600">No weekly activity yet</p>
        </div>
      </div>
    </div>

    <!-- Streak Leaderboard -->
    <div v-if="activeTab === 'streaks'" class="space-y-6">
      <div class="card">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Longest Streaks</h2>

        <div v-if="loading" class="text-center py-8">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"
          ></div>
          <p class="text-gray-600 mt-2">Loading streak rankings...</p>
        </div>

        <div v-else-if="streakLeaderboard.length > 0" class="space-y-4">
          <div
            v-for="(user, index) in streakLeaderboard"
            :key="index"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center space-x-4">
              <div
                class="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm"
                :class="getRankColor(index)"
              >
                {{ index + 1 }}
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ user.username }}</p>
                <div class="flex items-center space-x-2 text-sm text-gray-600">
                  <span>📊 {{ user.total_deeds }} total deeds</span>
                  <span>•</span>
                  <span>🏆 {{ user.points }} total points</span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-warning-600">
                {{ user.streak_days }}
              </p>
              <p class="text-sm text-gray-600">days</p>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8">
          <div class="text-gray-400 text-4xl mb-2">🔥</div>
          <p class="text-gray-600">No streaks yet</p>
        </div>
      </div>
    </div>

    <!-- Community Stats -->
    <div v-if="activeTab === 'stats'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Community Overview -->
        <div class="card">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Community Overview
          </h3>
          <div v-if="communityStats" class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Total Users</span>
              <span class="font-semibold">{{
                communityStats.total_users
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Total Points Earned</span>
              <span class="font-semibold">{{
                communityStats.total_points
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Average Points</span>
              <span class="font-semibold">{{
                Math.round(communityStats.avg_points)
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Highest Points</span>
              <span class="font-semibold">{{ communityStats.max_points }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Total Deeds</span>
              <span class="font-semibold">{{
                communityStats.total_deeds
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">This Week</span>
              <span class="font-semibold">{{
                communityStats.weekly_deeds
              }}</span>
            </div>
          </div>
        </div>

        <!-- Top Categories -->
        <div class="card">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Most Popular Categories
          </h3>
          <div v-if="topCategories.length > 0" class="space-y-3">
            <div
              v-for="category in topCategories"
              :key="category.deed_type"
              class="flex justify-between items-center"
            >
              <span class="text-gray-600 capitalize">{{
                category.deed_type
              }}</span>
              <span class="font-semibold">{{ category.count }} deeds</span>
            </div>
          </div>
          <div v-else class="text-center py-4 text-gray-500">
            No category data available
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">
          Recent Community Activity
        </h3>
        <div v-if="recentActivity.length > 0" class="space-y-3">
          <div
            v-for="activity in recentActivity"
            :key="activity.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center"
              >
                <span class="text-white text-xs">❤️</span>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">
                  {{ activity.username }}
                </p>
                <p class="text-xs text-gray-600">{{ activity.deed_type }}</p>
              </div>
            </div>
            <div class="text-right">
              <span class="badge badge-success text-xs"
                >+{{ activity.points_earned }}</span
              >
              <p class="text-xs text-gray-500 mt-1">
                {{ formatDate(activity.completed_at) }}
              </p>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-4 text-gray-500">
          No recent activity
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  mockGlobalLeaderboard,
  mockWeeklyLeaderboard,
  mockStreakLeaderboard,
  mockCommunityStats,
  mockTopCategories,
  mockRecentActivity,
} from "@/stores/mockData";

const activeTab = ref("global");
const loading = ref(false);
const globalLeaderboard = ref(mockGlobalLeaderboard);
const weeklyLeaderboard = ref(mockWeeklyLeaderboard);
const streakLeaderboard = ref(mockStreakLeaderboard);
const communityStats = ref(mockCommunityStats);
const topCategories = ref(mockTopCategories);
const recentActivity = ref(mockRecentActivity);

const tabs = [
  { id: "global", name: "Global" },
  { id: "weekly", name: "Weekly" },
  { id: "streaks", name: "Streaks" },
  { id: "stats", name: "Community" },
];

const getRankColor = (index) => {
  if (index === 0) return "bg-yellow-500";
  if (index === 1) return "bg-gray-400";
  if (index === 2) return "bg-orange-500";
  return "bg-primary-500";
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Mock data is already loaded
</script>
