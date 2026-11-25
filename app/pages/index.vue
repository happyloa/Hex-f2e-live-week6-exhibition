<script setup lang="ts">
import { exhibitionPath, findExhibition } from "~/data/exhibitions";
const featured = ["taiwan-design", "online-design", "kaohsiung-design"].map(
  (id) => findExhibition(id)!,
);
const hero = findExhibition("taipei-contemporary")!;
const liveOpen = ref(false);
useSeoMeta({ title: "首頁", ogTitle: "EXHIBINECTION 策展與售票" });
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <ExhibitImage
      name="hero"
      alt=""
      class="hero-image"
      sizes="100vw"
      priority
    />
    <div class="shell hero-shell">
      <div class="hero-copy">
        <h1 id="hero-title">{{ hero.title }}</h1>
        <p>{{ hero.start }} — {{ hero.end }}</p>
        <div class="hero-actions">
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
  <section class="shell featured" aria-labelledby="featured-title">
    <h2 id="featured-title" class="section-heading">熱門特展</h2>
    <article v-for="item in featured" :key="item.id" class="featured-item">
      <NuxtLink
        class="featured-media"
        :to="exhibitionPath(item.id)"
        :aria-label="`查看${item.title}`"
      >
        <ExhibitImage
          class="featured-image"
          :name="item.image"
          :alt="item.alt"
          sizes="(min-width: 768px) 350px, 100vw"
        />
      </NuxtLink>
      <div class="featured-content">
        <div>
          <h3>
            <NuxtLink :to="exhibitionPath(item.id)">{{ item.title }}</NuxtLink>
          </h3>
          <p class="featured-price">${{ item.price }}</p>
        </div>
        <p class="featured-date">
          <span>{{ item.start }}</span><span aria-hidden="true">—</span
          ><span>{{ item.end }}</span>
        </p>
        <p class="featured-description">{{ item.description }}</p>
        <div class="featured-actions">
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
  <section class="shell live" aria-labelledby="live-title">
    <h2 id="live-title" class="section-heading">直播回顧</h2>
    <div class="live-stage">
      <ExhibitImage
        class="live-image"
        name="live-gallery"
        sizes="(min-width: 1110px) 1110px, 100vw"
      />
      <div class="live-card">
        <h3>開幕對談 <span>藝術展演巡禮</span></h3>
        <ExhibitImage
          class="live-host"
          name="host"
          sizes="100px"
          alt="對談主持人"
        />
        <p>跟著導覽走進展場，從策展觀點認識藝術創作與觀看的關係。</p>
        <button
          class="button"
          type="button"
          :aria-expanded="liveOpen"
          aria-controls="live-notes"
          @click="liveOpen = !liveOpen"
        >
          {{ liveOpen ? "收起回顧" : "觀看回顧" }}
        </button>
      </div>
    </div>
    <div v-if="liveOpen" id="live-notes" class="live-notes">
      <h3>開幕對談摘要</h3>
      <p>
        從動線、材質與光線三個角度走讀展場，體會策展如何改變作品與觀眾的距離。
      </p>
      <NuxtLink class="plain-link" :to="exhibitionPath('taiwan-design')"
        >查看相關展覽</NuxtLink
      >
    </div>
  </section>
  <Recommendations />
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  background: #171719;
  color: white;
}
.hero-image {
  position: absolute;
  z-index: -2;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center 46%;
}
.hero::after {
  position: absolute;
  z-index: -1;
  inset: 0;
  background: linear-gradient(90deg, #000b, #0002 86%);
  content: "";
}
.hero-shell {
  display: flex;
  min-height: 480px;
  align-items: center;
}
.hero-copy {
  padding-bottom: 5px;
}
.hero-copy h1 {
  font-size: clamp(1.875rem, 5vw, 2.25rem);
}
.hero-copy p {
  margin-top: 3px;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.hero-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
.hero-actions .button {
  min-width: clamp(114px, 17vw, 160px);
}
.featured {
  padding-block: clamp(26px, 5vw, 64px) clamp(28px, 5vw, 58px);
}
.featured-item {
  margin-top: 18px;
  background: var(--gray);
}
.featured-media {
  display: block;
}
.featured-image {
  width: 100%;
  height: 100%;
  min-height: 210px;
  max-height: 380px;
  aspect-ratio: 1 / 0.82;
  object-fit: cover;
}
.featured-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 9px 15px;
  align-content: center;
  padding: 12px 16px 18px;
}
.featured-content h3 {
  font-size: clamp(1.15rem, 2vw, 1.375rem);
}
.featured-content h3 a {
  text-decoration: none;
}
.featured-content h3 a:hover {
  text-decoration: underline;
}
.featured-price {
  margin-top: 3px;
  font-size: 1.2rem;
}
.featured-date {
  display: flex;
  gap: 0.25rem;
  color: var(--ink);
  font-size: 0.875rem;
  font-weight: 700;
  white-space: nowrap;
}
.featured-description,
.featured-actions {
  grid-column: 1 / -1;
}
.featured-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}
.live-stage {
  position: relative;
  min-height: 440px;
  margin-top: 18px;
  isolation: isolate;
  background: #392e3c;
}
.live-image {
  position: absolute;
  z-index: -1;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.live-card {
  width: min(100%, 445px);
  min-height: 440px;
  padding: 32px 24px;
  background: #37103bdc;
  color: white;
}
.live-card h3 {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 1.65rem;
}
.live-card h3 span {
  padding-left: 12px;
  border-left: 1px solid #fff8;
}
.live-host {
  width: 100px;
  aspect-ratio: 1;
  margin-block: 20px 12px;
  object-fit: cover;
}
.live-card p {
  max-width: 265px;
}
.live-card .button {
  margin-top: 20px;
}
.live-notes {
  display: grid;
  gap: 5px;
  border: 1px solid var(--line);
  padding: 18px;
}
@media (max-width: 767px) {
  .hero-shell {
    min-height: 480px;
    align-items: flex-end;
  }
  .hero-copy {
    padding-bottom: 76px;
  }
  .hero-image {
    object-position: 48% center;
  }
  .hero-actions .button {
    min-width: 140px;
  }
  .live-card {
    min-height: 380px;
    padding: 25px 16px;
  }
  .live-stage {
    min-height: 380px;
  }
}
@media (min-width: 768px) {
  .hero-copy {
    margin-left: 8.5%;
  }
  .featured-item {
    display: grid;
    min-height: 350px;
    grid-template-columns: minmax(250px, 31.55%) minmax(0, 1fr);
    margin-top: 20px;
  }
  .featured-content {
    padding: 32px;
  }
  .featured-description {
    max-width: 38rem;
    font-size: 1.0625rem;
  }
  .featured-date {
    grid-row: span 3;
    flex-direction: column;
    align-items: start;
    gap: 1px;
    white-space: normal;
    width: 3.3ch;
    font-size: 1.0625rem;
  }
  .featured-description,
  .featured-actions {
    grid-column: 1;
  }
  .featured-image {
    aspect-ratio: 1;
  }
}
</style>
