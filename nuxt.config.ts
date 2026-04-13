// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Nuxt 4 app directory convention
  future: { compatibilityVersion: 4 },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      'Cormorant+Garamond': [300, 400, 500, 600, 700],
      Inter: [300, 400, 500, 600],
    },
    display: 'swap',
    preload: true,
  },

  // Cloudflare Pages deployment
  nitro: {
    preset: 'cloudflare-pages',
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    adminUser: process.env.ADMIN_USER ?? 'admin',
    adminPass: process.env.ADMIN_PASS ?? 'changeme',
    public: {},
  },
})
