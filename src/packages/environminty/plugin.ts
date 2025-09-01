import fs from 'node:fs'
import path from 'node:path'
import { loadEnv } from 'vite'

import { type PluginOptions } from './types'
import { generateDTS, generateCode } from './codegen'

export default function <S extends readonly string[], C extends readonly string[]>(options: PluginOptions<S, C>) {
  const virtualModuleId = 'virtual:environminty'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  const writeToFile = (filePath: string, content: string) => {
    //const filePath = path.join(segments.replace('~/', process.cwd())
    const outFile = path.join(...filePath.split('/'))
    fs.mkdirSync(path.dirname(outFile), { recursive: true })
    fs.writeFileSync(outFile, content, 'utf8')
  }

  let viteConfig: import('vite').ResolvedConfig

  return {
    name: 'vite-plugin-environminty',
    enforce: 'post',
    config({ mode }: { mode: import('vite').ResolvedConfig['mode'] }) {
      const env = loadEnv(mode, process.cwd(), '')
      // You can read process.env or any other source here
      return {
        define: {
          'import.meta.env.POCKETBASE_TOKEN': JSON.stringify(env.POCKETBASE_TOKEN),
          'import.meta.env.VITE_POCKETBASE_URL': JSON.stringify(env.VITE_POCKETBASE_URL)
        }
      }
    },
    async configResolved(resolvedConfig: import('vite').ResolvedConfig) {
      viteConfig = resolvedConfig
    },
    async buildStart() {
      const dtsContent = generateDTS(options)
      writeToFile('./environminty.d.ts', dtsContent)

      // const text = generateCode(options, env.CLIENT, env.STAGE)
      // writeToFile('./environminty.out.js', text)
    },
    resolveId(id: unknown) {
      if (id === virtualModuleId) return resolvedVirtualModuleId
    },
    async load(id: unknown) {
      if (id === resolvedVirtualModuleId) {
        const env = loadEnv(viteConfig.mode, process.cwd(), '')
        const text = generateCode(options, env.CLIENT, env.STAGE)
        //writeToFile('./environminty.out.js', text)
        return text
      }
    }
  }
}
