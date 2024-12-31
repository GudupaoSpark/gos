// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/i18n'],
  i18n: {
    baseUrl: 'http://localhost:3000',
    defaultLocale: 'zh',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'zh'
    },
    locales: ['zh', 'en'],
    vueI18n: './config/i18n.config.ts'
  },
  routeRules: {
    '/': { prerender: true }
  },
  css: ['@/assets/styles/main.css'],
})
