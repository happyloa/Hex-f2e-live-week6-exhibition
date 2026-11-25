export const exhibitImages = {
  "taiwan-design": { folder: "exhibitions", widths: [240, 480, 768, 960, 1440] },
  "online-design": { folder: "exhibitions", widths: [240, 480, 960] },
  "kaohsiung-design": { folder: "exhibitions", widths: [240, 480, 960] },
  geometry: { folder: "exhibitions", widths: [768, 1440] },
  architecture: { folder: "exhibitions", widths: [480, 768] },
  "city-model": { folder: "exhibitions", widths: [240, 480, 768] },
  spotlight: { folder: "exhibitions", widths: [240, 480, 768] },
  museum: { folder: "exhibitions", widths: [240, 480, 768] },
  hero: { folder: "site", widths: [480, 768, 1600] },
  newsletter: { folder: "site", widths: [480, 768, 1600] },
  host: { folder: "recap", widths: [128] },
  "live-gallery": { folder: "recap", widths: [768, 1110] },
} as const;

export type ExhibitImageName = keyof typeof exhibitImages;
