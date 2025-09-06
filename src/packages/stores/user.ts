import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { pb } from '../pocketbase/client'
import type { RecordModel } from 'pocketbase'

/**
 * Auth/User store backed by PocketBase's AuthStore.
 * - State mirrors pb.authStore so it persists via its storage (localStorage by default).
 * - Subscribes to authStore changes to keep Vue state in sync across tabs.
 */
export const useUserStore = defineStore('user', () => {
  const token = ref<string>(pb.authStore.token || '')
  const model = ref<RecordModel | null>(pb.authStore.record)

 // Forgot password states
  const isRequestingReset = ref(false)
  const isResettingPassword = ref(false)
  const resetMessage = ref('')
  const resetError = ref('')

  // Loading states
  const isUpdatingProfile = ref(false)
  const isChangingPassword = ref(false)
  const isDeletingAccount = ref(false)

  // Messages
  const profileMessage = ref('')
  const passwordMessage = ref('')
  const profileError = ref('')
  const passwordError = ref('')

  const isAuthenticated = computed(() => !!token.value)
  const user = computed(() => model.value)
  const userId = computed(() => model.value?.id ?? null)

  // Keep in sync with PocketBase AuthStore (handles login in other tabs, logout, refresh, etc.)
  pb.authStore.onChange((newToken: string, newModel: RecordModel | null) => {
    console.log('AuthStore changed', { newToken, newModel })
    token.value = newToken || ''
    model.value = newModel
  })

  async function login(identity: string, password: string, _remember = true) {
    // This updates pb.authStore automatically and persists via its configured storage
    const authData = await pb.collection('users').authWithPassword(identity, password)
    token.value = pb.authStore.token || ''
    model.value = authData.record
    return authData
  }

  function logout() {
    pb.authStore.clear()
    token.value = ''
    model.value = null
  }

  // Clear all messages
  function clearMessages() {
    profileMessage.value = ''
    passwordMessage.value = ''
    profileError.value = ''
    passwordError.value = ''
  }

  // Update user profile
  async function updateProfile(profileData: {
    firstName: string
    lastName: string
    avatar?: File | null
  }) {
    if (!user.value?.id) {
      throw new Error('User not authenticated')
    }

    isUpdatingProfile.value = true
    profileError.value = ''
    profileMessage.value = ''

    try {
      const formData = new FormData()
      formData.append('firstName', profileData.firstName)
      formData.append('lastName', profileData.lastName)

      // Only append avatar if a new one was provided
      if (profileData.avatar) {
        formData.append('avatar', profileData.avatar)
      }

      // Update user record
      const updatedUser = await pb.collection('users').update(user.value.id, formData)

      // Update local state
      model.value = updatedUser

      profileMessage.value = 'Profile updated successfully!'
      return updatedUser

    } catch (error: any) {
      console.error('Profile update error:', error)
      profileError.value = error.message || 'Failed to update profile'
      throw error
    } finally {
      isUpdatingProfile.value = false
    }
  }

  // Change password
  async function changePassword(passwordData: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }) {
    if (!user.value?.id) {
      throw new Error('User not authenticated')
    }

    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      passwordError.value = 'New passwords do not match'
      throw new Error('New passwords do not match')
    }

    if (passwordData.newPassword.length < 8) {
      passwordError.value = 'New password must be at least 8 characters long'
      throw new Error('New password must be at least 8 characters long')
    }

    isChangingPassword.value = true
    passwordError.value = ''
    passwordMessage.value = ''

    try {
      await pb.collection('users').update(user.value.id, {
        oldPassword: passwordData.currentPassword,
        password: passwordData.newPassword,
        passwordConfirm: passwordData.confirmPassword,
      })

      passwordMessage.value = 'Password changed successfully!'

    } catch (error: any) {
      console.error('Password change error:', error)
      passwordError.value = error.message || 'Failed to change password'
      throw error
    } finally {
      isChangingPassword.value = false
    }
  }

  // Delete account
  async function deleteAccount() {
    if (!user.value?.id) {
      throw new Error('User not authenticated')
    }

    isDeletingAccount.value = true

    try {
      await pb.collection('users').delete(user.value.id)

      // Clear store and logout
      logout()

    } catch (error: any) {
      console.error('Account deletion error:', error)
      throw error
    } finally {
      isDeletingAccount.value = false
    }
  }

  // Get avatar URL
  function getAvatarUrl(record?: RecordModel | null): string {
    const userRecord = record || user.value
    if (userRecord?.avatar) {
      return pb.files.getUrl(userRecord, userRecord.avatar)
    }
    return 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }

  // Request password reset
  async function requestPasswordReset(email: string) {
    isRequestingReset.value = true
    resetError.value = ''
    resetMessage.value = ''

    try {
      await pb.collection('users').requestPasswordReset(email)
      resetMessage.value = 'If an account with that email exists, we\'ve sent a password reset link.'
    } catch (error: any) {
      console.error('Password reset request error:', error)
      // For security, we don't reveal if email exists or not
      resetMessage.value = 'If an account with that email exists, we\'ve sent a password reset link.'
    } finally {
      isRequestingReset.value = false
    }
  }

  // Reset password with token
  async function resetPassword(token: string, password: string, passwordConfirm: string) {
    if (password !== passwordConfirm) {
      resetError.value = 'Passwords do not match'
      throw new Error('Passwords do not match')
    }

    if (password.length < 8) {
      resetError.value = 'Password must be at least 8 characters long'
      throw new Error('Password must be at least 8 characters long')
    }

    isResettingPassword.value = true
    resetError.value = ''
    resetMessage.value = ''

    try {
      await pb.collection('users').confirmPasswordReset(token, password, passwordConfirm)
      resetMessage.value = 'Password reset successfully! You can now login with your new password.'
    } catch (error: any) {
      console.error('Password reset error:', error)
      resetError.value = error.message || 'Failed to reset password. The reset link may be expired.'
      throw error
    } finally {
      isResettingPassword.value = false
    }
  }

  // Clear reset messages
  function clearResetMessages() {
    resetMessage.value = ''
    resetError.value = ''
  }

  return {
    // state
    token,
    user,
    userId,
    isAuthenticated,
     // forgot password states
    isRequestingReset,
    isResettingPassword,
    resetMessage,
    resetError,
    // loading states
    isUpdatingProfile,
    isChangingPassword,
    isDeletingAccount,
    // messages
    profileMessage,
    passwordMessage,
    profileError,
    passwordError,
    // actions
    login,
    logout,
    clearMessages,
    updateProfile,
    changePassword,
    deleteAccount,
    getAvatarUrl,
      // forgot password actions
    requestPasswordReset,
    resetPassword,
    clearResetMessages,
    // expose pb for direct access if needed
    pb: () => pb
  }
})
