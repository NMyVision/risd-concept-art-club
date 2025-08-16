<script setup lang="ts">

import { useResourcesStore } from '@/packages/stores/resource'
import ResourceCard from '@/components/ResourceCard.vue';
const store = useResourcesStore()
const route = useRoute('/resources');
const resources = computed(() => store.state ?? {})

</script>
<template>
  <Layout>
    <div class="mx-auto container my-12 sm:my-24">



      <template v-if="store.isLoading">
        <p>Loading</p>
      </template>
      <div v-if="store.state">

        <template v-if="!route.params.slug">
          <div class="flex flex-col gap-8">
            <template v-for="res in resources" v-key="res.name">
              <RouterLink :to="`/resources/${res.slug}`" custom v-slot="{ navigate, href }">
                <ResourceCard :resource="res" as="a" :count="0" @click="navigate" :href />
              </RouterLink>
            </template>
          </div>
        </template>

        <template v-else>
          <RouterView :resources />
        </template>

      </div>

    </div>
  </Layout>
</template>
