import { Cell, Wall } from '../generator/maze';
import { FLASHFORWARD, FLASHBACKWARD } from '../definitions/defs';
import { AppInterface } from '../interface/appInterface';

export const dfsGen = (appInterface : AppInterface) =>
    async ( maze : Cell[][], xInit : number, yInit : number) => {

    const getWalls = cell => cell.walls.
    filter( ( wall : Wall) => { 
        return wall.standing && ! (wall.left.isPath && wall.right.isPath); 
    });


    const loop = ( cell) => {
        return new Promise( (resolve) => {
            setTimeout( async () => {
                var newWalls = getWalls( cell);
                while (newWalls.length > 0) {
                    const wallIdx = Math.floor( Math.random() * 
                        newWalls.length); 
                    const wall = newWalls.splice( wallIdx, 1)[0];
                    const newCell = wall.left == cell ? wall.right : 
                        wall.left;
                    if (newCell.isPath)
                        continue;
                    wall.standing = false;
                    newCell.setIsPath( true);
                    newCell.flashCell( FLASHFORWARD);
                    await loop( newCell);
                }
                setTimeout( () => {
                    cell.flashCell( FLASHBACKWARD);
                    return resolve();
                }, appInterface.eventHandlerInterval / 2);
            }, appInterface.eventHandlerInterval);
        });
    };

    const cell = maze[yInit][xInit];
    cell.setIsPath( true);
    await loop( cell) 

    appInterface.eventHandlerQueue.push( () => 
        appInterface.signalAlgorithmEnd());
};