import fs from 'node:fs'
import path from 'node:path'
import { loadEnv } from 'vite'
import PocketBase, { type CollectionField, type CollectionModel } from 'pocketbase'
import { generateDTS } from './codegen'
import type { PluginOptions } from './types'
import { sentenceCase, singularize } from '../codewriter'


export const getCollectionData = async (options: PluginOptions, env: Record<string, any>) => {
  const opt = { url: env.VITE_POCKETBASE_URL, token: env.POCKETBASE_TOKEN }
  const pb = new PocketBase(opt.url)
  pb.authStore.save(opt.token, null)
  return await pb.collections.getFullList()
}
const getOptions = (options?: Partial<PluginOptions>) => {
  console.log('getOptions BEFORE', options)
  if (!options) options = {} as Partial<PluginOptions>
  if (options.useBaseModel === undefined) options.useBaseModel = true;
  if (!options.fieldFilter) options.fieldFilter =  (f: CollectionField, o: PluginOptions) => !f.hidden || ( o.useBaseModel &&(f.name === "id" || f.name === "created" || f.name === "updated")) ;
  if (!options.collectionFilter) options.collectionFilter = c => !c.name.startsWith("_");
  if (options.nameSuffix === undefined) options.nameSuffix = "Model";
  if (options.getCollectionData === undefined) options.getCollectionData = getCollectionData;
  if (!options.collectionNameResolver) options.collectionNameResolver = (c) => singularize(sentenceCase(c.name));
  if (!options.fieldNameResolver) options.fieldNameResolver = (f) => f.name
  console.log('getOptions END', options)
  return options as PluginOptions;
};


export default function (options?: Partial<PluginOptions>) {

  //const virtualModuleId = 'virtual:pocketbase'
  //const resolvedVirtualModuleId = '\0' + virtualModuleId

  const writeToFile = (filePath: string, content: string) => {
    //const filePath = path.join(segments.replace('~/', process.cwd())
    const outFile = path.join(...filePath.split('/'))
    fs.mkdirSync(path.dirname(outFile), { recursive: true })
    fs.writeFileSync(outFile, content, 'utf8')
  }

  // this will be populated later in the build
  let viteConfig: import('vite').ResolvedConfig

  return {
    name: 'vite-plugin-pocketbase',
    enforce: 'post',
    // config({ mode }: { mode: import('vite').ResolvedConfig['mode'] }) {
    //   const env = loadEnv(mode, process.cwd(), '')
    //   // You can read process.env or any other source here
    //   return {
    //     define: {
    //       'import.meta.env.POCKETBASE_URL': JSON.stringify(env.VITE_POCKETBASE_URL),
    //       'import.meta.env.POCKETBASE_TOKEN': JSON.stringify(env.POCKETBASE_TOKEN)
    //     }
    //   }
    // },
    async configResolved(resolvedConfig: import('vite').ResolvedConfig) {
      viteConfig = resolvedConfig
    },
    async buildStart() {
      const opts = getOptions(options);
      const env = loadEnv(viteConfig.mode, process.cwd(), '')
      const collections:CollectionModel[] = await opts.getCollectionData(opts, env)
      const content = generateDTS(opts, collections)

      writeToFile(`./pocketbase-collections.d.ts`, content);

    },
    // resolveId(id: unknown) {
    //   if (id === virtualModuleId) return resolvedVirtualModuleId
    // },
    // async load(id: unknown) {
    //   if (id === resolvedVirtualModuleId) {

    //     const env = loadEnv(viteConfig.mode, process.cwd(), '')
    //     const text = generateCode({ url: env.VITE_POCKETBASE_URL, token: env.POCKETBASE_TOKEN })
    //     //writeToFile('./environminty.out.js', text)
    //     return text
    //   }
    // }
  }
}
