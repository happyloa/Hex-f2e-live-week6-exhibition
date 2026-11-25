<script setup lang="ts">
import { exhibitImages, type ExhibitImageName } from "~/data/exhibitImages";

const props = withDefaults(
  defineProps<{
    name: ExhibitImageName;
    alt?: string;
    sizes?: string;
    priority?: boolean;
    preloadMedia?: string;
  }>(),
  { alt: "", sizes: "(min-width: 900px) 33vw, 100vw" },
);
const image = computed(() => exhibitImages[props.name]);
const widths = computed(() => image.value.widths);
const source = (width: number) =>
  `/images/${image.value.folder}/${props.name}-${width}.webp`;
const sourceSet = computed(() =>
  widths.value.length > 1
    ? widths.value.map((width) => `${source(width)} ${width}w`).join(", ")
    : undefined,
);

if (props.preloadMedia) {
  useHead(() => ({
    link: [{
      rel: "preload",
      as: "image",
      type: "image/webp",
      media: props.preloadMedia,
      fetchpriority: "high",
      ...(sourceSet.value
        ? { imagesrcset: sourceSet.value, imagesizes: props.sizes }
        : { href: source(widths.value[0]) }),
    }],
  }));
}
</script>

<template>
  <img
    :src="source(widths[0])"
    :srcset="sourceSet"
    :sizes="sourceSet ? sizes : undefined"
    :alt="alt"
    :loading="priority ? 'eager' : 'lazy'"
    :fetchpriority="priority ? 'high' : undefined"
    decoding="async"
  />
</template>
