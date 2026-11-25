<script setup lang="ts">
import { categories } from "~/data/exhibitions";
const route = useRoute();
const active = computed(() =>
  route.path === "/exhibitions" ? route.query.category : undefined,
);
</script>

<template>
  <nav class="categories" aria-label="展覽分類">
    <ul class="shell">
      <li v-for="category in categories" :key="category.id">
        <NuxtLink
          :to="{ path: '/exhibitions', query: { category: category.id } }"
          :aria-current="active === category.id ? 'page' : undefined"
        >
          {{ category.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.categories {
  border-bottom: 1px solid #969696;
}
ul {
  display: flex;
  width: min(100%, 1110px);
  align-items: stretch;
  justify-content: safe center;
  overflow-x: auto;
  margin-block: 0;
  padding: 0 8px;
  list-style: none;
  scrollbar-width: thin;
}
a {
  display: grid;
  min-height: 49px;
  padding-inline: clamp(12px, 2vw, 26px);
  place-items: center;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  color: var(--muted);
  font-size: 0.9375rem;
  text-decoration: none;
  white-space: nowrap;
}
a:hover,
a[aria-current="page"] {
  border-bottom-color: var(--pink);
  color: var(--wine);
}
a:focus-visible {
  outline-offset: -3px;
}
</style>
