<script setup lang="ts"></script>

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
