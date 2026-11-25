<script setup lang="ts">
import { CircleCheck } from "@lucide/vue";
import { demoCoupon } from "~/composables/useTicketCart";
import {
  exhibitionPath,
  findExhibition,
  newTaiwanDollars,
} from "~/data/exhibitions";

definePageMeta({ key: (route) => route.path });
const steps = [
  { id: "cart", label: "確認訂單" },
  { id: "details", label: "填寫訂購資訊" },
  { id: "payment", label: "填寫付款資訊" },
  { id: "complete", label: "完成訂購" },
] as const;
const route = useRoute();
const index = steps.findIndex(({ id }) => id === route.params.step);
const step = steps[index];
if (!step)
  throw createError({ statusCode: 404, statusMessage: "找不到結帳頁面" });

const {
  ready,
  count,
  subtotal,
  discount,
  total,
  checkout,
  order,
  confirmDetails,
  placeOrder,
} = useTicketCart();
const contact = useState("checkout-contact", () => ({
  email: "",
  name: "",
  phone: "",
  coupon: "",
}));
const card = reactive({ number: "", expires: "", code: "" });
const error = ref("");
const invalid = ref<
  "name" | "phone" | "coupon" | "number" | "expires" | "code"
>();
const normalizedCoupon = computed(() =>
  contact.value.coupon.trim().toUpperCase(),
);
const couponIsValid = computed(() => normalizedCoupon.value === demoCoupon);
const displayDiscount = computed(() =>
  step.id === "details"
    ? couponIsValid.value
      ? Math.min(50, subtotal.value)
      : 0
    : discount.value,
);
const canProceed = computed(
  () =>
    ready.value &&
    count.value > 0 &&
    (step.id !== "payment" || checkout.value.detailsConfirmed),
);
const orderExhibition = computed(() =>
  findExhibition(order.value?.lines[0]?.exhibitionId),
);
useSeoMeta({ title: step.label, robots: "noindex, nofollow" });

watch(
  ready,
  () => {
    if (!contact.value.coupon && checkout.value.coupon)
      contact.value.coupon = checkout.value.coupon;
  },
  { immediate: true },
);

function setError(field: typeof invalid.value, text: string) {
  invalid.value = field;
  error.value = text;
}

function clearError() {
  invalid.value = undefined;
  error.value = "";
}

async function saveDetails() {
  if (!canProceed.value) return;
  if (!contact.value.name.trim()) return setError("name", "請輸入姓名。");
  const phone = contact.value.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (!/^[\d+()\s-]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
    return setError("phone", "請輸入有效的聯絡電話。");
  }
  if (normalizedCoupon.value && !couponIsValid.value) {
    return setError("coupon", "優惠碼無效。請使用示範優惠碼或清空此欄。");
  }
  confirmDetails(normalizedCoupon.value);
  await navigateTo("/checkout/payment");
}

function fillDemoCard() {
  Object.assign(card, {
    number: "4242 4242 4242 4242",
    expires: "12/39",
    code: "123",
  });
  clearError();
}

async function pay() {
  if (!canProceed.value) return;
  if (card.number.replace(/[\s-]/g, "") !== "4242424242424242") {
    return setError("number", "請使用示範卡號 4242 4242 4242 4242。");
  }
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expires.trim())) {
    return setError("expires", "請以 MM/YY 格式填寫有效日期。");
  }
  if (card.code.trim() !== "123")
    return setError("code", "請使用示範安全碼 123。");
  if (placeOrder()) {
    contact.value = { email: "", name: "", phone: "", coupon: "" };
    Object.assign(card, { number: "", expires: "", code: "" });
    await navigateTo("/checkout/complete");
  }
}
</script>

