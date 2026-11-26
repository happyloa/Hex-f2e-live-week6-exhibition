import type { ExhibitImageName } from "./exhibitImages";

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
      "一年一度的台味設計展由經濟部工業局主辦、台灣創意設計中心執行，每年，針對在地生活、文化及產業發展特色，運用設計思考詮釋新時代的意涵，並以展覽呈現在地設計。",
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
      "這是一個專屬於設計系畢業生的展覽，沒有華麗的名號、沒有浮誇的獎賞。讓我們用作品與理念，去碰撞真實世界裡的各種問題，創造更多美好的人事物。讓這個地球、這個世界變成一個人心目中的理想鄉。",
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
      "設計大高雄究竟是怎麼一回事？在這「設計」詞彙有點氾濫的年代，或許我們也搞不清楚究竟誰被誰設計了，設計生活？還是被生活設計？而當高雄這座城市建設硬體已相當程度完備時，文化軟實力又該如何輸出？",
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
  {
    id: "sound-on-stage",
    title: "聲音在舞台上",
    category: "music",
    image: "spotlight",
    alt: "聚光燈下的黑色舞台與雕塑",
    description: "沿著燈光、舞台與聆聽位置，想像聲音如何形塑一場表演的空間。",
    venue: "線上展間",
    price: 350,
    start: "01 JUL",
    end: "31 AUG",
  },
  {
    id: "market-tables",
    title: "市場餐桌設計展",
    category: "food",
    image: "city-model",
    alt: "由不同尺寸的方塊堆疊而成的空間模型",
    description:
      "從街口攤位到家中餐桌，透過模型觀察市場如何安排採買、停留與用餐的路線。",
    venue: "線上展間",
    price: 350,
    start: "01 AUG",
    end: "31 OCT",
  },
  {
    id: "walk-the-city",
    title: "走讀城市的骨架",
    category: "travel",
    image: "architecture",
    alt: "展場中交錯排列的樓梯與鋼構",
    description:
      "用建築細節規劃一段城市漫遊，從樓梯、通道與天窗認識不同的空間層次。",
    venue: "線上展間",
    price: 350,
    start: "01 SEP",
    end: "31 OCT",
  },
  {
    id: "frames-in-motion",
    title: "移動中的畫格",
    category: "film",
    image: "live-gallery",
    alt: "展間裡經過畫框的觀眾身影",
    description:
      "把走動的身影和展牆視為連續畫格，從取景與節奏理解影像如何呈現時間。",
    venue: "線上展間",
    price: 350,
    start: "01 SEP",
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
