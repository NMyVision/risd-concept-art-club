<script setup lang="ts">
import AppHeader from '../components/Header.vue'
import AppFooter from '../components/Footer.vue'

</script>

<template>
  <AppHeader />

  <slot />
  <AppFooter />

</template>
