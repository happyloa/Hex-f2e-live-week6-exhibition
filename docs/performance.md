# 效能檢測

依 Cloudflare 的 web-perf 流程，以 Chrome Lighthouse 13.6 檢查冷啟動、資源瀑布、版面位移與無障礙。手機檢查首頁、分類、展覽詳情、回顧、登入、購物車和線上展間，桌機檢查首頁、分類和展覽詳情。實驗室使用 LCP、CLS 和 TBT，真實訪客的 INP 需另外從使用者資料取得。 [Cloudflare web-perf](https://github.com/cloudflare/skills/blob/main/skills/web-perf/SKILL.md) · [Web Vitals](https://web.dev/articles/vitals)

## 實作調整

- 原版手機分類頁載入約 1.03 MB 的字型。站內繁中優先使用約 145 KB 的 Noto Sans TC 子集，完整字型樣式在頁面初始化後依序載入。
- 展覽列表與詳情的台味設計展主圖原本在測試手機選取 141 KB 的 960 px 檔。新增約 77 KB 的 768 px 變體，並依手機、平板和桌機實際版寬調整 `sizes`。
- 展覽詳情的內文橫幅在桌機會進入第一屏，桌機優先預載，手機保留延後載入。
- 推薦輪播靠近可視區域才啟用滑動與鍵盤操作，首屏仍保有伺服器輸出的展覽連結。
- 各頁使用本地目錄資料，靜態 HTML 直接包含初始化資訊，跨頁時省下獨立的 Nuxt 資料請求。

## 重測方式

先執行 `npm run verify`。使用 `npm run preview` 啟動 Wrangler，於 Chrome 的 Lighthouse 分別以 Mobile 和 Desktop 執行 Navigation。以網路請求對照資源位元組，並檢查 LCP 圖片與 CLS 來源。帳戶、結帳與展間設定為 `noindex`，對應 Lighthouse 的可索引性項目。
