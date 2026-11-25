<script setup lang="ts">
import { newTaiwanDollars } from "~/data/exhibitions";
const { count, subtotal, isCartOpen } = useTicketCart();
const dialog = ref<HTMLDialogElement>();
const closeButton = ref<HTMLButtonElement>();
const route = useRoute();
const slide =
  "motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out";

watch(
  () => route.fullPath,
  () => {
    isCartOpen.value = false;
  },
);

function openDrawer() {
  const panel = dialog.value;
  if (panel && !panel.open) panel.showModal();
}

function closeDrawer() {
  if (!isCartOpen.value) dialog.value?.close();
}
</script>

<template>
  <dialog
    ref="dialog"
    class="fixed inset-[var(--cart-top)_0_0_auto] m-0 h-[calc(100dvh-var(--cart-top))] max-h-dvh w-[min(100%,540px)] max-w-full overflow-clip border-0 bg-transparent p-0 text-white [--cart-top:56px] backdrop:[background:linear-gradient(to_bottom,transparent_var(--cart-top),#0004_var(--cart-top))] backdrop:opacity-0 data-[open=true]:backdrop:opacity-100 motion-safe:backdrop:transition-opacity motion-safe:backdrop:duration-300 motion-safe:starting:backdrop:opacity-0 md:[--cart-top:80px]"
    :data-open="isCartOpen"
    aria-labelledby="drawer-title"
    @cancel.prevent="isCartOpen = false"
    @click.self="isCartOpen = false"
  >
    <Transition
      :enter-active-class="slide"
      :leave-active-class="slide"
      enter-from-class="motion-safe:[transform:translateX(100%)]"
      leave-to-class="motion-safe:[transform:translateX(100%)]"
      @before-enter="openDrawer"
      @enter="closeButton?.focus({ preventScroll: true })"
      @after-leave="closeDrawer"
    >
      <div
        v-if="isCartOpen"
        data-drawer-panel
        class="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] gap-3 bg-ink px-gutter-mobile py-4 md:gap-4 md:px-8 md:py-6"
      >
        <header class="flex items-center justify-between gap-2">
          <h2 id="drawer-title" class="text-[clamp(1.5rem,4vw,2rem)] font-bold">
            Cart List
          </h2>
          <button
            ref="closeButton"
            type="button"
            class="icon-button"
            aria-label="關閉購物車"
            @click="isCartOpen = false"
          >
            <MaterialIcon name="close" />
          </button>
        </header>
        <div class="scrollbar-branded-dark overflow-y-auto">
          <CartItems v-if="count" variant="drawer" editable />
          <p v-else class="py-8">購物車目前沒有票券。</p>
        </div>
        <footer class="flex items-center justify-between gap-2">
          <p class="flex flex-wrap gap-y-[7px] gap-x-[clamp(8px,2vw,24px)]">
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
    </Transition>
  </dialog>
</template>
