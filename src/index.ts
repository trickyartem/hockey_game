import {game_field, canvas} from "./canvas";
import {player}             from "./player";
import {Washer}             from "./washer";

const washer = new Washer();

const animate = () => {
    canvas.c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    game_field.display();
    player.display();
    washer.display();
    requestAnimationFrame(animate);
};

animate();

