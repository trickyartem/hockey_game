import Player               from "./player";
import Washer               from "./washer";
import {canvas, gameField} from "./canvas";
import Bot                  from "./bot";

export default class Game {
    private scoreElement = document.createElement('div');
    private goals = {
        bots: 0,
        players: 0
    };
    public isGameInProgress = true;

    constructor(
      private player: Player,
      private washer: Washer,
      private bot: Bot,
    ) {
        const { bots, players } = this.goals;

        this.setScore(players, bots);
    }

    setScore(playerScore: number, botScore: number) {
        const formatScoreString = (playerScore: number, botScore: number) => {
            return `You | Opponent
              ${playerScore} | ${botScore}`;
        }

        this.scoreElement.style.textAlign = 'center';
        this.scoreElement.innerText = formatScoreString(playerScore, botScore);

        document.body.prepend(this.scoreElement);
    }

    update() {
        const {radius} = this.washer;
        const {bottomGates} = gameField;

        gameField.display();
        if ((this.getDist(this.player.coordinates.x, this.player.coordinates.y) - (this.player.radius + radius)) < 0) {
            Game.resolveCollision(this.player, this.washer);
        }
        if ((this.getDist(this.bot.coordinates.x, this.bot.coordinates.y) - (this.bot.radius + radius)) < 0) {
            Game.resolveCollision(this.bot, this.washer);
        }

        if (this.isGameInProgress) {
            this.washer.display();
            this.player.display();
            this.bot.display();
            this.goal();
        } else {
            const callback = () => {
                this.isGameInProgress = true;
                this.reset();
                window.removeEventListener('click', callback);
            };
            window.addEventListener('click', callback);
            (this.washer.coordinates.y + radius) >= bottomGates.y
                ? Game.lose()
                : Game.win();
        }
    }

    goal() {
        const {radius} = this.washer;
        const {x, y} = this.washer.coordinates;
        const {upperGates, bottomGates} = gameField;

        const isOutOfField = y + radius >= bottomGates.y || y - radius <= upperGates.y;
        const isInGates = x + radius <= bottomGates.xRight && x - radius >= bottomGates.xLeft;

        if (!isOutOfField || !isInGates) {
            return;
        }

        if (y + radius >= bottomGates.y) {
            this.goals.bots++;
        } else {
            this.goals.players++;
        }

        this.isGameInProgress = false;
    }

    reset() {
        this.scoreElement.innerText = `You | Opponent
                      ${this.goals.players} | ${this.goals.bots}`;
        this.washer.reset();
        this.bot.reset();
    }

    private static finalMsg(msg: string) {
        const {center} = gameField;

        canvas.c.fillStyle = 'purple';
        canvas.c.fillText(`${msg}`, center.x - 300, center.y);
    }

    static win() {
        this.finalMsg('You won!')
    }

    static lose() {
        this.finalMsg('You lost!')
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

            const u1 = Game.rotateWasher(washer.speed, angle);
            const u2 = Game.rotateWasher(player.speed, angle);

            const v1 = {x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};

            const vFinal1 = Game.rotateWasher(v1, -angle);

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

    static rotateWasher(velocity: { x: number; y: number; }, angle: number) {
        return {
            x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
            y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
        };
    }
}
