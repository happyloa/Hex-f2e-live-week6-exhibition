<script setup lang="ts">
import { cartStorageKey } from "~/composables/useTicketCart";
const { restore, restoreCart } = useTicketCart();
const route = useRoute();
const checkout = computed(() =>
  ["/checkout/cart", "/checkout/details", "/checkout/payment"].includes(
    route.path,
  ),
);

function syncCart(event: StorageEvent) {
  if (event.key === null || event.key === cartStorageKey) restoreCart();
}

onMounted(() => {
  restore();
  window.addEventListener("storage", syncCart);
});
onBeforeUnmount(() => window.removeEventListener("storage", syncCart));
</script>

<template>
  <a href="#main-content" class="skip-link">跳至主要內容</a>
  <SiteHeader />
  <CategoryNav v-if="!checkout && route.path !== '/'" />
  <main id="main-content" tabindex="-1">
    <NuxtPage />
  </main>
  <SiteFooter v-if="!checkout && route.path !== '/checkout/complete'" />
  <CartDrawer />
  <AccountDialog />
  <NuxtRouteAnnouncer />
</template>
