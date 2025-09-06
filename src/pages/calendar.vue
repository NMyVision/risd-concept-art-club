<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { useCalendar } from '@/composables/useCalendar'
import ResourceCard from '@/components/ResourceCard.vue'
import type { SiteResource } from '@/types'
import { useNow } from '@vueuse/core'
// Optional: pass a custom fetcher to load events from your backend
const { months, prev, next, goToToday } = useCalendar()

const resource:SiteResource = {

  "title": "Calendar",
  "cover": "/4d90badcba6065f0c7ffaebf38618b30952b4de8.png",
  "classes": "bg-center",
  "attribution" :"Cristina Bencina",
  "attributionLink": "https://www.artstation.com/cristinabencina",
}

function formatToShortDate(date: Date): string {
  // Define options for formatting
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short', // "Wed"
    month: 'short',   // "Jan"
    day: 'numeric',   // "12"
  };

  // Create a formatter for the English-US locale
  // You can change 'en-US' to another locale if needed,
  // but for "Wed, Jan 12", 'en-US' is appropriate.
  const formatter = new Intl.DateTimeFormat('en-US', options);

  return formatter.format(date);
}

const now = useNow();
</script>
<template>
  <Layout>
     <div class="container mx-auto mt-1 sm:mt-20">
      <ResourceCard :resource position="center" class="*:[[data-content]]:justify-center" hover />
    </div>
    <div class="mx-auto w-full max-w-4xl pt-20 pb-20  px-4 sm:px-0">
     <div class="relative grid grid-cols-1 gap-x-14 md:grid-cols-2">
      <button type="button" @click="prev" class="absolute -top-1 -left-1.5 flex items-center justify-center p-1.5 text-gray-400 hover:text-white">
        <span class="sr-only">Previous month</span>
        <ChevronLeftIcon class="size-5" aria-hidden="true" />
      </button>
      <button type="button" @click="next" class="absolute -top-1 -right-1.5 flex items-center justify-center p-1.5 text-gray-400 hover:text-white">
        <span class="sr-only">Next month</span>
        <ChevronRightIcon class="size-5" aria-hidden="true" />
      </button>
      <section v-for="(month, monthIdx) in months" :key="monthIdx" class="text-center last:max-md:hidden">
        <h2 class="text-sm font-semibold text-white">{{ month.name }}</h2>
        <div class="mt-6 grid grid-cols-7 text-xs/6 text-gray-400">
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>
        <div class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-white/10 text-sm ring-1 ring-white/10">
          <button v-for="day in month.days" :key="day.date" type="button" :data-is-current-month="day.isCurrentMonth ? '' : undefined" :data-is-today="day.isToday ? '' : undefined" class="relative bg-zinc-950/75 py-1.5 text-gray-500 first:rounded-tl-lg last:rounded-br-lg hover:bg-gray-900/25 focus:z-10 data-is-current-month:bg-blue-900/20 data-is-current-month:text-gray-100 data-is-current-month:hover:bg-gray-900/50 nth-36:rounded-bl-lg nth-7:rounded-tr-lg">
            <time :datetime="day.date" class="mx-auto flex size-7 items-center justify-center rounded-full in-data-is-today:bg-blue-500 in-data-is-today:font-semibold in-data-is-today:text-white">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
          </button>
        </div>
      </section>
    </div>
    <section class="mt-12">
      <div class="flex justify-between">
         <h2 class="text-base font-semibold text-white">Upcoming events</h2>
        <div class="">
          <button type="button" @click="goToToday"
            class="rounded-md bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400">
            Today
          </button>
        </div>
      </div>
      <ol class="mt-2 divide-y divide-white/10 text-sm/6 text-gray-400">

        <li class="py-4 sm:flex" v-if="formatToShortDate(now) == formatToShortDate(new Date(2025,8,6)) ">
          <time datetime="2022-01-19" class="w-28 flex-none">{{formatToShortDate(new Date(2025,8,6))}} </time>
          <p class="mt-2 flex-auto font-semibold text-white sm:mt-0">Block Party</p>
          <p class="flex-none sm:ml-6"><time datetime="2025-09-06T12:00">Noon</time> - <time datetime="2022-01-13T16:30">2:00 PM</time></p>
        </li>
        <li class="py-4 sm:flex" v-else>
          <time datetime="2022-01-17" class="w-28 flex-none">{{ formatToShortDate(now) }}</time>
          <p class="mt-2 flex-auto sm:mt-0">Nothing on today’s schedule</p>
        </li>
        <!-- <li class="py-4 sm:flex">
          <time datetime="2022-01-19" class="w-28 flex-none">Thu, Jan 13</time>
          <p class="mt-2 flex-auto font-semibold text-white sm:mt-0">View house with real estate agent</p>
          <p class="flex-none sm:ml-6"><time datetime="2022-01-13T14:30">2:30 PM</time> - <time datetime="2022-01-13T16:30">4:30 PM</time></p>
        </li>
        <li class="py-4 sm:flex">
          <time datetime="2022-01-20" class="w-28 flex-none">Fri, Jan 14</time>
          <p class="mt-2 flex-auto font-semibold text-white sm:mt-0">Meeting with bank manager</p>
          <p class="flex-none sm:ml-6">All day</p>
        </li>
        <li class="py-4 sm:flex">
          <time datetime="2022-01-18" class="w-28 flex-none">Mon, Jan 17</time>
          <p class="mt-2 flex-auto font-semibold text-white sm:mt-0">Sign paperwork at lawyers</p>
          <p class="flex-none sm:ml-6"><time datetime="2022-01-17T10:00">10:00 AM</time> - <time datetime="2022-01-17T10:15">10:15 AM</time></p>
        </li> -->
      </ol>
    </section>
    </div>
  </Layout>
</template>


