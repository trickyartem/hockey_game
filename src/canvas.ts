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
    public readonly field_coordinates: coordinates = {
        x: (window.innerWidth / 2) - 250,
        y: 100
    };
    public width: number = 400;
    public height: number = 800;
    public left_edge = this.field_coordinates.x;
    public right_edge = this.field_coordinates.x + this.width;
    public bottom_edge = this.field_coordinates.y + this.height;
    public upper_edge = this.field_coordinates.y;
    public middle = this.field_coordinates.y + this.height / 2;
    public upper_gates = {
        x_left: this.field_coordinates.x + 150,
        x_right: this.field_coordinates.x + 250,
        y: this.upper_edge
    };
    public bottom_gates = {
        x_left: this.field_coordinates.x + 150,
        x_right: this.field_coordinates.x + 250,
        y: this.bottom_edge
    };

    display() {
        const {x, y} = this.field_coordinates;
        const {c} = canvas;

        c.beginPath();
        c.lineWidth = 7;
        c.strokeStyle = '#B2391F';
        c.moveTo(x, y);
        c.lineTo(this.upper_gates.x_left, this.upper_edge);
        c.moveTo(this.upper_gates.x_right, this.upper_edge);
        c.lineTo(this.right_edge, this.upper_edge);
        c.lineTo(this.right_edge, this.bottom_edge);
        c.lineTo(this.bottom_gates.x_right, this.bottom_edge);
        c.moveTo(this.bottom_gates.x_left, this.bottom_edge);
        c.lineTo(x, this.bottom_edge);
        c.lineTo(x, y);
        c.moveTo(x, this.middle);
        c.lineTo(this.right_edge, this.middle);
        c.stroke();
        c.closePath();
    }
}

export const canvas = new Canvas();
export const game_field = new Game_field();




