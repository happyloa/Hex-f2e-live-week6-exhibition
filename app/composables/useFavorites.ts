import { exhibitions, findExhibition } from "~/data/exhibitions";

export const favoriteStoragePrefix = "exhibinection.favorite.";

export function useFavorites() {
  const ids = useState<string[]>("favorites", () => []);
  const ready = useState("favorites-ready", () => false);

  function restore() {
    try {
      ids.value = exhibitions
        .filter(
          ({ id }) => localStorage.getItem(favoriteStoragePrefix + id) === "1",
        )
        .map(({ id }) => id);
    } catch {
      // Keep the current selection when storage is unavailable.
    }
    ready.value = true;
  }

  function toggle(id: string) {
    if (!findExhibition(id)) return;
    const saved = ids.value.includes(id);
    ids.value = saved
      ? ids.value.filter((value) => value !== id)
      : [...ids.value, id];
    try {
      if (saved) localStorage.removeItem(favoriteStoragePrefix + id);
      else localStorage.setItem(favoriteStoragePrefix + id, "1");
    } catch {
      // The updated list remains usable for this session.
    }
  }

  return { ids, ready, restore, toggle };
}
