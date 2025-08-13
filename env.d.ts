/// <reference types="vite/client" />

// Augment ImportMeta to support custom fields used in vite.config.ts
interface ImportMeta {
	readonly POCKETBASE_URL: string
	readonly POCKETBASE_TOKEN?: string
}
