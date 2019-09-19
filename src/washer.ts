import {game_field, canvas} from "./canvas";
import {coordinates}        from "./player";
import {player}             from "./player";

export class Washer {
    public coordinates: coordinates = {
        x: game_field.field_coordinates.x + game_field.width / 2,
        y: game_field.field_coordinates.y + game_field.height / 2
    };
    public radius: number = 25;
    public mass: number = 1;
    public speed = {x: 0, y: 0};

    constructor() {
    }

    update() {
        const {x, y} = this.coordinates;
        const {radius, speed} = this;
        const {field_coordinates} = game_field;

        const left_edge = field_coordinates.x + game_field.width;
        const right_edge = field_coordinates.x;
        const bottom_edge = field_coordinates.y + game_field.height;
        const upper_edge = field_coordinates.y;


        if (x + radius > right_edge || x - radius <= left_edge) {
            this.speed.x *= -1
        }
        if (y + radius > bottom_edge || y - radius <= upper_edge) {
            this.speed.y *= -1
        }

        this.coordinates.x += speed.x;
        this.coordinates.y += speed.y;
        if ((this.getDist(player.coordinates.x, player.coordinates.y) - (player.radius + this.radius)) < 0) {
            this.resolveCollision(player);
        }
    }

    display() {
        const {c} = canvas;
        const {x, y} = this.coordinates;

        this.update();
        c.beginPath();
        c.fillStyle = 'blue';
        c.arc(x, y, this.radius, 0, 360);
        c.fill();
        c.closePath();
    }

    resolveCollision(player: any) {
        const xVelocityDiff = this.speed.x - player.speed.x;
        const yVelocityDiff = this.speed.y - player.speed.y;

        const xDist = player.coordinates.x - this.coordinates.x;
        const yDist = player.coordinates.y - this.coordinates.y;

        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

            const angle = -Math.atan2(player.coordinates.y - this.coordinates.y, player.coordinates.x - this.coordinates.x);

            const m1 = this.mass;
            const m2 = player.mass;

            const u1 = Washer.rotate(this.speed, angle);
            const u2 = Washer.rotate(player.speed, angle);

            const v1 = {x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};
            const v2 = {x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y};

            const vFinal1 = Washer.rotate(v1, -angle);
            const vFinal2 = Washer.rotate(v2, -angle);

            this.speed.x = vFinal1.x;
            this.speed.y = vFinal1.y;

            player.speed.x = vFinal2.x;
            player.speed.y = vFinal2.y;
        }
    }

    getDist(x1: number, y1: number) {
        let xDistance = this.coordinates.x - x1;
        let yDistance = this.coordinates.y - y1;

        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }

    static rotate(velocity: { x: number; y: number; }, angle: number) {
        return {
            x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
            y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
        };
    }
}

