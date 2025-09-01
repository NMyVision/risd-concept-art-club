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

const Logo = defineComponent({
      render: () =>
        h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', {
            d: "M281.95 0S42.875-1.134 8.228 123.827C-14.02 204.066 116.947 238.173 157.531 232.25c4.835-.707 25.476-60.137 25.476-60.137s7.888-46.516 58.95-41.572c7.457.722 33.849 80.967 39.401 88.081 7.409 9.495 18.552 7.719 23.108-2.37 1.743-3.865-35.55-81.168-35.847-86.205-.296-5.035 110.65-11.093 117.31 22.218 17.126 85.66-206.348 126.615-231.854 130.099-16.966 2.316-28.551 8.843-39.759 15.937-1.468.93 106.334 9.592 201.418-23.59 64.146-22.387 125.715-80.814 117.888-113.559-17.48-73.133-171.51-54.105-172.968-55.567-2.445-2.453-5.996-10.626-8.625-18.492-1.791-5.367-11.848-35.548-18.661-38.51-6.814-2.963-11.625 3.409-6.075 28.73 2.131 9.722 12.171 30.313 8.346 33.084-2.402 1.74-30.019 5.688-30.019 5.688s2.924-20.33 11.158-35.509c2.584-4.762 3.036-24.768 3.222-30.682.12-3.783-11.588-2.93-13.59 3.132-6.788 20.557-9.244 40.58-23.772 60.55-17.293 23.77-36.576 25.406-43.944 28.921-3.942 1.882.02 4.962.02 4.962s29.651-5.285 30.493-3.192c2.432 6.053-21.452 55.989-21.452 55.989s-3.674 15.386-13.923 12.738c-45.493-11.756-90.458-33.934-85.06-88.522 4.39-44.387 99.205-103.847 259.544-102.156 4.124.044 9.4-5.247 7.36-8.247-.733-1.076-8.042.397-12.481-2.233C296.806 8.052 281.95 0 281.95 0Z"
          }),
        ]),
    })
const mobileMenuOpen = ref(false)
</script>

<template>


  <header class="sticky top-0 z-10">
    <nav class="flex items-center justify-between p-6 md:px-8 bg-zinc-900/50 backdrop-blur-md" aria-label="Global">
      <div class="flex md:flex-1">
        <RouterLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img src="/logo-white.png" class="size-8 text-white" />
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
          <RouterLink to="/me" class="text-sm/6 font-semibold text-white">
          Hi {{ store.user?.firstName }}
          </RouterLink>
          &nbsp; | &nbsp;
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
