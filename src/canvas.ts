import {coordinates} from "./player";

class Canvas {
    public readonly canvas = document.createElement('canvas');
    public readonly c = this.canvas.getContext('2d');

    constructor() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.c.font = "200px Georgia";

        document.body.appendChild(this.canvas);
    }
}

class GameField {
    public readonly fieldCoordinates: coordinates = {
        x: (window.innerWidth / 2) - 250,
        y: 100
    };
    public width: number = 400;
    public height: number = 800;
    public center = {
        x: this.fieldCoordinates.x + this.width / 2,
        y: this.fieldCoordinates.y + this.height / 2
    };
    public leftEdge = this.fieldCoordinates.x;
    public rightEdge = this.fieldCoordinates.x + this.width;
    public bottomEdge = this.fieldCoordinates.y + this.height;
    public upperEdge = this.fieldCoordinates.y;
    public middle = this.fieldCoordinates.y + this.height / 2;
    public upperGates = {
        xLeft: this.fieldCoordinates.x + 150,
        xRight: this.fieldCoordinates.x + 250,
        y: this.upperEdge
    };
    public bottomGates = {
        xLeft: this.fieldCoordinates.x + 150,
        xRight: this.fieldCoordinates.x + 250,
        y: this.bottomEdge
    };

    display() {
        const {x, y} = this.fieldCoordinates;
        const {c} = canvas;

        c.beginPath();
        c.lineWidth = 7;
        c.strokeStyle = '#B2391F';
        c.moveTo(x, y);
        c.lineTo(this.upperGates.xLeft, this.upperEdge);
        c.moveTo(this.upperGates.xRight, this.upperEdge);
        c.lineTo(this.rightEdge, this.upperEdge);
        c.lineTo(this.rightEdge, this.bottomEdge);
        c.lineTo(this.bottomGates.xRight, this.bottomEdge);
        c.moveTo(this.bottomGates.xLeft, this.bottomEdge);
        c.lineTo(x, this.bottomEdge);
        c.lineTo(x, y);
        c.moveTo(x, this.middle);
        c.lineTo(this.rightEdge, this.middle);
        c.stroke();
        c.closePath();
    }
}

export const canvas = new Canvas();
export const gameField = new GameField();




