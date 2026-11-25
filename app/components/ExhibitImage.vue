<script setup lang="ts">
import { exhibitImages, type ExhibitImageName } from "~/data/exhibitImages";

const props = withDefaults(
  defineProps<{
    name: ExhibitImageName;
    alt?: string;
    sizes?: string;
    priority?: boolean;
  }>(),
  { alt: "", sizes: "(min-width: 900px) 33vw, 100vw" },
);
const image = computed(() => exhibitImages[props.name]);
const widths = computed(() => image.value.widths);
const source = (width: number) => `/images/${image.value.folder}/${props.name}-${width}.webp`;
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
