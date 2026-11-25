<script setup lang="ts">
withDefaults(defineProps<{ newsletter?: boolean }>(), { newsletter: true });
const { name } = useDemoAccount();
const signedUp = ref(false);
const email = ref("");
const interactive = ref(false);
onMounted(() => {
  interactive.value = true;
});
function subscribe() {
  if (!email.value.trim()) return;
  signedUp.value = true;
  email.value = "";
}
</script>

<template>
  <footer>
    <section
      v-if="newsletter"
      class="newsletter"
      aria-labelledby="newsletter-title"
    >
      <ExhibitImage name="newsletter" sizes="100vw" class="newsletter-image" />
      <div class="shell newsletter-inner">
        <h2 id="newsletter-title" class="section-heading">
          想收到最新消息嗎？<br />快訂閱我們！
        </h2>
        <form class="newsletter-form" @submit.prevent="subscribe">
          <label class="sr-only" for="newsletter-email">電子信箱</label>
          <input
            id="newsletter-email"
            v-model="email"
            type="email"
            placeholder="輸入您的電子信箱"
            required
            autocomplete="email"
            :disabled="!interactive"
            @input="signedUp = false"
          />
          <button class="button" type="submit" :disabled="!interactive">
            訂閱
          </button>
        </form>
        <p v-if="signedUp" class="subscribed" role="status">已完成示範訂閱。</p>
      </div>
    </section>
    <div class="shell footer-inner">
      <NuxtLink to="/" class="footer-brand">EXHIBINECTION</NuxtLink>
      <p>© 2020. All Rights Reserved.</p>
      <nav class="footer-account" aria-label="帳戶與收藏">
        <NuxtLink to="/favorites">我的收藏</NuxtLink>
        <NuxtLink v-if="name" to="/account">帳戶</NuxtLink>
        <template v-else>
          <NuxtLink to="/account/sign-in">Sign in</NuxtLink>
          <NuxtLink to="/account/sign-up">Sign up</NuxtLink>
        </template>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.newsletter {
  position: relative;
  display: grid;
  min-height: 400px;
  align-items: end;
  background: #1c1c1c;
  color: white;
  isolation: isolate;
}
.newsletter::after {
  position: absolute;
  z-index: -1;
  inset: 0;
  background: linear-gradient(90deg, #0008, transparent 78%);
  content: "";
}
.newsletter-image {
  position: absolute;
  z-index: -2;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 46%;
}
.newsletter-inner {
  padding-block: 26px 36px;
}
.newsletter-form {
  display: flex;
  width: min(350px, 100%);
  margin-top: 12px;
}
.newsletter-form input {
  width: 0;
  min-width: 0;
  flex: 1;
  border: 1px solid white;
  border-radius: 4px 0 0 4px;
  padding: 10px 12px;
  background: white;
  color: var(--ink);
}
.newsletter-form button {
  width: 38%;
  border-radius: 0 4px 4px 0;
}
.subscribed {
  margin-top: 8px;
}
.footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 16px;
  padding-block: 20px;
}
.footer-brand {
  font-size: 1.375rem;
  text-decoration: none;
}
.footer-inner p {
  font-size: 0.875rem;
}
.footer-account {
  display: flex;
  gap: 14px;
  margin-left: auto;
}
.footer-account a {
  border: 0;
  background: transparent;
  color: var(--muted);
  text-decoration: none;
}
.footer-account a:hover {
  color: var(--wine);
  text-decoration: underline;
}
@media (max-width: 767px) {
  .newsletter-image {
    object-position: 51% center;
  }
  .footer-inner {
    align-items: flex-start;
    gap: 5px;
    flex-direction: column;
  }
  .footer-account {
    margin: 3px 0 0 -6px;
  }
}
</style>
