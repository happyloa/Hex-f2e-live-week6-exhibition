<script setup lang="ts">
import { Minus, Plus } from "@lucide/vue";
import { maxQuantity } from "~/composables/useTicketCart";
const props = defineProps<{ quantity: number; label: string }>();
const emit = defineEmits<{ change: [quantity: number] }>();
</script>

<template>
  <div class="quantity" role="group" :aria-label="label">
    <button
      class="icon-button"
      type="button"
      aria-label="減少張數"
      :disabled="quantity <= 1"
      @click="emit('change', props.quantity - 1)"
    >
      <Minus :size="18" aria-hidden="true" />
    </button>
    <output aria-label="張數">{{ String(quantity).padStart(2, "0") }}</output>
    <button
      class="icon-button"
      type="button"
      aria-label="增加張數"
      :disabled="quantity >= maxQuantity"
      @click="emit('change', props.quantity + 1)"
    >
      <Plus :size="18" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
.quantity {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
output {
  min-width: 2ch;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  text-align: center;
}
</style>
