<script setup lang="ts" generic="T extends object & { id: string }">
type ScrollableItem = {
  id: string
  title: string
  image: string
  href?: string
}

type Props = {
  title: string
  items: T[]
}

const { title, items } = defineProps<Props>()

const scrollContainer = ref<HTMLElement>()

const scrollLeft = () => {
  if (scrollContainer.value) {
    const containerWidth = scrollContainer.value.clientWidth
    const itemWidth = containerWidth / 3
    scrollContainer.value.scrollBy({
      left: -itemWidth,
      behavior: 'smooth'
    })
  }
}

const scrollRight = () => {
  if (scrollContainer.value) {
    const containerWidth = scrollContainer.value.clientWidth
    const itemWidth = containerWidth / 3
    scrollContainer.value.scrollBy({
      left: itemWidth,
      behavior: 'smooth'
    })
  }
}

const canScrollLeft = ref(false)
const canScrollRight = ref(false)

const updateScrollButtons = () => {
  if (scrollContainer.value) {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value
    canScrollLeft.value = scrollLeft > 0
    canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 1
  }
}

onMounted(() => {
  updateScrollButtons()
  scrollContainer.value?.addEventListener('scroll', updateScrollButtons)
})

onUnmounted(() => {
  scrollContainer.value?.removeEventListener('scroll', updateScrollButtons)
})
</script>

<template>
  <div class="relative  text-white py-8">
    <!-- Title -->
    <div class="px-4 sm:px-6 lg:px-8 mb-6">
      <h2 class="text-2xl lg:text-3xl font-bold">{{ title }}</h2>
    </div>

    <!-- Scrollable Container -->
    <div class="relative group">
      <!-- Left Navigation Arrow -->
      <button
        v-if="canScrollLeft"
        @click="scrollLeft"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/80 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 focus:opacity-100 focus:outline-none focus:ring-4 focus:ring-white/20"
        aria-label="Scroll left"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Right Navigation Arrow -->
      <button
        v-if="canScrollRight"
        @click="scrollRight"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/80 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 focus:opacity-100 focus:outline-none focus:ring-4 focus:ring-white/20"
        aria-label="Scroll right"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Items Container -->
      <div
        ref="scrollContainer"
        class="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 sm:px-6 lg:px-8 space-x-6"
        style="scroll-padding-left: 2rem;"
      >
        <div
          v-for="(item, index) in items"
          :key="item.id"
          class="flex-none w-80 lg:w-96 snap-start group/item"
        >
          <slot :item :index />
        </div>

        <!-- Spacer for last item -->
        <div class="flex-none w-4"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
