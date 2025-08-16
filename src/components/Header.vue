<script setup lang="ts">

import { useUserStore } from '@/packages/stores/user';
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const store = useUserStore()
const navigation = [
  { name: 'About', to: { name: '/about' } },
  { name: 'Resources', to: { name: '/resources/[[slug]]' } },
  { name: 'Calendar', to: { name: '/calendar' } },
  { name: 'Contact', to: { name: '/contact' } },
]

const mobileMenuOpen = ref(false)
</script>

<template>

  <header class="sticky top-0 z-10">
    <nav class="flex items-center justify-between p-6 md:px-8 bg-zinc-900/50 backdrop-blur-md" aria-label="Global">
      <div class="flex md:flex-1">
        <RouterLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=blue&shade=500"
            alt="" />
        </RouterLink>
      </div>
      <div class="flex md:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden md:flex md:gap-x-12">
        <template v-if="store.isAuthenticated">
          <template v-for="item in navigation" :key="item.name" :href="item.name">
            <RouterLink custom v-slot="{ navigate, href, isActive }" :to="item.to">
              <a :href="href" @click="navigate"
                :class="['font-medium text-lg', isActive ? 'text-white' : 'text-gray-500']">{{ item.name }}</a>
            </RouterLink>
          </template>
        </template>

      </div>
      <div class="hidden md:flex md:flex-1 md:justify-end">
        <template v-if="store.isAuthenticated">
          Hi {{ store.user?.firstName }} &nbsp; | &nbsp;
          <RouterLink to="/logout" class="text-sm/6 font-semibold text-white">Log out </RouterLink>
        </template>
        <template v-else>
          <RouterLink to="/login" class="text-sm/6 font-semibold text-white">Log in <span aria-hidden="true">&rarr;</span></RouterLink>
        </template>
      </div>
    </nav>
    <Dialog class="md:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-50" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=blue&shade=500"
              alt="" />
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-400" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/25">
            <div class="space-y-2 py-6">
              <template v-for="item in navigation" :key="item.name">
                <RouterLink custom v-slot="{ navigate, href, isActive }" :to="item.to">

                  <a :href="href" @click="navigate"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5">{{
                      item.name }}</a>
                </RouterLink>
              </template>
            </div>
            <div class="py-6">


              <template v-if="store.isAuthenticated">
                <div>
                  <p class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white/50">Hi {{
                    store.user?.firstName }}</p>
                  <RouterLink to="/logout"
                    class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/">Log
                    out
                    <span aria-hidden="true">&rarr;</span></RouterLink>
                </div>
              </template>
              <template v-else>
                <RouterLink to="/login"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/">Log in
                  <span aria-hidden="true">&rarr;</span></RouterLink>
              </template>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>

</template>
