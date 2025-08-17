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
