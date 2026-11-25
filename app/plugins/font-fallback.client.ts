export default defineNuxtPlugin(() => {
  onNuxtReady(() => {
    // The site subset handles the initial copy. Load rare glyphs after startup.
    void import("@fontsource-variable/noto-sans-tc").catch(() => undefined);
  });
});
