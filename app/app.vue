<script setup lang="ts">
import { cartStorageKey } from "~/composables/useTicketCart";
import { favoriteStoragePrefix } from "~/composables/useFavorites";
const { restore, restoreCart } = useTicketCart();
const { restore: restoreAccount } = useDemoAccount();
const { restore: restoreFavorites } = useFavorites();
const route = useRoute();
const checkout = computed(() =>
  ["/checkout/cart", "/checkout/details", "/checkout/payment"].includes(
    route.path,
  ),
);
const utilityPage = computed(
  () =>
    route.path === "/favorites" ||
    route.path === "/account" ||
    route.path.startsWith("/account/") ||
    route.path.startsWith("/visit/"),
);

function syncLocalStorage(event: StorageEvent) {
  if (event.key === null || event.key === cartStorageKey) restoreCart();
  if (event.key === null || event.key.startsWith(favoriteStoragePrefix))
    restoreFavorites();
}

onMounted(() => {
  restore();
  restoreAccount();
  restoreFavorites();
  window.addEventListener("storage", syncLocalStorage);
});
onBeforeUnmount(() => window.removeEventListener("storage", syncLocalStorage));
</script>

<template>
  <a href="#main-content" class="skip-link">跳至主要內容</a>
  <SiteHeader />
  <CategoryNav v-if="!checkout && route.path !== '/'" />
  <main id="main-content" tabindex="-1">
    <NuxtPage />
  </main>
  <SiteFooter
    v-if="!checkout && route.path !== '/checkout/complete'"
    :newsletter="!utilityPage"
  />
  <CartDrawer />
  <NuxtRouteAnnouncer />
</template>
