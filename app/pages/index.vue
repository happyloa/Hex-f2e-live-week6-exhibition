<script setup lang="ts">
import { exhibitionPath, findExhibition } from "~/data/exhibitions";
const featured = ["taiwan-design", "online-design", "kaohsiung-design"].map(
  (id) => findExhibition(id)!,
);
const hero = findExhibition("taipei-contemporary")!;
useSeoMeta({ title: "首頁", ogTitle: "EXHIBINECTION 策展與售票" });
</script>

<template>
  <section class="
    relative isolate bg-hero-bg text-white after:absolute after:inset-0 after:-z-10
    after:[background:linear-gradient(90deg,#000b,#0002_86%)] after:content-['']
  " aria-labelledby="hero-title">
    <ExhibitImage
      name="hero"
      alt=""
      class="absolute inset-0 -z-20 size-full object-cover object-[48%_center] md:object-[center_46%]"
      sizes="100vw"
      priority
    />
    <div class="shell flex min-h-[480px] items-end md:items-center">
      <div class="pb-[76px] md:ml-[8.5%] md:pb-[5px]">
        <h1 id="hero-title" class="text-[clamp(1.875rem,5vw,2.25rem)] font-bold">{{ hero.title }}</h1>
        <p class="mt-[3px] text-xl font-semibold tracking-[.02em]">{{ hero.start }} — {{ hero.end }}</p>
        <div class="mt-4 flex gap-2 [&_.button]:min-w-[140px] md:[&_.button]:min-w-[clamp(114px,17vw,160px)]">
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
  <section class="shell pt-[clamp(26px,5vw,64px)] pb-[clamp(28px,5vw,58px)]" aria-labelledby="featured-title">
    <h2 id="featured-title" class="section-heading">熱門特展</h2>
    <article v-for="item in featured" :key="item.id" class="
      mt-[18px] bg-surface md:mt-5 md:grid md:min-h-[350px]
      md:grid-cols-[minmax(250px,31.55%)_minmax(0,1fr)]
    ">
      <NuxtLink
        class="block"
        :to="exhibitionPath(item.id)"
        :aria-label="`查看${item.title}`"
      >
        <ExhibitImage
          class="aspect-[1/.82] h-full max-h-[380px] min-h-[210px] w-full object-cover md:aspect-square"
          :name="item.image"
          :alt="item.alt"
          sizes="(min-width: 768px) 350px, calc(100vw - 30px)"
        />
      </NuxtLink>
      <div class="
        grid grid-cols-[minmax(0,1fr)_auto] content-center gap-x-gutter-mobile gap-y-[9px] px-4 pt-3
        pb-[18px] md:p-8
      ">
        <div>
          <h3 class="text-[clamp(1.15rem,2vw,1.375rem)] font-bold">
            <NuxtLink class="no-underline hover:underline" :to="exhibitionPath(item.id)">{{ item.title }}</NuxtLink>
          </h3>
          <p class="mt-[3px] text-[1.2rem]">${{ item.price }}</p>
        </div>
        <p class="
          flex gap-1 text-sm font-bold whitespace-nowrap text-ink md:row-span-3 md:w-[3.3ch] md:flex-col
          md:items-start md:gap-px md:text-[1.0625rem] md:whitespace-normal
        ">
          <span>{{ item.start }}</span><span aria-hidden="true">—</span
          ><span>{{ item.end }}</span>
        </p>
        <p class="col-span-full md:col-span-1 md:col-start-1 md:max-w-[38rem] md:text-[1.0625rem]">{{ item.description }}</p>
        <div class="col-span-full mt-1 flex flex-wrap gap-2 md:col-span-1 md:col-start-1">
          <NuxtLink
            class="button"
            :to="{ path: exhibitionPath(item.id), hash: '#tickets' }"
            >購買票券<span class="sr-only">：{{ item.title }}</span></NuxtLink
          >
          <NuxtLink class="button button--outline" :to="exhibitionPath(item.id)"
            >展覽資訊<span class="sr-only">：{{ item.title }}</span></NuxtLink
          >
        </div>
      </div>
    </article>
  </section>
  <section class="shell" aria-labelledby="live-title">
    <h2 id="live-title" class="section-heading">直播回顧</h2>
    <div class="relative isolate mt-[18px] min-h-[380px] bg-live-stage md:min-h-[440px]">
      <ExhibitImage
        class="absolute inset-0 -z-10 size-full object-cover"
        name="live-gallery"
        sizes="(min-width: 1110px) 1110px, 100vw"
      />
      <div class="
        min-h-[380px] w-full max-w-[445px] bg-live-panel px-4 py-[25px] text-white md:min-h-[440px]
        md:px-6 md:py-8
      ">
        <h3 class="flex flex-wrap gap-2 text-[1.65rem] font-bold">開幕對談 <span class="border-l border-white/53 pl-3">藝術展演巡禮</span></h3>
        <ExhibitImage
          class="mt-5 mb-3 aspect-square w-[100px] object-cover"
          name="host"
          sizes="100px"
          alt="對談主持人"
        />
        <p class="max-w-[265px]">跟著導覽走進展場，從策展觀點認識藝術創作與觀看的關係。</p>
        <NuxtLink class="button mt-5" to="/recap">查看回顧</NuxtLink>
      </div>
    </div>
  </section>
  <LazyRecommendations :hydrate-on-visible="{ rootMargin: '250px' }" />
</template>
