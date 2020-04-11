import * as PIXI from 'pixi.js';
import * as consts from '../definitions/defs';
import { Cell } from '../generator/maze'; 
import { AppInterface } from './appInterface';
import { PixiBox } from './mazeGraphics';

export class MazeBar {

    protected startButton : StartButton;
    protected algorithmsButtons : AlgorithmButton[];
    protected selected : AlgorithmButton;

    protected context : any;
    protected appInterface : AppInterface;
    protected pixiBox : PixiBox;

    protected xInit : number;
    protected yInit : number;
    protected deltaX : number;
    protected deltaY : number;
    
    constructor( xInit : number, yInit : number, deltaX : number, 
        deltaY : number, type : number, appInterface : AppInterface, 
        context : any, pixiBox : PixiBox) {
        this.context = context;
        this.appInterface = appInterface;
        this.pixiBox = pixiBox;
        this.xInit = xInit;
        this.yInit = yInit;
        this.deltaY = deltaY;
        this.deltaX = deltaX;
        this.selected = null;
        this.spawBar( type);
    }

    destroyBar() {
        this.startButton.destroy();
        this.algorithmsButtons.map( ( _) => ( _.destroy()));
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

    callStart() {
        this.appInterface.start();
    }

    setAlgorithm( buttonElem : AlgorithmButton) {
        if (this.selected) 
            this.selected.toggleDim( this.selected.button);
        this.selected = buttonElem;
        this.appInterface.algorithm = buttonElem.algorithm;
    }

    get selectedAlgorithm() {
        return this.selected;
    }

    spawBar( type : number) {
        var names;
        if (type == consts.BUILD)
            names = consts.BUILDNAMES;
        else 
            names = consts.SEARCHNAMES;
        this.startButton = new StartButton( this.xInit + this.deltaX * .8, 
            this.yInit, this.deltaX * .2, this.deltaY, 
            this.pixiBox, this.context, this);

        const width = this.deltaX * .8 / names.length;

        this.algorithmsButtons = names.map( (val, idx) => {
            if (type == consts.BUILD)
                return new AlgorithmBuildButton( this.xInit + width * idx, 
                    this.yInit, width, this.deltaY, this.pixiBox, this.context, 
                    this, idx);
            return new AlgorithmSearchButton( this.xInit + width * idx, 
                this.yInit, width, this.deltaY, this.pixiBox, this.context, 
                this, idx);
        });
    }
}

abstract class Button {

    public button : PIXI.Graphics;
    protected text : PIXI.Text;
    protected pixiBox : PixiBox;
    protected context : any;
    protected mazeBar : MazeBar;

    constructor( x : number, y : number, dx : number, dy : number, pixiBox : any, 
        context : any, mazeBar : MazeBar) {
        this.pixiBox = pixiBox;
        this.toggleDim = this.pixiBox.toggleDim;
        this.mazeBar = mazeBar;
        this.context = context;
        this.button = new PIXI.Graphics();
        this.button.interactive = true;
        this.button.buttonMode = true;
        this.context.stage.addChild( this.button);
    }

    drawButton( x : number, y : number, dx : number, dy : number) {
        this.button.lineStyle( 2, consts.BUTTONBORDERCOL, 1);
        this.button.beginFill( consts.BUTTONCOL, 0.25);
        this.button.drawRect( x, y, dx, dy);
        this.button.endFill();
    }

    destroy() {
        this.button.destroy( { children : true});
    }

    abstract drawText( x : number, y : number, dx : number, dy : number);

    abstract onSelect( button : AlgorithmButton, mazeBar : MazeBar);

    public toggleDim;

}

class StartButton extends Button {

    constructor( x : number, y : number, dx : number, dy : number, pixiBox : any, 
        context : any, mazeBar) {
        super( x, y, dx, dy, pixiBox, context, mazeBar);
        this.button.tint = consts.BASELINEDIM;
        this.button.on( 'mousedown', ( e) => this.onSelect( this, this.mazeBar));
        this.drawButton( x, y, dx, dy);
        this.drawText( x, y, dx, dy);
    }

