import { Maze } from '../generator/maze';
import * as PIXI from 'pixi.js';
import * as consts from '../definitions/defs';
import { prim } from '../generator/prims';

export class AppInterface {

    private context : any;
    private pixiBox : any;
    private maze : Maze;
    private rows : number;
    private cols : number;
    private blockSize : number;
    private cellGrid : CellElement[][];
    private wallGrid : WallElement[][];

    constructor( cols : number, rows : number, 
        block_size : number, context : any) {
        this.context = context;
        this.pixiBox = new PixiBox();
        this.blockSize = block_size;
        this.cols = cols;
        this.rows = rows;

        this.cellGrid = Array( rows).fill( Array( cols).fill( null));
        this.cellGrid = this.cellGrid.map( (row, y) => { 
            return row.map( (elem, x) => {
                return new CellElement( x, y, block_size, this.context, 
                    this.pixiBox);
            });
        });
        this.wallGrid = Array( 2 * rows - 1).fill( 
            Array( 2 * cols - 1).fill( null));
        this.wallGrid = this.wallGrid.map( (row, y) => { 
            return row.map( (elem, x) => {
                if ((y % 2 == 0 && x % 2 == 1) || (y % 2 == 1 && x % 2 == 0))
                    return new WallElement( x, y, block_size, this.context, 
                        this.pixiBox);
                return null;
            });
        });
    }

    mazeInit() {
        this.maze = new Maze( this);
        this.maze.buildGrid( this.cols, this.rows);
        this.maze.makeMaze( prim, this.cols / 2, this.rows / 2);
    }

    setWall( x : number, y : number, state : boolean) { 
        this.wallGrid[y][x].setState( consts.STANDFIELD, state ? 1 : 0);
    } 

    setCell( x : number, y : number, type : number, state : boolean) {
        this.cellGrid[y][x].setState( type, state ? 1 : 0);
    }
}

class PixiBox {
    private alphaFilter : any;
    protected ticker : any;
    public set : boolean;

    constructor() {
        this.alphaFilter = new PIXI.filters.AlphaFilter();
        this.set = false;
    }

    alphaFade2( pixiElem : any, alphaStart : number, alphaEnd : number, 
        dAlpha : number) {

        let alpha = alphaStart;
        if (this.set)
            console.log( "hey in! ", alphaStart, alpha, alphaEnd);

        const loop = () => {
            alpha += dAlpha;
/*             this.alphaFilter.alpha = alphaStart;
            pixiElem.filters = [this.alphaFilter]; */
            pixiElem.alpha = alpha;
            if ((alphaEnd > alphaStart && alpha >= alphaEnd) || 
                (alphaEnd < alphaStart && alpha <= alphaEnd)) {
                if (this.set)
                    console.log( "hey out! ", alphaStart, alpha, alphaEnd);  
                return;
            }
            
            requestAnimationFrame( loop);
        };
        requestAnimationFrame( loop);
    }

    alphaFade( pixiElem : any, alphaStart : number, alphaEnd : number, 
        dAlpha : number, funcMiddle : Function, funcEnd : Function) {

        let alpha = alphaStart;
        const loop = () => {
            alpha += dAlpha;
/*             this.alphaFilter.alpha = alphaStart;
            pixiElem.filters = [this.alphaFilter]; */
            pixiElem.alpha = alpha;
            if ((alphaEnd > alphaStart && alpha >= alphaEnd) || 
                (alphaEnd < alphaStart && alpha <= alphaEnd)) {
                if (funcMiddle)
                    funcMiddle();
                    funcEnd();
                return;
            }
            
            requestAnimationFrame( loop);
        };
        requestAnimationFrame( loop);
    }

}

abstract class Element {

    protected x : number;
    protected y : number;
    protected state : number;
    protected blockSize : number;
    protected pixiElem : any;
    protected pixiBox : any;
    protected context : any;
    protected drawShape : Function;
    protected state2col : Function;

    constructor( x : number, y : number, blockSize : number, context : any, pixiBox : any) {
        this.x = x;
        this.y = y;
        this.blockSize = blockSize;
        this.state = 0b0;
        this.context = context;
        this.pixiBox = pixiBox;
        this.pixiElem = new PIXI.Graphics();
        this.context.stage.addChild( this.pixiElem);
        this.mkShapeFunc();
        this.mkState2colFunc();
        this.render( this.state, null);
    }
    
    setState( type : number, state : number) {
        this.render( (this.state & ~type) | (type * state), type);
    }

    fillCycle( color : number, alpha : number) {
        this.pixiElem.clear();
        this.pixiElem.beginFill( color);
        this.pixiElem.alpha = alpha;
        this.drawShape();
        this.pixiElem.endFill();
    }

    render( newState : number, type : number) {
        
        if (this.state == newState) 
            this.fillCycle( this.state2col( newState), 1);
        else {
            if (type == consts.PATHFIELD) 
                this.fillCycle( consts.NEWPATHCOL, 1);
            this.pixiBox.alphaFade( this.pixiElem, 1, 0, -0.1, 
                () => this.fillCycle( this.state2col( newState), 0),
                () => this.pixiBox.alphaFade( this.pixiElem, 0, 1, 0.1, 
                    null, null)); 
        } 
        this.state = newState;
    }

    abstract mkShapeFunc();
    abstract mkState2colFunc();
}

class CellElement extends Element {

    constructor( x : number, y : number, blockSize : number, context : any, pixiBox : any) {
        super(x, y, blockSize, context, pixiBox);
    }

    mkShapeFunc() {
        this.drawShape = () => {
            this.pixiElem.drawRect( this.x * this.blockSize, 
            this.y * this.blockSize, this.blockSize, this.blockSize);
        }
    }

    mkState2colFunc() {
        this.state2col = consts.cellState2col;
    }

}

class WallElement extends Element {

    constructor( x : number, y : number, blockSize : number, context : any, pixiBox : any) {
        super(x, y, blockSize, context, pixiBox);
    }

    mkShapeFunc() {
        if (this.x % 2 == 0)
            this.drawShape = () => {
                this.pixiElem.drawRect( this.x * this.blockSize / 2, 
                    (this.y + 1) * this.blockSize / 2 - this.blockSize / 16, 
                    this.blockSize, this.blockSize / 8);
            }
        else 
            this.drawShape = () => {
                this.pixiElem.drawRect( 
                    (this.x + 1) * this.blockSize / 2 - this.blockSize / 16, 
                    this.y * this.blockSize / 2,
                    this.blockSize / 8, this.blockSize);
            }
    }

    mkState2colFunc() {
        this.state2col = consts.wallState2col;
    }

}
