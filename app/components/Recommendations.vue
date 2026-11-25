<script setup lang="ts">
import { exhibitionPath, findExhibition } from "~/data/exhibitions";
const props = defineProps<{ exclude?: string }>();
const recommended = computed(() =>
  [
    "city-in-blocks",
    "in-the-spotlight",
    "cabinet-of-discovery",
    "online-design",
  ]
    .filter((id) => id !== props.exclude)
    .slice(0, 3)
    .map((id) => findExhibition(id)!),
);
</script>

<template>
  <section class="shell recommendations">
    <h2 class="section-heading">猜你也喜歡…</h2>
    <ul class="recommend-list">
      <li v-for="item in recommended" :key="item.id">
        <NuxtLink class="recommend-card" :to="exhibitionPath(item.id)">
          <ExhibitImage
            class="recommend-image"
            :name="item.image"
            :alt="item.alt"
          />
          <h3>{{ item.title }}</h3>
          <p>${{ item.price }}</p>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.recommendations {
  padding-block: clamp(24px, 5vw, 60px) clamp(28px, 4.4vw, 56px);
}
.recommend-list {
  display: grid;
  gap: 18px;
  padding-left: 0;
  margin: 20px 0 0;
  list-style: none;
}
.recommend-card {
  display: block;
  text-decoration: none;
}
.recommend-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}
.recommend-card h3 {
  padding-top: 4px;
  font-size: 1.125rem;
}
.recommend-card:hover h3 {
  color: var(--wine);
  text-decoration: underline;
}
.recommend-card p {
  margin-top: 2px;
}
@media (min-width: 650px) {
  .recommend-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(12px, 2.5vw, 30px);
  }
}
@media (min-width: 1050px) {
  .recommend-list {
    margin-left: 8.5%;
  }
}
</style>
