<script setup lang="ts">
import { materialIcons } from "~/data/materialIcons";
withDefaults(
  defineProps<{ name: keyof typeof materialIcons; size?: number }>(),
  { size: 24 },
);
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="materialIcons[name]" />
  </svg>
</template>
