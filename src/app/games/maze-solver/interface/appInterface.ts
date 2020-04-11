import { Maze, Cell } from '../generator/maze';
import * as PIXI from 'pixi.js';
import * as consts from '../definitions/defs';
import { prim } from '../generator/prims';
import { dfs } from '../solver/dfs';
import { CellElement, WallElement, PixiBox } from './mazeGraphics';
import { MazeBar } from './contextBar';

export class AppInterface {

    private context : any;
    private pixiBox : any;
    private contextUi : MazeBar;

    private eventHandlerQueue : Function[];
    private _eventHandlerInterval : number;

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

    public algorithm : (appInterface : AppInterface) => (maze : Cell[][], xInit : number, yInit : number) => void;

    constructor( cols : number, rows : number, blockSize : number, deltaX : number,
        deltaY : number, context : any) {
        this.context = context;
        this.pixiBox = new PixiBox();
        this.blockSize = blockSize;
        this.cols = cols;
        this.rows = rows;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
        this.startCell = null;
        this.goalCell = null;
        this.eventHandlerQueue = [];
        this._eventHandlerInterval = consts.EVENTHANDLERONBOOT;

        this.bootEventHandler();
        this.buildGridUI();
        this.mazeInit();
        this.setState( consts.EMPTYMAZE);
    }

    private bootEventHandler() {
        const loop = ( timeout) => setTimeout( () => {
            const func = this.eventHandlerQueue.shift();
            if (func) {
                func();
            }
            loop( this.eventHandlerInterval);
        }, timeout);
        loop( this.eventHandlerInterval);
    }

    get eventHandlerInterval() {
        return this._eventHandlerInterval
    }


    private buildGridUI() {
        this.cellGrid = Array( this.rows).fill( Array( this.cols).fill( null));
        this.cellGrid = this.cellGrid.map( (row, y) => { 
            return row.map( (elem, x) => {
                return new CellElement( x, y, this.blockSize, this.context, 
                    this.pixiBox, this);
            });
        });
        this.wallGrid = Array( 2 * this.rows - 1).fill( 
            Array( 2 * this.cols - 1).fill( null));
        this.wallGrid = this.wallGrid.map( (row, y) => { 
            return row.map( (elem, x) => {
                if ((y % 2 == 0 && x % 2 == 1) || (y % 2 == 1 && x % 2 == 0))
                    return new WallElement( x, y, this.blockSize, this.context, 
                        this.pixiBox);
                return null;
            });
        });
    }

    public mazeInit() {
        this.maze = new Maze( this);
        this.maze.buildGrid( this.cols, this.rows);
    }

    private setState( state : number) {
        this._eventHandlerInterval = consts.state2eventTiming.get( state);
        if (state == consts.EMPTYMAZE || state == consts.MAZEREADY)
            this.eventHandlerQueue.push( () => this.contextUi = new MazeBar(
                0, this.rows * this.blockSize, this.cols * this.blockSize, 
                this.deltaY - this.rows * this.blockSize, 
                state == consts.EMPTYMAZE ? consts.BUILD : consts.SEARCH,
                 this, this.context,
                this.pixiBox));
        else if (state == consts.BUILDINGMAZE || state == consts.SEARCHINGMAZE)
            this.contextUi.destroyBar();
        this._state = state;
    }

    public start() {
        this.setState( this.state == consts.EMPTYMAZE ? 
            consts.BUILDINGMAZE : consts.SEARCHINGMAZE);
        this.maze.runAlgorithm( this.algorithm( this), this.startCell.x, 
            this.startCell.y);
    }

    public signalAlgorithmEnd() {
        this.setState( this.state == consts.BUILDINGMAZE ? 
            consts.MAZEREADY : consts.GAMEOVER);
    }

    public setWall( x : number, y : number, state : boolean) { 
        if (this.eventHandlerInterval > 0)
            this.eventHandlerQueue.push( () => (this.wallGrid[y][x].setState( 
                consts.STANDFIELD, state ? 1 : 0)));
        else 
            this.wallGrid[y][x].setState( consts.STANDFIELD, state ? 1 : 0);
    } 

    public setCell( x : number, y : number, type : number, state : boolean) {
        if (this.eventHandlerInterval > 0)
            this.eventHandlerQueue.push( () => (this.cellGrid[y][x].setState( 
                type, state ? 1 : 0)));
        else 
            this.cellGrid[y][x].setState( type, state ? 1 : 0);
    }

    public get state() {
        return this._state;
    }
    
    public echoElementState( x : number, y : number, field : number, targState : number) {
        // Ugly ugly ugly....
        if (field == consts.ISSTART) {
            if (targState == consts.ISSTART) {
                if (this.startCell) {
                    this.startCell.setState( field, 0b0);
                    this.maze.setCellState( this.startCell.x, 
                        this.startCell.y, field, 0b0);
                }
                this.startCell = this.cellGrid[y][x];
            }
            else
                this.startCell = null;
        }
        else if (field == consts.ISGOAL) {
            if (targState == consts.ISGOAL) {
                if (this.goalCell) {
                    this.goalCell.setState( field, 0b0);
                    this.maze.setCellState( this.goalCell.x, this.goalCell.y, 
                        field, 0b0);
                }
                this.goalCell = this.cellGrid[y][x];
            }
            else
                this.goalCell = null;
        }
        this.maze.setCellState( x, y, field, targState);
        return true;
    }
}

