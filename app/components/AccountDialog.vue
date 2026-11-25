<script setup lang="ts">
import { X } from "@lucide/vue";
const { mode, name } = useDemoAccount();
const dialog = ref<HTMLDialogElement>();
const displayName = ref("");

function sync() {
  if (mode.value && !dialog.value?.open) {
    displayName.value = name.value;
    dialog.value?.showModal();
  }
  if (!mode.value && dialog.value?.open) dialog.value.close();
}

function submit() {
  const value = displayName.value.trim();
  if (!value) return;
  name.value = value;
  mode.value = null;
}

onMounted(sync);
watch(mode, sync, { flush: "post" });
</script>

<template>
  <dialog
    ref="dialog"
    aria-labelledby="account-title"
    @cancel.prevent="mode = null"
    @click.self="mode = null"
  >
    <form class="account-form" @submit.prevent="submit">
      <button
        class="icon-button close"
        type="button"
        aria-label="關閉帳戶視窗"
        @click="mode = null"
      >
        <X :size="23" aria-hidden="true" />
      </button>
      <h2 id="account-title">
        {{ name ? "示範帳戶" : mode === "signup" ? "註冊" : "登入" }}
      </h2>
      <p class="muted">輸入顯示名稱即可體驗示範帳戶。</p>
      <label class="field">
        顯示名稱
        <input
          v-model="displayName"
          required
          maxlength="32"
          pattern=".*\S.*"
          autocomplete="off"
        />
      </label>
      <button class="button button--block" type="submit">
        {{ name ? "更新名稱" : "繼續" }}
      </button>
      <button
        v-if="name"
        class="button button--outline button--block"
        type="button"
        @click="
          name = '';
          mode = null;
        "
      >
        登出
      </button>
    </form>
  </dialog>
</template>

<style scoped>
dialog {
  width: min(420px, calc(100% - 30px));
  border: 0;
  padding: 0;
}
dialog::backdrop {
  background: #0008;
}
.account-form {
  position: relative;
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
}
.close {
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
}
</style>
