# 設計系統

EXHIBINECTION 使用 Tailwind CSS 4。全站的設計 token 和共用樣式集中在 [Tailwind 入口](../app/assets/css/main.css)。Nuxt 透過 `@tailwindcss/vite` 編譯頁面與 Vue 元件中的 utilities。

## 設計 token

| 用途 | Tailwind utilities／variant | 規格 |
| --- | --- | --- |
| 品牌色 | `text-brand`、`bg-brand`、`border-brand` | 酒紅 `#630834`，用在品牌文字、外框與反白 |
| 主要操作 | `bg-accent`、`hover:bg-accent-hover` | 桃紅 `#D90C69`，Hover 用 `#B90654` |
| 文字 | `text-ink`、`text-copy`、`text-muted` | 標題、內文、次要資訊 |
| 表面與分隔 | `bg-canvas`、`bg-surface`、`border-line` | 白底、淺灰區塊和邊框 |
| 字型 | `font-sans` | Roboto、Noto Sans TC，子集與完整字型皆在本站託管 |
| 內容寬度 | `max-w-site`、`shell` | 內容上限 1110 px，左右留白手機 15 px，平板以上 24 px |
| 控制尺寸 | `min-h-control`、`min-h-field-control` | 按鈕與圖示 44 px，表單欄位 42 px |
| 響應式 | `md:`、`wide:`、`desktop:` | 768 px、900 px、1050 px，依序用於平板配置、雙欄內容與較寬版面 |

請使用行動版優先的 utilities。共用顏色、字型與響應式斷點定義在 `@theme`，單一版面的精準尺寸可留在元件內，例如 `aspect-[540/256]` 用於展覽主圖。

## 共用元件與狀態

- `shell` 控制內容寬度與頁邊距。`section-heading` 定義區段標題，`support-page`、`support-panel`、`support-actions` 提供帳戶、收藏和回顧頁的共用配置。
- 主要操作使用 `button`，次要操作加上 `button--outline`，深色背景可用 `button--light`。`button--block` 填滿容器，圖示按鈕使用 `icon-button` 並提供可讀名稱。
- 表單使用 `field`。欄位驗證透過 `aria-invalid` 著色，`form-error` 提供錯誤文字樣式。`plain-link` 統一內文連結的顏色與底線。
- 全站使用 `focus-visible` 外框，版面狀態使用 `aria-*`、`data-*`、`peer-*` 對應 utilities。共用設定遵循作業系統的減少動態效果。
- 主頁與橫向分類使用 `scrollbar-branded`，深色購物抽屜使用 `scrollbar-branded-dark`。選取文字為酒紅底白字，高對比模式採用系統捲軸及反白色。

## 動態效果

- 在首屏以下的展覽卡片與內容區塊加上 `v-reveal`。區塊接近視窗時淡入並輕微上移，每個區塊進場一次。首屏與取得鍵盤焦點的內容立即顯示。
- 購物車抽屜使用 Vue Transition 和 Tailwind utilities 從右側滑入、滑出，並由原生對話框管理焦點與 Escape。作業系統開啟減少動態效果時，直接切換顯示狀態。
