import * as PIXI from 'pixi.js';
import * as consts from '../definitions/defs';
import * as algorithms from '../definitions/algorithms';
import { Cell } from '../generator/maze'; 
import { AppInterface } from './appInterface';
import { PixiBox } from './mazeGraphics';

export class MazeBar extends PIXI.Container {

    protected startButton : StartButton;
    protected algorithmsButtons : AlgorithmButton[];
    protected slider : SliderButton;

    protected _height_ : number;
    protected _width_ : number;

    protected selected : AlgorithmButton;

    protected mainContainer : PIXI.Container;
    protected appInterface : AppInterface;
    public pixiBox : PixiBox;

    protected spawnMap : Map<number, Function>;
    
    constructor( yInit : number, width : number, height : number,
         appInterface : AppInterface, 
        mainContainer : PIXI.Container, pixiBox : PixiBox) {
        super();
        mainContainer.addChild( this);
        this.appInterface = appInterface;
        this.pixiBox = pixiBox;
        this.x = 0;
        this.y = yInit;
        this._height_ = height;
        this._width_ = width;
        this.height = consts.BARHEIGHT;
        this.width = this.parent.width;
        this.selected = null;
        this.spawnMap = new Map( [
            [consts.BUILD, this.spawBar( consts.BUILD)],
            [consts.SEARCH, this.spawBar( consts.SEARCH)],
            [consts.SLIDER, this.spawSlider],
            [consts.RESET, this.spawReset]
        ]);
    }

    echoContextChange( state : number) {
        this.destroy(); 
        this.spawnMap.get( consts.state2barType.get( state))(); 
    }


    destroy() {
        // As long as children iterable gets updated by parent class, 
        //  I can't use map here =(
        while (this.children.length > 0) {
            this.children.pop().destroy();
        }
    }

    get mazeState() {
        return this.appInterface.state;
    }

    get startCell() {
        return this.appInterface.startCell;
    }

    get goalCell() {
        return this.appInterface.goalCell;
    }

    get funcReady() {
        return this.appInterface.algorithm != null;
    }

    get height_() {
        return this._height_;
    }

    get width_() {
        return this._width_;
    }

    get eventHandlerInterval() {
        return this.appInterface.eventHandlerInterval;
    }

    set eventHandlerInterval( interval : number) {
        this.appInterface.eventHandlerInterval = interval;
    }

    callStart() {
        this.appInterface.start();
    }

    setAlgorithm( buttonElem : AlgorithmButton) {
        if (this.selected) 
            this.selected.toggleDim( this.selected);
        this.selected = buttonElem;
        this.appInterface.algorithm = buttonElem.algorithm;
    }

    get selectedAlgorithm() {
        return this.selected;
    }

    spawBar = ( type : number) => () => {
        var names;
        if (type == consts.BUILD)
            names = algorithms.BUILDNAMES;
        else 
            names = algorithms.SEARCHNAMES;
        this.startButton = new StartButton( this.x + this._width_ * .8, 
            this._width_ * .2, this);
        const width = this._width_ * .8 / names.length;

        this.algorithmsButtons = names.map( ( val, idx) => {
            if (type == consts.BUILD)
                return new AlgorithmBuildButton( this.x + width * idx, 
                    width, this, idx);
            return new AlgorithmSearchButton( this.x + width * idx, 
                width, this, idx);
        });
    };

    spawSlider = () => {
        this.slider = new SliderButton( this);
    };

    spawReset() {

    }
}

abstract class Button extends PIXI.Graphics {

    protected text : PIXI.Text;
    protected mazeBar : MazeBar;

    protected _width_ : number;
    protected _height_ : number;

    constructor( x : number, dx : number, mazeBar : MazeBar) {
        super();
        this.mazeBar = mazeBar;
        this.toggleDim = this.mazeBar.pixiBox.toggleDim;
        this.interactive = true;
        this.buttonMode = true;
        this.mazeBar.addChild( this);
        this.x = x;
        this.y = 0
        this._height_ = this.mazeBar.height_;
        this._width_ = dx;
        this.tint = consts.BASELINEDIM;
        this.on( 'mousedown', ( e) => this.onSelect());
        this.drawButton();
    }

    drawButton() {
        this.lineStyle( 2, consts.BUTTONBORDERCOL, 1);
        this.beginFill( consts.BUTTONCOL, 0.25);
        this.drawRect( 0, 0, this._width_, this._height_);
        this.endFill();
    }

