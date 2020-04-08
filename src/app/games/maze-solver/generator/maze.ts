import { AppInterface } from '../interface/appInterface';
import { PATHFIELD, VISITFIELD } from '../definitions/defs';

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

    makeMaze( func : (maze : Cell[][], xInit : number, yInit : number) => void, 
        xInit : number, yInit : number) {
        setTimeout( func, 1000, this.maze, xInit, yInit);
    } 

    wallNotify( left : Cell, right : Cell, state : boolean) {
        this.appInterface.setWall( left.getX() + right.getX(), 
            left.getY() + right.getY(), state);
    }

    cellNotify( x : number, y : number, type : number, state : boolean) {
        this.appInterface.setCell( x, y, type, state);
    }
}

export class Cell {

    private isStart : boolean;
    private isGoal : boolean;
    private isPath : boolean;
    private visited : boolean;
    private x : number;
    private y : number;
    public walls : Wall[];
    private maze : Maze;

    constructor( x : number, y : number, maze : Maze, isPath : boolean = false) {
        this.x = x;
        this.y = y;
        this.maze = maze;
        this.walls = new Array<Wall>();
        this.setVisited( false);
        this.setIsPath( isPath);
    }

    setNeighbor( other : Cell) {
        const wall = new Wall( this, other, this.maze);
        this.walls.push( wall);
        other.walls.push( wall);
    }

    getVisited() {
        return this.visited;
    }

    getIsPath() {
        return this.isPath;
    }

    setIsPath( state : boolean) {
        this.isPath = state;
        this.maze.cellNotify( this.x, this.y, PATHFIELD, state);
    } 

    setVisited( state : boolean) {
        this.visited = state;
        this.maze.cellNotify( this.x, this.y, VISITFIELD, state);
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
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
        this.setStanding( true);
    }

    getLeft() : Cell {
        return this.leftCell;
    }

    getRight() : Cell {
        return this.rightCell;
    }

    getStanding() : boolean {
        return this.isStanding;
    }

    setStanding( state : boolean) {
        this.isStanding = state;
        this.maze.wallNotify( this.leftCell, this.rightCell, state);
    }
}