<script setup lang="ts">
const { count, isCartOpen, ready } = useTicketCart();
const { name } = useDemoAccount();
</script>

<template>
  <header class="site-header">
    <div class="shell header-inner">
      <NuxtLink class="brand" to="/" aria-label="EXHIBINECTION 首頁"
        >EXHIBINECTION</NuxtLink
      >
      <div class="header-actions">
        <template v-if="!name">
          <NuxtLink class="account-link" to="/account/sign-in">
            Sign in
          </NuxtLink>
          <NuxtLink class="account-link" to="/account/sign-up">
            Sign up
          </NuxtLink>
        </template>
        <NuxtLink v-else class="account-link" to="/account">
          {{ name }}
        </NuxtLink>
        <button
          type="button"
          class="icon-button cart-trigger"
          :aria-label="`購物車，${count} 張票券`"
          aria-haspopup="dialog"
          :disabled="!ready"
          @click="isCartOpen = true"
        >
          <MaterialIcon name="ticket" />
          <span v-if="count" aria-hidden="true" class="count">{{ count }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  border-bottom: 1px solid #969696;
  background: white;
}
.header-inner {
  position: relative;
  display: grid;
  height: 55px;
  place-items: center;
}
.brand {
  color: var(--wine);
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  text-decoration: none;
}
.header-actions {
  position: absolute;
  right: -5px;
  display: flex;
  gap: 13px;
  align-items: center;
}
.cart-trigger {
  position: relative;
}
.count {
  position: absolute;
  top: 0;
  right: 0;
  display: grid;
  min-width: 20px;
  min-height: 18px;
  padding-inline: 4px;
  place-items: center;
  border-radius: 20px;
  background: var(--pink);
  color: white;
  font-size: 0.75rem;
}
.account-link {
  display: none;
  max-width: 115px;
  border: 0;
  padding: 8px 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  white-space: nowrap;
  background: transparent;
  color: var(--muted);
}
.account-link:hover {
  color: var(--wine);
}
@media (min-width: 768px) {
  .header-inner {
    height: 79px;
  }
  .account-link {
    display: inline-block;
  }
}
</style>
