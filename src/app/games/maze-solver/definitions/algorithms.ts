import { prim } from '../generator/prims';
import { recursiveDiv } from '../generator/recursiveDivisor';
import { dfsGen } from '../generator/dfs-gen';
import { empty } from '../generator/empty';

import { dfs } from '../solver/dfs';
import { aStar } from '../solver/a-star';


// Algorithms
export const BUILDNAMES = ['Random Prim\'s', 'Recursive Divisor', 'Depth First Gen', 'Empty Maze'];
export const BUILDFUNCS = [prim, recursiveDiv, dfsGen, empty];
export const SEARCHNAMES = ['Depth First Search', 'A-Star Search'];
export const SEARCHFUNCS = [dfs, aStar];
