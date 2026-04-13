import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../db/schema'
import type { H3Event } from 'h3'

export function useDB(event: H3Event) {
  // Access the D1 binding injected by Cloudflare Pages / Wrangler
  const { cloudflare } = event.context as {
    cloudflare: { env: { DB: D1Database } }
  }
  return drizzle(cloudflare.env.DB, { schema })
}

