import { Cell, Wall } from '../generator/maze';
import { FLASHFORWARD, FLASHBACKWARD } from '../definitions/defs';
import { AppInterface } from '../interface/appInterface';

export const aStar = (appInterface : AppInterface) =>
    async ( maze : Cell[][], xInit : number, yInit : number) => {

    const calcDistance = ( cell : Cell) => {
        return Math.sqrt( (cell.x - xGoal) ** 2 + (cell.y - yGoal) ** 2);
    } 

    const Cellinsertion = ( cell : Cell) => {
        var i = 0;
        while (i < frontier.length) {
            if (cell.distance + calcDistance( cell) < frontier[i].distance + 
                calcDistance( frontier[i])) {
                    frontier.splice( i, 0, cell);
                    return;
                }
            i++;
        }
        frontier.push( cell)
    };

    const getNeighbors = ( cell : Cell) => {
        return cell.walls.filter( wall => {
            return ! wall.standing;
        }).map( wall => {
            return wall.left == cell ? wall.right : wall.left;
        }).filter( ( c : Cell) => {
            return c.distance > cell.distance + 1;
        });
    };

    const getPath = ( cell : Cell) => {
        return new Promise( resolve => setTimeout( async () => {
            if (cell.parent == cell)
                return resolve();
            cell.foundPath = true;
            return await resolve( getPath( cell.parent));
        }, appInterface.eventHandlerInterval));
    }

    const loop = () => {
        return new Promise( resolve => setTimeout( async () => {
            if (frontier.length == 0)
                return resolve( false);
            const cell = frontier.shift();
            if (cell.isGoal) {
                await getPath( cell);
                return resolve( true);
            }
            cell.visited = true;
            cell.flashCell( FLASHFORWARD);
            const neighbors = getNeighbors( cell);
            neighbors.map( ( c : Cell) => { 
                c.distance = cell.distance + 1;
                c.parent = cell;
            });
            neighbors.map( Cellinsertion);
            return resolve( await loop());
        }, appInterface.eventHandlerInterval))};

    const xGoal : number = appInterface.goalCell.j;
    const yGoal : number = appInterface.goalCell.i;

    maze.map( row => row.map( cell => cell.distance = maze.length * 
        maze[0].length));

    maze[yInit][xInit].distance = 0;
    maze[yInit][xInit].parent = maze[yInit][xInit];

    var frontier : Cell[] = [maze[yInit][xInit]];
    
    const success = await loop() == true ? true : false;

    appInterface.eventHandlerQueue.push( () => 
    appInterface.signalAlgorithmEnd( success));
}