import {canvas} from "./canvas";
import Game     from "./game";
import Player from "./player";
import Washer from "./washer";
import Bot from "./bot";

const player = new Player();
const washer = new Washer();
const bot = new Bot();

const game = new Game(
  player,
  washer,
  bot
);

const animate = () => {
    canvas.c.fillStyle = 'rgba(225, 225, 225, 0.3)';
    canvas.c.fillRect(0, 0, window.innerWidth, window.innerHeight);

    game.update();
    requestAnimationFrame(<FrameRequestCallback>animate);
};
animate();

