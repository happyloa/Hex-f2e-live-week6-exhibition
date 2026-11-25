import {
  findExhibition,
  ticketPrice,
  ticketTypes,
  type TicketType,
} from "~/data/exhibitions";

interface CartLine {
  exhibitionId: string;
  type: TicketType;
  quantity: number;
}

interface DemoOrder {
  code: string;
  lines: CartLine[];
  total: number;
}

export const cartStorageKey = "exhibinection.cart.v1";
const orderStorageKey = "exhibinection.order.v1";
const checkoutStorageKey = "exhibinection.checkout.v1";
export const demoCoupon = "TG87526";
export const maxQuantity = 10;

export function cartLineKey(line: CartLine) {
  return `${line.exhibitionId}:${line.type}`;
}

function validLines(value: unknown) {
  if (!Array.isArray(value)) return [];
  const lines = new Map<string, CartLine>();
  for (const item of value) {
    if (
      item &&
      typeof item.exhibitionId === "string" &&
      findExhibition(item.exhibitionId) &&
      ticketTypes.some(({ id }) => id === item.type) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0 &&
      item.quantity <= maxQuantity
    ) {
      const line = {
        exhibitionId: item.exhibitionId,
        type: item.type as TicketType,
        quantity: item.quantity,
      };
      lines.set(cartLineKey(line), line);
    }
  }
  return [...lines.values()];
}

function readStorage(
  storage: "localStorage" | "sessionStorage",
  key: string,
): unknown {
  try {
    return JSON.parse(window[storage].getItem(key) ?? "null");
  } catch {
    return null;
  }
}

function writeStorage(
  storage: "localStorage" | "sessionStorage",
  key: string,
  value: unknown,
) {
  try {
    window[storage].setItem(key, JSON.stringify(value));
  } catch {
    // Keep the in-memory demo usable when browser storage is unavailable.
  }
}

export function useTicketCart() {
  const lines = useState<CartLine[]>("ticket-cart", () => []);
  const ready = useState("ticket-cart-ready", () => false);
  const isCartOpen = useState("ticket-cart-open", () => false);
  const order = useState<DemoOrder | null>("ticket-order", () => null);
  const checkout = useState("ticket-checkout", () => ({
    detailsConfirmed: false,
    coupon: "",
  }));
  const count = computed(() =>
    lines.value.reduce((sum, line) => sum + line.quantity, 0),
  );
  const subtotal = computed(() =>
    lines.value.reduce((sum, line) => {
      const exhibition = findExhibition(line.exhibitionId);
      return exhibition
        ? sum + ticketPrice(exhibition, line.type) * line.quantity
        : sum;
    }, 0),
  );
  const discount = computed(() =>
    checkout.value.coupon === demoCoupon ? Math.min(subtotal.value, 50) : 0,
  );
  const total = computed(() => subtotal.value - discount.value);

  function restoreCart() {
    lines.value = validLines(readStorage("localStorage", cartStorageKey));
  }

  function restore() {
    restoreCart();
    const savedOrder = readStorage(
      "localStorage",
      orderStorageKey,
    ) as Partial<DemoOrder> | null;
    const savedLines = validLines(savedOrder?.lines);
    if (
      typeof savedOrder?.code === "string" &&
      /^ex\d{8}$/.test(savedOrder.code) &&
      typeof savedOrder.total === "number" &&
      Number.isFinite(savedOrder.total) &&
      savedOrder.total >= 0 &&
      savedLines.length
    ) {
      order.value = {
        code: savedOrder.code,
        lines: savedLines,
        total: savedOrder.total,
      };
    }
    const savedCheckout = readStorage(
      "sessionStorage",
      checkoutStorageKey,
    ) as Partial<typeof checkout.value> | null;
    checkout.value = {
      detailsConfirmed: savedCheckout?.detailsConfirmed === true,
      coupon: savedCheckout?.coupon === demoCoupon ? demoCoupon : "",
    };
    ready.value = true;
  }

  function saveLines(next: CartLine[]) {
    lines.value = next;
    writeStorage("localStorage", cartStorageKey, next);
  }

  function updateQuantity(
    exhibitionId: string,
    type: TicketType,
    quantity: number,
  ) {
    if (
      !findExhibition(exhibitionId) ||
      !ticketTypes.some((item) => item.id === type) ||
      !Number.isInteger(quantity)
    )
      return;
    const next = lines.value.filter(
      (line) => line.exhibitionId !== exhibitionId || line.type !== type,
    );
    if (quantity > 0) {
      const existingIndex = lines.value.findIndex(
        (line) => line.exhibitionId === exhibitionId && line.type === type,
      );
      const line = {
        exhibitionId,
        type,
        quantity: Math.min(quantity, maxQuantity),
      };
      next.splice(existingIndex < 0 ? next.length : existingIndex, 0, line);
    }
    saveLines(next);
  }

  function add(exhibitionId: string, type: TicketType, quantity: number) {
    const current = lines.value.find(
      (line) => line.exhibitionId === exhibitionId && line.type === type,
    );
    if (quantity > 0)
      updateQuantity(exhibitionId, type, (current?.quantity ?? 0) + quantity);
  }

  function confirmDetails(coupon: string) {
    checkout.value = {
      detailsConfirmed: true,
      coupon: coupon === demoCoupon ? coupon : "",
    };
    writeStorage("sessionStorage", checkoutStorageKey, checkout.value);
  }

  function placeOrder() {
    if (!lines.value.length || !checkout.value.detailsConfirmed) return false;
    const digits = (
      crypto.getRandomValues(new Uint32Array(1))[0]! % 100_000_000
    )
      .toString()
      .padStart(8, "0");
    const completed = {
      code: `ex${digits}`,
      lines: lines.value,
      total: total.value,
    };
    order.value = completed;
    writeStorage("localStorage", orderStorageKey, completed);
    saveLines([]);
    checkout.value = { detailsConfirmed: false, coupon: "" };
    writeStorage("sessionStorage", checkoutStorageKey, checkout.value);
    return true;
  }

  return {
    lines,
    ready,
    isCartOpen,
    order,
    checkout,
    count,
    subtotal,
    discount,
    total,
    restore,
    restoreCart,
    updateQuantity,
    add,
    confirmDetails,
    placeOrder,
  };
}
