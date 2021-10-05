import {gameField, canvas} from "./canvas";
import {coordinates}        from "./player";

export default class Washer {
    public coordinates: coordinates = {
        x: gameField.fieldCoordinates.x + gameField.width / 2,
        y: gameField.fieldCoordinates.y + gameField.height / 2
    };
    public radius: number = 25;
    public mass: number = 0.1;
    public speed = {x: 0, y: 0};

    update() {
        const {x, y} = this.coordinates;
        const {radius, speed} = this;
        const {rightEdge, leftEdge, bottomEdge, upperEdge} = gameField;

        if (x + radius >= rightEdge || x - radius <= leftEdge) {
            this.speed.x *= -1
        }
        if (y + radius >= bottomEdge || y - radius <= upperEdge) {
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
            x: gameField.center.x,
            y: gameField.center.y
        };
        this.speed = {x: 0, y: 0};
    }
}

