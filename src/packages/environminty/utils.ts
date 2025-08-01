import type { SettingDefinition, StageBasedTypeConfiguration, ClientBasedTypeConfiguration, SettingDefinitionDictionary, BooleanSchema, EnumSchema, NumberSchema, SchemaBuilder, StringSchema, PluginOptions, CreateSchemaConfiguration } from './types'

export function isSettingDefinition<S extends readonly string[] = string[], C extends readonly string[] = string[], T extends readonly string[] = string[]>(obj: unknown): obj is SettingDefinition<S, C, T> {
  return obj !== null && typeof obj === 'object' && 'type' in obj
}

export function isStageConfig<S extends readonly string[] = string[], T = unknown>(value: unknown): value is StageBasedTypeConfiguration<S, T> {
  return typeof value === 'object' && value !== null && 'stage' in value && typeof (value as any).stage === 'object' && (value as any).stage !== null
}

export function isClientConfig<S extends readonly string[] = string[], C extends readonly string[] = string[], T extends readonly string[] = string[]>(value: unknown): value is ClientBasedTypeConfiguration<S, C, T> {
  return typeof value === 'object' && value !== null && 'client' in value && typeof (value as any).client === 'object' && (value as any).client !== null
}

export const useFields = <S extends readonly string[] = never, C extends readonly string[] = never>() => ({
  number: (option?: Omit<NumberSchema<S, C>, 'type'>): NumberSchema<S, C> => ({
    required: false,
    feature: true,
    ...option,
    type: 'number'
  }),
  string: (option?: Omit<StringSchema<S, C>, 'type'>): StringSchema<S, C> => ({
    required: false,
    feature: true,
    ...option,
    type: 'string'
  }),
  boolean: (option?: Omit<BooleanSchema<S, C>, 'type'>): BooleanSchema<S, C> => ({
    required: false,
    feature: true,
    ...option,
    type: 'boolean'
  }),
  enum: <T extends readonly string[]>(option: Omit<EnumSchema<T, S, C>, 'type'>): EnumSchema<T, S, C> => ({
    required: false,
    feature: true,
    ...option,
    type: 'enum'
  })
})
export function createSchema<S extends readonly string[] = never, C extends readonly string[] = never>(options: CreateSchemaConfiguration<S, C>): PluginOptions<S, C> {
  const { clients, stages } = options
  const _createSchema = (options: SettingDefinitionDictionary<S, C>, prefix: string = '') => {
    const resolveOptions: SettingDefinitionDictionary<S, C> = {}
    Object.entries(options).forEach(([key, option]) => {
      if (isSettingDefinition(option)) {
        // Stage config validation
        if (option.default && isStageConfig(option.default)) {
          const keys = Object.keys(option.default.stage)
          const hasAll = stages.every((env) => keys.includes(env))
          if (hasAll && keys.includes('*')) {
            throw new Error(`Invalid stage config for "${key}": Cannot specify '*' when all stages are present.`)
          }
        }
        // Client config validation
        if (option.default && isClientConfig(option.default)) {
          const keys = Object.keys(option.default.client)
          const hasAll = clients.every((client) => keys.includes(client))
          if (hasAll && keys.includes('*')) {
            throw new Error(`Invalid client config for "${key}": Cannot specify '*' when all clients are present.`)
          }
        }
        resolveOptions[key] = {
          ...option,
          env: option.env ?? `VITE_APP_${prefix ? prefix + '_' : ''}${key.toUpperCase()}`
        }
      } else if (typeof option === 'object' && option !== null) {
        resolveOptions[key] = _createSchema(option as SettingDefinitionDictionary<C, S>, key)
      }
    })
    return resolveOptions
  }

  // const builder: SchemaBuilder<S, C> = {
  //   withStages(envs) {
  //     stages = envs
  //   },
  //   withClients(clis) {
  //     clients = clis
  //   },
  //   withSchema(opts) {
  //     const fields = useFields<typeof stages, typeof clients>()
  //     schema = opts(fields)
  //   }
  // }

  // builderFn(builder)

  // if (!schema) throw new Error('withOptions must be called in schema builder')

  // You can now use stages, clients, and schema as before
  // (You may want to move your validation logic here as needed)
  const fields = useFields<S, C>()
  const schema = _createSchema(options.schema(fields))

  // For demonstration, just return the schema
  return {
    clients: options.clients,
    stages: options.stages,
    schema
  }
}
