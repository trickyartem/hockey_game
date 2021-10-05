import { canvas, gameField } from "./canvas";

const MouseSpeed = require("mouse-speed");

export interface coordinates {
	x: number,
	y: number
}

const speed = new MouseSpeed();

export default class Player {
	public speed: coordinates = { x: 0, y: 0 };
	public coordinates: coordinates = {
		x: gameField.fieldCoordinates.x + gameField.width / 2,
		y: gameField.fieldCoordinates.y + gameField.height - 200
	};
	public radius: number = 50;
	public mass: number = 0.1;

	constructor() {
		addEventListener('mousemove', this.onMouseMove);
		speed.init(() => {
			this.speed.x = speed.speedX;
			this.speed.y = speed.speedY;
		});
	}

	onMouseMove(e: MouseEvent) {
		this.coordinates.y = e.clientY - this.radius;
		this.coordinates.x = e.clientX;

		const { x, y } = this.coordinates;
		const { radius } = this;
		const { rightEdge, leftEdge, bottomEdge, middle } = gameField;

		if (x + radius > rightEdge) {
			this.coordinates.x = rightEdge - radius;
		} else if (x - radius < leftEdge) {
			this.coordinates.x = leftEdge + radius;
		}

		if (y + radius > bottomEdge) {
			this.coordinates.y = bottomEdge - radius;
		} else if (y - radius < middle) {
			this.coordinates.y = middle + radius;
		}
	}

	display() {
		const { c } = canvas;
		c.beginPath();
		c.fillStyle = 'green';
		c.arc(this.coordinates.x, this.coordinates.y, this.radius, 0, 360);
		c.fill();
		c.closePath();
	}
}
