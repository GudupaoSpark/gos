// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },
  modules: [
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/content'
  ],
  content: {
    documentDriven: false
  },
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
  css: [
    '~/assets/styles/main.css',
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  experimental: {
    payloadExtraction: false
  }
})
