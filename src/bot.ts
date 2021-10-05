import {canvas, gameField} from "./canvas";
import {coordinates}        from "./player";

export default class Bot {
    public coordinates: coordinates = {
        x: gameField.fieldCoordinates.x + gameField.width / 2,
        y: gameField.fieldCoordinates.y + gameField.height / 4
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
        const {middle, upperEdge, rightEdge, leftEdge} = gameField;

        if (y + radius >= middle) {
            this.coordinates.y = middle - radius;
            this.speed.y *= -1
        } else if (y - radius <= upperEdge) {
            this.coordinates.y = upperEdge + radius;
            this.speed.y *= -1
        }

        if (x - radius <= leftEdge) {
            this.coordinates.x = leftEdge + radius;
            this.speed.x *= -1;
        } else if (x + radius >= rightEdge) {
            this.coordinates.x = rightEdge - radius;
            this.speed.x *= -1;
        }

        this.coordinates.x += this.speed.x;
        this.coordinates.y += this.speed.y;
    }

    reset() {
        this.coordinates.x = gameField.fieldCoordinates.x + gameField.width / 2;
        this.coordinates.y = gameField.fieldCoordinates.y + gameField.height / 4;
    }
}
