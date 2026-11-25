<script setup lang="ts">
import { A11y, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
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
  <section
    class="shell pt-[clamp(24px,5vw,60px)] pb-[clamp(28px,4.4vw,56px)]"
    aria-labelledby="recommend-title"
  >
    <h2 id="recommend-title" class="section-heading">猜你也喜歡…</h2>
    <Swiper
      class="
        recommend-list mt-5 [--swiper-pagination-color:var(--color-brand)] md:pb-8 desktop:ml-[8.5%]
        [&_.swiper-wrapper]:m-0 [&_.swiper-wrapper]:list-none [&_.swiper-wrapper]:p-0
        md:[&_.swiper-slide]:w-[min(350px,44%)] md:[&_.swiper-pagination-bullet]:mx-0
        md:[&_.swiper-pagination-bullet]:size-6 md:[&_.swiper-pagination-bullet]:border-8
        md:[&_.swiper-pagination-bullet]:border-white max-md:[&_.swiper-wrapper]:grid
        max-md:[&_.swiper-wrapper]:h-auto max-md:[&_.swiper-wrapper]:gap-[18px]
        max-md:[&_.swiper-wrapper]:transform-none! max-md:[&_.swiper-slide]:m-0!
        max-md:[&_.swiper-slide]:w-full max-md:[&_.swiper-slide:nth-child(n+4)]:hidden
        max-md:[&_.swiper-pagination]:hidden
      "
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
      <SwiperSlide
        v-for="item in recommended"
        :key="item.id"
        class="h-auto"
        tag="li"
      >
        <NuxtLink
          class="group block no-underline"
          :to="exhibitionPath(item.id)"
          draggable="false"
        >
          <ExhibitImage
            class="aspect-square w-full object-cover"
            :name="item.image"
            :alt="item.alt"
            sizes="(min-width: 768px) 350px, calc(100vw - 30px)"
            draggable="false"
          />
          <h3
            class="pt-1 text-lg font-bold group-hover:text-brand group-hover:underline"
          >
            {{ item.title }}
          </h3>
          <p class="mt-0.5">${{ item.price }}</p>
        </NuxtLink>
      </SwiperSlide>
    </Swiper>
  </section>
</template>
