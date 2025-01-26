import esbuild from "esbuild";
import fs from "fs/promises";
import { index } from "./page.template.js";

const outDir = "dist";

const entryPoints = ["./src/demo-app.ts"];

const PORT = 4321;
const DEV_MODE = process.argv.includes("--dev");

const CONFIG = {
  entryNames: "[dir]/[name]",
  bundle: true,
  minify: true,
  splitting: true,
  format: "esm",
  entryPoints: entryPoints,
  outdir: outDir,
  external: [], // empty to ensure dependencies are bundled
};

// Create the dist folder
await fs.mkdir(outDir, { recursive: true });

// Create the index file
const pageDesc = {
  title: "Authentication components demo | nopwd.rocks",
  desc: "Live magic-link and Passkeys authentication using nopwd.io components.",
  link: "https://nopwd.rocks",
  img: "https://nopwd.rocks/static/og.png",
};

import pkg from "./package.json" with { type: "json" };
const sdkVersion = pkg.dependencies["@nopwdio/sdk-js"].substring(1);
const appVersion = pkg.version;
await fs.writeFile(`${outDir}/index.html`, index(pageDesc, sdkVersion, appVersion));

// Copy static files
await fs.cp("./static", `${outDir}/static`, { recursive: true });

if (DEV_MODE) {
  const ctx = await esbuild.context(CONFIG);
  await ctx.watch();
  console.info(`Serving at http://localhost:${PORT} ...`);
  await ctx.serve({ servedir: outDir, port: PORT });
} else {
  await esbuild.build(CONFIG);
}

