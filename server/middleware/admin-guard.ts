import { getCookie } from 'h3'

// Protect all /api/admin/* routes at the server level
export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const isAdminApi = url.pathname.startsWith('/api/admin/')
  const isLoginRoute = url.pathname === '/api/admin/login'

  if (isAdminApi && !isLoginRoute) {
    const token = getCookie(event, 'admin_session')
    if (!token) {
      throw createError({ statusCode: 401, message: 'Não autorizado.' })
    }
  }
})

