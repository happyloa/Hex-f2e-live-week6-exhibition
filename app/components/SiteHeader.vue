<script setup lang="ts">
const { count, isCartOpen, ready } = useTicketCart();
const { name } = useDemoAccount();
</script>

<template>
  <header class="border-b border-divider bg-white">
    <div class="shell relative grid h-[59px] place-items-center md:h-[79px]">
      <NuxtLink class="text-[22px] md:text-2xl text-brand no-underline" to="/" aria-label="EXHIBINECTION 首頁"
        >EXHIBINECTION</NuxtLink
      >
      <div class="absolute -right-[5px] flex items-center gap-[13px]">
        <template v-if="!name">
          <NuxtLink class="
            hidden max-w-[115px] truncate px-0.5 py-2 text-muted no-underline hover:text-brand
            md:inline-block
          " to="/account/sign-in">
            Sign in
          </NuxtLink>
          <NuxtLink class="
            hidden max-w-[115px] truncate px-0.5 py-2 text-muted no-underline hover:text-brand
            md:inline-block
          " to="/account/sign-up">
            Sign up
          </NuxtLink>
        </template>
        <NuxtLink v-else class="
          hidden max-w-[115px] truncate px-0.5 py-2 text-muted no-underline hover:text-brand
          md:inline-block
        " to="/account">
          {{ name }}
        </NuxtLink>
        <button
          type="button"
          class="icon-button relative"
          :aria-label="`購物車，${count} 張票券`"
          aria-haspopup="dialog"
          :disabled="!ready"
          @click="isCartOpen = true"
        >
          <MaterialIcon name="ticket" />
          <span v-if="count" aria-hidden="true" class="
            absolute top-0 right-0 grid min-h-[18px] min-w-5 place-items-center rounded-full bg-accent px-1
            text-xs text-white
          ">{{ count }}</span>
        </button>
      </div>
    </div>
  </header>
</template>
