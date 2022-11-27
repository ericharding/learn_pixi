const app = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from("img/bunny.png");
app.stage.addChild(bunny);

bunny.interactive = true;
bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

bunny.on("pointerdown", (event) => {
  console.log("FAT bunnay!")
  bunny.scale.x *= 1.25;
});

let elapsed = 0.0;
app.ticker.add((delta) => {
  elapsed += delta;
  bunny.x = (app.screen.width/2) + Math.cos(elapsed/50) * 100;
});
