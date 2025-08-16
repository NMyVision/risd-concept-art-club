
<script setup lang="ts">
import { pb } from '@/packages/pocketbase'
import type {Book} from '@/types'

type Props = { book: Book, bookmarked: boolean }
const { book, bookmarked } = defineProps<Props>()

const emit = defineEmits(['bookmark'])

const isBookmarked = computed(() => bookmarked)

// Helper function to format authors (handles multiple authors)
const formatAuthors = (author) => {
  if (!author) return 'Unknown Author'

  // Split by common delimiters and format
  const authors = author.split(/[;,&]/).map(a => a.trim()).filter(a => a)
  if (authors.length <= 2) {
    return authors.join('; ')
  }
  return `${authors[0]} and ${authors.length - 1} others`
}

// Helper function to get image URL (adjust based on your PocketBase setup)
const getImageUrl = (item:Book) => {

  return pb.files.getURL(item, item.cover)
}
</script>

<template>
  <div class="group bg-gray-900 rounded-2xl p-6 transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-black/25">
    <div class="flex items-center space-x-6">
      <!-- Book Cover -->
      <div class="flex-shrink-0">
        <div class="w-24 h-32 rounded-lg overflow-hidden bg-gray-700">
          <img
            v-if="book.cover"
            :src="getImageUrl(book)"
            :alt="book.title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center text-gray-500"
          >
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h12V4H6zm2 2h8v2H8V6zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="space-y-3">
          <!-- Title -->
          <h3 class="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-200 truncate">
            {{ book.title }}
          </h3>

          <!-- Author -->
          <p class="text-gray-300 text-sm">
            {{ formatAuthors(book.author) }}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <!-- Studio/Publisher Tag -->
            <span
              v-if="book.studio?.name"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300 hover:bg-white/20 transition-colors duration-200"
            >
              {{ book.studio.name }}
            </span>

            <!-- Field Tags -->
            <span
              v-for="field in book.field"
              :key="field"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300 hover:bg-white/20 transition-colors duration-200"
            >
              {{ field }}
            </span>

            <!-- Publisher Tag -->
            <span
              v-if="book.publisher?.name"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300 hover:bg-white/20 transition-colors duration-200"
            >
              {{ book.publisher.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Publication Year & Actions -->
      <div class="flex-shrink-0 flex items-start justify-between h-full">
        <div class="text-right space-y-4">
          <!-- Publication Year -->
          <div v-if="book.pubYear" class="text-sm text-gray-400">
            Published {{ book.pubYear }}
          </div>

          <!-- Bookmark Button -->
          <button
            @click="$emit('bookmark', book.id)"
            class="group/bookmark p-2 rounded-lg transition-colors duration-200 hover:bg-gray-700"
            :class="isBookmarked ? 'text-yellow-400' : 'text-gray-400 hover:text-white'"
          >
            <svg
              class="w-5 h-5 transition-transform duration-200 group-hover/bookmark:scale-110"
              :fill="isBookmarked ? 'currentColor' : 'none'"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Optional: Click to open book link -->
    <a
      v-if="book.Book_Link"
      :href="book.Book_Link"
      target="_blank"
      class="absolute inset-0 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50"
      :aria-label="`Open ${book.title}`"
    />
  </div>
</template>
