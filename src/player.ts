import {canvas, game_field} from "./canvas";

const MouseSpeed = require("mouse-speed");

export interface coordinates {
    x: number,
    y: number
}

const speed = new MouseSpeed();

export default class Player {
    public speed: coordinates = {x: 0, y: 0};
    public coordinates: coordinates = {
        x: game_field.field_coordinates.x + game_field.width / 2,
        y: game_field.field_coordinates.y + game_field.height - 200
    };
    public radius: number = 50;
    public mass: number = 0.1;

    constructor() {
        addEventListener('mousemove', e => {
            this.coordinates.y = e.clientY - this.radius;
            this.coordinates.x = e.clientX;

            const {x, y} = this.coordinates;
            const {radius} = this;
            const {right_edge, left_edge, bottom_edge, middle} = game_field;

            if (x + radius > right_edge) {
                this.coordinates.x = right_edge - radius;
            } else if (x - radius < left_edge) {
                this.coordinates.x = left_edge + radius;
            }

            if (y + radius > bottom_edge) {
                this.coordinates.y = bottom_edge - radius;
            } else if (y - radius < middle) {
                this.coordinates.y = middle + radius;
            }
        });
    }

    display() {
        speed.init(() => {
            this.speed.x = speed.speedX;
            this.speed.y = speed.speedY;
        });
        const {c} = canvas;
        c.beginPath();
        c.fillStyle = 'green';
        c.arc(this.coordinates.x, this.coordinates.y, this.radius, 0, 360);
        c.fill();
        c.closePath();
    }
}
