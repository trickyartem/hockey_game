import {canvas, game_field} from "./canvas";

const MouseSpeed = require("mouse-speed");

export interface coordinates {
    x: number,
    y: number
}

const speed = new MouseSpeed();
const {field_coordinates} = game_field;

export default class Player {
    public speed: coordinates = {x: 0, y: -5};
    public coordinates: coordinates = {x: 0, y: 0};
    public radius: number = 50;
    public mass: number = 2;

    constructor() {
        addEventListener('mousemove', e => {
            this.coordinates.y = e.clientY;
            this.coordinates.x = e.clientX;

            const {x, y} = this.coordinates;
            const {radius} = this;

            if (x + radius > field_coordinates.x + game_field.width) {
                this.coordinates.x = field_coordinates.x + game_field.width - radius;
            } else if (x - radius < field_coordinates.x) {
                this.coordinates.x = field_coordinates.x + radius;
            }

            if (y + radius > field_coordinates.y + game_field.height) {
                this.coordinates.y = field_coordinates.y + game_field.height - radius;
            } else if (y - radius < field_coordinates.y + game_field.height / 2) {
                this.coordinates.y = field_coordinates.y + game_field.height / 2 + radius;
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

export const player = new Player();

