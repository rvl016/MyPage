import { Cell, Wall } from '../generator/maze';
import { FLASHFORWARD, FLASHBACKWARD } from '../definitions/defs';
import { AppInterface } from '../interface/appInterface';

export const dfs = (appInterface : AppInterface) =>
    async ( maze : Cell[][], xInit : number, yInit : number) => {

    const filter = cell => cell.walls.filter( _ => { return ! _.standing;}).
    map( _ => {
        if (_.left != cell)
            return _.left;
        return _.right;
    }).filter( _ => { return ! _.visited;}); 

    const loop = ( cell) => {
        return new Promise( (resolve) => {
            setTimeout( async () => {
                var newCells = filter( cell);
                while (newCells.length > 0) {
                    const newCell = newCells.pop();
                    newCell.visited = true;
                    newCell.flashCell( FLASHFORWARD);
                    if (newCell.isGoal || await loop( newCell)) {
                        cell.foundPath = true;
                        return resolve( true);
                    } 
                }
                setTimeout( () => {
                    cell.flashCell( FLASHBACKWARD);
                    return resolve( false);
                }, appInterface.eventHandlerInterval / 2);
            }, appInterface.eventHandlerInterval);
        });
    };

    const cell = maze[yInit][xInit];
    cell.visited = true;
    const success = await loop( cell) == true ? true : false;

    appInterface.eventHandlerQueue.push( () => 
        appInterface.signalAlgorithmEnd( success));
};