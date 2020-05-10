import { Game } from './game';

export const GAMES : Game[] = [
    {
        name : "Snake",
        id : 0,
        selector : "app-snake",
        image : '/assets/images/snake.png',
        explanation : [
            "The snake is naturally divided into segments, so I made an abstract class <em>Segment</em> with <em>Head</em> and <em>Tail</em> extensions. Every <em>Segment</em> object has a <em>next</em> and a <em>previous</em> pointers to adjacent segments, so every tail segment just needs to get the coordinates of the next segment (towards the head) to know its future coordinates. The head is the exception here, for which the future coordinates depend upon the current direction of movement.",
            "Every segment also has a <em>isGrowing</em> state, that whenever is true, sets the previous segment <em>isGrowing</em> to true and then turns itself to false. The exception is the very last tail segment, that finishes off the job calling a new <em>Tail</em> segment that is appended to the end of the snake. It is based in the <em>isGrowing</em> state that we can see the food flowing through the snake after it eats food.",
            "Then came the disadvantage of this approach: whenever the head of the snake moves, we have to check if any collision towards itself happened. For that, we have to recurse through all snake tail finding if the head coordinates matches any of the tail coordinates. This means that as the snake grows, the overhead grows linearly. If a matrix approach were used, we would just check if the coordinates for which the head is moving to is already occupied in the matrix.",
            "Finally, the snake can't turn back to itself, for that I just check if the new direction that the user is taking does not lead the head to its adjacent segment."
        ],
        how2play : []
    },
    {
        name : "Maze Boomer",
        id : 1,
        selector : "app-maze-solver",
        image : null,
        explanation : [
        ],
        how2play : [
            "Left click in some algorithm in the bar at bottom of canvas, then choose a start cell on canvas with left click. Finally, click on start button.", 
            "You can change the speed of the algorithm by dragging the dragger at the bottom of the canvas.",
            "When the generator finishes, you may choose an algorithm for finding a path on the maze, choose the start and goal cells with left and right click, respectively, and then click on the start button.",
            "During the search, you can place and remove barriers in the maze with left click, but only in cells where the searcher didn't visit (visited cells are green) yet.",
            "Again, you can drag the dragger to set the speed of the algorithm."
        ]
    }
]

