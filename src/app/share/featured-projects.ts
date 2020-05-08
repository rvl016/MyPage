import { FeaturedProject } from './featured-project';

export const FEATUREDPROJECTS : FeaturedProject[] = [
    {
        id : 0,
        active: false,
        name : "Conway's Game of Life",
        image : '/',
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
        image : '/assets/images/marketLogger.png',
        ghLink : 'https://github.com/rvl016/Market-Logger',
        usedTechs : ["JavaScript", "Ruby", "C++", "Rails", "React"],
        tryItLink : null,
        label : 'marketLoggerApp',
        description : "Full stack web project, with Ruby on Rails backend and React frontend. The backend application serves as a JSON API, where it offers stock and companies profiles data and also users profiles."
    },
    {
        id : 2,
        active: true,
        name : "Maze Boomer",
        image : '/assets/images/mazeBoomer.png',
        ghLink : 'https://github.com/rvl016/MazeBoomer',
        usedTechs : ["TypeScript", "PIXI.js"],
        tryItLink : "/games/maze",
        label : 'mazeBoomerApp',
        description : "This sort of game involves building a maze with a choosen algorithm and then solve a path between two choosen cells with a choosen algorithm. When solving a path, the user can place and remove barriers in unexplored areas of the maze, affecting the solver's path."
    },
];
