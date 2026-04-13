import { z } from 'zod'
import { setCookie } from 'h3'

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = loginSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({ statusCode: 400, message: 'Credenciais inválidas.' })
  }

  const config = useRuntimeConfig(event)

  if (
    parsed.data.username !== config.adminUser ||
    parsed.data.password !== config.adminPass
  ) {
    throw createError({ statusCode: 401, message: 'Utilizador ou palavra-passe incorretos.' })
  }

  // Simple signed token: base64(user:timestamp) — replace with JWT for production
  const token = Buffer.from(`${parsed.data.username}:${Date.now()}`).toString('base64')

  setCookie(event, 'admin_session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  })

  return { success: true }
})

