<script setup lang="ts">
import { pb } from '@/packages/pocketbase'
import { type Resource } from '@/types'
type Props = { count?: number, resource: Resource, as?: 'a' | 'div', size?: 'small' | 'large', position?: 'left' | 'center'}
const { resource, count, as = 'div', size, position = 'left' } = defineProps<Props>()

const hover = computed(() => as === 'a')

const imageUrl = computed(() => {
  if (resource.id && resource.cover)
    return pb.files.getURL(resource, resource.cover)
  return resource.cover;
})


// const emits = defineEmits<{ click:[] }>()
</script>

<template>

  <Component :is="as"
    class="group relative block h-48 md:h-56 lg:h-64 w-full overflow-hidden sm:rounded-2xl transition-transform duration-300  focus:outline-none focus:ring-4 focus:ring-blue-500/50"
    :class="{ 'hover:scale-[1.01]': false }">

    <!-- Background Image -->
    <div
      :class="['absolute inset-0 bg-cover bg-no-repeat transition-transform duration-700 ', hover && 'group-hover:scale-110', resource.classes === '' ? 'bg-center' : resource.classes]"
      :style="`background-image: url('${imageUrl}')`"></div>

    <!-- Dark Overlay -->
    <div class="absolute inset-0 bg-black/40 transition-colors duration-300"
      :class="{ 'group-hover:bg-black/50': hover }">
    </div>

    <!-- Content -->
    <div class="relative h-full grid w-full grid-cols-1 grid-rows-[1fr_auto] p-6 lg:p-8" data-content>
      <!-- Main Content -->
      <div class="space-y-2 w-full">
        <h3 class="font-bold text-white leading-tight text-shadow-md/20 "
          :class="[size === undefined ? 'text-2xl lg:text-3xl xl:text-4xl ' : size === 'large' ? 'text-3xl lg:text-4xl xl:text-5xl ' : 'text-xl', position === 'center' ? 'text-center' : '']">
          {{ resource.title }}
        </h3>
        <p class="text-sm lg:text-base text-white/90 max-w-xl" v-if="resource.subtitle">
          {{ resource.subtitle }}
        </p>
      </div>

      <!-- Results Count -->
      <div class="flex items-center justify-between">
        <div>
          <span class="text-sm lg:text-base text-white/80 font-medium" v-if="count">
            {{ count || '0' }} Results
          </span>
        </div>
        <!-- Attribution (if available) -->
        <span v-if="resource.attribution" class="text-xs text-white/60 text-shadow-sm/30 ">
          {{ resource.attribution }}
        </span>
      </div>
    </div>

    <!-- Subtle gradient overlay for better text readability -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20"></div>
  </Component>

</template>
