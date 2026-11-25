# 課程素材

圖片取自六角學院課程提供的素材，原始攝影資訊可由檔名與設計稿 Reference 頁找到。網站發布的圖片皆為 WebP，瀏覽器透過 `srcset` 和 `sizes` 選取適合裝置的尺寸。 [課程素材目錄](https://github.com/hexschool/webLayoutTraining1st/tree/master/exhibition-week6) · [Unsplash 參考攝影集](https://unsplash.com/collections/62248220/exhibinection)

## 圖片目錄

| 目錄 | 用途 |
| --- | --- |
| `public/images/exhibitions/` | 展覽封面、推薦卡片與展覽內文照片 |
| `public/images/site/` | 首頁主視覺和電子報背景 |
| `public/images/recap/` | 直播回顧背景與主持人 |
| `public/images/brand/` | 網站 favicon 與 Facebook 圖檔 |

同一張圖片的變體命名為 `名稱-實際像素寬度.webp`。更新圖片時，從課程原始檔輸出 WebP，保留原始比例並移除中繼資料。照片採約 69–79 的品質值和高壓縮 effort。品牌圖檔採無損 WebP。原始 JPG、PNG 不隨網站發布。

新增尺寸時同步更新 [圖片清單](../app/data/exhibitImages.ts)。頁面使用 `ExhibitImage` 指定圖片名稱和版面估算寬度。購物車和收藏可選較小的 240 px 檔，頁首圖片使用優先載入，其他照片依畫面位置延後載入。

## 原始素材與授權

| 網站圖片         | 課程原始檔                                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 首頁主視覺       | `ricardo-gomez-angel-UrOZTfXT0h0-unsplash (1).jpg`                                                                                          |
| 2020 台味設計展  | `alina-grubnyak-R84Oy89aNKs-unsplash.jpg`                                                                                                   |
| No.22 線上設計展 | `michel-catalisano--a0D9LpcKV8-unsplash.jpg`                                                                                                |
| 高雄設計節       | `moralis-tsai-8xsktFRw28I-unsplash.jpg`                                                                                                     |
| 展覽內文         | `max-van-den-oetelaar-IMYe9uYN27E-unsplash.jpg`、`ricardo-gomez-angel-j5gCOKZdm6I-unsplash.jpg`                                             |
| 推薦展覽         | `ricardo-gomez-angel-WxpnuLzqZN4-unsplash.jpg`、`petri-heiskanen-bR9gFJqAnzA-unsplash.jpg`、`museums-victoria-kiDwVL_5ZBY-unsplash (1).jpg` |
| 直播回顧         | `people2.png`、`people.png`                                                                                                                 |
| 電子報背景       | `wladislaw-peljuchno-Y_f1aHpR1tc-unsplash.jpg`                                                                                              |

字型採 Roboto 和 Noto Sans TC。站內繁中文案使用自託管的 Noto Sans TC 字型子集，未收錄的字元由 Fontsource 的完整字型補齊。介面圖示使用內嵌的 Google Material Icons 向量圖示，Facebook 圖檔使用課程素材。 [Material Icons 原始碼](https://github.com/google/material-design-icons) · [圖示授權](material-icons-license.txt)

從下方固定版本下載 Noto Sans TC 可變字型後，可重新產生子集。一般安裝與建置會直接使用已提交的 WOFF2 檔案。 [Noto Sans TC 原始字型](https://github.com/google/fonts/blob/b950a7257470b900078f2bf3223823a8602de7e1/ofl/notosanstc/NotoSansTC%5Bwght%5D.ttf) · [SIL 開源字型授權](noto-sans-tc-license.txt)

```sh
npm run fonts:subset -- "/path/to/NotoSansTC[wght].ttf"
```
