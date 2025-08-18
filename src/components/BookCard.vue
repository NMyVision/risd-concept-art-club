<script setup lang="ts">
import { pb } from '@/packages/pocketbase'
import type { Book, Publisher, Studio } from '@/packages/pocketbase'

type Props = { book: Book & { expand: { studio: Studio, publisher: Publisher } }, bookmarked: boolean }
const { book, bookmarked } = defineProps<Props>()
const emit = defineEmits(['bookmark'])
// Helper function to get image URL (adjust based on your PocketBase setup)
const cover = book.cover ? pb.files.getURL(book, book.cover) : ''

// tags
const field = book.field && Array.isArray(book.field) && book.field.join(',')
const studio = book.expand.studio?.name
const publisher = book.expand.publisher?.name
</script>

<template>

  <a v-if="book" :href="book.bookLink" target="_blank"
    class="relative block @md:grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] gap-x-4 @sm:p-5 outline-1 outline-white/10 rounded-lg group hover:bg-white/5 overflow-clip">

    <div class="absolute inset-0 bg-cover bg-center backdrop-grayscale grayscale -z-10 opacity-5"
      :style="{ 'background-image': `url(${cover})` }"></div>

    <div class="@sm:hidden block h-64 bg-white w-full bg-cover">
      <div class="h-full">
         <img v-if="cover" class="aspect-square object-cover bg-center " :src="cover" :alt="book.title" />
      </div>

      <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b to-black to-50%">
      </div>

      <div class="absolute h-1/2 bottom-0 inset-x-0 grid grid-rows-[1fr_auto_auto] grid-cols-1 gap-2 p-4 justify-end">
        <p class="text-sm/6 font-semibold text-white">{{ book.title }}</p>
        <p v-if="book.pubYear" class="text-sm">Published {{ book.pubYear }}</p>
        <div class="flex flex-col gap-4 @md:flex-row justify-between">
          <div class="flex flex-wrap gap-4">
            <template v-for="item in [field, studio, publisher].filter(x => !!x)" key="item">
              <span class="inline-block bg-gray-800 text-sm text-gray-300 tracking-wide rounded-full px-4 py-1.5">
                {{ item }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden @sm:block w-24 @sm:w-48 overflow-clip row-span-full">
      <img v-if="cover" class="aspect-video object-cover bg-center " :src="cover" :alt="book.title" />
    </div>


    <div class="flex items-baseline justify-between gap-x-4">
      <p class="text-sm/6 font-semibold text-white">{{ book.title }}</p>
    </div>

    <div class="flex flex-col gap-4 @md:flex-row justify-between">

      <span v-if="book.pubYear" class="text-sm order-1">Published {{ book.pubYear }}</span>

      <div class="flex flex-wrap gap-4">
        <template v-for="item in [field, studio, publisher].filter(x => !!x)" key="item">
          <span class="inline-block bg-gray-800 text-sm text-gray-300 tracking-wide rounded-full px-4 py-1.5">
            {{ item }}
          </span>
        </template>
      </div>

    </div>
  </a>

</template>
