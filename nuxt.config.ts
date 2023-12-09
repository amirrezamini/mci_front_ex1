import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  build: {
    transpile: [
      "vuetify",
    ],
  },
  css: [
    "~/assets/scss/index.scss",
  ],
  devtools: {
    enabled: true,
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({
          autoImport: true,
        }));
      });
    },
  ],
  devServer: {
    port: 3000,
    host: "0.0.0.0",
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
});
