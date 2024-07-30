// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/icon", "@pinia/nuxt", "@nuxt/ui", "@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
  css: ["~/assets/css/main.scss"],
  colorMode: {
    preference: "light",
  },
  googleFonts: {
    families: {
      Montserrat: [400, 500, 600],
    },
  },
});
