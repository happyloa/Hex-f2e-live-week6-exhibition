<script setup lang="ts">
import { categories } from "~/data/exhibitions";
const route = useRoute();
const active = computed(() =>
  route.path === "/exhibitions" ? route.query.category : undefined,
);
</script>

<template>
  <nav class="border-b border-divider" aria-label="展覽分類">
    <ul class="
      scrollbar-branded mx-auto flex w-full max-w-site list-none items-stretch overflow-x-auto px-2
      [justify-content:safe_center]
    ">
      <li v-for="category in categories" :key="category.id">
        <NuxtLink
          class="
            grid min-h-[49px] place-items-center border-y-2 border-transparent px-[clamp(12px,2vw,26px)]
            text-[.9375rem] whitespace-nowrap text-muted no-underline hover:border-b-accent hover:text-brand
            focus-visible:border-b-accent focus-visible:text-brand focus-visible:-outline-offset-3
            [&[aria-current=page]]:border-b-accent [&[aria-current=page]]:text-brand
          "
          :to="{ path: '/exhibitions', query: { category: category.id } }"
          :aria-current="active === category.id ? 'page' : undefined"
        >
          {{ category.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
