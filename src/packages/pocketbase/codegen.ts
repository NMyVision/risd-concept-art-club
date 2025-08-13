import type { PluginOptions } from "./types";

export function generateCode(options: PluginOptions) {
  return ""
}

export function generateDTS(options: PluginOptions) {
  return `
// Default PocketBase types
export interface BaseRecord {
  id: string;
  created: string;
  updated: string;
}

export interface User extends BaseRecord {
  username: string;
  email: string;
  name?: string;
  avatar?: string;
  verified: boolean;
}

export interface Admin extends BaseRecord {
  email: string;
  avatar?: string;
}

// Generic collection record type
export interface CollectionRecord extends BaseRecord {
  [key: string]: any;
}

// Auth response types
export interface AuthResponse {
  token: string;
  record: User;
}

export interface AdminAuthResponse {
  token: string;
  admin: Admin;
}

// Common query options
export interface ListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
  expand?: string;
  fields?: string;
}

// File upload type
export interface FileUpload {
  file: File;
  filename?: string;
}
  `
}
