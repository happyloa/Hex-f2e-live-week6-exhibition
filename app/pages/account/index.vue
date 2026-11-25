<script setup lang="ts">
const { name, setName } = useDemoAccount();
const { order } = useTicketCart();
const displayName = ref("");
watch(
  name,
  (value) => {
    displayName.value = value;
  },
  { immediate: true },
);
useSeoMeta({ title: "示範帳戶", robots: "noindex, nofollow" });
</script>

<template>
  <div class="shell support-page max-w-[640px]">
    <h1 class="section-heading">示範帳戶</h1>
    <div class="support-panel">
      <form
        v-if="name"
        class="grid gap-3"
        @submit.prevent="setName(displayName)"
      >
        <label class="field">
          顯示名稱
          <input
            v-model="displayName"
            required
            maxlength="32"
            autocomplete="nickname"
          />
        </label>
        <div class="support-actions">
          <button
            class="button"
            type="submit"
            :disabled="!displayName.trim() || displayName.trim() === name"
          >
            更新名稱
          </button>
          <button
            class="button button--outline"
            type="button"
            @click="setName('')"
          >
            登出
          </button>
        </div>
      </form>
      <div v-else class="support-actions">
        <NuxtLink class="button" to="/account/sign-in">登入</NuxtLink>
        <NuxtLink class="button button--outline" to="/account/sign-up"
          >註冊</NuxtLink
        >
      </div>
      <div class="grid justify-items-start gap-3">
        <NuxtLink class="plain-link" to="/favorites">我的收藏</NuxtLink>
        <NuxtLink v-if="order" class="plain-link" to="/checkout/complete"
          >最近的示範訂單</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
