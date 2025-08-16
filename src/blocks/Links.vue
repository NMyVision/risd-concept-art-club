<script setup lang="ts">
// const emits = defineEmits<{ click:[] }>()
import { pb } from '@/packages/pocketbase'
import ScrollableSection from '@/components/ScrollableSection.vue';
import ScrollableSectionItem from '@/components/ScrollableSectionItem.vue';
import type { Resource } from '@/types';

type Props = { resource: Resource }
const { resource } = defineProps<Props>()

const items = ref()
const categories = ref([])
const isSingle = ref(false)
onMounted(async () => {
  if (resource?.category) {
    isSingle.value = true
    categories.value = [await pb.collection('link_categories').getOne(resource.category)];
    items.value = await pb.collection('links').getFullList({
      filter: `category='${resource.category}'`
    })
    return
  }
  categories.value = await pb.collection('link_categories').getFullList({
    sort: 'label',
    filter: 'standalone=false'
  });
  // Fetch any dynamic data if needed
  items.value = await pb.collection('links').getFullList()


})

</script>

<template>

  <template v-if="isSingle">
    <div class="grid grid-cols-4 gap-8 mt-20" v-if="items">
      <template v-for="item in items">
        <div class="grayscale-100 hover:grayscale-0">

          <ScrollableSectionItem :item />
        </div>
      </template>
    </div>
  </template>
  <template v-else>
    <div class="flex flex-col gap-4" v-if="items && categories">
      <template v-for="{ label, id } in categories" key="link.id">
        <template v-if="items.some(x => x.category === id)">
          <ScrollableSection :title="label" :items="items.filter(x => x.category === id)">
            <template #default="{ item, index }">
              <ScrollableSectionItem :item />
            </template>
          </ScrollableSection>
        </template>
      </template>
    </div>
  </template>



</template>
