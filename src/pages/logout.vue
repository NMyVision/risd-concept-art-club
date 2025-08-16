<script setup lang="ts">
import { useUserStore } from '@/packages/stores/user';
const router = useRouter();
onMounted(async () => {
  const userStore = useUserStore();
  await userStore.logout();
  window.location.reload();
});

// type Props = {}
// const { } = defineProps<Props>()
// const emits = defineEmits<{ click:[] }>()
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center  py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=blue&shade=500" alt="Your Company">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-600">You have been logged out</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          <a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">Log in again</a>
        </p>
      </div>
    </div>
  </div>
</template>
