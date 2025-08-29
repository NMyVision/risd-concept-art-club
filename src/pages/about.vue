<script setup lang="ts">
import { pb } from '@/packages/pocketbase'
import { usePocketbaseStore } from '@/packages/stores/resource';
const { getAllMembers } = usePocketbaseStore( )
const { state, isLoading, error } = getAllMembers( )

const people = [
  {
    name: 'Leonard Krasner',
    role: 'Senior Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.',
  },
  {
    name: 'Floyd Miles',
    role: 'Principal Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Turpis lectus et amet elementum. Mi duis integer sed in vitae consequat. Nam vitae, in felis mi dui tempus. Porta at turpis eu odio. Et, sed duis in blandit bibendum accumsan. Purus viverra facilisi suspendisse quis est.',
  },
  {
    name: 'Emily Selman',
    role: 'VP, User Experience',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Aliquet adipiscing lectus praesent cras sed quis lectus egestas erat. Bibendum curabitur eget habitant feugiat nec faucibus eu lorem suscipit. Vitae vitae tempor enim eget lacus nulla leo.',
  },
  {
    name: 'Kristin Watson',
    role: 'VP, Human Resources',
    imageUrl:
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Quis bibendum velit diam tellus sed ut. Faucibus posuere enim, vitae enim eget neque tortor. Metus lectus mattis id id. Tellus ornare etiam id velit ut enim lacinia congue ultrices. Sit morbi vel elit a maecenas mauris elit lectus magna.',
  },
]

const getURLImage = <T>(item: T, fn: (T: any) => string) => {
  if (item && fn(item)) {
    return pb.files.getURL(item, fn(item))
  }
  return 'https://via.placeholder.com/300x200?text=No+Image'
}
</script>
<template>
  <Layout>


    <div class="h-[48rem] flex justify-center items-center mt-20">
      <div class="block text-balance text-center h-96 w-full max-w-7xl">
        <h1 class="text-white font-semibold text-6xl sm:text-8xl/30">
          <span class="font-extralight block">Welcome to</span>
          <span class="pt-8 md:pt-4 block bg-linear-to-b from-blue-500 to-blue-900 bg-clip-text  font-extrabold text-transparent">Concept
            Art Club</span>
        </h1>
      </div>
    </div>

    <div class=" not-even: bg-radial from-blue-500 to-blue-600 relative  isolate ">
      <img src="/8827f5ee277df12cf13a8701c3024a8eab985628.png" alt=""
        class="absolute inset-0 -z-10 size-full object-cover opacity-20" />
      <div class="container mx-auto py-20">

        <h3 class="text-white text-center pb-10 text-4xl sm:text-5xl font-semibold text-shadow-md/20 ">Club Mission</h3>

        <p class="relative p-4 text-blue-100 text-center text-base/loose text-shadow-md/20 text-balance max-w-5xl mx-auto">The goal of RISD's Concept Art Club
          is to help
          students who are interested in perusing the per-production aspect of the animation or gaming industry. This
          includes visual development, character design, background design, prop design, story-boarding, color
          scripting, etc. Members will be able to attend artist talks, with people who are already in the industry, as
          well as get to watch screenings of tutorials and interviews of industry artists. Advice regarding cover
          letters and resumes for internship/job opportunities will also be given. If this sounds a bit overwhelming,
          don't worry! You're not required to attend every single meeting. Just come when you feel like it! We hope to
          see you there.</p>

      </div>
    </div>

    <div class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl sm:text-center">
          <h2 class="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">Meet our Officers</h2>
          <p class="mt-6 text-lg/8 text-gray-400">We’re a dynamic group of individuals who are passionate about what we
            do and dedicated to delivering the best results for our clients.</p>
        </div>
        <ul role="list"
          class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none">
          <li v-for="person in state" :key="person.name" class="flex flex-col gap-6 xl:flex-row">
            <img class="aspect-4/5 w-52 flex-none rounded-2xl object-cover outline-1 -outline-offset-1 outline-white/10"
              :src="getURLImage(person, (p) => p.avatar)" alt="" />
            <div class="flex-auto">
              <h3 class="text-lg/8 font-semibold tracking-tight text-white">{{ person.name }}</h3>
              <p class="text-base/7 text-gray-400">{{ person.role }}</p>
              <p class="mt-6 text-base/7 text-gray-400">{{ person.profile }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>


    <div class="py-44 sm:py-32 bg-gradient-to-t from-blue-600">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl sm:text-center">
          <h2 class="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">When and where do we
            meet?</h2>
        </div>

        <div class="mx-auto max-w-2xl px-6 lg:px-8 lg:max-w-4xl lg:gap-x-8 xl:max-w-none pt-20 text-blue-200">
          Concept Art Club meets every other Friday from 4-5pm in the Media Center (Room 112) in the Fleet Library.
          All are welcome to attend, no matter your major or skill level! We hope to see you there.
        </div>
      </div>
    </div>



  </Layout>
</template>
