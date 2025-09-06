<template>
  <!--
    This example requires updating your template:

    ```
    <html class="min-h-full bg-gray-900">
    <body class="min-h-full">
    ```
  -->
  <Layout>
    <div>


      <div class="xl:pl-72">


        <main>
          <h1 class="sr-only">Account Settings</h1>

          <header class="border-b border-white/5">
            <!-- Secondary navigation -->
            <nav class="flex overflow-x-auto py-4">
              <ul role="list"
                class="flex min-w-full flex-none gap-x-6 px-4 text-sm/6 font-semibold text-gray-400 sm:px-6 lg:px-8">
                <li v-for="item in secondaryNavigation" :key="item.name">
                  <a :href="item.href" :class="item.current ? 'text-indigo-400' : ''">{{ item.name }}</a>
                </li>
              </ul>
            </nav>
          </header>

          <!-- Settings forms -->
          <div class="divide-y divide-white/10">
            <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 class="text-base/7 font-semibold text-white">Personal Information</h2>
                <p class="mt-1 text-sm/6 text-gray-400">Use a permanent address where you can receive mail.</p>
              </div>

              <form class="md:col-span-2">
                <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div class="col-span-full flex items-center gap-x-8">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                      class="size-24 flex-none rounded-lg bg-gray-800 object-cover outline -outline-offset-1 outline-white/10" />
                    <div>
                      <button type="button"
                        class="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">Change
                        avatar</button>
                      <p class="mt-2 text-xs/5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm/6 font-medium text-white">First name</label>
                    <div class="mt-2">
                      <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                        class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="last-name" class="block text-sm/6 font-medium text-white">Last name</label>
                    <div class="mt-2">
                      <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                        class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                    </div>
                  </div>



                  <div class="col-span-full">
                    <label for="username" class="block text-sm/6 font-medium text-white">Email</label>
                    <div class="mt-2">
                      <div class="mt-2 flex">
                        <div class="rounded py-1.5">

                          mgambill@risd.edu
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="mt-8 flex">
                  <button type="submit"
                    class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
                </div>
              </form>
            </div>

            <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 class="text-base/7 font-semibold text-white">Change password</h2>
                <p class="mt-1 text-sm/6 text-gray-400">Update your password associated with your account.</p>
              </div>

              <form class="md:col-span-2">
                <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div class="col-span-full">
                    <label for="current-password" class="block text-sm/6 font-medium text-white">Current
                      password</label>
                    <div class="mt-2">
                      <input id="current-password" name="current_password" type="password"
                        autocomplete="current-password"
                        class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                    </div>
                  </div>

                  <div class="col-span-full">
                    <label for="new-password" class="block text-sm/6 font-medium text-white">New password</label>
                    <div class="mt-2">
                      <input id="new-password" name="new_password" type="password" autocomplete="new-password"
                        class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                    </div>
                  </div>

                  <div class="col-span-full">
                    <label for="confirm-password" class="block text-sm/6 font-medium text-white">Confirm
                      password</label>
                    <div class="mt-2">
                      <input id="confirm-password" name="confirm_password" type="password" autocomplete="new-password"
                        class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                    </div>
                  </div>
                </div>

                <div class="mt-8 flex">
                  <button type="submit"
                    class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
                </div>
              </form>
            </div>



            <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 class="text-base/7 font-semibold text-white">Delete account</h2>
                <p class="mt-1 text-sm/6 text-gray-400">No longer want to use our service? You can delete your account
                  here. This action is not reversible. All information related to this account will be deleted
                  permanently.</p>
              </div>

              <form class="flex items-start md:col-span-2">
                <button type="submit"
                  class="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400">Yes, delete
                  my account</button>
              </form>
            </div>
          </div>
        </main>

      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { ChevronDownIcon } from '@heroicons/vue/16/solid'


const teams = [
  { id: 1, name: 'Planetaria', href: '#', initial: 'P', current: false },
  { id: 2, name: 'Protocol', href: '#', initial: 'P', current: false },
  { id: 3, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
]
const secondaryNavigation = [
  { name: 'Account', href: '#', current: true },
  { name: 'Saved Bookmarks', href: '#', current: false },
  // { name: 'Billing', href: '#', current: false },
  // { name: 'Teams', href: '#', current: false },
  // { name: 'Integrations', href: '#', current: false },
]

const sidebarOpen = ref(false)
</script>
