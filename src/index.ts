import {canvas} from "./canvas";
import Game     from "./game";

const game = new Game();


const animate = () => {
    canvas.c.fillStyle = 'rgba(225, 225, 225, 0.3)';
    canvas.c.fillRect(0, 0, window.innerWidth, window.innerHeight);

    game.update();
    requestAnimationFrame(<FrameRequestCallback>animate);
};
animate();

