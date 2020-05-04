import { AppInterface } from './appInterface';
import * as consts from '../definitions/defs';
import * as PIXI from 'pixi.js';

export class PixiBox {

    alphaFade = ( pixiElem : any, alphaStart : number, 
        alphaEnd : number, dAlpha : number) => {
        return new Promise( (resolve) => {
            let alpha = alphaStart;
            const loop = () => {
                alpha += dAlpha;
                pixiElem.alpha = alpha;
                if ((alphaEnd > alphaStart && alpha >= alphaEnd) || 
                    (alphaEnd < alphaStart && alpha <= alphaEnd)) 
                    return resolve();
                requestAnimationFrame( loop);
            };
            requestAnimationFrame( loop);
        });
    };

    toggleDim( pixiElem : PIXI.Graphics) {
        if (pixiElem.tint == consts.BASELINEDIM)
            pixiElem.tint = consts.DIMVAL;
        else 
            pixiElem.tint = consts.BASELINEDIM;
    }

}

abstract class Element extends PIXI.Graphics {

    protected _j : number;
    protected _i : number;
    protected _state_ : number;
    protected blockSize : number;
    protected pixiBox : any;
    protected mazeContainer : PIXI.Container;
    protected draw : Function;
    protected state2col : Function;

    constructor( j : number, i : number, blockSize : number, 
        mazeContainer : PIXI.Container, pixiBox : PixiBox) {
        super();
        this._j = j;
        this._i = i;
        this.blockSize = blockSize;
        this._state_ = 0b0;
        this.mazeContainer = mazeContainer;
        this.pixiBox = pixiBox;
        this.mazeContainer.addChild( this);
        this.mkShapeFunc();
        this.mkState2colFunc();
        this.update( null, this._state_);
    }
    
    get j() {
        return this._j;
    }

    get i() {
        return this._i;
    }
    
    get state_() {
        return this._state_;
    }

    async flash( type : number) {
        this.fillCycle( consts.cellFlash2col( type), 1);
        await this.pixiBox.alphaFade( this, 1, 0, -.1, null, null);
        this.fillCycle( this.state2col( this.state_), 1);
    }

    setState( type : number, state : number) {
        const newState = (this.state_ & ~type) | (type * state);
        this.update( type, newState);
        this._state_ = newState;
    }

    fillCycle( color : number, alpha : number) {
        this.clear();
        this.beginFill( color);
        this.alpha = alpha;
        this.draw();
        this.endFill();
    }

    async update( type : number, newState : number) {
        if (this._state_ == newState) 
            this.fillCycle( this.state2col( newState), 1);
        else {
            if (type == consts.PATHFIELD && newState == 0b1) 
                this.fillCycle( consts.NEWPATHCOL, 1);
            await this.pixiBox.alphaFade( this, 1, 0, -0.1); 
            this.fillCycle( this.state2col( newState), 0),
            await this.pixiBox.alphaFade( this, 0, 1, 0.1); 
        } 
    }

    abstract mkShapeFunc();
    abstract mkState2colFunc();
}

export class CellElement extends Element {

    private appInterface : AppInterface;

    constructor( j : number, i : number, blockSize : number, 
        mazeContainer : PIXI.Container, pixiBox : PixiBox, 
        appInterface : AppInterface) {
        super( j, i, blockSize, mazeContainer, pixiBox);
        this.appInterface = appInterface;
        this.tint = consts.BASELINEDIM;
        this.interactive = true;
        this.on( 'mousedown', ( e) => this.onLeftClick());
        this.on( 'rightdown', ( e) => this.onRightClick());
        this.on( 'pointerover', ( e) => this.pixiBox.toggleDim( this));
        this.on( 'pointerout', ( e) => this.pixiBox.toggleDim( this));
    }

    mkShapeFunc() {
        this.draw = () => {
            this.drawRect( this.j * this.blockSize, 
            this.i * this.blockSize, this.blockSize, this.blockSize);
        }
    }

    mkState2colFunc() {
        this.state2col = consts.cellState2col;
    }

    commitEvent( field : number, targState : number) {
        const newState = (this._state_ & ~ field) | targState;
        if (! this.appInterface.echoElementState( this.j, this.i, field, targState))
            return;
        this.setState( field, (field & targState) != 0b0 ? 1 : 0);
    }


    onLeftClick() {
        var targState;
        var field;
        if ((this.appInterface.state & consts.SEARCHINGMAZE) != 0b0 &&
            (this._state_ & consts.VISITFIELD) == 0b0) {
            field = consts.PATHFIELD;
            targState = (~ (this._state_ & field)) & field;
            this.commitEvent( field, targState);
        }
        else if ((this.appInterface.state & consts.MAZEREADY) != 0b0) {
            if ((this._state_ & consts.ISGOAL) != 0b0)
                return;
            field = consts.ISSTART;
            targState = (~ (this._state_ & field)) & consts.ISSTART;
            this.commitEvent( field, targState);
        }
        else if ((this.appInterface.state & consts.EMPTYMAZE) != 0b0) {
            field = consts.ISSTART;
            targState = (~ (this._state_ & field)) & field;
            this.commitEvent( field, targState);
        }
    }

    onRightClick() {
        var targState;
        var field;
        if ((this.appInterface.state & consts.MAZEREADY) != 0b0) {
            if ((this._state_ & consts.ISSTART) != 0b0)
                return;
            field = consts.ISGOAL;
            targState = (~ (this._state_ & field)) & consts.ISGOAL;
            this.commitEvent( field, targState);
        }
    }

}

export class WallElement extends Element {

    constructor( j : number, i : number, blockSize : number, 
        mazeContainer : PIXI.Container, pixiBox : PixiBox) {
        super( j, i, blockSize, mazeContainer, pixiBox);
    }

    mkShapeFunc() {
        if (this.j % 2 == 0)
            this.draw = () => {
                this.drawRect( this.j * this.blockSize / 2, 
                    (this.i + 1) * this.blockSize / 2 - this.blockSize / 16, 
                    this.blockSize, this.blockSize / 8);
            }
        else 
            this.draw = () => {
                this.drawRect( 
                    (this.j + 1) * this.blockSize / 2 - this.blockSize / 16, 
                    this.i * this.blockSize / 2,
                    this.blockSize / 8, this.blockSize);
            }
    }

    mkState2colFunc() {
        this.state2col = consts.wallState2col;
    }

}
