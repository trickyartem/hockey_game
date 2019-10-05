import {game_field, canvas} from "./canvas";
import {coordinates}        from "./player";

export default class Washer {
    public coordinates: coordinates = {
        x: game_field.field_coordinates.x + game_field.width / 2,
        y: game_field.field_coordinates.y + game_field.height / 2
    };
    public radius: number = 25;
    public mass: number = 0.1;
    public speed = {x: 0, y: 0};

    update() {
        const {x, y} = this.coordinates;
        const {radius, speed} = this;
        const {right_edge, left_edge, bottom_edge, upper_edge} = game_field;

        if (x + radius >= right_edge || x - radius <= left_edge) {
            this.speed.x *= -1
        }
        if (y + radius >= bottom_edge || y - radius <= upper_edge) {
            this.speed.y *= -1
        }

        this.coordinates.x += speed.x;
        this.coordinates.y += speed.y;
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

    reset() {
        this.coordinates = {
            x: game_field.field_coordinates.x + game_field.width / 2,
            y: game_field.field_coordinates.y + game_field.height / 2
        };
        this.speed = {x: 0, y: 0};
    }
}

