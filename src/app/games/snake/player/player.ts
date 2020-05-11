import { Head, Tail, Segment } from './segment';
import * as consts from '../definitions/defs';
import { validateBasis } from '@angular/flex-layout';
import { ThrowStmt } from '@angular/compiler';
import { SnakeComponent } from '../snake.component';

export class Player {

    private snakeHead : Head;
    private snakeTail : Tail;
    private context : CanvasRenderingContext2D;
    private requestId : number;
    public time : number;
    private foodX : number;
    private foodY : number;
    private paused : boolean;
    private score : number;
    private parent : SnakeComponent;

    constructor( xInit : number, yInit : number, 
        context : CanvasRenderingContext2D, parent : SnakeComponent) {
        const yTail = yInit - 1;
        this.snakeHead = new Head( xInit, yInit, yTail);
        this.snakeTail = this.snakeHead.getPrevious();
        this.context = context;
        this.parent = parent;
    }

    renderSquare( x : number, y : number, color : string) {
        this.context.fillStyle = color;
        this.context.fillRect( x * consts.BLOCK_SIZE, y * consts.BLOCK_SIZE, 
            consts.BLOCK_SIZE, consts.BLOCK_SIZE);
    }

    renderSnake() {
        this.context.clearRect( 0, 0, this.context.canvas.width, 
            this.context.canvas.height);
        var segment : Segment = this.snakeHead;
        while (segment != null) {
            if (segment == this.snakeHead)
                this.renderSquare( segment.x, segment.y, consts.HEADCOL);
            else if (segment.growing)
                this.renderSquare( segment.x, segment.y, consts.SNAKEFOODCOL);
            else
                this.renderSquare( segment.x, segment.y, consts.SNAKECOL);
            segment = segment.getPrevious();
        }
    }

    renderFood() {
        this.renderSquare( this.foodX, this.foodY, consts.FOODCOL);
    } 

    updatePlayer() : Number {
        if (this.snakeHead.getDirection() == null)
            return;
        var segment : Segment = this.snakeTail;
        while (segment != null) {
            segment.move();
            if (segment.growing){
                segment.grow();
                if (segment == this.snakeTail) {
                    this.snakeTail = segment.getPrevious();
                }
            }
            segment = segment.getNext();
        }
        if (this.gotFood()) {
            this.snakeHead.growing = true;
            this.score += 1;
            this.parent.setScore( this.score);
            this.spawnFood();
            return 1;
        }
        if (this.crashed()) 
            return -1;
        return 0;
    }

    changeDirection( key : String) {
        this.snakeHead.changeDirection( key);
    }

    spawnFood() {
        const pos = Math.floor(Math.random() * (consts.ROWS * consts.COLS));
        const x = pos % consts.COLS;
        const y = Math.floor( pos / consts.COLS);
        if (this.snakeColision( x, y, this.snakeHead))
            return this.spawnFood();
        this.foodX = x;
        this.foodY = y;
    }

    snakeColision( x : number, y : number, from : Segment) {
        var segment = from;
        while (segment != null) {
            if (segment.x == x && segment.y == y)
                return true;
            segment = segment.getPrevious();
        }
        return false;
    }
    
    crashed() : boolean {
        const x = this.snakeHead.x;
        const y = this.snakeHead.y;
        if (x < 0 || x >= consts.COLS || y < 0 || y >= consts.ROWS)
            return true;
        return this.snakeColision( this.snakeHead.x, this.snakeHead.y, 
            this.snakeHead.getPrevious());
    }

    gotFood() : boolean {
        return this.snakeHead.x == this.foodX && 
            this.snakeHead.y == this.foodY;
    }

    pause() {
        this.paused = ! this.paused;
        if (this.paused)
            cancelAnimationFrame( this.requestId);
        else 
            this.loop();
    }

    gameover() {
        cancelAnimationFrame( this.requestId);
        this.parent.gameIsRunning = false;
    }
    loop() {
        if (Date.now() - this.time >= consts.UPDATEINTERVAL) {
            this.renderSnake();
            this.renderFood();
            if (this.updatePlayer() == -1) {
                return this.gameover();
            }
            this.time = Date.now();
        }
        this.requestId = requestAnimationFrame( this.loop.bind( this));
    }
    start() {
        this.score = 0;
        this.parent.setScore( this.score);
        this.spawnFood();
        this.time = Date.now();
        this.loop();
    }
}