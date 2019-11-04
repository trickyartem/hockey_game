import Player               from "./player";
import Washer               from "./washer";
import {canvas, game_field} from "./canvas";
import Bot                  from "./bot";

export default class Game {
    private readonly player = new Player();
    private washer = new Washer();
    private readonly bot = new Bot();
    private score = document.createElement('div');
    private goals = {
        bots: 0,
        players: 0
    };
    public keep_playing = true;

    constructor() {
        this.score.style.textAlign = 'center';
        this.score.innerText = `You | Opponent
              ${this.goals.players} | ${this.goals.bots}`;

        document.body.prepend(this.score);
    }


    update() {
        const {radius} = this.washer;
        const {bottom_gates} = game_field;

        game_field.display();
        if ((this.getDist(this.player.coordinates.x, this.player.coordinates.y) - (this.player.radius + radius)) < 0) {
            Game.resolveCollision(this.player, this.washer);
        }
        if ((this.getDist(this.bot.coordinates.x, this.bot.coordinates.y) - (this.bot.radius + radius)) < 0) {
            Game.resolveCollision(this.bot, this.washer);
        }

        if (this.keep_playing) {
            this.washer.display();
            this.player.display();
            this.bot.display();
            this.goal();
        } else {
            const callback = () => {
                this.keep_playing = true;
                this.reset();
                window.removeEventListener('click', callback);
            };
            window.addEventListener('click', callback);
            (this.washer.coordinates.y + radius) >= bottom_gates.y
                ? Game.final_msg('You lost')
                : Game.final_msg('You won');
        }
    }

    goal() {
        const {radius} = this.washer;
        const {x, y} = this.washer.coordinates;
        const {upper_gates, bottom_gates} = game_field;

        if (y + radius >= bottom_gates.y || y - radius <= upper_gates.y) {
            if (x + radius <= bottom_gates.x_right && x - radius >= bottom_gates.x_left) {
                if (y + radius >= bottom_gates.y) {
                    this.goals.bots++;
                } else {
                    this.goals.players++;
                }
                this.keep_playing = false;
            }
        }
    }

    reset() {
        this.score.innerText = `You | Opponent
                      ${this.goals.players} | ${this.goals.bots}`;
        this.washer.reset();
        this.bot.reset();
    }

    static final_msg(msg: string) {
        const {center} = game_field;

        canvas.c.fillStyle = 'purple';
        canvas.c.fillText(`${msg}`, center.x - 300, center.y);
    }

    static resolveCollision(player: Player | Bot, washer: Washer) {
        const xVelocityDiff = washer.speed.x - player.speed.x;
        const yVelocityDiff = washer.speed.y - player.speed.y;

        const xDist = player.coordinates.x - washer.coordinates.x;
        const yDist = player.coordinates.y - washer.coordinates.y;
        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

            const angle = -Math.atan2(player.coordinates.y - washer.coordinates.y, player.coordinates.x - washer.coordinates.x);

            const m1 = washer.mass;
            const m2 = player.mass;

            const u1 = Game.rotate_washer(washer.speed, angle);
            const u2 = Game.rotate_washer(player.speed, angle);

            const v1 = {x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};

            const vFinal1 = Game.rotate_washer(v1, -angle);

            if (vFinal1.x >= 30) {
                washer.speed.x = 30
            } else if (vFinal1.x <= -30) {
                washer.speed.x = -30
            } else {
                washer.speed.x = vFinal1.x;
            }

            if (vFinal1.y >= 30) {
                washer.speed.y = 30
            } else if (vFinal1.y <= -30) {
                washer.speed.y = -30
            } else {
                washer.speed.y = vFinal1.y;
            }
        }
    }

    getDist(x1: number, y1: number) {
        let xDistance = this.washer.coordinates.x - x1;
        let yDistance = this.washer.coordinates.y - y1;

        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }

    static rotate_washer(velocity: { x: number; y: number; }, angle: number) {
        return {
            x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
            y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
        };
    }
}
