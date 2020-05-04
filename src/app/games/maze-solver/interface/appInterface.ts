import { Maze, Cell } from '../generator/maze';
import * as PIXI from 'pixi.js';
import * as consts from '../definitions/defs';
import { CellElement, WallElement, PixiBox } from './mazeGraphics';
import { MazeBar } from './contextBar';

export class AppInterface {

    private mainContainer : PIXI.Container;
    private mazeContainer : PIXI.Container;
    private mazeBar : MazeBar;
    private pixiBox : PixiBox;

    public eventHandlerQueue : Function[];
    public eventHandlerInterval : number;

    private maze : Maze;
    private rows : number;
    private cols : number;
    private blockSize : number;

    private deltaX : number;
    private deltaY : number;

    private _state : number;
    public startCell : CellElement;
    public goalCell : CellElement;
    private cellGrid : CellElement[][];
    private wallGrid : WallElement[][];

    public algorithm : (appInterface : AppInterface) => (maze : Cell[][], 
        xInit : number, yInit : number) => void;

    constructor( cols : number, rows : number, blockSize : number, 
         mainContainer : PIXI.Container) {
        this.mainContainer = mainContainer;
        this.pixiBox = new PixiBox();
        this.blockSize = blockSize;
        this.cols = cols;
        this.rows = rows;
        this.startCell = null;
        this.goalCell = null;

        this.mazeContainer = new PIXI.Container();
        this.mainContainer.addChild( this.mazeContainer);
        
        this.mazeBar = new MazeBar( this.blockSize * this.rows, 
            this.blockSize * this.cols, 20, this, this.mainContainer, 
            this.pixiBox);

        this.eventHandlerQueue = [];
        this.eventHandlerInterval = consts.EVENTHANDLERONBOOT;

        this.bootEventHandler();
        this.buildGridUI();
        this.mazeInit();
        this.setState( consts.EMPTYMAZE);
    }

    private bootEventHandler() {
        const loop = timeout => setTimeout( () => {
            const func = this.eventHandlerQueue.shift();
            if (func) {
                func();
            }
            loop( this.eventHandlerInterval);
        }, timeout);
        loop( this.eventHandlerInterval);
    }


    private buildGridUI() {
        this.cellGrid = Array( this.rows).fill( Array( this.cols).fill( null));
        this.cellGrid = this.cellGrid.map( (row, y) => { 
            return row.map( (elem, x) => {
                return new CellElement( x, y, this.blockSize, 
                    this.mazeContainer, this.pixiBox, this);
            });
        });
        this.wallGrid = Array( 2 * this.rows - 1).fill( 
            Array( 2 * this.cols - 1).fill( null));
        this.wallGrid = this.wallGrid.map( (row, y) => { 
            return row.map( (elem, x) => {
                if ((y % 2 == 0 && x % 2 == 1) || (y % 2 == 1 && x % 2 == 0))
                    return new WallElement( x, y, this.blockSize, 
                        this.mazeContainer, this.pixiBox);
                return null;
            });
        });
    }

    public mazeInit() {
        this.maze = new Maze( this);
        this.maze.buildGrid( this.cols, this.rows);
    }

    private setState( state : number) {
        this.eventHandlerInterval = consts.state2eventTiming.get( state);
        this.mazeBar.echoContextChange( state);
        this._state = state;
    }

    public start() {
        this.setState( this.state == consts.EMPTYMAZE ? 
            consts.BUILDINGMAZE : consts.SEARCHINGMAZE);
        this.maze.runAlgorithm( this.algorithm( this), this.startCell.j, 
            this.startCell.i);
    }

    public signalAlgorithmEnd( success : boolean = null) {
        this.setState( this.state == consts.BUILDINGMAZE ? 
            consts.MAZEREADY : consts.GAMEOVER);
    }

    private schedule( func : () => void, forceSchedule : boolean = false) {
        if (forceSchedule || (this._state == consts.BUILDINGMAZE && 
            this.eventHandlerInterval > 0))
            this.eventHandlerQueue.push( func);
        else 
            func();
    }

    public setWall( x : number, y : number, state : boolean) { 
        this.schedule( () => this.wallGrid[y][x].setState( consts.STANDFIELD,
             state ? 1 : 0));
    } 

    public setCell( x : number, y : number, type : number, state : boolean) {
        this.schedule( () => this.cellGrid[y][x].setState( type, 
            state ? 1 : 0), type == consts.PATHFOUNDFIELD && this._state == 
            consts.SEARCHINGMAZE ? true : false);
    }

    public flashCell( x : number, y : number, type : number) {
        this.schedule( () => this.cellGrid[y][x].flash( type));
    }

    public get state() {
        return this._state;
    }
    
    public echoElementState( x : number, y : number, field : number, targState : number) {
        // Ugly ugly ugly....
        if (field == consts.ISSTART) {
            if (this.startCell) {
                this.startCell.setState( field, 0b0);
                this.maze.setCellState( this.startCell.x, 
                    this.startCell.y, field, 0b0);
            }
            this.startCell = this.cellGrid[y][x];
        }
        else if (field == consts.ISGOAL) {
            if (this.goalCell) {
                this.goalCell.setState( field, 0b0);
                this.maze.setCellState( this.goalCell.x, this.goalCell.y, 
                    field, 0b0);
            }
            this.goalCell = this.cellGrid[y][x];
        }
        this.maze.setCellState( x, y, field, targState);
        return true;
    }
}

