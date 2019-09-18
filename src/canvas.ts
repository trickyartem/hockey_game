import {coordinates} from "./player";

export class Game_field {
    public readonly canvas = document.createElement('canvas');
    public readonly c = this.canvas.getContext('2d');
    private readonly field_coordinates: coordinates = {x: 0, y: 0};

    constructor() {
        this.field_coordinates.x = (window.innerWidth / 2) - 250;
        this.field_coordinates.y = 100;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        document.body.appendChild(this.canvas);
    }

    display() {
        const {x, y} = this.field_coordinates;

        this.c.beginPath();
        this.c.lineWidth = 7;
        this.c.strokeStyle = '#B2391F';
        this.c.moveTo(x, y);
        this.c.lineTo(x + 150, y);
        this.c.moveTo(x + 250, y);
        this.c.lineTo(x + 400, y);
        this.c.lineTo(x + 400, y + 800);
        this.c.lineTo(x + 250, y + 800);
        this.c.moveTo(x + 150, y + 800);
        this.c.lineTo(x, y + 800);
        this.c.lineTo(x, y);
        this.c.stroke();
        this.c.closePath();
    }
}



