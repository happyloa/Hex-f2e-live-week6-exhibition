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
      class="relative isolate grid min-h-[400px] items-end bg-newsletter-bg text-white after:absolute after:inset-0 after:-z-10 after:[background:linear-gradient(90deg,#0008,transparent_78%)] after:content-['']"
      aria-labelledby="newsletter-title"
    >
      <ExhibitImage
        name="newsletter"
        sizes="100vw"
        class="absolute inset-0 -z-20 size-full object-cover object-[51%_center] md:object-[center_46%]"
      />
      <div v-reveal class="shell pt-[26px] pb-9">
        <h2 id="newsletter-title" class="section-heading max-md:leading-9">
          想收到最新消息嗎？<br />快訂閱我們！
        </h2>
        <form
          class="mt-[22px] flex min-h-12 w-full max-w-[350px] md:mt-3"
          @submit.prevent="subscribe"
        >
          <label class="sr-only" for="newsletter-email">電子信箱</label>
          <input
            class="w-0 min-w-0 flex-1 rounded-l-sm border border-white bg-white px-3 py-2.5 text-ink"
            id="newsletter-email"
            v-model="email"
            type="email"
            placeholder="輸入您的電子信箱"
            required
            autocomplete="email"
            :disabled="!interactive"
            @input="signedUp = false"
          />
          <button
            class="button w-[38%] rounded-l-none"
            type="submit"
            :disabled="!interactive"
          >
            訂閱
          </button>
        </form>
        <p v-if="signedUp" class="mt-2" role="status">已完成示範訂閱。</p>
      </div>
    </section>
    <div
      class="shell flex flex-col flex-wrap items-start py-2 md:min-h-20 md:flex-row md:items-center md:gap-x-4 md:py-5 md:gap-y-1"
    >
      <NuxtLink
        to="/"
        class="text-[1.375rem] leading-6 no-underline md:leading-normal"
        >EXHIBINECTION</NuxtLink
      >
      <p class="text-sm leading-5 md:leading-normal">
        © 2020. All Rights Reserved.
      </p>
      <nav
        class="flex gap-3.5 text-xs leading-[15px] md:ml-auto md:text-base md:leading-normal [&_a]:text-muted [&_a]:no-underline [&_a:hover]:text-brand [&_a:hover]:underline"
        aria-label="帳戶與收藏"
      >
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
