import  esbuild from  "esbuild";
import fs from "fs/promises";
import {index} from "./page.template.js";

const outDir = "dist";

const entryPoints = [
    "./src/demo-app.ts",
];

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
    external: [], // empty to ensure deps are bundled,
}

// creating dist folder
await fs.mkdir(outDir, {recursive: true});

// creating index file
const pageDesc = {
    title: "Authentication components demo | nopwd.rocks",
    desc: "Try our magic-link and passkey authentication interactive demo.",
    link: "https://nopwd.rocks",
    img: "https://nopwd.rocks/static/opengraph.png",
  };
  
import pkg from "./package.json" assert {type: "json"};
const version = pkg.dependencies["@nopwdio/sdk-js"].substring(1);
await fs.writeFile(`${outDir}/index.html`, index(pageDesc, version));

// copy static
await fs.cp("./static", `${outDir}/static`, {recursive: true});


if(DEV_MODE) {
    const ctx = await esbuild.context(CONFIG);
    await ctx.watch();
    console.info(`serving http://localhost:${PORT} ...`);
    await ctx.serve({servedir: outDir, port: PORT});    
} else {
    await esbuild.build(CONFIG);
}

