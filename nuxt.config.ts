import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ['@nuxtjs/tailwindcss'],
  css: ['@/assets/css/tailwind.css'],
  ssr: false,
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL,
      oauthRedirectUri: process.env.OAUTH_REDIRECT_URI,
    },
  },
})
