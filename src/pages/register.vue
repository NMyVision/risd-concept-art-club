
<script setup>
import { pb } from '@/packages/pocketbase'

definePage({
  meta:{ access: 'anonymous' }
})

const emailUsername = ref('')
const password = ref('')
const showPassword = ref(false)
const emailError = ref('')
const firstName = ref('')
const lastName = ref('')


// Computed property for form validation
const isFormValid = computed(() => {
  return firstName.value && lastName.value &&
    emailUsername.value &&
    !emailError.value &&
    password.value
})

// Email username validation
const validateEmailUsername = () => {
  const username = emailUsername.value.trim()

  if (!username) {
    emailError.value = ''
    return
  }

  // Check for valid username format (letters, numbers, dots, hyphens, underscores)
  const usernameRegex = /^[a-zA-Z0-9._-]+$/

  if (!usernameRegex.test(username)) {
    emailError.value = 'Username can only contain letters, numbers, dots, hyphens, and underscores'
    return
  }

  // Check for reasonable length
  if (username.length < 2) {
    emailError.value = 'Username must be at least 2 characters long'
    return
  }

  if (username.length > 30) {
    emailError.value = 'Username must be less than 30 characters long'
    return
  }

  // Clear error if validation passes
  emailError.value = ''
}

const handleSubmit = async () => {
  console.log('handle submit')

  if (!isFormValid.value) {
    alert('Please fill out all fields correctly')
    return
  }

  const email = `${emailUsername.value}@risd.edu`

  // example create data
  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    email,
    "emailVisibility": true,
    "password": password.value,
    "passwordConfirm": password.value
  };

  try {
    const record = await pb.collection('users').create(data);

    // (optional) send an email verification request
    await pb.collection('users').requestVerification(email);

    alert('Account created! Please check your email to verify your account.')

  } catch (error) {
    console.error(`Error creating account: ${error.message}`)
  }
}
</script>

<template>
  <Layout>
    <div class="h-full flex items-center justify-center p-4">
      <div class="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        <div class="flex flex-col lg:flex-row">
          <!-- Left Side - Hero Section -->
          <div
            class="lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-900 p-12 flex flex-col justify-center relative overflow-hidden">
            <!-- Background House Silhouette -->
            <div class="absolute inset-0 opacity-20">
              <svg viewBox="0 0 400 300" class="w-full h-full object-cover">
                <polygon points="50,150 200,50 350,150 350,250 50,250" fill="currentColor" opacity="0.3" />
                <rect x="80" y="180" width="40" height="70" fill="currentColor" opacity="0.4" />
                <rect x="140" y="160" width="50" height="40" fill="currentColor" opacity="0.4" />
                <rect x="280" y="180" width="40" height="70" fill="currentColor" opacity="0.4" />
              </svg>
            </div>

            <div class="relative z-10">
              <h1 class="text-4xl lg:text-5xl font-bold text-white mb-6">
                Join Us Today
              </h1>
              <p class="text-blue-100 text-lg mb-8 leading-relaxed">
                Create your free account and unlock access to powerful tools, personalized features, and exclusive
                content.
              </p>
              <p class="text-blue-100 text-base">
                Sign up now and take the first step toward your next big opportunity.
              </p>
            </div>
          </div>

          <!-- Right Side - Registration Form -->
          <div class="lg:w-1/2 p-12">
            <div class="max-w-md mx-auto text-slate-500">
              <h2 class="text-3xl font-semibold text-slate-800 mb-8">
                Register Now
              </h2>

              <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Name Field -->
                <div class="grid grid-cols-2 gap-6">
                  <div>

                    <label for="firstName" class="block text-sm/6 font-medium ">
                      First Name
                    </label>
                    <div class="relative">
                      <input id="firstName" v-model="firstName" type="text" placeholder="Enter first name"
                        class="form-input w-full pr-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500" />

                    </div>
                  </div>
                  <div>

                    <label for="lastName" class="block text-sm/6 font-medium ">
                      Last Name
                    </label>
                    <div class="relative">
                      <input id="lastName" v-model="lastName" type="text" placeholder="Enter last name"
                        class="form-input w-full pr-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500" />

                    </div>
                  </div>
                </div>

                <!-- Email Field with Input Group -->
                <div>
                  <label for="emailUsername" class="block text-sm/6 font-medium ">
                    Email
                  </label>
                  <div class="relative">
                    <div
                      class="flex border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                      <input id="emailUsername" v-model="emailUsername" type="text" placeholder="Enter username"
                        class="form-input flex-1 border-0 focus:ring-0 focus:border-transparent bg-transparent placeholder:text-slate-400"
                        @input="validateEmailUsername" />
                      <div
                        class="flex items-center px-4 bg-slate-50  text-sm font-medium border-l border-slate-200 rounded-r-xl">
                        @risd.edu
                      </div>
                    </div>

                    <!-- Validation Error Message -->
                    <div v-if="emailError" class="mt-1 text-sm text-red-600">
                      {{ emailError }}
                    </div>
                  </div>
                  <!-- Helper Text -->
                  <p class="mt-1 text-xs text-slate-500">
                    Use your RISD username (e.g., "jdoe" for jdoe@risd.edu)
                  </p>
                </div>

                <!-- Password Field -->
                <div>
                  <label for="password" class="block text-sm font-medium  mb-2">
                    Password
                  </label>
                  <div class="relative">
                    <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
                      placeholder="Enter password" autocomplete="new-password"
                      class="form-input w-full pr-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500" />
                    <button type="button" @click="showPassword = !showPassword"
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover: transition-colors">
                      <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    </button>
                  </div>
                </div>



                <!-- Submit Button -->
                <button type="submit" :disabled="!isFormValid"
                  class="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Create an account
                </button>

                <!-- Login Link -->
                <div class="text-center">
                  <span class="text-slate-500 text-sm">Already have an account? </span>
                  <a href="#" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Login here
                  </a>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
