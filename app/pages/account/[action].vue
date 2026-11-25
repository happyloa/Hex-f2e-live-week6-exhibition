<script setup lang="ts">
definePageMeta({ key: (route) => route.path });
const route = useRoute();
const action = route.params.action;
if (action !== "sign-in" && action !== "sign-up") {
  throw createError({ statusCode: 404, statusMessage: "找不到帳戶頁面" });
}
const signup = action === "sign-up";
const title = signup ? "註冊" : "登入";
const { ready, setName } = useDemoAccount();
const displayName = ref("");
const error = ref("");
useSeoMeta({ title, robots: "noindex, nofollow" });

async function submit() {
  if (!ready.value) return;
  if (!displayName.value.trim()) {
    error.value = "請輸入顯示名稱。";
    return;
  }
  setName(displayName.value);
  await navigateTo("/account");
}
</script>

<template>
  <div class="shell support-page max-w-[540px]">
    <h1 class="section-heading">{{ title }}</h1>
    <form class="support-panel" @submit.prevent="submit">
      <p class="text-muted">輸入顯示名稱即可使用這個分頁的示範帳戶。</p>
      <label class="field">
        顯示名稱
        <input
          v-model="displayName"
          required
          maxlength="32"
          autocomplete="nickname"
          :disabled="!ready"
          :aria-invalid="!!error || undefined"
          @input="error = ''"
        />
      </label>
      <p v-if="error" class="form-error" role="alert">{{ error }}</p>
      <button class="button button--block" type="submit" :disabled="!ready">
        {{ title }}
      </button>
      <NuxtLink
        class="plain-link"
        :to="signup ? '/account/sign-in' : '/account/sign-up'"
      >
        {{ signup ? "已有示範帳戶，前往登入" : "建立示範帳戶" }}
      </NuxtLink>
    </form>
  </div>
</template>
