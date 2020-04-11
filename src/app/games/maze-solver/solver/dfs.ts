import { Cell, Wall } from '../generator/maze';
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
        var promise = new Promise( (resolve) => {
            setTimeout( async () => {
                var newCells = filter( cell);
                while (newCells.length > 0) {
                    const newCell = newCells.pop();
                    newCell.visited = true;
                    if (newCell.isGoal || await loop( newCell)) {
                        cell.foundPath = true;
                        return resolve( true);
                    } 
                }
                return resolve( false);
            }, appInterface.eventHandlerInterval);
        });
        return promise;
    };

    const cell = maze[yInit][xInit];
    cell.visited = true;
    await loop( cell);
    appInterface.signalAlgorithmEnd();
};