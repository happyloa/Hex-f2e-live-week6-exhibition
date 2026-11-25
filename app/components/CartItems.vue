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
    class="group/cart m-0 grid list-none gap-3 p-0"
    :data-variant="variant ?? 'checkout'"
    aria-label="購物車票券"
  >
    <li v-for="item in items" :key="item.key" class="
      relative grid min-w-0 grid-cols-[minmax(78px,1fr)_minmax(0,1.25fr)_auto] items-center gap-x-2.5
      text-ink [grid-template-areas:'image_info_remove'_'image_quantity_price']
      group-data-[variant=drawer]/cart:min-h-[145px]
      group-data-[variant=drawer]/cart:grid-cols-[36%_minmax(0,1fr)_44px]
      group-data-[variant=drawer]/cart:rounded-sm group-data-[variant=drawer]/cart:bg-white
      group-data-[variant=drawer]/cart:px-2.5 group-data-[variant=drawer]/cart:pt-6
      group-data-[variant=drawer]/cart:pb-3.5
      group-data-[variant=drawer]/cart:[grid-template-areas:'image_info_quantity'_'image_price_quantity']
      md:group-data-[variant=drawer]/cart:grid-cols-[32%_minmax(0,1fr)_auto]
      wide:group-data-[variant=drawer]/cart:min-h-[165px]
      wide:group-data-[variant=drawer]/cart:gap-[18px] wide:group-data-[variant=drawer]/cart:px-5
      wide:group-data-[variant=drawer]/cart:pt-[27px] wide:group-data-[variant=drawer]/cart:pb-[18px]
      wide:group-data-[variant=checkout]/cart:grid-cols-[minmax(100px,160px)_minmax(0,1fr)_auto_106px_40px]
      wide:group-data-[variant=checkout]/cart:gap-[clamp(8px,1.4vw,24px)]
      wide:group-data-[variant=checkout]/cart:[grid-template-areas:'image_info_price_quantity_remove']
    ">
      <ExhibitImage
        class="
          h-[82px] w-full object-cover [grid-area:image] group-data-[variant=drawer]/cart:h-[95px]
          wide:group-data-[variant=drawer]/cart:h-[116px]
        "
        :name="item.exhibition.image"
        sizes="160px"
      />
      <div class="min-w-0 text-sm [grid-area:info] wide:group-data-[variant=checkout]/cart:text-[.9375rem]">
        <NuxtLink class="font-bold wrap-anywhere no-underline hover:underline" :to="exhibitionPath(item.exhibition.id)">{{
          item.exhibition.title
        }}</NuxtLink>
        <p>{{ item.exhibition.start }} — {{ item.exhibition.end }}</p>
        <p class="text-muted">{{ ticketLabel(item.type) }}</p>
      </div>
      <strong class="
        text-base whitespace-nowrap [grid-area:price] group-data-[variant=drawer]/cart:self-start
        wide:group-data-[variant=checkout]/cart:text-lg
      ">{{
        newTaiwanDollars(ticketPrice(item.exhibition, item.type))
      }}</strong>
      <QuantityControl
        v-if="editable"
        class="
          -ml-2 justify-start [grid-area:quantity] group-data-[variant=drawer]/cart:ml-0
          max-md:group-data-[variant=drawer]/cart:flex-col wide:group-data-[variant=checkout]/cart:ml-0
          wide:group-data-[variant=checkout]/cart:justify-center
          wide:group-data-[variant=checkout]/cart:whitespace-nowrap [&_.icon-button]:min-w-9
          max-md:group-data-[variant=drawer]/cart:[&_.icon-button]:min-h-9
          max-md:group-data-[variant=drawer]/cart:[&_.icon-button]:min-w-control
        "
        :quantity="item.quantity"
        :label="`${item.exhibition.title} ${ticketLabel(item.type)}張數`"
        @change="updateQuantity(item.exhibitionId, item.type, $event)"
      />
      <span v-else class="
        -ml-2 justify-start [grid-area:quantity] group-data-[variant=drawer]/cart:ml-0
        max-md:group-data-[variant=drawer]/cart:flex-col wide:group-data-[variant=checkout]/cart:ml-0
        wide:group-data-[variant=checkout]/cart:justify-center
        wide:group-data-[variant=checkout]/cart:whitespace-nowrap [&_.icon-button]:min-w-9
        max-md:group-data-[variant=drawer]/cart:[&_.icon-button]:min-h-9
        max-md:group-data-[variant=drawer]/cart:[&_.icon-button]:min-w-control ml-0! text-sm
      "
        >{{ item.quantity }} 張</span
      >
      <button
        v-if="editable"
        type="button"
        class="
          icon-button min-h-9 min-w-9 self-start justify-self-end [grid-area:remove]
          group-data-[variant=drawer]/cart:absolute group-data-[variant=drawer]/cart:top-0
          group-data-[variant=drawer]/cart:left-0 wide:group-data-[variant=checkout]/cart:self-center
        "
        :aria-label="`移除 ${item.exhibition.title} ${ticketLabel(item.type)}`"
        @click="updateQuantity(item.exhibitionId, item.type, 0)"
      >
        <MaterialIcon name="close" :size="18" />
      </button>
    </li>
  </ul>
</template>
