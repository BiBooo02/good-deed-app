<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-2">
              <div
                class="w-8 h-8 bg-gradient-to-r from-primary-500 to-success-500 rounded-lg flex items-center justify-center"
              >
                <span class="text-white font-bold text-lg">❤️</span>
              </div>
              <span class="text-xl font-bold text-gradient">Good Deed</span>
            </router-link>
          </div>

          <div class="flex items-center space-x-4">
            <router-link
              to="/"
              class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'text-primary-600 bg-primary-50': $route.path === '/' }"
            >
              Dashboard
            </router-link>
            <router-link
              to="/challenges"
              class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{
                'text-primary-600 bg-primary-50': $route.path === '/challenges',
              }"
            >
              Challenges
            </router-link>
            <router-link
              to="/leaderboard"
              class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{
                'text-primary-600 bg-primary-50':
                  $route.path === '/leaderboard',
              }"
            >
              Leaderboard
            </router-link>
            <router-link
              to="/profile"
              class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{
                'text-primary-600 bg-primary-50': $route.path === '/profile',
              }"
            >
              Profile
            </router-link>
            <button
              @click="authStore.logout"
              class="text-gray-600 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>

    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="text-center text-gray-500 text-sm">
          <p>Spread kindness daily with Good Deed ❤️</p>
          <p class="mt-1">Make the world a better place, one act at a time</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>
