import type { CollectionField, CollectionModel } from "pocketbase"

export type PluginOptions = {
  url: string
  useBaseModel: boolean
  nameSuffix: string
  path: string
  collectionNameResolver: (collection: CollectionModel) => string
  fieldNameResolver: (field: CollectionField) => string
  getCollectionData: (options: PluginOptions, env: Record<string, any>) => Promise<CollectionModel[]>
  fieldFilter: (field: CollectionField, options: PluginOptions) => boolean
  collectionFilter: (collection: CollectionModel, options: PluginOptions) => boolean
}
