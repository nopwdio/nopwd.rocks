import  esbuild from  "esbuild";
import fs from "fs/promises";
import {index} from "./page.template.js";

const outDir = "dist";

const entryPoints = [
    "./src/demo-app.ts",
];

const PORT = 3000;
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


await fs.mkdir(outDir, {recursive: true});
await fs.writeFile(`${outDir}/index.html`, index);
await fs.cp("./static", `${outDir}/static`, {recursive: true});


if(DEV_MODE) {
    const ctx = await esbuild.context(CONFIG);
    await ctx.watch();
    console.info(`serving http://localhost:${PORT} ...`);
    await ctx.serve({servedir: outDir, port: PORT});    
} else {
    await esbuild.build(CONFIG);
}

