import tailwindcss from "@tailwindcss/vite";
import { exhibitions } from "./app/data/exhibitions";

export default defineNuxtConfig({
  compatibilityDate: "2026-11-25",
  devtools: { enabled: false },
  experimental: {
    defaults: { nuxtLink: { prefetch: false } },
    payloadExtraction: false,
  },
  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  app: {
    head: {
      htmlAttrs: { lang: "zh-Hant-TW" },
      titleTemplate: "%s｜EXHIBINECTION",
      meta: [
        {
          name: "description",
          content: "探索台灣設計與藝術展覽，體驗選票、購物車與線上訂票流程。",
        },
        { name: "theme-color", content: "#630834" },
        { property: "og:site_name", content: "EXHIBINECTION" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/webp",
          sizes: "64x64",
          href: "/images/brand/favicon.webp",
        },
      ],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: true,
      routes: [
        "/",
        "/exhibitions",
        "/checkout/cart",
        "/checkout/details",
        "/checkout/payment",
        "/checkout/complete",
        "/account",
        "/account/sign-in",
        "/account/sign-up",
        "/favorites",
        "/recap",
        ...exhibitions.flatMap(({ id }) => [
          `/exhibitions/${id}`,
          `/visit/${id}`,
        ]),
      ],
    },
  },
});
