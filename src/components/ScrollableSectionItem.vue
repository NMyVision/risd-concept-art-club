<script setup lang="ts">
import { pb } from '@/packages/pocketbase'
type Props = { item: { url: string, label: string,  cover: string } }
const { item } = defineProps<Props>()

const imageUrl = computed(() => {
  if (item.cover) {
    return pb.files.getURL(item, item.cover)
  }
  return 'https://via.placeholder.com/300x200?text=No+Image'
})
// const emits = defineEmits<{ click:[] }>()
</script>

<template>
  <a :href="item.url || '#'" target="_blank" rel="noopener noreferrer"
    class="block transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-white/20 rounded-2xl overflow-clip">
    <!-- Image Container -->
    <div class="relative overflow-hidden rounded-2xl   aspect-[16/10] mb-4" :class="item.cover ? 'bg-white' : 'bg-gray-700'">
      <img v-if="item.cover" :src="imageUrl" :alt="item.label"
        class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110" />

      <!-- Overlay for better text contrast if needed -->
      <div class="absolute inset-0 bg-black/10 group-hover/item:bg-black/20 transition-colors duration-300"></div>
    </div>


    <!-- label -->
    <h3
      class="text-lg lg:text-xl font-semibold text-white group-hover/item:text-blue-400 transition-colors duration-200">
      {{ item.label }}
    </h3>
  </a>
</template>
