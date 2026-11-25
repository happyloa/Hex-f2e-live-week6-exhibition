<script setup lang="ts">
import type { NuxtError } from "#app";
defineProps<{ error: NuxtError }>();
useSeoMeta({ title: "頁面無法開啟", robots: "noindex" });
</script>

<template>
  <header class="grid min-h-16 place-items-center border-b border-line text-xl text-brand"><a class="no-underline" href="/">EXHIBINECTION</a></header>
  <main class="shell grid min-h-[65vh] content-center justify-items-center gap-3 text-center">
    <p class="text-[3.5rem] font-bold text-brand">{{ error.statusCode }}</p>
    <h1 class="text-[2rem] font-bold">{{ error.statusCode === 404 ? "找不到頁面" : "頁面暫時無法開啟" }}</h1>
    <a href="/" class="button button--outline">返回首頁</a>
  </main>
</template>
