<script setup lang="ts">
import { exhibitionPath, findExhibition } from "~/data/exhibitions";
const featured = ["taiwan-design", "online-design", "kaohsiung-design"].map(
  (id) => findExhibition(id)!,
);
const hero = findExhibition("taipei-contemporary")!;
const { ids, toggle, ready: favoritesReady } = useFavorites();
const descriptions = [
  "一年一度的台味設計展由經濟部工業局主辦、台灣創意設計中心執行，每年，針對在地生活、文化及產業發展特色，運用設計思考詮釋新時代的意涵，並以展覽呈現在地設計。",
  "這是一個專屬於設計系畢業生的展覽，沒有華麗的名號、沒有浮誇的獎賞。讓我們用作品與理念，去碰撞真實世界裡的各種問題，創造更多美好的人事物。讓這個地球、這個世界變成每一個人心目中的理想鄉。",
  "設計大高雄究竟是怎麼一回事？在這「設計」詞彙有點氾濫的年代，或許我們也搞不清楚究竟誰被誰設計了，設計生活？還是被生活設計？而當高雄這座城市建設硬體已相當程度完備時，文化軟實力又該如何輸出？",
];
function shareOnFacebook(id: string) {
  const url = new URL("https://www.facebook.com/sharer/sharer.php");
  url.searchParams.set(
    "u",
    new URL(
      exhibitionPath(id),
      "https://hex-f2e-live-week6-exhibition.piafyoyo06.workers.dev",
    ).href,
  );
  return url.href;
}
useSeoMeta({ title: "首頁", ogTitle: "EXHIBINECTION 策展與售票" });
</script>

