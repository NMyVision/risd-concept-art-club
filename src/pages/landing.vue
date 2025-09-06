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
  <Layout footer="false">
    <div
      class="relative isolate h-[calc(100vh-5rem)] grid  bg-[url('/8827f5ee277df12cf13a8701c3024a8eab985628.png')] bg-cover bg-center">

      <div class="row-start-1 col-start-1 h-full bg-black/60 items-center place-self-cente align-self-center">


        <div class="flex items-center justify-center text-white text-lg h-[100%]">
          <h1 class="text-5xl/tight font-semibold tracking-loose text-balance text-white sm:text-7xl">Concept Art Club
          </h1>
        </div>

      </div>
      <div
        class="absolute right-10 bottom-10 text-white/60 group hover:text-white z-10 text-xs bg-black/5 rounded py-2 px-4">
        <template v-if="resource.attributionLink">
          <a :href="resource.attributionLink" target="_blank" class="group-hover:text-blue-300 group-hover:underline">
            {{ resource.attribution }}
          </a>
        </template>
        <template v-else>
          {{ resource.attribution }}
        </template>
      </div>

      <!--
      <div
        class=" px-6 lg:px-8 h-[calc(100vh-20rem)] sm:h-[48rem] flex justify-center items-center bg-black/40 relative">


        <div class="text-center">
          <h1 class="text-5xl/tight font-semibold tracking-loose text-balance text-white sm:text-7xl">Concept Art Club
          </h1>
        </div>



</div> -->

    </div>

  </Layout>
</template>
