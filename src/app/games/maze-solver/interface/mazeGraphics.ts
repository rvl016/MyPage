import { AppInterface } from './appInterface';
import * as consts from '../definitions/defs';

export class PixiBox {
    private alphaFilter : any;
    protected ticker : any;
    public set : boolean;

    alphaFade( pixiElem : any, alphaStart : number, alphaEnd : number, 
        dAlpha : number, funcMiddle : Function = null, funcEnd : Function = null) {
        let alpha = alphaStart;
        const loop = () => {
            alpha += dAlpha;
            pixiElem.alpha = alpha;
            if ((alphaEnd > alphaStart && alpha >= alphaEnd) || 
                (alphaEnd < alphaStart && alpha <= alphaEnd)) {
                if (funcMiddle) {
                    funcMiddle();
                    funcEnd();
                }
                return;
            }
            requestAnimationFrame( loop);
        };
        requestAnimationFrame( loop);
    }

    toggleDim( pixiElem : any) {
        if (pixiElem.tint == consts.BASELINEDIM)
            pixiElem.tint = consts.DIMVAL;
        else 
            pixiElem.tint = consts.BASELINEDIM;
    }

}

abstract class Element {

    protected _x : number;
    protected _y : number;
    protected _state : number;
    protected blockSize : number;
    protected pixiElem : any;
    protected pixiBox : any;
    protected context : any;
    protected drawShape : Function;
    protected state2col : Function;

    constructor( x : number, y : number, blockSize : number, 
        context : any, pixiBox : any) {
        this._x = x;
        this._y = y;
        this.blockSize = blockSize;
        this._state = 0b0;
        this.context = context;
        this.pixiBox = pixiBox;
        this.pixiElem = new PIXI.Graphics();
        this.context.stage.addChild( this.pixiElem);
        this.mkShapeFunc();
        this.mkState2colFunc();
        this.render( this.state, null);
    }
    
    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
    
    get state() {
        return this._state;
    }

    setState( type : number, state : number) {
        const newState = (this.state & ~type) | (type * state);
        this.render( type, newState);
        this._state = newState;
    }

    fillCycle( color : number, alpha : number) {
        this.pixiElem.clear();
        this.pixiElem.beginFill( color);
        this.pixiElem.alpha = alpha;
        this.drawShape();
        this.pixiElem.endFill();
    }

    render( type : number, newState : number) {
        
        if (this.state == newState) 
            this.fillCycle( this.state2col( newState), 1);
        else {
            if (type == consts.PATHFIELD && newState == 0b1) 
                this.fillCycle( consts.NEWPATHCOL, 1);
            this.pixiBox.alphaFade( this.pixiElem, 1, 0, -0.1, 
                () => this.fillCycle( this.state2col( newState), 0),
                () => this.pixiBox.alphaFade( this.pixiElem, 0, 1, 0.1)); 
        } 
    }

    abstract mkShapeFunc();
    abstract mkState2colFunc();
}

export class CellElement extends Element {

    private appInterface : AppInterface;

    constructor( x : number, y : number, blockSize : number, 
        context : any, pixiBox : any, appInterface : AppInterface) {
        super(x, y, blockSize, context, pixiBox);
        this.appInterface = appInterface;
        this.pixiElem.tint = consts.BASELINEDIM;
        this.pixiElem.interactive = true;
        this.pixiElem.on( 'mousedown', ( e) => this.onLeftClick( this));
        this.pixiElem.on( 'rightdown', ( e) => this.onRightClick( this));
        this.pixiElem.on( 'pointerover', ( e) => this.pixiBox.toggleDim( this.pixiElem));
        this.pixiElem.on( 'pointerout', ( e) => this.pixiBox.toggleDim( this.pixiElem));
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

    commitEvent( field : number, targState : number) {
        const newState = (this.state & ~ field) | targState;
        if (! this.appInterface.echoElementState( this.x, this.y, field, targState))
            return;
        this.setState( field, (field & targState) != 0b0 ? 1 : 0);
    }


    onLeftClick( cell : CellElement) {
        var targState;
        var field;
        if ((cell.appInterface.state & consts.SEARCHINGMAZE) != 0b0 &&
            (cell.state & consts.VISITFIELD) == 0b0) {
            field = consts.PATHFIELD;
            targState = (~ (cell.state & field)) & field;
            console.log( "HERE!");
            cell.commitEvent( field, targState);
        }
        else if ((cell.appInterface.state & consts.MAZEREADY) != 0b0) {
            if ((cell.state & consts.ISGOAL) != 0b0)
                return;
            field = consts.ISSTART;
            targState = (~ (cell.state & field)) & consts.ISSTART;
            cell.commitEvent( field, targState);
        }
        else if ((cell.appInterface.state & consts.EMPTYMAZE) != 0b0) {
            field = consts.ISSTART;
            targState = (~ (cell.state & field)) & field;
            cell.commitEvent( field, targState);
        }
    }

    onRightClick( cell : CellElement) {
        var targState;
        var field;
        if ((cell.appInterface.state & consts.MAZEREADY) != 0b0) {
            if ((cell.state & consts.ISSTART) != 0b0)
                return;
            field = consts.ISGOAL;
            targState = (~ (cell.state & field)) & consts.ISGOAL;
            cell.commitEvent( field, targState);
        }
    }

}

export class WallElement extends Element {

    constructor( x : number, y : number, blockSize : number, 
        context : any, pixiBox : any) {
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
