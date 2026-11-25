<script setup lang="ts">
import { exhibitionPath, exhibitions } from "~/data/exhibitions";
const { ids, ready, toggle } = useFavorites();
const favorites = computed(() =>
  exhibitions.filter(({ id }) => ids.value.includes(id)),
);
useSeoMeta({ title: "我的收藏", robots: "noindex, nofollow" });
</script>

<template>
  <div class="shell support-page">
    <h1 class="section-heading">我的收藏</h1>
    <p v-if="!ready" class="support-panel text-muted">正在讀取收藏…</p>
    <div v-else-if="!favorites.length" class="support-panel">
      <p>目前沒有收藏的展覽。</p>
      <div class="support-actions">
        <NuxtLink class="button" to="/exhibitions">瀏覽展覽</NuxtLink>
      </div>
    </div>
    <ul v-else class="mt-5 grid list-none gap-3 p-0">
      <li v-for="item in favorites" :key="item.id" class="flex items-center justify-between gap-2.5 border border-line p-2.5">
        <NuxtLink :to="exhibitionPath(item.id)" class="group flex items-center gap-3 text-inherit no-underline">
          <ExhibitImage class="aspect-[1.4] w-[clamp(54px,18vw,110px)] object-cover" :name="item.image" sizes="110px" />
          <div>
            <h2 class="text-base font-bold group-hover:underline">{{ item.title }}</h2>
            <p class="text-sm text-muted">{{ item.start }} — {{ item.end }}</p>
          </div>
        </NuxtLink>
        <button
          class="button button--outline shrink-0 px-2.5"
          type="button"
          :aria-label="`移除收藏 ${item.title}`"
          @click="toggle(item.id)"
        >
          移除
        </button>
      </li>
    </ul>
  </div>
</template>
