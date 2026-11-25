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
  <div class="inline-flex items-center justify-center" role="group" :aria-label="label">
    <button
      class="icon-button"
      type="button"
      aria-label="減少張數"
      :disabled="disabled || quantity <= 1"
      @click="emit('change', props.quantity - 1)"
    >
      <MaterialIcon name="minus" :size="18" />
    </button>
    <output class="min-w-[2ch] text-center font-bold tabular-nums" aria-label="張數">{{ String(quantity).padStart(2, "0") }}</output>
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
