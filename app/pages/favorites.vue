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
    <p v-if="!ready" class="support-panel muted">正在讀取收藏…</p>
    <div v-else-if="!favorites.length" class="support-panel">
      <p>目前沒有收藏的展覽。</p>
      <div class="support-actions">
        <NuxtLink class="button" to="/exhibitions">瀏覽展覽</NuxtLink>
      </div>
    </div>
    <ul v-else class="favorites">
      <li v-for="item in favorites" :key="item.id" class="favorite">
        <NuxtLink :to="exhibitionPath(item.id)" class="favorite-link">
          <ExhibitImage :name="item.image" sizes="110px" />
          <div>
            <h2>{{ item.title }}</h2>
            <p>{{ item.start }} — {{ item.end }}</p>
          </div>
        </NuxtLink>
        <button
          class="button button--outline"
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

<style scoped>
.favorites {
  display: grid;
  gap: 12px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}
.favorite {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--line);
  padding: 10px;
}
.favorite-link {
  display: flex;
  gap: 12px;
  align-items: center;
  color: inherit;
  text-decoration: none;
}
.favorite-link:hover h2 {
  text-decoration: underline;
}
.favorite-link img {
  width: clamp(54px, 18vw, 110px);
  aspect-ratio: 1.4;
  object-fit: cover;
}
.favorite h2 {
  font-size: 1rem;
}
.favorite p {
  color: var(--muted);
  font-size: 0.875rem;
}
.favorite button {
  flex-shrink: 0;
  padding-inline: 10px;
}
</style>
