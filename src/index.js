import { AnimatedSprite, Application, Assets, Sprite } from "pixi.js";
import { loadAssets } from "./assets";

const app = new Application({
  view: document.getElementById("pixi-canvas"),
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: "black",
  width: 640,
  height: 480,
});

async function gameLoaded() {
  const textures = await Assets.loadBundle("main");

  const bunny = Sprite.from(textures.bunny);
  bunny.anchor.set(0.5)
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;
  bunny.interactive = true;
  app.stage.addChild(bunny);

  const explosion = new AnimatedSprite(textures.boom.animations.boom);
  explosion.x = bunny.x;
  explosion.y = bunny.y;
  explosion.anchor.set(0.5);
  explosion.rotation = Math.random() * Math.PI;
  explosion.loop = false;

  bunny.on("pointertap", () => {
    app.stage.addChild(explosion);
    explosion.play();
    bunny.visible = false;
  });
}

loadAssets(gameLoaded);



