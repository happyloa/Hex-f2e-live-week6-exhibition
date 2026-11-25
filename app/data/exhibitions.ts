export const categories = [
  { id: "music", label: "音樂" },
  { id: "theatre", label: "戲劇" },
  { id: "design", label: "設計" },
  { id: "art", label: "藝術" },
  { id: "food", label: "美食" },
  { id: "travel", label: "旅遊" },
  { id: "film", label: "電影" },
  { id: "family", label: "親子" },
  { id: "limited", label: "期間限定" },
] as const;

export const imageWidths = {
  "taiwan-design": [480, 960, 1440],
  "online-design": [480, 960],
  "kaohsiung-design": [480, 960],
  geometry: [768, 1440],
  architecture: [480, 768],
  hero: [768, 1600],
  "city-model": [480, 768],
  spotlight: [480, 768],
  museum: [480, 768],
  newsletter: [768, 1600],
  host: [160],
  "live-gallery": [768, 1440],
} as const;

export type ExhibitImageName = keyof typeof imageWidths;
type Category = (typeof categories)[number]["id"];

interface Exhibition {
  id: string;
  title: string;
  category: Category;
  image: ExhibitImageName;
  alt: string;
  description: string;
  venue: string;
  price: number;
  start: string;
  end: string;
  limited?: boolean;
}

export const exhibitions: Exhibition[] = [
  {
    id: "taiwan-design",
    title: "2020 台味設計展",
    category: "design",
    image: "taiwan-design",
    alt: "觀眾走進交錯線條構成的大型白色裝置",
    description:
      "從島嶼日常出發，看見設計如何回應地方文化與生活。展覽透過裝置、物件與影像，串起不同世代對台灣的想像。",
    venue: "松山文創園區",
    price: 350,
    start: "01 JUN",
    end: "31 OCT",
    limited: true,
  },
  {
    id: "online-design",
    title: "No.22 線上設計展",
    category: "design",
    image: "online-design",
    alt: "綠色光線照亮黑暗展間與觀眾剪影",
    description:
      "從光線、空間與數位媒材重新思考設計。沿著這座線上展間探索創作者如何在虛擬場域建立新的觀看方式。",
    venue: "線上展間",
    price: 350,
    start: "01 JUN",
    end: "31 OCT",
  },
  {
    id: "kaohsiung-design",
    title: "高雄設計節",
    category: "design",
    image: "kaohsiung-design",
    alt: "投影覆蓋舞台牆面，觀眾站在大型光影裝置前",
    description:
      "以港都為展場，讓設計走進日常。從城市空間到當代創作，感受南方多元而鮮明的設計觀點。",
    venue: "高雄駁二藝術特區",
    price: 350,
    start: "01 JUN",
    end: "31 OCT",
  },
  {
    id: "city-in-blocks",
    title: "積木之城",
    category: "art",
    image: "city-model",
    alt: "堆疊的立方體構成大型城市模型",
    description: "在重組與堆疊之間，從模型的細節辨認一座城市的尺度與節奏。",
    venue: "線上展間",
    price: 350,
    start: "01 JUL",
    end: "31 OCT",
    limited: true,
  },
  {
    id: "in-the-spotlight",
    title: "聚光之下",
    category: "theatre",
    image: "spotlight",
    alt: "黑色舞台上一束光照著旋轉的雕塑",
    description: "一束光、一座舞台，透過靜止的造形探索表演與觀者的關係。",
    venue: "線上展間",
    price: 350,
    start: "15 JUL",
    end: "30 SEP",
    limited: true,
  },
  {
    id: "cabinet-of-discovery",
    title: "發現的展櫃",
    category: "family",
    image: "museum",
    alt: "歷史博物館裡陳列科學器具的黑白展櫃",
    description: "用一件件展品練習觀察，讓孩子和大人一起走進科學與收藏的歷史。",
    venue: "線上展間",
    price: 350,
    start: "01 AUG",
    end: "31 OCT",
  },
  {
    id: "taipei-contemporary",
    title: "台北當代藝術展",
    category: "art",
    image: "hero",
    alt: "不規則的深色幾何面板圍繞著室內空間",
    description:
      "沿著光影與幾何進入當代藝術的展場，從不同角度重新觀看熟悉的空間。",
    venue: "台北展場",
    price: 350,
    start: "01 JUN",
    end: "31 OCT",
    limited: true,
  },
];

export const ticketTypes = [
  { id: "student", label: "學生", discount: 70 },
  { id: "full", label: "全票", discount: 0 },
  { id: "concession", label: "愛心", discount: 175 },
] as const;

export type TicketType = (typeof ticketTypes)[number]["id"];

export function findExhibition(id: unknown) {
  return exhibitions.find((item) => item.id === id);
}

export function ticketPrice(exhibition: Exhibition, type: TicketType) {
  const ticket = ticketTypes.find((item) => item.id === type);
  return Math.max(0, exhibition.price - (ticket?.discount ?? 0));
}

export function ticketLabel(type: TicketType) {
  return ticketTypes.find((item) => item.id === type)?.label ?? "全票";
}

export function exhibitionPath(id: string) {
  return `/exhibitions/${id}`;
}

export function newTaiwanDollars(price: number) {
  return `NT$${new Intl.NumberFormat("en-TW").format(price)}`;
}
