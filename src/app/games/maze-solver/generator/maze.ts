import { AppInterface } from '../interface/appInterface';
import { PATHFIELD, VISITFIELD, ISGOAL, ISSTART, PATHFOUNDFIELD }
    from '../definitions/defs';

export class Maze {

    private cols : number;
    private rows : number;
    private maze : Cell[][];
    private appInterface : AppInterface;

    constructor( appInterface : AppInterface) {
        this.appInterface = appInterface;
    }

    buildGrid( cols : number, rows : number) {
        // Check if this works...
        const func = ( lastRow => ( row, y) => {
            const newRow = row.map( ( lastElem => ( elem, x) => {
                const cell = new Cell( x, y, this);
                if (x > 0)
                    cell.setNeighbor( lastElem);
                if (y > 0)
                    cell.setNeighbor( lastRow[x]);
                lastElem = cell
                return cell;
            })( null));
            lastRow = newRow;
            return newRow;
        })( null);

        this.maze = new Array( rows).fill( Array( cols).fill( null)).map( func);
    }

    resetMaze() {
        this.maze.map( row => {
            row.map( cell => {
                cell.setDefaults();
                cell.walls.map( wall => {
                    wall.setDefaults();
                });
            });
        });
    }

    runAlgorithm( func : (maze : Cell[][], xInit : number, yInit : number) => void, 
        xInit : number, yInit : number) {
        func( this.maze, xInit, yInit);
    } 

    wallNotify( left : Cell, right : Cell, state : boolean) {
        this.appInterface.setWall( left.x + right.x, 
            left.y + right.y, state);
    }

    cellNotify( x : number, y : number, type : number, state : boolean) {
        this.appInterface.setCell( x, y, type, state);
    }

    setCellState( x : number, y : number, field : number, targState : number) {
        if (field == ISSTART || field == ISGOAL)
            this.maze[y][x].setTarget( targState);
        else if (field == PATHFIELD)
            this.maze[y][x].setIsPath( targState != 0b0 ? true : false, false);
    }

    cellTransitionNotify( x : number, y : number, type : number) {
        this.appInterface.flashCell( x, y, type);
    }
}

export class Cell {

    private _isStart : boolean;
    private _isGoal : boolean;
    private _isPath : boolean;
    private _visited : boolean;
    private _foundPath : boolean;
    private _x : number;
    private _y : number;
    public distance : number;
    public parent : Cell;
    public walls : Wall[];
    private maze : Maze;

    constructor( x : number, y : number, maze : Maze) {
        this._x = x;
        this._y = y;
        this.maze = maze;
        this.walls = new Array<Wall>();
    }

    setDefaults() {
        this.visited = false;
        this.setIsPath( false);
        this.foundPath = false;
    }

    setNeighbor( other : Cell) {
        const wall = new Wall( this, other, this.maze);
        this.walls.push( wall);
        other.walls.push( wall);
    }

    get visited() {
        return this._visited;
    }

    set visited( state : boolean) {
        this._visited = state;
        this.maze.cellNotify( this.x, this.y, VISITFIELD, state);
    }

    flashCell( type : number) {
        this.maze.cellTransitionNotify( this.x, this.y, type);
    }

    get isPath() {
        return this._isPath;
    }

    setIsPath( state : boolean, notify : boolean = true) {
        this._isPath = state;
        if (! notify)
            this.walls.map( _ => _.standing = ! state);
        else
            this.maze.cellNotify( this.x, this.y, PATHFIELD, state);
    } 

    get isGoal() {
        return this._isGoal;
    }

    set foundPath( state : boolean) {
        this._foundPath = state;
        this.maze.cellNotify( this.x, this.y, PATHFOUNDFIELD, state);
    }

    setTarget( state : number) {
        this._isGoal = (ISGOAL & state) == ISGOAL ? true : false;
        this._isStart = (ISSTART & state) == ISSTART ? true : false;
    }


    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
}

export class Wall {

    private isStanding : boolean;
    private leftCell : Cell;
    private rightCell : Cell;
    private maze : Maze;

    constructor( left : Cell, right : Cell, maze : Maze) {
        this.leftCell = left;
        this.rightCell = right;
        this.maze = maze;
        this.setDefaults();
    }

    setDefaults() {
        this.standing = true;
    }

    get left() : Cell {
        return this.leftCell;
    }

    get right() : Cell {
        return this.rightCell;
    }

    get standing() : boolean {
        return this.isStanding;
    }

    set standing( state : boolean) {
        this.isStanding = state;
        this.maze.wallNotify( this.leftCell, this.rightCell, state);
    }
}