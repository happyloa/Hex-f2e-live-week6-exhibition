<script setup lang="ts">
import { maxQuantity } from "~/composables/useTicketCart";
const props = defineProps<{
  quantity: number;
  label: string;
  disabled?: boolean;
}>();
const emit = defineEmits<{ change: [quantity: number] }>();
</script>

<template>
  <div class="quantity" role="group" :aria-label="label">
    <button
      class="icon-button"
      type="button"
      aria-label="減少張數"
      :disabled="disabled || quantity <= 1"
      @click="emit('change', props.quantity - 1)"
    >
      <MaterialIcon name="minus" :size="18" />
    </button>
    <output aria-label="張數">{{ String(quantity).padStart(2, "0") }}</output>
    <button
      class="icon-button"
      type="button"
      aria-label="增加張數"
      :disabled="disabled || quantity >= maxQuantity"
      @click="emit('change', props.quantity + 1)"
    >
      <MaterialIcon name="plus" :size="18" />
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
