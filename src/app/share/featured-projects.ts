import { FeaturedProject } from './featured-project';
import { environment } from '../../environments/environment';

export const FEATUREDPROJECTS : FeaturedProject[] = [
    {
        id : 0,
        active: false,
        name : "Conway's Game of Life",
        image : null,
        ghLink : null,
        usedTechs : ["JavaScript"],
        tryItLink : null,
        label : 'conwaysApp',
        description : ""
    },
    {
        id : 1,
        active: true,
        name : "Market Logger",
        image : environment.baseUrl + '/assets/images/marketLoggerDemo.gif',
        ghLink : 'https://github.com/rvl016/Market-Logger',
        usedTechs : ["JavaScript", "Ruby", "C++", "Rails", "React"],
        tryItLink : null,
        label : 'marketLoggerApp',
        description : "Full stack web project, with Ruby on Rails backend and React frontend. The backend application serves as a JSON API, where it offers stock and companies profiles data and users profiles also."
    },
    {
        id : 2,
        active: true,
        name : "Maze Boomer",
        image : environment.baseUrl + '/assets/images/mazeBoomerDemo.gif',
        ghLink : 'https://github.com/rvl016/MazeBoomer',
        usedTechs : ["TypeScript", "PIXI.js"],
        tryItLink : "/games?selected=app-maze-solver",
        label : 'mazeBoomerApp',
        description : "This sort of game involves building a maze with a choosen algorithm and then solve a path between two choosen cells with a choosen algorithm. When solving a path, the user can place and remove barriers in unexplored areas of the maze, affecting the solver's path."
    },
];
