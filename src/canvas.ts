import {coordinates} from "./player";

class Canvas {
    public readonly canvas = document.createElement('canvas');
    public readonly c = this.canvas.getContext('2d');

    constructor() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        document.body.appendChild(this.canvas);
    }
}

class Game_field {
    public readonly field_coordinates: coordinates = {x: 0, y: 0};
    public width: number = 400;
    public height: number = 800;

    constructor() {
        this.field_coordinates.x = (window.innerWidth / 2) - 250;
        this.field_coordinates.y = 100;
    }

    display() {
        const {x, y} = this.field_coordinates;
        const {c} = canvas;

        c.beginPath();
        c.lineWidth = 7;
        c.strokeStyle = '#B2391F';
        c.rect(x, y, this.width, this.height);
        // c.moveTo(x, y);
        // c.lineTo(x + 150, y);
        // c.moveTo(x + 250, y);
        // c.lineTo(x + this.wide, y);
        // c.lineTo(x + this.wide, y + this.height);
        // c.lineTo(x + 250, y + this.height);
        // c.moveTo(x + 150, y + this.height);
        // c.lineTo(x, y + this.height);
        // c.lineTo(x, y);
        c.moveTo(x, y + this.width);
        c.lineTo(x + this.width, y + this.width);
        c.stroke();
        c.closePath();
    }
}

export const canvas = new Canvas();
export const game_field = new Game_field();




