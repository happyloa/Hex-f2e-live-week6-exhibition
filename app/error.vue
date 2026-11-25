<script setup lang="ts">
import type { NuxtError } from "#app";
defineProps<{ error: NuxtError }>();
useSeoMeta({ title: "頁面無法開啟", robots: "noindex" });
</script>

<template>
  <header class="error-header"><a href="/">EXHIBINECTION</a></header>
  <main class="shell error-page">
    <p>{{ error.statusCode }}</p>
    <h1>{{ error.statusCode === 404 ? "找不到頁面" : "頁面暫時無法開啟" }}</h1>
    <a href="/" class="button button--outline">返回首頁</a>
  </main>
</template>

<style scoped>
.error-header {
  display: grid;
  min-height: 64px;
  place-items: center;
  border-bottom: 1px solid var(--line);
  color: var(--wine);
  font-size: 1.25rem;
}
.error-header a {
  text-decoration: none;
}
.error-page {
  display: grid;
  min-height: 65vh;
  align-content: center;
  justify-items: center;
  gap: 12px;
  text-align: center;
}
.error-page p {
  color: var(--wine);
  font-size: 3.5rem;
  font-weight: 700;
}
</style>
