import type { useFields } from './utils'

export type BaseSchema<T, S extends readonly string[], C extends readonly string[]> = {
  type: string
  feature?: boolean
  env?: string
  optional?: boolean
  default?: T | Configuration<S, C, T>
  label?: string
  component?: string
  required?: boolean
}

type PartialRecordWithUnderScore<K extends string, T> = {
  [P in K]?: T
} & {
  _?: T
}

export type StageBasedTypeConfiguration<S extends readonly string[], T> = {
  stage: PartialRecordWithUnderScore<S[number] | '_', T> | T
}

export type ClientBasedTypeConfiguration<S extends readonly string[], C extends readonly string[], T> = {
  client: PartialRecordWithUnderScore<C[number] | '_', T | PartialRecordWithUnderScore<S[number] | '_', T>>
}

export type Configuration<S extends readonly string[], C extends readonly string[], T> = StageBasedTypeConfiguration<S, T> | ClientBasedTypeConfiguration<S, C, T>

export type NumberSchema<S extends readonly string[], C extends readonly string[]> = BaseSchema<number, S, C> & {
  type: 'number'
  min?: number
  max?: number
  step?: number
  int?: boolean
  component?: 'number'
}

export type StringSchema<S extends readonly string[], C extends readonly string[]> = BaseSchema<string, S, C> & {
  type: 'string'
  component?: 'paragraph' | 'sentence' | 'markdown' | 'html'
}

export type BooleanSchema<S extends readonly string[], C extends readonly string[]> = BaseSchema<boolean, S, C> & {
  type: 'boolean'
  component?: 'toogle' | 'checkbox'
}

export type EnumSchema<T extends readonly string[], S extends readonly string[], C extends readonly string[], D extends string = T[number]> = BaseSchema<D, S, C> & {
  type: 'enum'
  options: T
  component?: 'select'
}

export type SettingDefinition<S extends readonly string[] = [], C extends readonly string[] = [], T extends readonly string[] = readonly string[]> = NumberSchema<S, C> | StringSchema<S, C> | BooleanSchema<S, C> | EnumSchema<T, S, C>

export type SettingDefinitionDictionary<S extends readonly string[] = [], C extends readonly string[] = [], T extends readonly string[] = readonly string[]> = {
  [key: string]: SettingDefinition<S, C, T> | SettingDefinitionDictionary<S, C, T>
}

// types.ts
export interface SchemaBuilder<S extends readonly string[], C extends readonly string[]> {
  withStages(stages: S): void
  withClients(clients: C): void
  withSchema(schema: (fields: ReturnType<typeof useFields<S, C>>) => SettingDefinitionDictionary<S, C>): void
}

export type PluginOptions<S extends readonly string[], C extends readonly string[]> = {
  clients: C
  stages: S
  schema: SettingDefinitionDictionary<S, C>
}

export type CreateSchemaConfiguration<S extends readonly string[] = never, C extends readonly string[] = never> = {
  stages: S
  clients: C
  schema: (fields: ReturnType<typeof useFields<S, C>>) => SettingDefinitionDictionary<S, C>
}
