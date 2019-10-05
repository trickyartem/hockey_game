import {canvas, game_field} from "./canvas";
import {coordinates}        from "./player";

export default class Bot {
    public coordinates: coordinates = {
        x: game_field.field_coordinates.x + game_field.width / 2,
        y: game_field.field_coordinates.y + game_field.height / 4
    };
    public radius: number = 50;
    public speed = {
      x: 7,
      y: 0.1
    };
    public mass = 0.1;

    display() {
        const {c} = canvas;
        const {x, y} = this.coordinates;

        this.movement();
        c.beginPath();
        c.fillStyle = 'red';
        c.arc(x, y, this.radius, 0, 360);
        c.fill();
        c.closePath();
    }

    movement() {
        const {x, y} = this.coordinates;
        const {radius} = this;
        const {middle, upper_edge, right_edge, left_edge} = game_field;

        if (y + radius >= middle) {
            this.coordinates.y = middle - radius;
            this.speed.y *= -1
        } else if (y - radius <= upper_edge) {
            this.coordinates.y = upper_edge + radius;
            this.speed.y *= -1
        }

        if (x - radius <= left_edge) {
            this.coordinates.x = left_edge + radius;
            this.speed.x *= -1;
        } else if (x + radius >= right_edge) {
            this.coordinates.x = right_edge - radius;
            this.speed.x *= -1;
        }

        this.coordinates.x += this.speed.x;
        this.coordinates.y += this.speed.y;
    }

    reset() {
        this.coordinates.x = game_field.field_coordinates.x + game_field.width / 2;
        this.coordinates.y = game_field.field_coordinates.y + game_field.height / 4;
    }
}
