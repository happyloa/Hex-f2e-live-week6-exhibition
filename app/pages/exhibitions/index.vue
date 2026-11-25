<script setup lang="ts">
import { categories, exhibitionPath, exhibitions } from "~/data/exhibitions";
const route = useRoute();
const category = computed(() =>
  categories.find(({ id }) => id === route.query.category),
);
const visible = computed(() => {
  const id = category.value?.id;
  if (!id) return exhibitions;
  if (id === "limited") return exhibitions.filter((item) => item.limited);
  return exhibitions.filter((item) => item.category === id);
});
useSeoMeta({
  title: () => (category.value ? `${category.value.label}展覽` : "展覽一覽"),
});
</script>

<template>
  <h1 class="sr-only">{{ category ? `${category.label}展覽` : "展覽一覽" }}</h1>
  <div v-if="visible.length">
    <article
      v-for="(item, index) in visible"
      :key="item.id"
      class="group/band text-brand odd:bg-brand odd:text-white"
    >
      <div class="
        shell grid gap-3.5 pt-7 pb-8 wide:min-h-[417px]
        wide:grid-cols-[minmax(260px,350px)_minmax(0,445px)_60px] wide:content-center wide:items-start
        wide:gap-[30px] wide:py-[65px] wide:group-even/band:justify-end
      ">
        <div class="wide:pt-[5px]">
          <h2 class="text-[clamp(1.65rem,4.5vw,2.5rem)] leading-[1.23] font-bold">
            <NuxtLink class="no-underline hover:underline" :to="exhibitionPath(item.id)">{{ item.title }}</NuxtLink>
          </h2>
          <p class="mt-2.5 wide:mt-[25px]">{{ item.description }}</p>
          <NuxtLink class="mt-1.5 inline-flex min-h-control items-center font-semibold underline underline-offset-[.23em]" :to="exhibitionPath(item.id)"
            >展覽詳情<span class="sr-only">：{{ item.title }}</span></NuxtLink
          >
        </div>
        <NuxtLink
          class="row-start-1 wide:row-auto"
          :to="exhibitionPath(item.id)"
          :aria-label="`查看${item.title}`"
        >
          <ExhibitImage
            class="aspect-[1.75] w-full object-cover wide:aspect-[445/285]"
            :name="item.image"
            :alt="item.alt"
            sizes="(min-width: 900px) 445px, (min-width: 768px) calc(100vw - 48px), calc(100vw - 30px)"
            :priority="index === 0"
          />
        </NuxtLink>
        <p class="
          row-start-2 flex items-center gap-2 font-bold wide:row-auto wide:w-[3.5ch] wide:flex-col
          wide:items-start wide:gap-0 wide:self-end wide:text-xl
        ">
          <span>{{ item.start }}</span
          ><span aria-hidden="true">—</span><span>{{ item.end }}</span>
        </p>
      </div>
    </article>
  </div>
  <section v-else class="shell grid justify-items-start gap-4 py-[72px]">
    <h2 class="section-heading">目前沒有{{ category?.label }}展覽</h2>
    <NuxtLink class="button button--outline" to="/exhibitions"
      >瀏覽全部展覽</NuxtLink
    >
  </section>
  <LazyRecommendations :hydrate-on-visible="{ rootMargin: '250px' }" />
</template>
