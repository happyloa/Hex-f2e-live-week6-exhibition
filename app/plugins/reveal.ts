export default defineNuxtPlugin(({ vueApp }) => {
  let observer: IntersectionObserver | undefined;

  vueApp.directive<HTMLElement>("reveal", {
    mounted(element) {
      if (
        !window.IntersectionObserver ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        element.getBoundingClientRect().top < window.innerHeight
      )
        return;

      observer ??= new IntersectionObserver(
        (entries, observer) => {
          for (const { isIntersecting, target } of entries) {
            if (!isIntersecting) continue;
            target.setAttribute("data-reveal", "visible");
            observer.unobserve(target);
          }
        },
        { rootMargin: "0px 0px 24px" },
      );

      element.setAttribute("data-reveal", "pending");
      observer.observe(element);
    },
    beforeUnmount(element) {
      observer?.unobserve(element);
    },
  });
});
