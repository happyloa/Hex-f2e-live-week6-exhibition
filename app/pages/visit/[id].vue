<script setup lang="ts">
import {
  exhibitionPath,
  findExhibition,
  ticketLabel,
} from "~/data/exhibitions";

definePageMeta({ key: (route) => route.path });
const route = useRoute();
const item = findExhibition(route.params.id);
if (!item) throw createError({ statusCode: 404, statusMessage: "找不到展間" });
const { order, ready } = useTicketCart();
const tickets = computed(
  () =>
    order.value?.lines.filter((line) => line.exhibitionId === item.id) ?? [],
);
const ticketPath = { path: exhibitionPath(item.id), hash: "#tickets" };
useSeoMeta({ title: `${item.title}｜線上展間`, robots: "noindex, nofollow" });
</script>

<template>
  <section class="shell support-page visit-page">
    <h1 class="section-heading">{{ item.title }}・線上展間</h1>
    <p v-if="!ready" class="support-panel muted">正在讀取示範票券…</p>
    <div v-else-if="tickets.length && order" class="support-panel">
      <div class="visit-details">
        <div>
          <h2>示範展覽通過代碼</h2>
          <p class="visit-code">
            <code>{{ order.code }}</code>
          </p>
        </div>
        <p>
          {{
            tickets
              .map(
                ({ type, quantity }) => `${ticketLabel(type)} ${quantity} 張`,
              )
              .join("、")
          }}
        </p>
      </div>
      <ExhibitImage
        class="visit-image"
        :name="item.image"
        :alt="item.alt"
        sizes="(min-width: 900px) 800px, 95vw"
        priority
      />
      <p>{{ item.description }}</p>
      <div class="support-actions">
        <NuxtLink class="button button--outline" :to="exhibitionPath(item.id)"
          >回展覽詳情</NuxtLink
        >
        <NuxtLink class="plain-link" to="/checkout/complete">返回訂單</NuxtLink>
      </div>
    </div>
    <div v-else class="support-panel">
      <p>這個瀏覽器還沒有這場展覽的示範票券。</p>
      <div class="support-actions">
        <NuxtLink class="button" :to="ticketPath">選擇票券</NuxtLink>
        <NuxtLink class="plain-link" :to="exhibitionPath(item.id)"
          >回展覽詳情</NuxtLink
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
.visit-page {
  max-width: 920px;
}
.visit-details {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  align-items: end;
  justify-content: space-between;
}
.visit-details h2 {
  font-size: 1rem;
}
.visit-code {
  color: var(--wine);
  font-size: 1.35rem;
}
.visit-image {
  width: 100%;
  aspect-ratio: 2;
  object-fit: cover;
}
</style>
