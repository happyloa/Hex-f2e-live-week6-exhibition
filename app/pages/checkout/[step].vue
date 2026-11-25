<script setup lang="ts">
import { demoCoupon } from "~/composables/useTicketCart";
import { findExhibition, newTaiwanDollars } from "~/data/exhibitions";

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
const orderExhibitions = computed(() =>
  [...new Set(order.value?.lines.map(({ exhibitionId }) => exhibitionId))].map(
    (id) => findExhibition(id)!,
  ),
);
const orderExhibition = computed(() => orderExhibitions.value[0]);
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
  <div v-if="step.id === 'complete'" class="shell grid min-h-[calc(100dvh-132px)] items-center py-[42px]">
    <section class="mx-auto grid w-full max-w-[540px] gap-4" aria-labelledby="complete-title">
      <template v-if="order && orderExhibition">
        <MaterialIcon class="justify-self-center text-brand" name="complete" :size="44" />
        <h1 id="complete-title" class="justify-self-center text-xl font-bold text-brand">完成訂購</h1>
        <p>您的展覽通過代碼為：</p>
        <p class="complete-code justify-self-center py-4 text-2xl text-brand [&_code]:font-sans">
          <code>{{ order.code }}</code>
        </p>
        <p>
          已完成「{{
            orderExhibition.title
          }}」的示範購票。選擇「看展去」可開啟線上展間。
        </p>
        <p class="text-muted">訂單總額 {{ newTaiwanDollars(order.total) }}</p>
        <div class="mt-9 grid grid-cols-2 gap-[18px]">
          <NuxtLink class="button button--outline" to="/exhibitions"
            >繼續瀏覽</NuxtLink
          >
          <NuxtLink class="button" :to="`/visit/${orderExhibition.id}`"
            >看展去</NuxtLink
          >
        </div>
        <ul
          v-if="orderExhibitions.length > 1"
          class="grid list-disc gap-1.5 pl-5"
          aria-label="本次訂購的其他展覽"
        >
          <li v-for="exhibit in orderExhibitions.slice(1)" :key="exhibit.id">
            <NuxtLink class="plain-link" :to="`/visit/${exhibit.id}`"
              >{{ exhibit.title }}・線上展間</NuxtLink
            >
          </li>
        </ul>
      </template>
      <template v-else>
        <h1 id="complete-title" class="justify-self-center text-xl font-bold text-brand">
          {{ ready ? "目前沒有完成的訂單" : "正在讀取訂單…" }}
        </h1>
        <NuxtLink v-if="ready" class="button button--outline" to="/exhibitions"
          >瀏覽展覽</NuxtLink
        >
      </template>
    </section>
  </div>
  <div v-else class="shell min-h-[calc(100dvh-80px)] pt-[23px]">
    <h1 class="sr-only">{{ step.label }}</h1>
    <ol class="mb-[25px] grid grid-cols-4 wide:w-[calc((100%-30px)*2/3)]" aria-label="訂購步驟">
      <li
        v-for="(entry, i) in steps"
        :key="entry.id"
        class="
          relative min-w-0 border-t-2 border-accent-track px-1 pt-2 text-center
          text-[clamp(.75rem,2.5vw,1rem)] text-muted before:absolute before:-top-[5px]
          before:left-[calc(50%-4px)] before:size-2 before:rounded-full before:border before:border-accent
          before:bg-white before:content-[''] data-[reached=true]:border-t-accent
          data-[reached=true]:before:bg-accent aria-[current=step]:font-bold aria-[current=step]:text-ink
        "
        :data-reached="i <= index"
        :aria-current="i === index ? 'step' : undefined"
      >
        {{ entry.label }}
      </li>
    </ol>
    <div
      v-if="canProceed"
      class="
        grid min-h-[calc(100dvh-132px)] grid-rows-[auto_auto_1fr_auto] gap-5 pb-[18px]
        [grid-template-areas:'form'_'totals'_'lines'_'actions']
        max-wide:data-[review=true]:grid-rows-[1fr_auto_auto]
        max-wide:data-[review=true]:[grid-template-areas:'lines'_'totals'_'actions']
        wide:min-h-[calc(100dvh-164px)] wide:grid-cols-[minmax(0,2.08fr)_minmax(0,1fr)]
        wide:grid-rows-[1fr_auto_auto] wide:gap-x-[30px] wide:gap-y-3
        wide:[grid-template-areas:'lines_form'_'lines_totals'_'actions_actions']
      "
      :data-review="step.id === 'cart'"
    >
      <div class="min-w-0 [grid-area:lines]">
        <CartItems :editable="step.id === 'cart'" />
      </div>
      <form
        v-if="step.id === 'details'"
        id="checkout-form"
        class="grid gap-3.5 self-start [grid-area:form]"
        @submit.prevent="saveDetails"
        @input="clearError"
      >
        <h2 class="text-xl font-bold">訂購人資訊</h2>
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
        <p class="-mt-2.5 text-right text-sm text-brand">
          {{ couponIsValid ? "已套用優惠，折抵 NT$50" : "示範優惠碼 TG87526" }}
        </p>
        <p v-if="error" class="form-error" role="alert">{{ error }}</p>
      </form>
      <form
        v-if="step.id === 'payment'"
        id="checkout-form"
        class="grid gap-3.5 self-start [grid-area:form]"
        autocomplete="off"
        @submit.prevent="pay"
        @input="clearError"
      >
        <h2 class="text-xl font-bold">付款資訊</h2>
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
        <div class="flex flex-wrap items-center justify-between gap-1.5 text-sm text-muted">
          <p>示範付款，請使用測試卡。</p>
          <button
            type="button"
            class="plain-link min-h-[38px] border-0 bg-transparent p-0"
            @click="fillDemoCard"
          >
            填入示範卡
          </button>
        </div>
        <p v-if="error" class="form-error" role="alert">{{ error }}</p>
      </form>
      <dl class="
        grid gap-1.5 self-end [grid-area:totals] [&>div]:flex [&>div]:justify-between [&>div]:gap-2
        [&_dd]:text-right data-[review=true]:text-lg data-[review=true]:font-bold
      " :data-review="step.id === 'cart'" aria-label="金額摘要">
        <div>
          <dt>小計</dt>
          <dd>{{ newTaiwanDollars(subtotal) }}</dd>
        </div>
        <template v-if="step.id !== 'cart'">
          <div>
            <dt>折扣</dt>
            <dd>−{{ newTaiwanDollars(displayDiscount) }}</dd>
          </div>
          <div class="text-lg font-bold">
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
      <div class="
        sticky bottom-0 z-1 grid grid-cols-2 gap-4 bg-white pt-1.5 pb-2.5 [grid-area:actions] wide:static
        wide:grid-cols-[minmax(0,2.08fr)_minmax(0,1fr)] wide:gap-[30px] wide:p-0
      ">
        <NuxtLink
          v-if="step.id === 'details'"
          class="button button--outline wide:min-w-[125px] wide:justify-self-start"
          to="/checkout/cart"
          >返回</NuxtLink
        >
        <NuxtLink
          v-if="step.id === 'payment'"
          class="button button--outline wide:min-w-[125px] wide:justify-self-start"
          to="/checkout/details"
          >返回</NuxtLink
        >
        <NuxtLink
          v-if="step.id === 'cart'"
          class="button col-start-2"
          to="/checkout/details"
          >下一步</NuxtLink
        >
        <button v-else type="submit" class="button col-start-2" form="checkout-form">
          {{ step.id === "payment" ? "完成訂購" : "下一步" }}
        </button>
      </div>
    </div>
    <div v-else class="grid justify-items-start gap-3.5 pt-6 pb-16">
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
