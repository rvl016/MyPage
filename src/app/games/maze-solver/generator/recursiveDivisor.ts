import { Cell, Wall } from './maze';
import { AppInterface } from '../interface/appInterface';

export const recursiveDiv = (appInterface : AppInterface) =>
    async ( maze : Cell[][], xInit : number, yInit : number) => {

    const eventHandlerInterval = appInterface.eventHandlerInterval;
    appInterface.eventHandlerInterval = 0;
    maze.map( row => row.map( cell => {
        cell.setIsPath( true);
        cell.walls.map( wall => 
        wall.standing = false); ;
    }));
    appInterface.eventHandlerInterval = eventHandlerInterval;

    const setWall = ( i, j, orient, standing) => {
        const iNext = orient == 0 ? i + 1 : i;
        const jNext = orient == 1 ? j + 1 : j;
        maze[i][j].walls.some( wall => {
            if (wall.left == maze[iNext][jNext]) {
                wall.standing = standing;
                return true;
            }
            return false;
        });
    };

    const loop = ( yInit, xInit, rows, cols) => {
        var promise = new Promise( resolve => {
            setTimeout( async () => {
                if (rows == 1 || cols == 1) 
                    return resolve();                
        
                const y = Math.floor( Math.random() * (rows - 1)) + yInit;
                const x = Math.floor( Math.random() * (cols - 1)) + xInit;

                Array( cols).fill( 0).map( ( val, j) => setWall( y, j + 
                    xInit, 0, true));
                Array( rows).fill( 0).map( ( val, i) => setWall( i + yInit,
                     x, 1, true));

                if (Math.random() < .5) {
                    const j = Math.floor( Math.random() * cols) + xInit;
                    setWall( y, j, 0, false);
                    var i = Math.floor( Math.random() * (y + 1 - yInit)) + 
                        yInit;
                    setWall( i, x, 1, false);
                    i = Math.floor( Math.random() * (rows + yInit - y - 1)) +
                        y + 1;
                    setWall( i, x, 1, false);
                }
                else {
                    const i = Math.floor( Math.random() * rows) + yInit;
                    setWall( i, x, 1, false);
                    var j = Math.floor( Math.random() * (x + 1 - xInit)) + 
                        xInit;
                    setWall( y, j, 0, false);
                    j = Math.floor( Math.random() * (cols + xInit - x - 1)) +
                        x + 1;
                    setWall( y, j, 0, false);
                }
                await loop( yInit, xInit, y + 1 - yInit, x + 1 - xInit);
                await loop( yInit, x + 1, y + 1 - yInit, 
                    cols - x - 1 + xInit);
                await loop( y + 1, xInit, rows - y - 1 + yInit, 
                    x + 1 - xInit);
                await loop( y + 1, x + 1, rows - y - 1 + yInit, cols - x - 1 
                    + xInit);
                return resolve();
            }, appInterface.eventHandlerInterval); 
        });
        return promise;
    };

    const rows = maze.length;
    const cols = maze[0].length;
    await loop( 0, 0, rows, cols);

    appInterface.eventHandlerQueue.push( () => 
        appInterface.signalAlgorithmEnd());
}