    destroy() {
        super.destroy( { children : true });
    }

    abstract drawText();

    abstract onSelect();

    public toggleDim;

}

class StartButton extends Button {

    constructor( x : number, dx : number, mazeBar : MazeBar) {
        super( x, dx, mazeBar);
        this.drawText();
    }

    drawText() {
        this.text = new PIXI.Text( "Start!", consts.TEXTSTYLE);
        this.text.x = this._width_ / 10;
        this.text.y = this._height_ / 10;
        this.addChild( this.text);
    }

    onSelect() {
        if (! this.mazeBar.selectedAlgorithm)
            return;
        if (this.mazeBar.mazeState != consts.EMPTYMAZE && 
            this.mazeBar.mazeState != consts.MAZEREADY)
            return;
        if (! this.mazeBar.startCell)
            return;
        if (this.mazeBar.mazeState == consts.MAZEREADY && 
            ! this.mazeBar.goalCell)
            return;
        this.mazeBar.callStart();
    }
}

abstract class AlgorithmButton extends Button {

    protected algorithmIdx : number; 
    protected mazeBar : MazeBar;
    public algorithm : ( appInterface : AppInterface) => ( maze : Cell[][], 
        xInit : number, yInit : number) => void;

    constructor( x : number, dx : number, mazeBar : MazeBar, 
        algorithmIdx : number) {
        super( x, dx, mazeBar);
        this.algorithmIdx = algorithmIdx;
    }

    onSelect() {
        this.toggleDim( this);
        this.mazeBar.setAlgorithm( this);
    }

    drawText : () => void;

    defineDrawText = ( algorithmNames) => {
        this.drawText = () => {
            this.text = new PIXI.Text( algorithmNames[this.algorithmIdx], 
                consts.TEXTSTYLE);
            this.text.x = this._width_ / 10;
            this.text.y = this._height_ / 10;
            this.addChild( this.text);
        }
    }
}

class AlgorithmBuildButton extends AlgorithmButton {

    constructor( x : number, dx : number, mazeBar : MazeBar, 
        algorithmIdx : number) {
        super( x, dx, mazeBar, algorithmIdx);
        this.algorithm = algorithms.BUILDFUNCS[algorithmIdx];
        this.defineDrawText( algorithms.BUILDNAMES);
        this.drawText();
    }

}

class AlgorithmSearchButton extends AlgorithmButton {

    constructor( x : number, dx : number, mazeBar : MazeBar, 
        algorithmIdx : number) {
        super( x, dx, mazeBar, algorithmIdx);
        this.algorithm = algorithms.SEARCHFUNCS[algorithmIdx];
        this.defineDrawText( algorithms.SEARCHNAMES);
        this.drawText();
}

}

class SliderButton extends PIXI.Graphics {

    protected mazeBar : MazeBar;

    protected maxInterval : number; 
    protected minInterval : number;
    protected slideSpace : number;

    protected data : any;
    protected dragging : boolean;

    protected _width_ : number;
    protected _height_ : number;

    constructor( mazeBar : MazeBar) {
        super();
        this.mazeBar = mazeBar;

        this.maxInterval = mazeBar.eventHandlerInterval * 1000;
        this.minInterval = this.maxInterval / 1000;

        this._width_ = this.mazeBar.width_ / 10;
        this._height_ = this.mazeBar.height_;

        this.slideSpace = this.mazeBar.width_ - this._width_;
        this.x = this.slideSpace / 2;
        this.y = 0;

        this.mazeBar.addChild( this);

        this.interactive = true;
        this.buttonMode = true;

        this
            .on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);
    
        this.lineStyle( 2, consts.BUTTONBORDERCOL, 1);
        this.beginFill( consts.BUTTONCOL, 0.25);
        this.drawRect( 0, 0, this._width_, this._height_);
        this.endFill();
    }

    onDragStart( event) {
        this.data = event.data;
        this.alpha = 0.7;
        this.dragging = true;
    }

    onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
    }

    slider2interval() {
        const tick = (Math.log10( this.maxInterval) - 
            Math.log10( this.minInterval)) / this.slideSpace;
        return 10 ** ((this.slideSpace - this.x) * tick);
    }

    onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition( this.parent);
            this.x = Math.max( Math.min( newPosition.x, this.slideSpace), 
            0);
            this.mazeBar.eventHandlerInterval = this.slider2interval();
        }
    }
} 