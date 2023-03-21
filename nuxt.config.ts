export default {
  head: {
    title: "searchstay-ts",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  css: ["./assets/css/main.css", '@fortawesome/fontawesome-svg-core/styles.css'],

  plugins: [
    "@/plugins/axios-accessor",
    "@/plugins/axios",
    '@/plugins/fontawesome'
  ],

  components: [{ path: "@/components/", pathPrefix: false }],

  buildModules: ["@nuxt/typescript-build"],

  modules: ["@nuxtjs/axios", "cookie-universal-nuxt"],

  axios: {
    baseUrl: process.env.BASE_URL,
  },

  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
};
