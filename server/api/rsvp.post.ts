import { z } from 'zod'
import { rsvpSubmissions } from '../db/schema'

// RSVP closes on 19 June 2026
const RSVP_DEADLINE = new Date('2026-06-19T23:59:59Z')

const rsvpSchema = z.object({
  guestNames: z
    .array(z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'))
    .min(1, 'Indique pelo menos um nome'),
  isAttending: z.boolean(),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, 'Número de telefone inválido')
    .optional()
    .or(z.literal('')),
  dietaryRestrictions: z.string().max(500).optional(),
})

export default defineEventHandler(async (event) => {
  // Check deadline
  if (new Date() > RSVP_DEADLINE) {
    throw createError({
      statusCode: 403,
      message: 'O prazo de confirmação encerrou a 19 de Junho de 2026.',
    })
  }

  const body = await readBody(event)
  const parsed = rsvpSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 422,
      message: parsed.error.errors.map((e) => e.message).join('; '),
    })
  }

  const { guestNames, isAttending, phoneNumber, dietaryRestrictions } = parsed.data
  const submissionGroupId = crypto.randomUUID()

  const db = useDB(event)

  const rows = guestNames.map((name) => ({
    submissionGroupId,
    guestName: name.trim(),
    isAttending,
    phoneNumber: phoneNumber ?? null,
    dietaryRestrictions: dietaryRestrictions ?? null,
  }))

  await db.insert(rsvpSubmissions).values(rows)

  return {
    success: true,
    message: isAttending
      ? 'Presença confirmada! Estamos ansiosos por vos receber.'
      : 'Lamentamos não poder contar convosco. Obrigado por nos informar.',
  }
})

