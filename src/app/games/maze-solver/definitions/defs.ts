export const ROWS = 20;
export const COLS = 30;
export const BLOCK_SIZE = 20;

export const UPDATEINTERVAL = 250;

export const HORIZONTAL = 0;
export const VERTICAL = 1;

export const PATHFIELD = 0b1;
export const VISITFIELD = 0b10;

export const STANDFIELD = 0b1000;

export const BACKGROUNDCOL = 0xCCCCCC;
export const NEWPATHCOL = 0xAA4444;

export const wallState2col = ( state) => {
    return state & STANDFIELD ? 0x999999 : BACKGROUNDCOL;
}

export const cellState2col = ( state) => { 
    return ((state & PATHFIELD) != 0b0 ? BACKGROUNDCOL : 0x444444) |
        ((state & VISITFIELD) != 0b0 ? 0x002200 : 0x000000);  
};


