"use strict"

import { Player } from "./player";

/**
 * The Game
 * @author Vincent
 * @version 1.0
 */
export class Game {

    /**
     * Constructor to create Game
     * @param {htmlelement} canvas 
     * @param {number} width 
     * @param {number} height 
     * @author Vincent
     */
    constructor(canvas, width, height) {
        this.width = width;
        this.height = height;
        this.ctx = canvas.getContext('2d');

        canvas.width = width;
        canvas.height = height;

        //création du player
        this.player = new Player(this.ctx, 50, 50);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    drawBorder() {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.width, this.height);
        this.ctx.stroke();
    }

    /**
     * Check border of player....
     * @returns {boolean} 
     */
    checkState = () => {
        const borders = this.player.getBorders();
        console.log(borders);
        return (borders.xMin >= 0 && borders.xMax <= this.width && borders.yMin >= 0 && borders.yMax <= this.height);
    }

    lose = () => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'red';
        this.ctx.strokeRect(0, 0, this.width / 2, this.height / 2);

        this.ctx.font = '28px serif';
        this.ctx.fillStyle = 'red';
        this.ctx.fillText('Vous avez perdu !', this.width / 4, this.height / 4);
    }

    play = () => {
        this.clear();
        this.drawBorder();
        this.player.draw();
        if (this.checkState()) {
            requestAnimationFrame(this.play);
        } else {
            this.lose();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canv = document.getElementsByTagName('canvas')[0];
    const game = new Game(canv, window.screen.width - 100, window.screen.height - 200);
    game.play();
});



