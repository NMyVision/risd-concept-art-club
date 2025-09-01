import PocketBase from 'pocketbase';
import type { TypedPocketBase } from '../../../pocketbase-collections'
export type * from '../../../pocketbase-collections'

// Get PocketBase URL from environment variables
const PB_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';

// Create and export PocketBase client
export const pb = new PocketBase(PB_URL) as  TypedPocketBase;

// Disable auto cancellation for better UX
// pb.autoCancellation(false);
