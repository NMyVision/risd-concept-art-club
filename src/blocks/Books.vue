<script setup lang="ts">
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
</script>

<template>

  <div class="flex flex-col gap-4">
    <!-- Header Navigation -->
    <div class="border-b border-gray-800">

      <div class="flex items-center justify-between py-4">
        <!-- Navigation Tabs -->
        <div class="flex space-x-8">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
            'pb-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
            activeTab === tab.id
              ? 'border-blue-500 text-white'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          ]">
            {{ tab.name }}
          </button>
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

    <section class="grid grid-cols-[1fr_auto] lg:gap-8 p-4 sm:p-0">
      <!-- Content -->
      <div :class="[viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2', 'grid gap-6 @container']"
        v-if="items">
        <template v-for="item in items" :key="item.id">
          <BookCard :book="item" @bookmark="toggleBookmark" viewMode :bookmarked="true" />
        </template>
      </div>

      <div class="w-96 bg-neutral-900/10 p-4 hidden lg:block">

Filter

      </div>


    </section>

  </div>




</template>
