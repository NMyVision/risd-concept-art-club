<script setup lang="ts">
import ResourceCard from '@/components/ResourceCard.vue';
import LinksBlock from '@/blocks/Links.vue';
import BooksBlock from '@/blocks/Books.vue';
import type { Resource } from '@/types';

type Props = {
  resources?: Resource[]
}
const { resources } = defineProps<Props>()
const route = useRoute('/resources/:slug?');
const resource = computed(() => {
  const slug = route.params.slug;
  if (!resources || !slug) return null;


  return resources.find(r => r.slug === slug);
});

</script>

<template>
  <template v-if="resource">

    <ResourceCard as="div" :resource size="large" />

    <template v-if="resource.layout === 'links'">
      <LinksBlock :resource />
    </template>
    <template v-else-if="resource.layout === 'books'">
      <BooksBlock />
    </template>
    <template v-else>

    </template>

  </template>
  <template v-else>
    <h3>No Resource found for this</h3>
  </template>
</template>
