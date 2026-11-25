import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";

const [sourceFont] = process.argv.slice(2);
if (!sourceFont) {
  console.error("Usage: npm run fonts:subset -- path/to/NotoSansTC-variable.ttf");
  process.exit(1);
}

const app = new URL("../app/", import.meta.url);
const output = new URL("../app/assets/fonts/noto-sans-tc-site.woff2", import.meta.url);
const appPath = fileURLToPath(app);
const files = (await readdir(appPath, { recursive: true }))
  .filter((path) => /\.(vue|ts)$/.test(path))
  .sort();
const text = await Promise.all(
  files.map((path) => readFile(new URL(path.replaceAll("\\", "/"), app), "utf8")),
);
const characters = [...new Set(text.join("").match(/[\p{Script=Han}\u3000-\u303f\uff00-\uffef]/gu))]
  .sort()
  .join("");
const subset = await subsetFont(await readFile(sourceFont), characters, {
  targetFormat: "woff2",
  preserveNameIds: [0, 13, 14],
});
await writeFile(output, subset);
console.log("Wrote " + subset.length + " bytes for " + [...characters].length + " site code points.");
