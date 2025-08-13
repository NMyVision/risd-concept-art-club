import PocketBase from 'pocketbase';

// Get PocketBase URL from environment variables
const PB_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';

// Create and export PocketBase client
export const pb = new PocketBase(PB_URL);

// Disable auto cancellation for better UX
pb.autoCancellation(false);
