import { AnimatedSprite, Application, Assets, Sprite, SimplePlane } from "pixi.js";
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

  const background = new SimplePlane(textures.field);
  background.width = app.screen.width;
  background.height = app.screen.height;
  app.stage.addChild(background);

  const bunny = Sprite.from(textures.bunny);
  bunny.anchor.set(0.5);
  bunny.x = 0;
  bunny.y = 400;
  bunny.interactive = true;
  app.stage.addChild(bunny);

  const explosion = new AnimatedSprite(textures.boom.animations.boom);
  explosion.anchor.set(0.5);
  explosion.rotation = Math.random() * Math.PI;
  explosion.loop = false;

  bunny.on("pointertap", () => {
    app.stage.addChild(explosion);
    explosion.x = bunny.x;
    explosion.y = bunny.y;
    explosion.play();
    bunny.visible = false;
  });

  let speed = 0.5;

  bunny.on('pointermove', () => {
    speed += 0.1;
  });

  app.ticker.add((timeDelta) => {
    bunny.x = (bunny.x + speed * timeDelta) % app.screen.width;
  });
}

loadAssets(gameLoaded);
