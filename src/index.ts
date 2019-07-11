const canvas: HTMLCanvasElement | null = document.querySelector("#canvas");
const spriteX = 750;
const spriteY = 48530;
const num = 46;
const spriteYPerFrame = spriteY / num;
canvas.width = spriteX;
canvas.height = spriteYPerFrame;
const context = canvas.getContext("2d");
const sprite = new Image();
const fps = 15;

const init = () => {
  return new Promise(resolve => {
    sprite.onload = () => {
      resolve();
    };

    sprite.src = "sprite.png";
  });
};

const drawSprite = (index: number) => {
  context.clearRect(0, 0, spriteX, spriteY);
  context.drawImage(
    sprite,
    0,
    spriteYPerFrame * index,
    spriteX,
    spriteYPerFrame,
    0,
    0,
    spriteX,
    spriteYPerFrame
  );
};

const play = (repeat = false) => {
  const startTime = performance.now();

  let prevFrame = 0;
  let id = 0;
  const loop = () => {
    const lastTime = performance.now();
    const frame = Math.floor(
      ((lastTime - startTime) / (1000 / fps)) % (num + 1)
    );
    console.log(frame);
    if (prevFrame > frame && !repeat) {
      console.log("loop!!!");
      window.cancelAnimationFrame(id);
      return;
    } else {
      id = window.requestAnimationFrame(loop);
    }
    drawSprite(frame);
    prevFrame = frame;
  };

  loop();
};

init().then(() => {
  play();
});
