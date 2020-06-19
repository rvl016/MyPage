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
        description : "This sort of game involves building a maze with a chosen algorithm and then solve a path between two chosen cells with a chosen algorithm. When solving a path, the user can place and remove barriers in unexplored areas of the maze, affecting the solver's path."
    },
    {
        id : 3,
        active: true,
        name : "The Resident Zombie",
        image : null,
        ghLink : null,
        usedTechs : ["Ruby", "Rails"],
        tryItLink : null,
        label : 'residentZombieApp',
        description : "A JSON REST API made with Ruby on Rails for trading items in a zombie pandemic scenario. The user can sign up declaring some personal data and his inventory. A registered user can trade items with peers, accuse them for being a zombie and get reported statistics in the network. The back-end enforces some rules about trading and banning users in the network. (currently private)"
    },
    {
        id : 4,
        active: true,
        name : "Vendor Product API",
        image : null,
        ghLink : 'https://github.com/rvl016/Vendor-Product-API',
        usedTechs : ["Python", "Django", "Rest Framework"],
        tryItLink : 'https://vendor-product-api.herokuapp.com/api/vendors',
        label : 'vendorProductAPIApp',
        description : "A JSON REST API made with Django and Django Rest Framework for managing vendors and its products data by working with CRUD operations."
    },
    {
        id : 5,
        active: true,
        name : "Vendor Product Frontend",
        image : environment.baseUrl + '/assets/images/vendorProductDemo.gif',
        ghLink : 'https://github.com/rvl016/Vendor-Product-Frontend',
        usedTechs : ["JavaScript", "React", "Material-UI"],
        tryItLink : 'https://rvl016.github.io/Vendor-Product-Frontend',
        label : 'vendorProductFrontendApp',
        description : "The frontend that consumes from the Vendor Product API. It allows the CRUD operations and searching."
    },
];
