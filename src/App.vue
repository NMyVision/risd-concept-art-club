<script setup lang="ts">
// In your Vue components
import { pb } from './packages/pocketbase';

</script>

<template>
  <RouterView v-slot="{ Component }" :key="`${$route.path}`">
    <template v-if="Component">
      <Suspense>
        <template #default>
          <ErrorBoundary>
            <!-- main content -->
            <component :is="Component" />
          </ErrorBoundary>
        </template>
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </template>
  </RouterView>
</template>
