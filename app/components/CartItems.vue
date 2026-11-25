<script setup lang="ts">
import {
  exhibitionPath,
  findExhibition,
  newTaiwanDollars,
  ticketLabel,
  ticketPrice,
} from "~/data/exhibitions";
import { cartLineKey } from "~/composables/useTicketCart";
defineProps<{ variant?: "drawer" | "checkout"; editable?: boolean }>();
const { lines, updateQuantity } = useTicketCart();
const items = computed(() =>
  lines.value.map((line) => ({
    ...line,
    key: cartLineKey(line),
    exhibition: findExhibition(line.exhibitionId)!,
  })),
);
</script>

<template>
  <ul
    class="cart-items"
    :class="`cart-items--${variant ?? 'checkout'}`"
    aria-label="購物車票券"
  >
    <li v-for="item in items" :key="item.key" class="cart-item">
      <ExhibitImage
        class="cart-image"
        :name="item.exhibition.image"
        sizes="160px"
      />
      <div class="cart-info">
        <NuxtLink :to="exhibitionPath(item.exhibition.id)">{{
          item.exhibition.title
        }}</NuxtLink>
        <p>{{ item.exhibition.start }} — {{ item.exhibition.end }}</p>
        <p class="muted">{{ ticketLabel(item.type) }}</p>
      </div>
      <strong class="cart-price">{{
        newTaiwanDollars(ticketPrice(item.exhibition, item.type))
      }}</strong>
      <QuantityControl
        v-if="editable"
        class="cart-quantity"
        :quantity="item.quantity"
        :label="`${item.exhibition.title} ${ticketLabel(item.type)}張數`"
        @change="updateQuantity(item.exhibitionId, item.type, $event)"
      />
      <span v-else class="cart-quantity cart-quantity--readonly"
        >{{ item.quantity }} 張</span
      >
      <button
        v-if="editable"
        type="button"
        class="icon-button cart-remove"
        :aria-label="`移除 ${item.exhibition.title} ${ticketLabel(item.type)}`"
        @click="updateQuantity(item.exhibitionId, item.type, 0)"
      >
        <MaterialIcon name="close" :size="18" />
      </button>
    </li>
  </ul>
</template>

<style scoped>
.cart-items {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.cart-item {
  position: relative;
  display: grid;
  min-width: 0;
  grid-template-columns: minmax(78px, 1fr) minmax(0, 1.25fr) auto;
  grid-template-areas: "image info remove" "image quantity price";
  column-gap: 10px;
  align-items: center;
  color: var(--ink);
}
.cart-image {
  grid-area: image;
  width: 100%;
  height: 82px;
  object-fit: cover;
}
.cart-info {
  grid-area: info;
  min-width: 0;
  font-size: 0.875rem;
}
.cart-info a {
  font-weight: 700;
  text-decoration: none;
  overflow-wrap: anywhere;
}
.cart-info a:hover {
  text-decoration: underline;
}
.cart-price {
  grid-area: price;
  font-size: 1rem;
  white-space: nowrap;
}
.cart-quantity {
  grid-area: quantity;
  justify-content: start;
  margin-left: -8px;
}
.cart-quantity :deep(.icon-button) {
  min-width: 36px;
}
.cart-quantity--readonly {
  margin-left: 0;
  font-size: 0.875rem;
}
.cart-remove {
  grid-area: remove;
  align-self: start;
  justify-self: end;
  min-width: 36px;
  min-height: 36px;
}
.cart-items--drawer .cart-item {
  grid-template-columns: 32% minmax(0, 1fr) auto;
  grid-template-areas: "image info quantity" "image price quantity";
  min-height: 145px;
  padding: 24px 10px 14px;
  border-radius: 4px;
  background: white;
}
.cart-items--drawer .cart-image {
  height: 95px;
}
.cart-items--drawer .cart-price {
  align-self: start;
}
.cart-items--drawer .cart-quantity {
  margin-left: 0;
}
.cart-items--drawer .cart-remove {
  position: absolute;
  top: 0;
  left: 0;
}
@media (max-width: 767px) {
  .cart-items--drawer .cart-item {
    grid-template-columns: 36% minmax(0, 1fr) 44px;
  }
  .cart-items--drawer .cart-quantity {
    flex-direction: column;
  }
  .cart-items--drawer .cart-quantity :deep(.icon-button) {
    min-width: 44px;
    min-height: 36px;
  }
}
@media (min-width: 900px) {
  .cart-items--checkout .cart-item {
    grid-template-areas: "image info price quantity remove";
    grid-template-columns: minmax(100px, 160px) minmax(0, 1fr) auto 106px 40px;
    gap: clamp(8px, 1.4vw, 24px);
  }
  .cart-items--checkout .cart-info {
    font-size: 0.9375rem;
  }
  .cart-items--checkout .cart-price {
    font-size: 1.125rem;
  }
  .cart-items--checkout .cart-remove {
    align-self: center;
  }
  .cart-items--checkout .cart-quantity {
    justify-content: center;
    margin-left: 0;
    white-space: nowrap;
  }
  .cart-items--drawer .cart-item {
    gap: 18px;
    padding: 27px 20px 18px;
    min-height: 165px;
  }
  .cart-items--drawer .cart-image {
    height: 116px;
  }
}
</style>
