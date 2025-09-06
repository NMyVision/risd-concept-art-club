<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/packages/stores/user'

const store = useUserStore()

// Form data
const profileForm = reactive({
  firstName: '',
  lastName: '',
  avatar: null 
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Avatar preview
const avatarPreview = ref('')

const secondaryNavigation = [
  { name: 'Account', href: '#', current: true },
]

// Initialize form with user data
onMounted(() => {
  if (store.user) {
    profileForm.firstName = store.user.firstName || ''
    profileForm.lastName = store.user.lastName || ''

    // Set avatar preview if user has one
    avatarPreview.value = store.getAvatarUrl()
  }
})

// Handle avatar file selection
const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    profileForm.avatar = file

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Update profile
const updateProfile = async () => {
  try {
    await store.updateProfile({
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
      avatar: profileForm.avatar
    })

    // Reset avatar file input
    profileForm.avatar = null

    // Update avatar preview with new image
    avatarPreview.value = store.getAvatarUrl()

  } catch (error) {
    // Error handling is done in the store
  }
}

// Change password
const changePassword = async () => {
  try {
    await store.changePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
      confirmPassword: passwordForm.confirmPassword
    })

    // Clear form on success
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''

  } catch (error) {
    // Error handling is done in the store
  }
}

// Delete account
const deleteAccount = async () => {
  const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.')
  if (!confirmed) return

  try {
    await store.deleteAccount()
    // Redirect logic can be added here
    // router.push('/')
  } catch (error) {
    alert('Failed to delete account: ' + (error.message || 'Unknown error'))
  }
}

// Clear messages when component mounts
onMounted(() => {
  store.clearMessages()
})
</script>

<template>
  <Layout>
    <div>
      <div class="xl:pl-72">
        <main>
          <h1 class="sr-only">Account Settings</h1>

          <header class="border-b border-white/5">
            <nav class="flex overflow-x-auto py-4">
              <ul role="list"
                class="flex min-w-full flex-none gap-x-6 px-4 text-sm/6 font-semibold text-gray-400 sm:px-6 lg:px-8">
                <li v-for="item in secondaryNavigation" :key="item.name">
                  <a :href="item.href" :class="item.current ? 'text-indigo-400' : ''">{{ item.name }}</a>
                </li>
              </ul>
            </nav>
          </header>

          <!-- Settings forms -->
          <div class="divide-y divide-white/10">
            <!-- Personal Information -->
            <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 class="text-base/7 font-semibold text-white">Personal Information</h2>
                <p class="mt-1 text-sm/6 text-gray-400">Use a permanent address where you can receive mail.</p>
              </div>

              <form @submit.prevent="updateProfile" class="md:col-span-2">
                <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <!-- Avatar -->
                  <div class="col-span-full flex items-center gap-x-8">
                    <img
                      :src="avatarPreview"
                      alt="Avatar"
                      class="size-24 flex-none rounded-lg bg-gray-800 object-cover outline -outline-offset-1 outline-white/10" />
                    <div>
                      <label for="avatar-upload" class="cursor-pointer rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
                        Change avatar
                      </label>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        @change="handleAvatarChange"
                        class="sr-only" />
                      <p class="mt-2 text-xs/5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>

                  <!-- First Name -->
                  <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm/6 font-medium text-white">First name</label>
                    <div class="mt-2">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autocomplete="given-name"
                        v-model="profileForm.firstName"
                        class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                    </div>
                  </div>

                  <!-- Last Name -->
                  <div class="sm:col-span-3">
                    <label for="last-name" class="block text-sm/6 font-medium text-white">Last name</label>
                    <div class="mt-2">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autocomplete="family-name"
                        v-model="profileForm.lastName"
                        class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                    </div>
                  </div>

                  <!-- Email (Read-only) -->
                  <div class="col-span-full">
                    <label for="email" class="block text-sm/6 font-medium text-white">Email</label>
                    <div class="mt-2">
                      <div class="rounded py-1.5 px-3 bg-white/5 text-gray-400">
                        {{ store.user?.email }}
                      </div>
                      <p class="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                    </div>
                  </div>
                </div>

                <!-- Messages -->
                <div v-if="store.profileMessage" class="mt-4 text-sm text-green-400">{{ store.profileMessage }}</div>
                <div v-if="store.profileError" class="mt-4 text-sm text-red-400">{{ store.profileError }}</div>

                <div class="mt-8 flex">
                  <button
                    type="submit"
                    :disabled="store.isUpdatingProfile"
                    class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50">
                    {{ store.isUpdatingProfile ? 'Saving...' : 'Save' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Change Password -->
            <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 class="text-base/7 font-semibold text-white">Change password</h2>
                <p class="mt-1 text-sm/6 text-gray-400">Update your password associated with your account.</p>
              </div>

              <form @submit.prevent="changePassword" class="md:col-span-2">
                <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <!-- Current Password -->
                  <div class="col-span-full">
                    <label for="current-password" class="block text-sm/6 font-medium text-white">Current password</label>
                    <div class="mt-2">
                      <input
                        id="current-password"
                        name="current_password"
                        type="password"
                        autocomplete="current-password"
                        v-model="passwordForm.currentPassword"
                        required
                        class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                    </div>
                  </div>

                  <!-- New Password -->
                  <div class="col-span-full">
                    <label for="new-password" class="block text-sm/6 font-medium text-white">New password</label>
                    <div class="mt-2">
                      <input
                        id="new-password"
                        name="new_password"
                        type="password"
                        autocomplete="new-password"
                        v-model="passwordForm.newPassword"
                        required
                        minlength="8"
                        class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                    </div>
                  </div>

                  <!-- Confirm Password -->
                  <div class="col-span-full">
                    <label for="confirm-password" class="block text-sm/6 font-medium text-white">Confirm password</label>
                    <div class="mt-2">
                      <input
                        id="confirm-password"
                        name="confirm_password"
                        type="password"
                        autocomplete="new-password"
                        v-model="passwordForm.confirmPassword"
                        required
                        class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                    </div>
                  </div>
                </div>

                <!-- Messages -->
                <div v-if="store.passwordMessage" class="mt-4 text-sm text-green-400">{{ store.passwordMessage }}</div>
                <div v-if="store.passwordError" class="mt-4 text-sm text-red-400">{{ store.passwordError }}</div>

                <div class="mt-8 flex">
                  <button
                    type="submit"
                    :disabled="store.isChangingPassword"
                    class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50">
                    {{ store.isChangingPassword ? 'Changing...' : 'Save' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Delete Account -->
            <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 class="text-base/7 font-semibold text-white">Delete account</h2>
                <p class="mt-1 text-sm/6 text-gray-400">No longer want to use our service? You can delete your account
                  here. This action is not reversible. All information related to this account will be deleted
                  permanently.</p>
              </div>

              <form @submit.prevent="deleteAccount" class="flex items-start md:col-span-2">
                <button
                  type="submit"
                  :disabled="store.isDeletingAccount"
                  class="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 disabled:opacity-50">
                  {{ store.isDeletingAccount ? 'Deleting...' : 'Yes, delete my account' }}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  </Layout>
</template>
