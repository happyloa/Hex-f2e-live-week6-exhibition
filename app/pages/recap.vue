<script setup lang="ts">
import { exhibitionPath } from "~/data/exhibitions";
useSeoMeta({
  title: "直播文字回顧",
  description: "從展場動線、材質與光線，回顧開幕對談的策展觀察。",
});
</script>

<template>
  <article class="shell grid gap-[25px] py-[clamp(30px,6vw,72px)]">
    <header class="grid gap-2">
      <p class="font-bold text-brand">直播文字回顧</p>
      <h1 class="section-heading">開幕對談：藝術展演巡禮</h1>
      <p>跟著導覽走進展場，從動線、材質和光線理解策展如何影響觀看體驗。</p>
    </header>
    <ExhibitImage
      class="aspect-[2.6] min-h-[180px] w-full object-cover"
      name="live-gallery"
      alt="觀眾走過展牆與大型畫作"
      sizes="(min-width: 1110px) 1110px, 95vw"
      priority
    />
    <div class="
      grid gap-x-6 gap-y-3 min-[760px]:grid-cols-3 [&>section]:border-t-2 [&>section]:border-brand
      [&>section]:py-3 [&_h2]:mb-[5px] [&_h2]:text-xl [&_h2]:font-bold
    ">
      <section>
        <h2>展場動線</h2>
        <p>
          入口決定第一眼看到什麼。行走的方向、停留空間與視線高度，會改變作品被閱讀的順序。
        </p>
      </section>
      <section>
        <h2>材質與尺度</h2>
        <p>
          靠近看表面細節，退後再看作品與建築的關係。同一件作品會因觀看距離而呈現不同層次。
        </p>
      </section>
      <section>
        <h2>展間光線</h2>
        <p>
          自然光、投射光和陰影塑造不同的視覺重點。沿著展間移動，可以觀察光線怎麼帶領視線。
        </p>
      </section>
    </div>
    <div class="support-actions">
      <NuxtLink class="button" :to="exhibitionPath('taiwan-design')"
        >查看相關展覽</NuxtLink
      >
      <NuxtLink class="plain-link" to="/#live-title">返回首頁回顧</NuxtLink>
    </div>
  </article>
</template>
