import type { Configuration, PluginOptions, SettingDefinition, SettingDefinitionDictionary } from './types'
import { isSettingDefinition } from './utils'

export const ts = String.raw

// Helper to flatten nested SettingDefinitionDictionary
export function unflatten(obj: SettingDefinitionDictionary<[], []>): SettingDefinitionDictionary<[], []> {
  const result: SettingDefinitionDictionary<[], []> = {}

  for (const [flatKey, value] of Object.entries(obj)) {
    const parts = flatKey.split('__')
    let curr = result

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      if (i === parts.length - 1) {
        curr[part] = value
      } else {
        if (!(part in curr)) curr[part] = {}
        curr = curr[part]
      }
    }
  }

  return result
}

function resolveStageValue(source: Record<string, any>, key: string) {
  if (key in source) return source[key]
  if ('_' in source) return source['_']

  console.warn('No matching stage found in configuration:', source, key)

  return undefined
}

function resolveValue<S extends readonly string[], C extends readonly string[], T extends string | number | boolean>(client: C[number], stage: S[number], config: Configuration<S, C, T>) {
  if ('client' in config) {
    const clientConfig = (config as Record<string, any>)['client']
    if (clientConfig && typeof clientConfig === 'object') {
      const temp = resolveStageValue(clientConfig, client)
      return typeof temp === 'object'
        ? // if the value is an object, resolve the stage value
          resolveStageValue(temp, stage)
        : temp
    }

    // fallback: first available value for client
    return resolveStageValue(clientConfig, client)
  }

  if ('stage' in config) {
    const stageConfig = (config as Record<string, any>)['stage']
    return resolveStageValue(stageConfig, stage)
  }
}

export function generateCode<S extends readonly string[], C extends readonly string[]>(options: PluginOptions<S, C>, client: string, stage: string) {
  const flat = unflatten(options.schema)

  console.log('env STAGE', stage, client)

  const build = (obj: SettingDefinitionDictionary<S, C>) => {
    return internal(obj)

    function internal(item: unknown | SettingDefinitionDictionary<S, C> | SettingDefinition<S, C>, offset = 2): string {
      const wrap = (value: unknown) => (typeof value === 'string' ? `'${value}'` : value)

      return Object.entries(item as object)
        .map(([key, value]: [string, unknown]) => {
          const space = ' '.repeat(offset)
          if (isSettingDefinition(value)) {
            if (typeof value.default === 'object') {
              let temp: string | number | boolean | undefined = undefined
              if (value.default && typeof value.default === 'object') {
                temp = resolveValue(client, stage, value.default as Configuration<S, C, string | number | boolean>)
              }
              return `${space}${key}: withDefault('${key}', import.meta.env.${value.env}, ${wrap(temp)}, '${value.type}', ${value.required}),`
            } else {
              return `${space}${key}: withDefault('${key}', import.meta.env.${value.env}, ${wrap(value.default)}, '${value.type}', ${value.required}),`
            }
          } else {
            return [`${space}${key} : {`, internal(value, offset + 2), `${space}},`].join('\n')
          }
        })
        .join('\n')
    }
  }

  return ts`

function withDefault(key, value, defaultValue, type, isRequired) {

  const temp = (value === undefined) ? defaultValue : value

  if ((temp === undefined || temp === null || temp === '') && isRequired)
  {
    if (isRequired) requiredKeys[key] = true

    if (isProduction) throw new Error('Missing required environment variable: "' + key + '", this will break the app in production')
    else console.warn('Missing required environment variable: ' + key)
    return temp
  }

  if (isRequired) requiredKeys[key] = false

  if (value === undefined) return temp;
  if (type === 'boolean') return (value === 'true' || value === true)
  if (type === 'number') return +value


  return value !== undefined ? value : defaultValue
}

export const isProduction = import.meta.env.PROD

export const isDevelopment = import.meta.env.DEV

let requiredKeys = {}

export default {
  isProduction,
  isDevelopment,
  throwIfMissingKeys: () => {
    if (requiredKeys.some(k => k.true)) {
      throw new Error('Missing required environment variables: ' + Object.entries(requiredKeys).filter(k => k[1]).map(k => k[0]).join(', '))
    }
  },
  clients: isProduction ? [] : [${options.clients.map((c) => `'${c}'`).join(',')}],
  stages: isProduction ? [] : [${options.stages.map((s) => `'${s}'`).join(',')}],
  STAGE:  import.meta.env.STAGE,
  CLIENT:  import.meta.env.CLIENT,
  MODE: import.meta.env.MODE,
  BASE_URL: import.meta.env.BASE_URL,

  requiredKeys,
${build(flat)}
}`.trim()
}

export function generateDTS<S extends readonly string[], C extends readonly string[]>(options: PluginOptions<S, C>) {
  const flat = unflatten(options.schema)
  const build = (obj: SettingDefinitionDictionary) => {
    return internal(obj)

    function internal(item: unknown | SettingDefinitionDictionary | SettingDefinition, offset = 4): string {
      return Object.entries(item as object)
        .map(([key, value]: [string, unknown]) => {
          const space = ' '.repeat(offset)
          if (isSettingDefinition(value)) {
            return `${space}${key}: ${value.type === 'enum' ? value.options.map((o) => `'${o}'`).join(' | ') : value.type}`
          } else {
            return [`${space}${key} : {`, internal(value, offset + 2), `${space}}`].join('\n')
          }
        })
        .join('\n')
    }
  }

  return ts`
/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by environminty. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'virtual:environminty' {
  const featureFlags: {
    isProduction: boolean
    isDevelopment: boolean
    throwIfMissingKeys: () => void
    clients: [${options.clients.map((c) => `'${c}'`).join(',')}]
    stages: [${options.stages.map((s) => `'${s}'`).join(',')}]
    STAGE: string
    CLIENT: string
    MODE: string
    BASE_URL: string

${build(flat)}
  }

  export default featureFlags

  /**
   * @description
   * {boolean} whether the app is running in production (running the dev server with NODE_ENV='production' or running an app built with NODE_ENV='production').
   */
  export const isProduction: boolean

  /**
   * @description
   * whether the app is running in production (always the opposite of isDevelopment)
   */
  export const isDevelopment: boolean
}
`.trimStart()
}
