/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

// // Augment ImportMeta to support custom fields used in vite.config.ts
// interface ViteTypeOptions {
//   // By adding this line, you can make the type of ImportMetaEnv strict
//   // to disallow unknown keys.
//   // strictImportMetaEnv: unknown
// }

interface ImportMetaEnv {
  readonly VITE_POCKETBASE_URL: string
	readonly VITE_POCKETBASE_TOKEN?: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

import 'vue-router';

type RouteAccess = 'private' | 'public' | 'anonymous'

declare module 'vue-router' {
  interface RouteMeta {
    access?: RouteAccess
  }
}


