import { Cell, Wall } from './maze';
import { AppInterface } from '../interface/appInterface';

export const empty = (appInterface : AppInterface) =>
    async ( maze : Cell[][], xInit : number, yInit : number) => {

    const eventHandlerInterval = appInterface.eventHandlerInterval;
    appInterface.eventHandlerInterval = 0;
    maze.map( row => row.map( cell => {
        cell.setIsPath( true);
        cell.walls.map( wall => 
        wall.standing = false); ;
    }));
    appInterface.eventHandlerInterval = eventHandlerInterval;
    
    appInterface.eventHandlerQueue.push( () => 
        appInterface.signalAlgorithmEnd());
}