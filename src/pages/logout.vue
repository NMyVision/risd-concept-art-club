<script setup lang="ts">
import { useUserStore } from '@/packages/stores/user';
import {  useRouter} from 'vue-router';

definePage({
  meta: { access: 'public' }
})

const router = useRouter();
onMounted(async () => {
  const userStore = useUserStore();
  await userStore.logout();

  setTimeout(() => {
    router.push('/landing')
  }, 10000);

});

</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center  py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <img src="/logo-white.png" class="size-12 text-white mx-auto" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-600">You have been logged out</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          <a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">Log in again</a>
        </p>
      </div>
    </div>
  </div>
</template>
