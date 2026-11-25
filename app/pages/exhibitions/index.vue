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
  <div v-if="visible.length" class="exhibition-list">
    <article
      v-for="(item, index) in visible"
      :key="item.id"
      class="listing-band"
    >
      <div class="shell listing-inner">
        <div class="listing-copy">
          <h2>
            <NuxtLink :to="exhibitionPath(item.id)">{{ item.title }}</NuxtLink>
          </h2>
          <p class="description">{{ item.description }}</p>
          <NuxtLink class="listing-link" :to="exhibitionPath(item.id)"
            >展覽詳情<span class="sr-only">：{{ item.title }}</span></NuxtLink
          >
        </div>
        <NuxtLink
          class="listing-media"
          :to="exhibitionPath(item.id)"
          :aria-label="`查看${item.title}`"
        >
          <ExhibitImage
            :name="item.image"
            :alt="item.alt"
            sizes="(min-width: 900px) 445px, 100vw"
            :priority="index === 0"
          />
        </NuxtLink>
        <p class="date">
          <span>{{ item.start }}</span
          ><span aria-hidden="true">—</span><span>{{ item.end }}</span>
        </p>
      </div>
    </article>
  </div>
  <section v-else class="shell listing-empty">
    <h2 class="section-heading">目前沒有{{ category?.label }}展覽</h2>
    <NuxtLink class="button button--outline" to="/exhibitions"
      >瀏覽全部展覽</NuxtLink
    >
  </section>
  <Recommendations />
</template>

<style scoped>
.listing-band {
  color: var(--wine);
}
.listing-band:nth-child(odd) {
  background: var(--wine);
  color: white;
}
.listing-inner {
  display: grid;
  gap: 14px;
  padding-block: 28px 32px;
}
.listing-media {
  grid-row: 1;
}
.listing-media img {
  width: 100%;
  aspect-ratio: 1.75;
  object-fit: cover;
}
.listing-copy h2 {
  font-size: clamp(1.65rem, 4.5vw, 2.5rem);
  line-height: 1.23;
}
.listing-copy h2 a {
  text-decoration: none;
}
.listing-copy h2 a:hover,
.listing-link:hover {
  text-decoration: underline;
}
.description {
  margin-top: 10px;
}
.listing-link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  margin-top: 6px;
  font-weight: 600;
  text-underline-offset: 0.23em;
}
.date {
  grid-row: 2;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
}
.listing-empty {
  display: grid;
  justify-items: start;
  gap: 16px;
  padding-block: 72px;
}
@media (min-width: 900px) {
  .listing-inner {
    min-height: 417px;
    grid-template-columns: minmax(260px, 350px) minmax(0, 445px) 60px;
    align-content: center;
    align-items: start;
    gap: 30px;
    padding-block: 65px;
  }
  .listing-band:nth-child(even) .listing-inner {
    justify-content: end;
  }
  .listing-media {
    grid-row: auto;
  }
  .listing-media img {
    aspect-ratio: 445 / 285;
  }
  .listing-copy {
    padding-top: 5px;
  }
  .description {
    margin-top: 25px;
  }
  .date {
    grid-row: auto;
    align-self: end;
    flex-direction: column;
    align-items: start;
    width: 3.5ch;
    gap: 0;
    font-size: 1.25rem;
  }
}
</style>
