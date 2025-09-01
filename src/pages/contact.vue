<script setup lang="ts">

import ResourceCard from '@/components/ResourceCard.vue'

import { pb } from '@/packages/pocketbase'
import { ref, computed } from 'vue'
definePage({
  meta: { access: 'public' }
})

const resource: Resource = {
  id: '',
  title: 'Contact',
  cover: '/2fedcec88af6f5ad0e62dcf543b971779fb151b5.png',
  classes: 'bg-center',
  attribution: 'Ben Lo',
  attributionLink: 'https://benlo.artstation.com/',
}
// Form state
const name = ref('')
const email = ref('')
const message = ref('')
const sending = ref(false)
const success = ref('')
const error = ref('')
const honeypot = ref('')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isValid = computed(() => {
  return name.value.trim().length > 1 &&
    emailRegex.test(email.value.trim()) &&
    message.value.trim().length > 2
})

async function handleSubmit() {
  success.value = ''
  error.value = ''
  if (!isValid.value) {
    error.value = 'Please fill out all fields correctly.'
    return
  }
  sending.value = true
  try {
    if (honeypot.value) {
      console.error('Spam detected.')
    } else {
      await pb.collection('submissions').create({
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim()
      })
    }
    success.value = 'Message sent! We\'ll be in touch soon.'
    name.value = ''
    email.value = ''
    message.value = ''
  } catch (e: any) {
    console.error(e)
    error.value = e?.message || 'Failed to send message.'
  } finally {
    sending.value = false
  }
}
</script>
<template>
  <Layout>
    <div class="container mx-auto  mt-1 sm:mt-20">
      <ResourceCard :resource position="center" class="*:[[data-content]]:justify-center" hover />
    </div>


    <div class="relative isolate px-6 pt-12 sm:py-32 sm:mt-10 lg:px-8">
      <svg v-if="false"
        class="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-white/10"
        aria-hidden="true">
        <defs>
          <pattern id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width="200" height="200" x="50%" y="-64"
            patternUnits="userSpaceOnUse">
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-64" class="overflow-visible fill-gray-800/40">
          <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
            stroke-width="0" />
        </svg>
        <rect width="100%" height="100%" stroke-width="0" fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
      </svg>
      <div class="mx-auto max-w-xl lg:max-w-4xl">

        <div class="mt-8 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
          <div class="lg:mt-6 lg:w-80 lg:flex-none">
            <h2 class="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Let’s talk</h2>
            <figure class="mt-10">
              Have some big idea or need help? Then reach out we'd love to hear about your projects and provide help!

            </figure>
          </div>
          <form @submit.prevent="handleSubmit" class="lg:flex-auto">
            <div class="grid grid-cols-1 gap-x-8 gap-y-6">
              <div>
                <label for="name" class="block text-sm/6 font-semibold text-white">Name</label>
                <div class="mt-2.5">
                  <input v-model.trim="name" type="text" name="name" id="name" autocomplete="name"
                    class="w-full bg-zinc-900 border-transparent" required />
                </div>
              </div>


              <div>
                <label for="email" class="block text-sm/6 font-semibold text-white">Email</label>
                <div class="mt-2.5">
                  <input v-model.trim="email" type="email" name="email" id="email"
                    class="w-full bg-zinc-900 border-transparent" autocomplete="email" required />
                </div>
              </div>
              <div class="">
                <label for="message" class="block text-sm/6 font-semibold text-white">Message</label>
                <div class="mt-2.5">
                  <textarea v-model.trim="message" id="message" name="message" rows="4"
                    class="w-full bg-zinc-900 border-transparent" required></textarea>
                </div>
              </div>
              <div class="hidden">
                <div class="mt-2.5">
                  <input v-model="honeypot" id="honeypot" name="honeypot" />
                </div>
              </div>
            </div>
            <div class="mt-10">
              <button type="submit" :disabled="sending || !isValid"
                class="block w-full rounded-md bg-blue-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
                <span v-if="!sending">Let’s talk</span>
                <span v-else>Sending...</span>
              </button>
            </div>
            <p v-if="error" class="mt-4 text-sm text-red-400">{{ error }}</p>
            <p v-if="success" class="mt-4 text-sm text-green-400">{{ success }}</p>
            <p class="mt-4 text-sm/6 text-gray-400" v-if="false">By submitting this form, I agree to the <a href="#"
                class="font-semibold whitespace-nowrap text-blue-400">privacy policy</a>.</p>
          </form>

        </div>
      </div>
    </div>

  </Layout>
</template>
