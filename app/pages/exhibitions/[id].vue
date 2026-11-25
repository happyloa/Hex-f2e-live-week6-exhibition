<script setup lang="ts">
import { Link2 } from "@lucide/vue";
import {
  findExhibition,
  newTaiwanDollars,
  ticketPrice,
  ticketTypes,
  type TicketType,
} from "~/data/exhibitions";

definePageMeta({ key: (route) => route.path });
const route = useRoute();
const item = findExhibition(route.params.id);
if (!item) throw createError({ statusCode: 404, statusMessage: "找不到展覽" });
const { add, isCartOpen, order } = useTicketCart();
const quantity = ref(1);
const type = ref<TicketType>("full");
const saved = ref(false);
const shareNotice = ref("");
const shareUrl = ref("");
const favoriteKey = `exhibinection.favorite.${item.id}`;
const unitPrice = computed(() => ticketPrice(item, type.value));
const isSignatureShow = item.id === "taiwan-design";
const voucher = computed(() => {
  const last = order.value;
  return last &&
    last.code === route.query.ticket &&
    last.lines.some((line) => line.exhibitionId === item.id)
    ? last
    : null;
});
useSeoMeta({
  title: item.title,
  description: item.description,
  ogTitle: item.title,
  ogDescription: item.description,
});

onMounted(() => {
  try {
    saved.value = localStorage.getItem(favoriteKey) === "1";
  } catch {
    /* In-memory fallback. */
  }
});

function toggleFavorite() {
  saved.value = !saved.value;
  try {
    if (saved.value) localStorage.setItem(favoriteKey, "1");
    else localStorage.removeItem(favoriteKey);
  } catch {
    /* In-memory fallback. */
  }
}

async function copyLink() {
  const url = new URL(route.path, window.location.origin).href;
  try {
    await navigator.clipboard.writeText(url);
    shareNotice.value = "展覽連結已複製。";
  } catch {
    shareNotice.value = "請複製下方的展覽連結。";
    shareUrl.value = url;
  }
}

function buy() {
  add(item!.id, type.value, quantity.value);
  isCartOpen.value = true;
}
</script>

