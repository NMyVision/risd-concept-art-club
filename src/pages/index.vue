<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter()

router.push('/landing')

</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>