<template>
  <div v-if="step.id === 'complete'" class="shell complete-page">
    <section class="complete" aria-labelledby="complete-title">
      <template v-if="order && orderExhibition">
        <CircleCheck class="complete-icon" :size="44" aria-hidden="true" />
        <h1 id="complete-title">完成訂購</h1>
        <p class="complete-label">您的展覽通過代碼為：</p>
        <p class="complete-code">
          <code>{{ order.code }}</code>
        </p>
        <p>
          已完成「{{
            orderExhibition.title
          }}」的示範購票。選擇「看展去」可回到展覽頁查看通過代碼。
        </p>
        <p class="muted">訂單總額 {{ newTaiwanDollars(order.total) }}</p>
        <div class="final-actions">
          <NuxtLink class="button button--outline" to="/exhibitions"
            >繼續瀏覽</NuxtLink
          >
          <NuxtLink
            class="button"
            :to="{
              path: exhibitionPath(orderExhibition.id),
              query: { ticket: order.code },
            }"
            >看展去</NuxtLink
          >
        </div>
      </template>
      <template v-else>
        <h1 id="complete-title">
          {{ ready ? "目前沒有完成的訂單" : "正在讀取訂單…" }}
        </h1>
        <NuxtLink v-if="ready" class="button button--outline" to="/exhibitions"
          >瀏覽展覽</NuxtLink
        >
      </template>
    </section>
  </div>
  <div v-else class="shell checkout-page">
    <h1 class="sr-only">{{ step.label }}</h1>
    <ol class="progress" aria-label="訂購步驟">
      <li
        v-for="(entry, i) in steps"
        :key="entry.id"
        :class="{ 'is-reached': i <= index }"
        :aria-current="i === index ? 'step' : undefined"
      >
        {{ entry.label }}
      </li>
    </ol>
    <div
      v-if="canProceed"
      class="checkout-grid"
      :class="{ 'checkout-grid--review': step.id === 'cart' }"
    >
      <div class="order-lines">
        <CartItems :editable="step.id === 'cart'" />
      </div>
      <form
        v-if="step.id === 'details'"
        id="checkout-form"
        class="checkout-form"
        @submit.prevent="saveDetails"
        @input="clearError"
      >
        <h2>訂購人資訊</h2>
        <label class="field"
          >Email
          <input
            v-model="contact.email"
            type="email"
            required
            maxlength="100"
            autocomplete="email"
            placeholder="example@gmail.com"
          />
        </label>
        <label class="field"
          >姓名
          <input
            v-model="contact.name"
            required
            maxlength="64"
            autocomplete="name"
            placeholder="請輸入姓名"
            :aria-invalid="invalid === 'name' || undefined"
          />
        </label>
        <label class="field"
          >聯絡電話
          <input
            v-model="contact.phone"
            type="tel"
            required
            maxlength="24"
            autocomplete="tel"
            placeholder="請輸入電話"
            :aria-invalid="invalid === 'phone' || undefined"
          />
        </label>
        <label class="field"
          >優惠碼
          <input
            v-model="contact.coupon"
            maxlength="12"
            placeholder="TG87526"
            autocomplete="off"
            :aria-invalid="invalid === 'coupon' || undefined"
          />
        </label>
        <p class="coupon-hint">
          {{ couponIsValid ? "已套用優惠，折抵 NT$50" : "示範優惠碼 TG87526" }}
        </p>
        <p v-if="error" class="form-error" role="alert">{{ error }}</p>
      </form>
      <form
        v-if="step.id === 'payment'"
        id="checkout-form"
        class="checkout-form"
        autocomplete="off"
        @submit.prevent="pay"
        @input="clearError"
      >
        <h2>付款資訊</h2>
        <label class="field"
          >信用卡帳號
          <input
            v-model="card.number"
            inputmode="numeric"
            maxlength="23"
            required
            placeholder="XXXX XXXX XXXX XXXX"
            :aria-invalid="invalid === 'number' || undefined"
          />
        </label>
        <label class="field"
          >有效日期
          <input
            v-model="card.expires"
            maxlength="5"
            required
            placeholder="MM/YY"
            :aria-invalid="invalid === 'expires' || undefined"
          />
        </label>
        <label class="field"
          >安全碼
          <input
            v-model="card.code"
            inputmode="numeric"
            maxlength="3"
            type="password"
            required
            placeholder="•••"
            :aria-invalid="invalid === 'code' || undefined"
          />
        </label>
        <div class="payment-demo">
          <p>示範付款，請使用測試卡。</p>
          <button
            type="button"
            class="plain-link text-button"
            @click="fillDemoCard"
          >
            填入示範卡
          </button>
        </div>
        <p v-if="error" class="form-error" role="alert">{{ error }}</p>
      </form>
      <dl class="checkout-totals" aria-label="金額摘要">
        <div>
          <dt>小計</dt>
          <dd>{{ newTaiwanDollars(subtotal) }}</dd>
        </div>
        <template v-if="step.id !== 'cart'">
          <div>
            <dt>折扣</dt>
            <dd>−{{ newTaiwanDollars(displayDiscount) }}</dd>
          </div>
          <div class="grand-total">
            <dt>總金額</dt>
            <dd>
              {{
                newTaiwanDollars(
                  step.id === "payment" ? total : subtotal - displayDiscount,
                )
              }}
            </dd>
          </div>
        </template>
      </dl>
      <div class="checkout-actions">
        <NuxtLink
          v-if="step.id === 'details'"
          class="button button--outline back"
          to="/checkout/cart"
          >返回</NuxtLink
        >
        <NuxtLink
          v-if="step.id === 'payment'"
          class="button button--outline back"
          to="/checkout/details"
          >返回</NuxtLink
        >
        <NuxtLink
          v-if="step.id === 'cart'"
          class="button next"
          to="/checkout/details"
          >下一步</NuxtLink
        >
        <button v-else type="submit" class="button next" form="checkout-form">
          {{ step.id === "payment" ? "完成訂購" : "下一步" }}
        </button>
      </div>
    </div>
    <div v-else class="checkout-empty">
      <p v-if="!ready">正在讀取購物車…</p>
      <template v-else-if="!count">
        <p>購物車目前沒有票券。</p>
        <NuxtLink class="button button--outline" to="/exhibitions"
          >瀏覽展覽</NuxtLink
        >
      </template>
      <template v-else>
        <p>請先填寫訂購資訊。</p>
        <NuxtLink class="button button--outline" to="/checkout/details"
          >填寫訂購資訊</NuxtLink
        >
      </template>
    </div>
  </div>
