<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/packages/stores/user'
import { useRouter } from 'vue-router'


definePage({
  meta: { access: 'anonymous' }
})


const store = useUserStore()
const router = useRouter()

const email = ref('')

// Clear messages when component mounts
onMounted(() => {
  store.clearResetMessages()
})

const handleSubmit = async () => {
  if (!email.value) {
    store.resetError = 'Please enter your email address'
    return
  }

  try {
    await store.requestPasswordReset(email.value)
  } catch (error) {
    // Error handling is done in the store
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="min-h-full fixed w-full flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
       <img src="/logo-white.png" class="size-8 text-white" />
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Forgot your password?</h2>
      <p class="mt-2 text-center text-sm text-gray-400">
        Enter your email address and we'll send you a link to reset your password.
      </p>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-white">Email address</label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              :disabled="store.isRequestingReset"
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6 disabled:opacity-50" />
          </div>
        </div>

        <!-- Messages -->
        <div v-if="store.resetMessage" class="text-sm text-green-400 bg-green-400/10 rounded-md p-3">
          {{ store.resetMessage }}
        </div>
        <div v-if="store.resetError" class="text-sm text-red-400 bg-red-400/10 rounded-md p-3">
          {{ store.resetError }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="store.isRequestingReset"
            class="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-50">
            {{ store.isRequestingReset ? 'Sending...' : 'Send reset link' }}
          </button>
        </div>
      </form>

      <div class="mt-6 text-center">
        <button
          @click="goToLogin"
          type="button"
          class="text-sm text-blue-400 hover:text-blue-300">
          ← Back to login
        </button>
      </div>
    </div>
  </div>
</template>
