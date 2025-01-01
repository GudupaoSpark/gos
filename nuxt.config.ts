// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import type { NuxtConfig } from '@nuxt/schema'

interface CustomNuxtConfig extends NuxtConfig {
  content?: any  // 暫時使用 any 類型來解決問題
}

export default defineNuxtConfig({
  pages: true,
  devtools: { enabled: true },
  target: 'static',
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
    pageTransition: { name: 'page', mode: 'out-in' },
    keepalive: false,
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },

  experimental: {
    payloadExtraction: false
  },

  ssr: true,

  nitro: {
    compressPublicAssets: true,
    minify: true
  },

  compatibilityDate: '2025-01-01'
} as CustomNuxtConfig)