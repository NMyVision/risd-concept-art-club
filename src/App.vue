<script setup lang="ts">

// import { pb } from './packages/pocketbase'
// import { useUserStore } from './packages/stores/user';
// const store = useUserStore();
// console.log(pb.authStore)

// console.log(pb.authStore)

</script>

<template>
  <RouterView v-slot="{ Component }" :key="`${$route.path}`">
    <template v-if="Component">
      <Suspense>
        <template #default>

            <!-- main content -->
            <component :is="Component" />

        </template>
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </template>
  </RouterView>
</template>
