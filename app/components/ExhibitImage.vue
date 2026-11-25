<script setup lang="ts">
import { imageWidths, type ExhibitImageName } from "~/data/exhibitions";

const props = withDefaults(
  defineProps<{
    name: ExhibitImageName;
    alt?: string;
    sizes?: string;
    priority?: boolean;
  }>(),
  { alt: "", sizes: "(min-width: 900px) 33vw, 100vw" },
);
const widths = computed(() => imageWidths[props.name]);
const source = (width: number) => `/images/${props.name}-${width}.webp`;
</script>

<template>
  <img
    :src="source(widths[0])"
    :srcset="
      widths.length > 1
        ? widths.map((width) => `${source(width)} ${width}w`).join(', ')
        : undefined
    "
    :sizes="widths.length > 1 ? sizes : undefined"
    :alt="alt"
    :loading="priority ? 'eager' : 'lazy'"
    :fetchpriority="priority ? 'high' : undefined"
    decoding="async"
  />
</template>