    drawText( x : number, y : number, dx : number, dy : number) {
        this.text = new PIXI.Text( "Start!", consts.TEXTSTYLE);
        this.text.x = x + dx / 10;
        this.text.y = y + dy / 10;
        this.button.addChild( this.text);
    }

    onSelect( button : StartButton, mazeBar : MazeBar) {
        if (! mazeBar.selectedAlgorithm)
            return;
        if (mazeBar.mazeState != consts.EMPTYMAZE && mazeBar.mazeState !=
             consts.MAZEREADY)
            return;
        if (! mazeBar.startCell)
            return;
        if (mazeBar.mazeState == consts.MAZEREADY && ! mazeBar.goalCell)
            return;
        mazeBar.callStart();
    }
}

abstract class AlgorithmButton extends Button {

    protected algorithmIdx : number; 
    protected mazeBar : MazeBar;
    public algorithm : (appInterface : AppInterface) => (maze : Cell[][], 
        xInit : number, yInit : number) => void;

    constructor( x : number, y : number, dx : number, dy : number, pixiBox : any, 
        context : any, mazeBar : MazeBar, algorithmIdx : number) {
        super( x, y, dx, dy, pixiBox, context, mazeBar);
        this.button.tint = consts.BASELINEDIM;
        this.button.on( 'mousedown', ( e) => this.onSelect( this, this.mazeBar));
        this.drawButton( x, y, dx, dy);
        this.algorithmIdx = algorithmIdx;
    }

    onSelect( button : AlgorithmButton, mazeBar : MazeBar) {
        button.toggleDim( button);
        mazeBar.setAlgorithm( this);
    }

    drawText : ( x : number, y : number, dx : number, dy : number) => void;

    defineDrawText = ( algorithmNames) => {
        this.drawText = ( x : number, y : number, dx : number, dy : number) => {
            this.text = new PIXI.Text( algorithmNames[this.algorithmIdx], 
                consts.TEXTSTYLE);
            this.text.x = x + dx / 10;
            this.text.y = y + dy / 10;
            this.button.addChild( this.text);
        }
    }
}

class AlgorithmBuildButton extends AlgorithmButton {

    constructor( x : number, y : number, dx : number, dy : number, pixiBox : any, 
        context : any, mazeBar : MazeBar, algorithmIdx : number) {
            super( x, y, dx, dy, pixiBox, context, mazeBar, algorithmIdx);
            this.algorithm = consts.BUILDFUNCS[algorithmIdx];
            this.defineDrawText( consts.BUILDNAMES);
            this.drawText( x, y, dx, dy);
    }

}

class AlgorithmSearchButton extends AlgorithmButton {

    constructor( x : number, y : number, dx : number, dy : number, pixiBox : any, 
        context : any, mazeBar : MazeBar, algorithmIdx : number) {
            super( x, y, dx, dy, pixiBox, context, mazeBar, algorithmIdx);
            this.algorithm = consts.SEARCHFUNCS[algorithmIdx];
            this.defineDrawText( consts.SEARCHNAMES);
            this.drawText( x, y, dx, dy);
    }

}

class Slider extends PIXI.Container {
 
    protected context : any;
    protected appInterface : AppInterface;

    protected slider : PIXI.Sprite;

    protected yInit : number;
    protected deltaX : number;
    protected deltaY : number;

    constructor( yInit : number, deltaX : number, deltaY : number, 
        appInterface : AppInterface, context : any) {
        super();
        this.context = context;
        this.appInterface = appInterface;
        this.yInit = yInit;
        this.deltaY = deltaY;
        this.deltaX = deltaX;

        this.context.addChild( this);
        this.slider = new PIXI.Sprite();
        this.slider.interactive = true;
        this.slider.buttonMode = true;

        this.slider
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);

        this.sliderWidth = deltaY / 10;
        // move the sprite to its designated position
        this.slider.x = (this.deltaX - this.sliderWidth) / 2;
        this.slider.y = this.yInit;
    }

    onDragStart( event) {
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }

    onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
    }

    onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x;
            this.y = newPosition.y;
        }
    }

} 