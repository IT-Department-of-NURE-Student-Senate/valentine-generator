export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: [
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    'nuxt-svgo',
  ],
  future: {
    compatibilityVersion: 4,
  },
  svgo: {
    autoImportPath: './assets/',
    defaultImport: 'component',
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  icon: {
    customCollections: [
      {
        prefix: 'vi',
        dir: './assets/valentine-icons',
      },
    ],
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      websiteBaseUrl: process.env.WEBSITE_BASE_URL,
    },
  },
});
