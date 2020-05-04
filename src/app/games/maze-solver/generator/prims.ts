import { Cell, Wall } from './maze';
import { AppInterface } from '../interface/appInterface';

export const prim = (appInterface : AppInterface) =>
    async ( maze : Cell[][], xInit : number, yInit : number) => {
        const initCell = maze[yInit][xInit];
        var wallList = [];
        wallList = wallList.concat( initCell.walls);
        initCell.setIsPath( true);
        
        const getNewCell = ( wall) => {
            if (wall.left.isPath && wall.right.isPath) 
                return null;
            if (! wall.left.isPath) 
                return wall.left;
            return wall.right;
        }

        const loop = () => { return new Promise( (resolve) => {
            setTimeout( async resolve => {
                if (wallList.length == 0)
                    return resolve();
                const len = wallList.length;
                const wallIdx = Math.floor( Math.random() * len); 

                const wall = wallList.splice( wallIdx, 1)[0];
                
                const cell = getNewCell( wall);
                if (cell) {
                    wall.standing = false;
                    cell.setIsPath( true);
                    wallList = wallList.concat( cell.walls);
                }
                await loop();
                resolve();
            }, appInterface.eventHandlerInterval, resolve);
        })};

        await loop();
        
        appInterface.eventHandlerQueue.push( () => 
            appInterface.signalAlgorithmEnd());
    }