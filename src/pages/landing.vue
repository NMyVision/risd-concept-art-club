<script setup lang="ts">
import type { SiteResource } from '@/types';

definePage({
  meta: { access: 'public' }
})

const resource: Pick<SiteResource, 'attribution' | 'attributionLink'> = {

  "attribution": "Kekai Kotaki",
  "attributionLink": "http://www.kekaiart.com/",
}

</script>


<template>
  <Layout>
    <div class="relative isolate">
      <img src="/8827f5ee277df12cf13a8701c3024a8eab985628.png" alt=""
        class="absolute inset-0 -z-10 size-full object-cover" />
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true">
        <div
          class="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div
        class=" px-6 lg:px-8 h-[calc(100vh-20rem)] sm:h-[48rem] flex justify-center items-center bg-black/40 relative">


        <div class="text-center">
          <h1 class="text-5xl/tight font-semibold tracking-loose text-balance text-white sm:text-7xl">Concept Art Club
          </h1>
        </div>

        <div class="absolute right-10 bottom-10 text-white/60 group hover:text-white z-10 text-xs bg-black/5 rounded py-2 px-4">
          <template v-if="resource.attributionLink">
            <a :href="resource.attributionLink" target="_blank" class="group-hover:text-blue-300 group-hover:underline">
              {{ resource.attribution }}
            </a>
          </template>
          <template v-else>
            {{ resource.attribution }}
          </template>
        </div>

      </div>

    </div>

  </Layout>
</template>
