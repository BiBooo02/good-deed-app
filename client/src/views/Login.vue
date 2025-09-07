<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-success-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="mx-auto h-16 w-16 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center mb-4">
          <span class="text-white text-2xl">❤️</span>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p class="text-gray-600">Sign in to continue your kindness journey</p>
      </div>

      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
              Username or Email
            </label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              class="input-field"
              placeholder="Enter your username or email"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="input-field"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="authStore.loading"
            class="btn-primary w-full flex justify-center items-center"
          >
            <span v-if="authStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
            {{ authStore.loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <router-link to="/register" class="font-medium text-primary-600 hover:text-primary-500">
              Sign up here
            </router-link>
          </p>
        </div>
      </form>

      <div class="mt-8 text-center">
        <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Why Good Deed?</h3>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>✨ Complete daily acts of kindness</li>
            <li>🏆 Earn points and climb leaderboards</li>
            <li>🔥 Build streaks and stay motivated</li>
            <li>🌍 Make the world a better place</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  username: '',
  password: ''
})

const handleLogin = async () => {
  const result = await authStore.login(form.value)
  if (result.success) {
    router.push('/')
  }
}
</script> 