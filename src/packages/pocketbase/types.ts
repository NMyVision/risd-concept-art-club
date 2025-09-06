import type { CollectionField, CollectionModel } from "pocketbase"

export type PluginOptions = {
  url: string
  useBaseModel: boolean
  nameSuffix: string
  path: string
  /**
   * When true (default) the code generation runs only during `vite serve` (local dev),
   * and is skipped during production builds (`vite build`). Set to false to allow
   * running also for builds / CI.
   */
  devOnly: boolean
  collectionNameResolver: (collection: CollectionModel) => string
  fieldNameResolver: (field: CollectionField) => string
  getCollectionData: (options: PluginOptions, env: Record<string, any>) => Promise<CollectionModel[]>
  fieldFilter: (field: CollectionField, options: PluginOptions) => boolean
  collectionFilter: (collection: CollectionModel, options: PluginOptions) => boolean
}
