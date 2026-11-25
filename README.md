# EXHIBINECTION 策展與售票

六角學院網頁切版直播班第六週作品。依 Adobe XD 畫板製作響應式展覽網站，從瀏覽展覽、選擇票種與張數，到完成示範購票。

[線上展示](https://hex-f2e-live-week6-exhibition.piafyoyo06.workers.dev/) · [Adobe XD 設計稿](https://xd.adobe.com/view/057f9d4e-6781-43fe-9aea-9f73f67dd2fd-502c/grid/) · [課程素材](https://github.com/hexschool/webLayoutTraining1st/tree/master/exhibition-week6) · [素材對照](docs/assets.md)

## 頁面與流程

畫板留言、原型連線和延伸頁面記錄於[設計實作對照](docs/design-notes.md)。

| 路徑                                               | 功能                                                 |
| -------------------------------------------------- | ---------------------------------------------------- |
| `/`                                                | 主視覺、熱門特展、直播文字回顧、桌機推薦輪播與電子報 |
| `/exhibitions`                                     | 依分類瀏覽展覽，分類可用網址分享                     |
| `/exhibitions/[id]`                                | 展覽資訊、收藏、複製連結、票種與張數                 |
| 購物車抽屜                                         | 調整張數、移除票券及查看小計                         |
| `/checkout/cart`                                   | 第一步確認訂單                                       |
| `/checkout/details`                                | 第二步填寫訂購人資訊與選用優惠碼                     |
| `/checkout/payment`                                | 第三步驗證示範卡                                     |
| `/checkout/complete`                               | 第四步顯示訂單、總額與展覽通過代碼                   |
| `/visit/[id]`                                      | 從完成頁進入線上展間，查看同一瀏覽器中的示範通過代碼 |
| `/account`、`/account/sign-in`、`/account/sign-up` | 示範帳戶與訂單入口                                   |
| `/favorites`、`/recap`                             | 收藏清單與直播文字回顧                               |

結帳可使用示範優惠碼 `TG87526` 折抵 NT$50。付款頁可按「填入示範卡」。購物車、收藏及顯示用的最新訂單保存在瀏覽器。展覽內容、登入、訂閱、付款及通過代碼皆為示範，結帳資料僅用於瀏覽器中的表單驗證。

## 樣式與設計系統

頁面與元件使用 Tailwind CSS 4。品牌色、字型、版面斷點與共用元件用法收錄於[設計系統](docs/design-system.md)。

## 本機執行

需要 Node.js 24 以上。

```sh
npm ci
npm run dev
```

`npm run verify` 會執行 TypeScript 檢查並產生靜態頁面。完成後可執行 `npm run preview`，透過 Wrangler 預覽與正式環境相同的靜態資產和 404 路由處理。

效能檢測的範圍、調整與重測方式收錄於[效能檢測](docs/performance.md)。

## 部署

GitHub Actions 會驗證對 `main` 的推送與 Pull Request。Cloudflare Workers 使用 `wrangler.jsonc` 中的 `.output/public` 靜態目錄。

有部署權限時，可在本機執行以下指令。

```sh
npm ci
npm run verify
npm run deploy
```

Workers Builds 的根目錄為 repo 根目錄，正式分支為 `main`。建置指令使用 `npm run verify`，部署指令使用 `npm run deploy`。
