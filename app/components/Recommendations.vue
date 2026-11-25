<script setup lang="ts">
import { A11y, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { exhibitionPath, findExhibition } from "~/data/exhibitions";

const props = defineProps<{ exclude?: string }>();
const modules = [A11y, Keyboard, Pagination];
const pagination = { clickable: true, bulletElement: "button" };
const recommended = computed(() =>
  [
    "city-in-blocks",
    "in-the-spotlight",
    "cabinet-of-discovery",
    "online-design",
  ]
    .filter((id) => id !== props.exclude)
    .map((id) => findExhibition(id)!),
);
</script>

<template>
  <section class="shell recommendations" aria-labelledby="recommend-title">
    <h2 id="recommend-title" class="section-heading">猜你也喜歡…</h2>
    <Swiper
      class="recommend-list"
      wrapper-tag="ul"
      :modules="modules"
      :enabled="false"
      slides-per-view="auto"
      :speed="260"
      :space-between="18"
      :breakpoints="{
        768: { enabled: true },
        1050: { enabled: true, spaceBetween: 30 },
      }"
      :keyboard="{ enabled: true }"
      :pagination="pagination"
      :a11y="{
        paginationBulletMessage: '前往推薦展覽 {{index}}',
        slideRole: 'listitem',
      }"
    >
      <SwiperSlide v-for="item in recommended" :key="item.id" tag="li">
        <NuxtLink
          class="recommend-card"
          :to="exhibitionPath(item.id)"
          draggable="false"
        >
          <ExhibitImage
            class="recommend-image"
            :name="item.image"
            :alt="item.alt"
            draggable="false"
          />
          <h3>{{ item.title }}</h3>
          <p>${{ item.price }}</p>
        </NuxtLink>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped>
.recommendations {
  padding-block: clamp(24px, 5vw, 60px) clamp(28px, 4.4vw, 56px);
}
.recommend-list {
  --swiper-pagination-color: var(--wine);
  margin-top: 20px;
}
.recommend-list :deep(.swiper-wrapper) {
  margin: 0;
  padding: 0;
  list-style: none;
}
.recommend-list :deep(.swiper-slide) {
  height: auto;
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
@media (min-width: 768px) {
  .recommend-list {
    padding-bottom: 32px;
  }
  .recommend-list :deep(.swiper-slide) {
    width: min(350px, 44%);
  }
  .recommend-list :deep(.swiper-pagination-bullet) {
    width: 24px;
    height: 24px;
    border: 8px solid white;
    margin-inline: 0;
  }
}
@media (max-width: 767px) {
  .recommend-list :deep(.swiper-wrapper) {
    display: grid;
    gap: 18px;
    height: auto;
    transform: none !important;
  }
  .recommend-list :deep(.swiper-slide) {
    width: 100%;
    margin: 0 !important;
  }
  .recommend-list :deep(.swiper-slide:nth-child(n + 4)),
  .recommend-list :deep(.swiper-pagination) {
    display: none;
  }
}
@media (min-width: 1050px) {
  .recommend-list {
    margin-left: 8.5%;
  }
}
</style>
