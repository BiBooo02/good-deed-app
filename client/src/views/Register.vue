<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-success-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="mx-auto h-16 w-16 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center mb-4">
          <span class="text-white text-2xl">❤️</span>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Join Good Deed</h2>
        <p class="text-gray-600">Start your journey of spreading kindness</p>
      </div>

      <form @submit.prevent="handleRegister" class="mt-8 space-y-6">
        <div class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              class="input-field"
              :class="{ 'border-red-500': errors.username }"
              placeholder="Choose a username"
            />
            <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</p>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email (Optional)
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="input-field"
              :class="{ 'border-red-500': errors.email }"
              placeholder="Enter your email"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
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
              :class="{ 'border-red-500': errors.password }"
              placeholder="Create a password"
            />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="input-field"
              :class="{ 'border-red-500': errors.confirmPassword }"
              placeholder="Confirm your password"
            />
            <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="authStore.loading"
            class="btn-primary w-full flex justify-center items-center"
          >
            <span v-if="authStore.loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
            {{ authStore.loading ? 'Creating account...' : 'Create Account' }}
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <router-link to="/login" class="font-medium text-primary-600 hover:text-primary-500">
              Sign in here
            </router-link>
          </p>
        </div>
      </form>

      <div class="mt-8 text-center">
        <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">What you'll get:</h3>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>🎯 Daily kindness challenges</li>
            <li>📊 Track your progress</li>
            <li>🏆 Compete on leaderboards</li>
            <li>🔥 Build amazing streaks</li>
            <li>🌍 Join a community of kind people</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')

  if (form.value.username.length < 3) {
    errors.username = 'Username must be at least 3 characters long'
  }

  if (form.value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (form.value.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long'
  }

  if (form.value.password !== form.value.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return !Object.values(errors).some(error => error)
}

const handleRegister = async () => {
  if (!validateForm()) {
    return
  }

  const userData = {
    username: form.value.username,
    email: form.value.email || undefined,
    password: form.value.password
  }

  const result = await authStore.register(userData)
  if (result.success) {
    router.push('/')
  }
}
</script> 