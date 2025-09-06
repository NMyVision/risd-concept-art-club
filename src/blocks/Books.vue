<script setup lang="ts">
import { ref , computed } from 'vue'
import { pb } from '@/packages/pocketbase'
import BookCard from '@/components/BookCard.vue'
//import type { Book } from '@/types'

const items = ref<(Book & { expand: { studio: Studio, publisher: Publisher } })[]>()
const categories = ref([])
onMounted(async () => {
  // Fetch any dynamic data if needed
  items.value = await pb.collection<Book & { expand: { studio: Studio, published: Publisher } }>('books').getFullList({
    expand: 'studio,publisher',
  })

})


const activeTab = ref('all')
const viewMode = ref('list')

const tabs = [
  { id: 'all', name: 'All' },
  { id: 'saved', name: 'Saved' },
  // { id: 'concept', name: 'Concept Art Books' },
  // { id: 'youtubers', name: 'Youtubers' },
  // { id: 'links', name: 'Helpful Links' }
]

onMounted(() => { })


const toggleBookmark = (bookId: Book['id']) => {
  console.log('Toggle bookmark for:', bookId)
  // Handle bookmark logic
}
const queryTerm = ref('')
const filteredItems = computed(() => {
  if (!items.value) return []
  if (!queryTerm.value.trim()) return items.value

  const searchTerm = queryTerm.value.toLowerCase().trim()

  return items.value.filter(item => {
    // Debug: Log the item structure to understand the data
    console.log('Filtering item:', item)

    // Check title
    if (item.title?.toLowerCase().includes(searchTerm)) return true

    // Check author
    if (item.author?.toLowerCase().includes(searchTerm)) return true

    // Check studio name (handle potential undefined expand)
    if (item.expand?.studio?.name?.toLowerCase().includes(searchTerm)) return true

    // Check publisher name (handle potential undefined expand)
    if (item.expand?.publisher?.name?.toLowerCase().includes(searchTerm)) return true

    return false
  })
})

// Debug computed to see what's happening
const debugInfo = computed(() => ({
  totalItems: items.value?.length || 0,
  filteredCount: filteredItems.value.length,
  searchTerm: queryTerm.value,
  hasItems: !!items.value,
  firstItem: items.value?.[0] || null
}))
</script>

<template>

  <div class="flex flex-col gap-4">
    <!-- Header Navigation -->
    <div class="border-b border-gray-800">

      <div class="flex items-center justify-between py-4">
        <!-- Navigation Tabs -->
        <!-- <div class="flex space-x-8">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
            'pb-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
            activeTab === tab.id
              ? 'border-blue-500 text-white'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          ]">
            {{ tab.name }}
          </button>
        </div> -->

        <div>
          <input type="search" v-model="queryTerm" class="bg-transparent w-96 border border-zinc-500 rounded "
            placeholder="Search..." />
        </div>
 

        <!-- View Toggle -->
        <div class="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
          <button @click="viewMode = 'list'" :class="[
            'p-2 rounded transition-colors duration-200',
            viewMode === 'list' ? 'bg-gray-600' : 'hover:bg-gray-700'
          ]">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
          </button>
          <button @click="viewMode = 'grid'" :class="[
            'p-2 rounded transition-colors duration-200',
            viewMode === 'grid' ? 'bg-gray-600' : 'hover:bg-gray-700'
          ]">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
            </svg>
          </button>
        </div>

      </div>
    </div>

    <section class="grid grid-cols-[1fr_auto] p-4 sm:p-0">
      <!-- Content -->
      <div :class="[viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2', 'grid gap-6 @container']"
        v-if="filteredItems">
        <template v-for="item in filteredItems" :key="item.id">
          <BookCard :book="item" @bookmark="toggleBookmark" viewMode :bookmarked="true" />
        </template>
      </div>

      <div class="w-96 bg-neutral-900/10 p-4 hidden lg:block" v-if="false">

        Filter

      </div>


    </section>

  </div>




</template>
