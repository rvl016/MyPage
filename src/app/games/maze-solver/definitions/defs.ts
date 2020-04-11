import { prim } from '../generator/prims';
import { dfs } from '../solver/dfs';

export const ROWS = 20;
export const COLS = 30;
export const BLOCK_SIZE = 20;

// Event Handler timings
export const EVENTHANDLERONBOOT = 0;
export const EVENTHANDLERONBUILDING = 5;
export const EVENTHANDLERONSEARCHING = 100;


// TextStyle
export const TEXTSTYLE = new PIXI.TextStyle({
    fontSize: 12,
    fontWeight: 'bold',
    wordWrap: true,
    wordWrapWidth: 100,
});

// Context bar types
export const BUILD = 0;
export const SEARCH = 1;


// Algorithms
export const BUILDNAMES = ['Random Prim\'s'];
export const BUILDFUNCS = [prim];
export const SEARCHNAMES = ['Depth First Search'];
export const SEARCHFUNCS = [dfs];

// Maze states
export const EMPTYMAZE = 0b1;
export const BUILDINGMAZE = 0b10;
export const MAZEREADY = 0b100;
export const SEARCHINGMAZE = 0b1000;
export const GAMEOVER = 0b10000;

export const state2eventTiming = new Map( [
    [EMPTYMAZE, EVENTHANDLERONBOOT], 
    [BUILDINGMAZE, EVENTHANDLERONBUILDING],
    [MAZEREADY, EVENTHANDLERONBOOT],
    [SEARCHINGMAZE, EVENTHANDLERONSEARCHING],
    [GAMEOVER, 100]]);

// Fields
export const PATHFIELD = 0b1;
export const PATHFOUNDFIELD = 0b10;
export const VISITFIELD = 0b100;
export const ISSTART = 0b1000;
export const ISGOAL = 0b10000;

export const STANDFIELD = 0b10000;

// Dim 
export const BASELINEDIM = 0xFFFFFF;
export const DIMVAL = 0xDDDDDD;

// Colors
export const BACKGROUNDCOL = 0xCCCCCC;
export const NEWPATHCOL = 0xAA4444;

export const wallState2col = ( state) => {
    return state & STANDFIELD ? 0x999999 : BACKGROUNDCOL;
}

export const cellState2col = ( state) => { 
    return ((state & PATHFIELD) != 0b0 ? BACKGROUNDCOL : 0x444444) +
        ((state & VISITFIELD) != 0b0 ? 0x002200 : 0x000000) -
        (((state & ISSTART) != 0b0 ? 0x444400 : 0x000000) |
        ((state & ISGOAL) != 0b0 ? 0x004444 : 0x000000)) - 
        ((state & PATHFOUNDFIELD) != 0b0 ? 0x003333 : 0x000000);  
};

// // Button Cols
export const BUTTONBORDERCOL = 0x333333;
export const BUTTONCOL = 0x444444;

