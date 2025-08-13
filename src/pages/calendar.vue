<template>
  <Layout>
    <div class="mx-auto w-full max-w-4xl mt-20">
      <div class="relative grid grid-cols-1 gap-x-14 md:grid-cols-2">
        <button type="button" @click="prev"
          class="absolute -top-1 -left-1.5 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white">
          <span class="sr-only">Previous month</span>
          <ChevronLeftIcon class="size-5" aria-hidden="true" />
        </button>

        <button type="button" @click="next"
          class="absolute -top-1 -right-1.5 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white">
          <span class="sr-only">Next month</span>
          <ChevronRightIcon class="size-5" aria-hidden="true" />
        </button>
        <section v-for="(month, monthIdx) in months" :key="monthIdx" class="text-center last:max-md:hidden">
          <h2 class="text-sm font-semibold text-gray-900 dark:text-white">{{ month.name }}</h2>
          <div class="mt-6 grid grid-cols-7 text-xs/6 text-gray-500 dark:text-gray-400">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
          </div>
          <div
            class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow-sm ring-1 ring-gray-200 dark:bg-white/10 dark:shadow-none dark:ring-white/10">
            <button v-for="day in month.days" :key="day.date" type="button"
              :data-is-current-month="day.isCurrentMonth ? '' : undefined" :data-is-today="day.isToday ? '' : undefined"
              class="relative bg-gray-50 py-1.5 text-gray-400 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-100 focus:z-10 data-is-current-month:bg-white data-is-current-month:text-gray-900 data-is-current-month:hover:bg-gray-100 nth-36:rounded-bl-lg nth-7:rounded-tr-lg dark:bg-gray-900/75 dark:text-gray-500 dark:hover:bg-gray-900/25 dark:data-is-current-month:bg-gray-900 dark:data-is-current-month:text-gray-100 dark:data-is-current-month:hover:bg-gray-900/50">
              <time :datetime="day.date"
                class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-today:bg-indigo-600 in-data-is-today:font-semibold in-data-is-today:text-white dark:in-data-is-today:bg-indigo-500">{{
                  Number(day.date.slice(-2)) }}</time>
            </button>
          </div>
        </section>
      </div>
      <section class="mt-12">
        <div class="flex justify-between">
          <h2 class="text-base font-semibold text-gray-900 dark:text-white">Upcoming events</h2>
          <div class="">
            <button type="button" @click="goToToday"
              class="rounded-md bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400">
              Today
            </button>
          </div>
        </div>
        <ol class="mt-2 divide-y divide-gray-200 text-sm/6 text-gray-500 dark:divide-white/10 dark:text-gray-400">
          <li class="py-4 sm:flex">
            <time datetime="2022-01-17" class="w-28 flex-none">Wed, Jan 12</time>
            <p class="mt-2 flex-auto sm:mt-0">Nothing on today’s schedule</p>
          </li>
          <li class="py-4 sm:flex">
            <time datetime="2022-01-19" class="w-28 flex-none">Thu, Jan 13</time>
            <p class="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0 dark:text-white">View house with real estate
              agent</p>
            <p class="flex-none sm:ml-6"><time datetime="2022-01-13T14:30">2:30 PM</time> - <time
                datetime="2022-01-13T16:30">4:30 PM</time></p>
          </li>
          <li class="py-4 sm:flex">
            <time datetime="2022-01-20" class="w-28 flex-none">Fri, Jan 14</time>
            <p class="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0 dark:text-white">Meeting with bank manager</p>
            <p class="flex-none sm:ml-6">All day</p>
          </li>
          <li class="py-4 sm:flex">
            <time datetime="2022-01-18" class="w-28 flex-none">Mon, Jan 17</time>
            <p class="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0 dark:text-white">Sign paperwork at lawyers</p>
            <p class="flex-none sm:ml-6"><time datetime="2022-01-17T10:00">10:00 AM</time> - <time
                datetime="2022-01-17T10:15">10:15 AM</time></p>
          </li>
        </ol>
      </section>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { useCalendar } from '@/composables/useCalendar'

// Optional: pass a custom fetcher to load events from your backend
const { months, prev, next, goToToday } = useCalendar()
</script>
