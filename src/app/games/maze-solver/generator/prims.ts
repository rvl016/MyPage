import { Cell, Wall } from './maze';

export function prim( maze : Cell[][], xInit : number, yInit : number) {
    const initCell = maze[yInit][xInit];
    var wallList = [];
    wallList = wallList.concat( initCell.walls);
    initCell.setIsPath( true);
    
    const getNewCell = ( wall) => {
        if (wall.getLeft().getIsPath() && wall.getRight().getIsPath()) 
            return null;
        if (! wall.getLeft().getIsPath()) {
            return wall.getLeft();
        }
        return wall.getRight();
    }
/*     while (wallList.length > 0) {
        const len = wallList.length;
        const wallIdx = Math.floor( Math.random() * len); 

        const wall = wallList.splice( wallIdx, 1)[0];
        

        const cell = getNewCell( wall);
        if (cell) {
            wall.setStanding( false);
            cell.setIsPath( true);
            wallList = wallList.concat( cell.walls);
        }
    } */
        
    var loop = setInterval( () => {
        if (wallList.length == 0) {
            clearInterval( loop);
            return;
        }
        const len = wallList.length;
        const wallIdx = Math.floor( Math.random() * len); 

        const wall = wallList.splice( wallIdx, 1)[0];
        

        const cell = getNewCell( wall);
        if (cell) {
            wall.setStanding( false);
            cell.setIsPath( true);
            wallList = wallList.concat( cell.walls);
        }
    }, 10);
}