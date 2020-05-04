
export const ROWS = 20;
export const COLS = 30;
export const BLOCK_SIZE = 20;

export const BARHEIGHT = 20;

// Event Handler timings
export const EVENTHANDLERONBOOT = 0;
export const EVENTHANDLERONBUILDING = 100;
export const EVENTHANDLERONSEARCHING = 1000;


// TextStyle
export const TEXTSTYLE = new PIXI.TextStyle({
    fontSize: 12,
    fontWeight: 'bold',
});

// Context bar types
export const BUILD = 0;
export const SEARCH = 1;
export const SLIDER = 2;
export const RESET = 3;


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
    [GAMEOVER, 100]
]);

export const state2barType = new Map( [
    [EMPTYMAZE, BUILD], 
    [BUILDINGMAZE, SLIDER],
    [MAZEREADY, SEARCH],
    [SEARCHINGMAZE, SLIDER],
    [GAMEOVER, RESET]
]);

// Fields
export const PATHFIELD = 0b1;
export const PATHFOUNDFIELD = 0b10;
export const VISITFIELD = 0b100;
export const ISSTART = 0b1000;
export const ISGOAL = 0b10000;
export const FLASHFORWARD = 0b100000;
export const FLASHBACKWARD = 0b1000000;

export const STANDFIELD = 0b10000;

// Dim 
export const BASELINEDIM = 0xFFFFFF;
export const DIMVAL = 0xDDDDDD;

// Colors
export const BACKGROUNDCOL = 0xCCCCCC;
export const NEWPATHCOL = 0xAA4444;

export const wallState2col = ( state) => {
    return state & STANDFIELD ? 0x888888 : BACKGROUNDCOL;
}

export const cellState2col = ( state) => {
    if ((state & ISSTART) != 0)
        return 0x55BCC9;
    if ((state & ISGOAL) != 0)
        return 0xFC4445;
    if ((state & PATHFOUNDFIELD) != 0) 
        return 0xDAAD86;
    if ((state & VISITFIELD) != 0)
        return 0x8EE4AF;
    if ((state & PATHFIELD) != 0)
        return BACKGROUNDCOL;
    return 0x444444;
};

export const cellFlash2col = ( type) => {
    return type == FLASHBACKWARD ? 0x659DBD : 0x000000 + 
        type == FLASHFORWARD ? 0xFBEEC1 : 0x000000;
}

// // Button Cols
export const BUTTONBORDERCOL = 0x333333;
export const BUTTONCOL = 0x444444;

