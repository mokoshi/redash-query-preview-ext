import * as esbuild from "esbuild";
import copy from "esbuild-plugin-copy";

// if (!process.env.REDASH_DOMAIN) {
//   console.warn("REDASH_DOMAIN is not set. Defaulting to 'localhost'");
// }
// const redashDomain = process.env.REDASH_DOMAIN ?? "localhost";

const ctx = await esbuild
  .context({
    entryPoints: {
      "content/index": "./src/content/index.tsx",
      "content/styles": "./src/content/styles.css",
      "popup/index": "./src/popup/index.tsx",
    },
    outdir: "dist",
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ["chrome58", "firefox57"],
    plugins: [
      copy({
        assets: {
          from: "./public/**/*",
          to: "./",
        },
      }),
      // {
      //   name: "update-manifest",
      //   setup(build) {
      //     build.onEnd(async () => {
      //       const manifest = JSON.parse(
      //         fs.readFileSync("./dist/manifest.json")
      //       );
      //       // ビルド完了後に manifest.json を更新
      //       manifest.content_scripts[0].matches = [
      //         `https://${redashDomain}/*`,
      //         `http://${redashDomain}/*`,
      //       ];
      //       fs.writeFileSync(
      //         "./dist/manifest.json",
      //         JSON.stringify(manifest, null, 2)
      //       );
      //       console.log("manifest.json updated.");
      //     });
      //   },
      // },
    ],
    loader: {
      ".ts": "ts",
      ".tsx": "tsx",
      ".svg": "dataurl",
    },
  })
  .catch(() => process.exit(1));

if (process.argv.includes("--watch")) {
  await ctx.watch();
  console.log("Watching for changes...");
} else {
  await ctx.rebuild();
  console.log("Build complete.");
  await ctx.dispose();
}
