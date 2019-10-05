import {canvas} from "./canvas";
import Game     from "./game";

const game = new Game();

const animate = () => {
    canvas.c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    game.update();
    requestAnimationFrame(animate);
};

animate();

