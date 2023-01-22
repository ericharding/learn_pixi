import { AnimatedSprite, Application, Assets, Sprite } from "pixi.js";

const app = new Application({
  view: document.getElementById("pixi-canvas"),
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: "black",
  width: 640,
  height: 480,
});

// Load innocent bunny
const bunny = Sprite.from("bunny.png");
bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;
bunny.interactive = true;
app.stage.addChild(bunny);

// let explosion = null;

Assets.load("boom.json").then((boomTex) => {
  const explostionTexture = [];
  for (let i = 0; i < 26; i++) {
    const texture = boomTex.textures[`Explosion_Sequence_A ${i + 1}.png`];
    explostionTexture.push(texture);
  }

  let explosion = new AnimatedSprite(explostionTexture);
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
});



