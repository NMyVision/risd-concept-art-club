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

  return {
    // state
    token,
    user,
    userId,
    isAuthenticated,
    // actions
    login,
    logout
  }
})
