export interface coordinates {
    x: number,
    y: number
}

let mouse: coordinates = {x: undefined, y: undefined};

addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

console.log(mouse.x, mouse.y);
export class Player {
    constructor() {

    }
}
