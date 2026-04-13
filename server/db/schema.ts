import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const rsvpSubmissions = sqliteTable('rsvp_submissions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  submissionGroupId: text('submission_group_id').notNull(),
  guestName: text('guest_name').notNull(),
  isAttending: integer('is_attending', { mode: 'boolean' }).notNull().default(true),
  phoneNumber: text('phone_number'),
  dietaryRestrictions: text('dietary_restrictions'),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
})

export type RsvpSubmission = typeof rsvpSubmissions.$inferSelect
export type NewRsvpSubmission = typeof rsvpSubmissions.$inferInsert

