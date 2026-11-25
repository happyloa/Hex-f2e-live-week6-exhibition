<script setup lang="ts">
import {
  exhibitionPath,
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
const { add, isCartOpen, order, ready: cartReady } = useTicketCart();
const { ids, toggle, ready: favoritesReady } = useFavorites();
const quantity = ref(1);
const type = ref<TicketType>("full");
const saved = computed(() => ids.value.includes(item.id));
const shareNotice = ref("");
const shareUrl = ref("");
const facebookShare = new URL("https://www.facebook.com/sharer/sharer.php");
facebookShare.searchParams.set(
  "u",
  new URL(
    exhibitionPath(item.id),
    "https://hex-f2e-live-week6-exhibition.piafyoyo06.workers.dev",
  ).href,
);
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
  <div class="shell pt-[clamp(25px,6.4vw,80px)]">
    <section v-if="voucher" class="mb-[18px] flex flex-wrap justify-between gap-2 border border-brand px-4 py-3 text-brand" aria-label="示範展覽通過代碼">
      <strong>示範展覽通過代碼</strong>
      <code>{{ voucher.code }}</code>
    </section>
    <div class="grid gap-x-[30px] gap-y-6 wide:grid-cols-2">
      <section aria-labelledby="detail-title">
        <div class="relative">
          <ExhibitImage
            class="aspect-[540/256] w-full object-cover max-[450px]:aspect-[1.55]"
            :name="item.image"
            :alt="item.alt"
            sizes="(min-width: 900px) 540px, (min-width: 768px) calc(100vw - 48px), calc(100vw - 30px)"
            priority
          />
          <p class="
            hidden wide:absolute wide:top-1/2 wide:right-6 wide:flex wide:w-[3ch] wide:-translate-y-1/2
            wide:flex-col wide:text-lg wide:font-bold wide:text-white
            wide:[text-shadow:0_0_8px_black,0_1px_2px_black]
          " aria-hidden="true">
            <span>{{ item.start }}</span><span>—</span
            ><span>{{ item.end }}</span>
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-x-[5px] pt-[3px] [&_.icon-button]:min-w-[35px]">
          <h1 id="detail-title" class="text-xl font-bold">{{ item.title }}</h1>
          <a
            class="icon-button"
            :href="facebookShare.href"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="分享到 Facebook（開啟新分頁）"
          >
            <img src="/images/brand/facebook.webp" width="20" height="20" alt="" />
          </a>
          <button
            class="icon-button"
            type="button"
            aria-label="複製展覽連結"
            @click="copyLink"
          >
            <MaterialIcon name="link" :size="20" />
          </button>
          <p class="ml-auto text-sm font-bold wide:sr-only">{{ item.start }} — {{ item.end }}</p>
        </div>
        <p class="text-copy">{{ item.description }}</p>
        <p v-if="shareNotice" class="mt-1.5 text-sm text-brand" role="status">
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
        class="grid content-start gap-[18px] wide:gap-[42px]"
        aria-labelledby="ticket-title"
      >
        <h2 id="ticket-title" class="sr-only">選擇票券</h2>
        <div class="
          grid grid-cols-2 items-center text-center max-[450px]:grid-cols-1 max-[450px]:gap-[18px]
          wide:min-h-64
        ">
          <div class="grid justify-items-center [&_output]:text-[1.875rem]">
            <QuantityControl
              :quantity="quantity"
              label="選擇票券張數"
              :disabled="!cartReady"
              @change="quantity = $event"
            />
            <p class="text-muted">張</p>
          </div>
          <div class="wide:grid wide:min-h-full wide:content-center wide:border-l wide:border-divider">
            <p class="text-[clamp(1.5rem,4vw,2.5rem)] font-bold" aria-live="polite">
              {{ newTaiwanDollars(unitPrice * quantity) }}
            </p>
            <fieldset class="types mx-auto mt-[11px] grid w-full max-w-48 grid-cols-3 border-0 p-0" :disabled="!cartReady">
              <legend class="mx-auto text-sm text-muted">票種</legend>
              <label class="min-w-0 cursor-pointer" v-for="ticket in ticketTypes" :key="ticket.id">
                <input
                  v-model="type"
                  class="peer sr-only"
                  type="radio"
                  name="ticket-type"
                  :value="ticket.id"
                />
                <span class="
                  grid min-h-field-control place-items-center border-b-2 border-transparent whitespace-nowrap
                  peer-checked:border-b-accent peer-checked:text-brand peer-focus-visible:outline-2
                  peer-focus-visible:-outline-offset-1 peer-focus-visible:outline-accent
                ">{{ ticket.label }}</span>
              </label>
            </fieldset>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3 wide:gap-[30px]">
          <button
            class="button button--outline"
            type="button"
            :aria-pressed="saved"
            :disabled="!favoritesReady"
            @click="toggle(item.id)"
          >
            {{ saved ? "已收藏展覽" : "收藏展覽" }}
          </button>
          <button
            class="button"
            type="button"
            :disabled="!cartReady"
            @click="buy"
          >
            購買票券
          </button>
        </div>
      </section>
    </div>
    <section class="mt-[clamp(32px,5vw,48px)] grid gap-7" aria-labelledby="story-title">
      <ExhibitImage
        v-if="isSignatureShow"
        name="geometry"
        class="aspect-[1110/400] w-full object-cover max-[450px]:aspect-[1.25]"
        sizes="(min-width: 1110px) 1110px, 100vw"
        alt="由金屬三角面組成的建築立面"
      />
      <div class="grid gap-5" :class="isSignatureShow ? 'wide:grid-cols-[minmax(0,350px)_minmax(0,1fr)] wide:gap-[30px]' : undefined">
        <ExhibitImage
          v-if="isSignatureShow"
          name="architecture"
          class="
            aspect-[350/420] w-full object-cover max-[450px]:order-1 max-[450px]:aspect-square
            wide:aspect-[350/560]
          "
          sizes="(min-width: 900px) 350px, 100vw"
          alt="交錯的白色鋼構與展場樓梯"
        />
        <div class="grid content-start gap-3">
          <h2 id="story-title" class="text-xl font-bold">
            {{ isSignatureShow ? "藝饗宴" : "展覽介紹" }}
          </h2>
          <p v-if="isSignatureShow">
            Celebration of Style and Art
          </p>
          <p class="text-muted">{{ item.description }}</p>
          <p v-if="isSignatureShow" class="text-muted">
            從裝置作品、展場動線到建築細節，展覽邀請觀眾留意日常中容易錯過的設計。不同媒材並置，讓同一個題目在各自的觀看經驗中有了不同答案。
          </p>
          <dl class="flex flex-wrap gap-x-6 gap-y-3 [&_dt]:font-bold">
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
  <LazyRecommendations :exclude="item.id" :hydrate-on-visible="{ rootMargin: '250px' }" />
</template>
