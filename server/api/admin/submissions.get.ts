import { rsvpSubmissions } from '../../db/schema'
import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  // Verify admin session cookie
  const token = getCookie(event, 'admin_session')
  if (!token) {
    throw createError({ statusCode: 401, message: 'Não autorizado.' })
  }

  const db = useDB(event)
  const rows = await db.select().from(rsvpSubmissions).all()

  return rows
})

