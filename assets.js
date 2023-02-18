import { Assets } from "pixi.js";

const manifest = {
  bundles: [{
      name: "main",
      assets: [
        {name: "bunny", srcs: "bunny.png"},
        {name: "boom", srcs: "boom.json"},
        {name: "field", srcs: "quiet_field.png"},
      ],
    },
  ],
};

async function loadAssets(gameLoaded) {
  await Assets.init({ manifest });
  const bundles = manifest.bundles.map((bundle) => bundle.name);
  await Assets.load(bundles);
  if (gameLoaded) gameLoaded();
}

export { loadAssets };
