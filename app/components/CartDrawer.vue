<script setup lang="ts">
import { X } from "@lucide/vue";
import { newTaiwanDollars } from "~/data/exhibitions";
const { count, subtotal, isCartOpen } = useTicketCart();
const dialog = ref<HTMLDialogElement>();
const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    isCartOpen.value = false;
  },
);
watch(
  isCartOpen,
  (open) => {
    const panel = dialog.value;
    if (open && !panel?.open) panel?.showModal();
    if (!open && panel?.open) panel.close();
  },
  { flush: "post" },
);
</script>

<template>
  <dialog
    ref="dialog"
    class="cart-drawer"
    aria-labelledby="drawer-title"
    @cancel.prevent="isCartOpen = false"
    @click.self="isCartOpen = false"
  >
    <div class="drawer-inner">
      <header>
        <h2 id="drawer-title">Cart List</h2>
        <button
          type="button"
          class="icon-button"
          aria-label="關閉購物車"
          @click="isCartOpen = false"
        >
          <X :size="24" aria-hidden="true" />
        </button>
      </header>
      <div class="cart-scroll">
        <CartItems v-if="count" variant="drawer" editable />
        <p v-else class="empty">購物車目前沒有票券。</p>
      </div>
      <footer>
        <p>
          小計 <strong>{{ newTaiwanDollars(subtotal) }}</strong>
        </p>
        <NuxtLink
          v-if="count"
          class="button button--outline"
          to="/checkout/cart"
          @click="isCartOpen = false"
        >
          前往結帳
        </NuxtLink>
        <NuxtLink
          v-else
          class="button button--outline"
          to="/exhibitions"
          @click="isCartOpen = false"
        >
          瀏覽展覽
        </NuxtLink>
      </footer>
    </div>
  </dialog>
</template>

<style scoped>
.cart-drawer {
  position: fixed;
  inset: 0 0 0 auto;
  width: min(100%, 540px);
  max-width: 100%;
  max-height: 100dvh;
  height: 100dvh;
  margin: 0;
  border: 0;
  padding: 0;
  background: #080808;
  color: white;
  overflow: hidden;
}
.cart-drawer::backdrop {
  background: #0005;
}
.drawer-inner {
  display: grid;
  height: 100%;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 12px;
  padding: 16px 15px;
}
header,
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
h2 {
  font-size: clamp(1.5rem, 4vw, 2rem);
}
.cart-scroll {
  overflow-y: auto;
  scrollbar-color: var(--pink) #555;
  scrollbar-width: thin;
}
.empty {
  padding-block: 32px;
}
footer p {
  display: flex;
  flex-wrap: wrap;
  gap: 7px clamp(8px, 2vw, 24px);
}
@media (min-width: 768px) {
  .cart-drawer {
    inset-block-start: 80px;
    height: calc(100dvh - 80px);
  }
  .drawer-inner {
    gap: 16px;
    padding: 24px 32px;
  }
}
</style>