</template>

<style scoped>
.checkout-page {
  min-height: calc(100dvh - 80px);
  padding-top: 23px;
}
.progress {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin: 0 0 25px;
  padding: 0;
  list-style: none;
}
.progress li {
  position: relative;
  min-width: 0;
  border-top: 2px solid #f4a9c9;
  padding: 8px 4px 0;
  color: var(--muted);
  font-size: clamp(0.75rem, 2.5vw, 1rem);
  text-align: center;
}
.progress li::before {
  position: absolute;
  top: -5px;
  left: calc(50% - 4px);
  width: 8px;
  height: 8px;
  border: 1px solid var(--pink);
  border-radius: 50%;
  background: white;
  content: "";
}
.progress .is-reached {
  border-top-color: var(--pink);
}
.progress .is-reached::before {
  background: var(--pink);
}
.progress li[aria-current="step"] {
  color: var(--ink);
  font-weight: 700;
}
.checkout-grid {
  display: grid;
  grid-template-areas: "form" "totals" "lines" "actions";
  grid-template-rows: auto auto 1fr auto;
  gap: 20px;
  min-height: calc(100dvh - 132px);
  padding-bottom: 18px;
}
.checkout-grid--review {
  grid-template-areas: "lines" "totals" "actions";
  grid-template-rows: 1fr auto auto;
}
.order-lines {
  grid-area: lines;
  min-width: 0;
}
.checkout-form {
  grid-area: form;
  align-self: start;
  display: grid;
  gap: 14px;
}
.checkout-form h2 {
  font-size: 1.25rem;
}
.coupon-hint {
  margin-top: -10px;
  color: var(--wine);
  font-size: 0.875rem;
  text-align: right;
}
.payment-demo {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  color: var(--muted);
  font-size: 0.875rem;
}
.text-button {
  min-height: 38px;
  border: 0;
  padding: 0;
  background: transparent;
  text-decoration: underline;
}
.checkout-totals {
  grid-area: totals;
  display: grid;
  align-self: end;
  gap: 6px;
  margin: 0;
}
.checkout-totals div {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
.checkout-totals dd {
  margin: 0;
  text-align: right;
}
.checkout-grid--review .checkout-totals,
.grand-total {
  font-weight: 700;
  font-size: 1.125rem;
}
.checkout-actions {
  grid-area: actions;
  position: sticky;
  bottom: 0;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding-block: 6px 10px;
  background: white;
}
.next {
  grid-column: 2;
}
.checkout-empty {
  display: grid;
  gap: 14px;
  justify-items: start;
  padding-block: 24px 64px;
}
.complete-page {
  display: grid;
  min-height: calc(100dvh - 132px);
  align-items: center;
  padding-block: 42px;
}
.complete {
  display: grid;
  width: min(540px, 100%);
  margin-inline: auto;
  gap: 16px;
}
.complete h1 {
  justify-self: center;
  color: var(--wine);
  font-size: 1.25rem;
}
.complete-icon,
.complete-code {
  justify-self: center;
  color: var(--wine);
}
.complete-code {
  padding-block: 16px;
  font-size: 1.5rem;
}
.complete-code code {
  font-family: inherit;
}
.final-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-top: 36px;
}
@media (min-width: 900px) {
  .progress {
    width: calc((100% - 30px) * 2 / 3);
  }
  .checkout-grid {
    grid-template-columns: minmax(0, 2.08fr) minmax(0, 1fr);
    grid-template-areas: "lines form" "lines totals" "actions actions";
    grid-template-rows: 1fr auto auto;
    gap: 12px 30px;
    min-height: calc(100dvh - 164px);
  }
  .checkout-actions {
    position: static;
    grid-template-columns: minmax(0, 2.08fr) minmax(0, 1fr);
    gap: 30px;
    padding: 0;
  }
  .checkout-actions .back {
    justify-self: start;
    min-width: 125px;
  }
}
</style>