<template>
  <section
    class="relative isolate bg-hero-bg text-white after:absolute after:inset-0 after:-z-10 after:[background:linear-gradient(90deg,#000b,#0002_86%)] after:content-['']"
    aria-labelledby="hero-title"
  >
    <ExhibitImage
      name="hero"
      alt=""
      class="absolute inset-0 -z-20 size-full object-cover object-[48%_center] md:object-[center_46%]"
      sizes="100vw"
      priority
    />
    <div class="shell flex min-h-[480px] items-end md:items-center">
      <div class="w-full pb-20 md:ml-[8.5%] md:w-auto md:pb-[5px]">
        <h1
          id="hero-title"
          class="relative -top-[5px] text-[2rem] font-bold md:top-0 md:text-4xl"
        >
          {{ hero.title }}
        </h1>
        <p class="mt-[3px] text-xl font-semibold tracking-[.02em]">
          {{ hero.start }} — {{ hero.end }}
        </p>
        <div
          class="mt-4 grid grid-cols-2 gap-[15px] md:flex md:gap-2 md:[&_.button]:min-w-[clamp(114px,17vw,160px)]"
        >
          <NuxtLink
            class="button"
            :to="{ path: exhibitionPath(hero.id), hash: '#tickets' }"
            >購買票券</NuxtLink
          >
          <NuxtLink class="button button--light" :to="exhibitionPath(hero.id)"
            >詳細資訊</NuxtLink
          >
        </div>
      </div>
    </div>
  </section>
  <CategoryNav />
  <section
    class="featured shell pt-[clamp(26px,5vw,64px)] pb-[clamp(28px,5vw,58px)]"
    aria-labelledby="featured-title"
  >
    <h2 id="featured-title" class="section-heading">熱門特展</h2>
    <article
      v-for="(item, index) in featured"
      :key="item.id"
      v-reveal
      class="featured-card mt-[18px] bg-surface md:mt-5 md:grid md:min-h-[350px] md:grid-cols-[minmax(250px,min(350px,31.55%))_minmax(0,1fr)]"
    >
      <NuxtLink
        class="featured-photo block"
        :to="exhibitionPath(item.id)"
        :aria-label="`查看${item.title}`"
      >
        <ExhibitImage
          class="aspect-square w-full object-cover md:h-full md:max-h-[380px] md:min-h-[210px]"
          :name="item.image"
          :alt="item.alt"
          sizes="(min-width: 768px) 350px, calc(100vw - 30px)"
        />
      </NuxtLink>
      <div
        class="featured-copy grid grid-cols-[minmax(0,1fr)_auto] content-center gap-x-gutter-mobile gap-y-[9px] px-4 pt-3 pb-[18px] md:p-8"
      >
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-xl font-bold md:text-[1.375rem]">
              <NuxtLink
                class="no-underline hover:underline"
                :to="exhibitionPath(item.id)"
                >{{ item.title }}</NuxtLink
              >
            </h3>
            <a
              class="shrink-0 md:hidden"
              :href="shareOnFacebook(item.id)"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`分享到 Facebook：${item.title}（開啟新分頁）`"
            >
              <img
                src="/images/brand/facebook.webp"
                width="24"
                height="24"
                alt=""
              />
            </a>
          </div>
          <p class="mt-1 text-xl">${{ item.price }}</p>
        </div>
        <p
          class="flex gap-1 pt-1 text-base font-medium whitespace-nowrap text-ink md:row-span-3 md:w-[3.3ch] md:flex-col md:items-start md:gap-px md:pt-0 md:text-[1.0625rem] md:font-bold md:whitespace-normal"
        >
          <span>{{ item.start }}</span><span aria-hidden="true">—</span
          ><span>{{ item.end }}</span>
        </p>
        <p
          class="col-span-full font-medium md:col-span-1 md:col-start-1 md:max-w-[38rem] md:text-[1.0625rem]"
        >
          {{ descriptions[index] }}
        </p>
        <div
          class="featured-actions col-span-full mt-1 flex flex-wrap gap-2 md:col-span-1 md:col-start-1"
        >
          <NuxtLink
            class="button"
            :to="{ path: exhibitionPath(item.id), hash: '#tickets' }"
            >購買票券<span class="sr-only">：{{ item.title }}</span></NuxtLink
          >
          <button
            type="button"
            class="button button--outline md:hidden"
            :disabled="!favoritesReady"
            :aria-pressed="ids.includes(item.id)"
            :aria-label="`收藏展覽：${item.title}`"
            @click="toggle(item.id)"
          >
            {{ ids.includes(item.id) ? "已收藏" : "收藏展覽" }}
          </button>
          <NuxtLink
            class="button button--outline hidden md:inline-flex"
            :to="exhibitionPath(item.id)"
            >展覽資訊<span class="sr-only">：{{ item.title }}</span></NuxtLink
          >
        </div>
      </div>
    </article>
  </section>
  <section v-reveal class="live shell" aria-labelledby="live-title">
    <h2 id="live-title" class="section-heading">直播回顧</h2>
    <div
      class="live-stage relative isolate mt-[18px] min-h-[464px] bg-live-stage md:min-h-[440px]"
    >
      <ExhibitImage
        class="absolute inset-0 -z-10 size-full object-cover"
        name="live-gallery"
        sizes="(min-width: 1110px) 1110px, 100vw"
      />
      <div
        class="min-h-[464px] w-full max-w-[445px] bg-live-panel px-6 py-[25px] text-white md:min-h-[440px] md:px-6 md:py-8"
      >
        <h3
          class="flex flex-wrap gap-3 text-[clamp(1.25rem,7.46vw,1.75rem)] font-bold"
        >
          開幕對談
          <span class="border-l border-white/53 pl-3 font-medium"
            >藝術展演巡禮</span
          >
        </h3>
        <ExhibitImage
          class="mt-8 mb-3 aspect-square w-32 object-cover"
          name="host"
          sizes="128px"
          alt="對談主持人"
        />
        <p class="text-xl">臺北現代聯合總監｜Ken Hsu</p>
        <p class="mt-2 max-w-[300px] font-light">
          獨家由藝術家、策展人、畫廊總監帶您欣賞台北藝術特展，感受雕塑、展演及當代日常文化之間微妙的關係。
        </p>
        <NuxtLink class="button mt-5 min-w-[140px]" to="/recap"
          >點此觀看</NuxtLink
        >
      </div>
    </div>
  </section>
  <LazyRecommendations :hydrate-on-visible="{ rootMargin: '250px' }" />
</template>

<style scoped>
@media (width < 768px) {
  .featured {
    width: 100%;
    padding-block: 20px 24px;
  }
  .featured .section-heading {
    padding-inline: 15px;
  }
  .featured .section-heading,
  .live .section-heading {
    font-size: 32px;
    line-height: 48px;
  }
  .featured-card {
    margin-top: 16px;
  }
  .featured-card:first-of-type {
    margin-top: 8px;
  }
  .featured-photo {
    padding: 24px 15px 0;
  }
  .featured-copy {
    padding: 8px 15px 24px;
    gap: 8px;
  }
  .featured-actions {
    gap: 4px;
    margin-top: 12px;
  }
  .featured-actions .button {
    min-width: 96px;
    min-height: 44px;
    padding: 8px 12px;
  }
  .live-stage h3 {
    margin-right: -12px;
  }
  .live-stage {
    margin-top: 8px;
  }
}
@media (width >= 768px) {
  .featured {
    padding-block: 62px 60px;
  }
  .featured .section-heading,
  .live .section-heading {
    line-height: 48px;
  }
  .featured-card:first-of-type {
    margin-top: 24px;
  }
  .live-stage {
    min-height: 482px;
    margin-top: 24px;
  }
  .live-stage > div {
    min-height: 482px;
  }
}
</style>
