"use strict"

export const ARROW_MAP = {
    37: 'left',
    38: 'down',
    39: 'right',
    40: 'up'
};

export class Player {

    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.x = 1;
        this.y = 1;
        this.speed = 5;

        //document.addEventListener('keydown', this.move.bind(this));
        document.addEventListener('keydown', this.move);
    }

    move = (event) => {
        //console.log('this', this);
        const arrow = ARROW_MAP[event.keyCode];
        switch (arrow) {
            case 'left':
                this.x -= this.speed;
                break;
            case 'right':
                this.x += this.speed;
                break;
            case 'up':
                this.y += this.speed;
                break;
            case 'down':
                this.y -= this.speed;
                break;
            //default:
            //code si pas de cas
            //    break;
        }
        //this.draw();
    }

    draw = () => {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill();
    }

    getBorders = () => {
        return {
            xMin: this.x,
            xMax: this.x + this.width,
            yMin: this.y,
            yMax: this.y + this.height
        };
    }
}