<template>
  <div class="shell detail-page">
    <section v-if="voucher" class="voucher" aria-label="示範展覽通過代碼">
      <strong>示範展覽通過代碼</strong>
      <code>{{ voucher.code }}</code>
    </section>
    <div class="detail-summary">
      <section class="exhibit-intro" aria-labelledby="detail-title">
        <div class="exhibit-media">
          <ExhibitImage
            class="exhibit-image"
            :name="item.image"
            :alt="item.alt"
            sizes="(min-width: 900px) 540px, 100vw"
            priority
          />
          <p class="overlay-date" aria-hidden="true">
            <span>{{ item.start }}</span><span>—</span
            ><span>{{ item.end }}</span>
          </p>
        </div>
        <div class="detail-title">
          <h1 id="detail-title">{{ item.title }}</h1>
          <button
            class="icon-button"
            type="button"
            aria-label="複製展覽連結"
            @click="copyLink"
          >
            <Link2 :size="20" aria-hidden="true" />
          </button>
          <p class="mobile-date">{{ item.start }} — {{ item.end }}</p>
        </div>
        <p class="description">{{ item.description }}</p>
        <p v-if="shareNotice" class="share-status" role="status">
          {{ shareNotice }}
        </p>
        <label v-if="shareUrl" class="field"
          ><span class="sr-only">展覽連結</span
          ><input
            :value="shareUrl"
            readonly
            @focus="($event.target as HTMLInputElement).select()"
        /></label>
      </section>
      <section
        id="tickets"
        class="ticket-picker"
        aria-labelledby="ticket-title"
      >
        <h2 id="ticket-title" class="sr-only">選擇票券</h2>
        <div class="ticket-controls">
          <div class="ticket-amount">
            <QuantityControl
              :quantity="quantity"
              label="選擇票券張數"
              @change="quantity = $event"
            />
            <p class="muted">張</p>
          </div>
          <div class="ticket-pricing">
            <p class="ticket-price" aria-live="polite">
              {{ newTaiwanDollars(unitPrice * quantity) }}
            </p>
            <fieldset class="types">
              <legend>票種</legend>
              <label v-for="ticket in ticketTypes" :key="ticket.id">
                <input
                  v-model="type"
                  class="sr-only"
                  type="radio"
                  name="ticket-type"
                  :value="ticket.id"
                />
                <span>{{ ticket.label }}</span>
              </label>
            </fieldset>
          </div>
        </div>
        <div class="detail-actions">
          <button
            class="button button--outline"
            type="button"
            :aria-pressed="saved"
            @click="toggleFavorite"
          >
            {{ saved ? "已收藏展覽" : "收藏展覽" }}
          </button>
          <button class="button" type="button" @click="buy">購買票券</button>
        </div>
      </section>
    </div>
    <section class="detail-story" aria-labelledby="story-title">
      <ExhibitImage
        v-if="isSignatureShow"
        name="geometry"
        class="story-banner"
        sizes="(min-width: 1110px) 1110px, 100vw"
        alt="由金屬三角面組成的建築立面"
      />
      <div class="story-grid">
        <ExhibitImage
          v-if="isSignatureShow"
          name="architecture"
          class="story-image"
          sizes="(min-width: 900px) 350px, 100vw"
          alt="交錯的白色鋼構與展場樓梯"
        />
        <div class="story-text">
          <h2 id="story-title">
            {{ isSignatureShow ? "藝饗宴" : "展覽介紹" }}
          </h2>
          <p v-if="isSignatureShow" class="story-subtitle">
            Celebration of Style and Art
          </p>
          <p>{{ item.description }}</p>
          <p v-if="isSignatureShow">
            從裝置作品、展場動線到建築細節，展覽邀請觀眾留意日常中容易錯過的設計。不同媒材並置，讓同一個題目在各自的觀看經驗中有了不同答案。
          </p>
          <dl>
            <div>
              <dt>展覽期間</dt>
              <dd>{{ item.start }} — {{ item.end }}</dd>
            </div>
            <div>
              <dt>展覽地點</dt>
              <dd>{{ item.venue }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  </div>
  <Recommendations :exclude="item.id" />
</template>

<style scoped>
.detail-page {
  padding-top: clamp(25px, 6.4vw, 80px);
}
.detail-summary {
  display: grid;
  gap: 24px 30px;
}
.exhibit-media {
  position: relative;
}
.exhibit-image {
  width: 100%;
  aspect-ratio: 540 / 256;
  object-fit: cover;
}
.overlay-date {
  display: none;
}
.detail-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 5px;
  padding-top: 3px;
}
.detail-title h1 {
  font-size: 1.25rem;
}
.detail-title .icon-button {
  min-width: 35px;
}
.mobile-date {
  margin-left: auto;
  font-size: 0.875rem;
  font-weight: 700;
}
.description {
  color: #353535;
}
.share-status {
  margin-top: 6px;
  color: var(--wine);
  font-size: 0.875rem;
}
.ticket-picker {
  display: grid;
  align-content: start;
  gap: 18px;
}
.ticket-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  text-align: center;
}
.ticket-amount {
  display: grid;
  justify-items: center;
  gap: 0;
}
.ticket-amount :deep(output) {
  font-size: 1.875rem;
}
.ticket-price {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
}
.types {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
  max-width: 192px;
  margin: 11px auto 0;
  border: 0;
  padding: 0;
}
.types legend {
  margin-inline: auto;
  color: var(--muted);
  font-size: 0.875rem;
}
.types label {
  min-width: 0;
  cursor: pointer;
}
.types span {
  display: grid;
  min-height: 42px;
  place-items: center;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
}
.types input:checked + span {
  color: var(--wine);
  border-color: var(--pink);
}
.types input:focus-visible + span {
  outline: 2px solid var(--pink);
  outline-offset: -1px;
}
.detail-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.detail-story {
  display: grid;
  gap: 28px;
  margin-top: clamp(32px, 5vw, 48px);
}
.story-banner {
  width: 100%;
  aspect-ratio: 1110 / 400;
  object-fit: cover;
}
.story-grid {
  display: grid;
  gap: 20px;
}
.story-image {
  width: 100%;
  aspect-ratio: 350 / 420;
  object-fit: cover;
}
.story-text {
  display: grid;
  gap: 12px;
  align-content: start;
}
.story-text h2 {
  font-size: 1.25rem;
}
.story-text p:not(.story-subtitle) {
  color: var(--muted);
}
.story-text dl {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  margin: 0;
}
.story-text dt {
  font-weight: 700;
}
.story-text dd {
  margin: 0;
}
.voucher {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 18px;
  border: 1px solid var(--wine);
  padding: 12px 16px;
  color: var(--wine);
}
@media (max-width: 450px) {
  .ticket-controls {
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .exhibit-image {
    aspect-ratio: 1.55;
  }
  .story-image {
    order: 1;
    aspect-ratio: 1;
  }
  .story-banner {
    aspect-ratio: 1.25;
  }
}
@media (min-width: 900px) {
  .detail-summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .mobile-date {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .overlay-date {
    position: absolute;
    top: 50%;
    right: 24px;
    display: flex;
    width: 3ch;
    flex-direction: column;
    transform: translateY(-50%);
    color: white;
    font-size: 1.125rem;
    font-weight: 700;
    text-shadow:
      0 0 8px black,
      0 1px 2px black;
  }
  .ticket-picker {
    gap: 42px;
  }
  .ticket-controls {
    min-height: 256px;
  }
  .ticket-pricing {
    display: grid;
    min-height: 100%;
    align-content: center;
    border-left: 1px solid #969696;
  }
  .detail-actions {
    gap: 30px;
  }
  .story-image {
    aspect-ratio: 350 / 560;
  }
  .story-grid:has(.story-image) {
    grid-template-columns: minmax(0, 350px) minmax(0, 1fr);
    gap: 30px;
  }
}
</style>
