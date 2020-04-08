export abstract class Segment {
    public x : number;
    public y : number;
    public growing : Boolean;
    protected next : Segment;
    protected previous : Tail;

    constructor( xInit : number, yInit : number) {
        this.x = xInit;
        this.y = yInit;
        this.growing = false;
    }

    abstract move() : void;
    abstract grow() : void;

    getPrevious() : Segment {
        return this.previous;
    }

    getNext() : Segment {
        return this.next;
    }
}

export class Head extends Segment {
    private direction : String;

    constructor( xInit : number, yInit : number, yTail : number) {
        super( xInit, yInit);
        this.next = null;
        this.previous = new Tail( xInit, yTail, this);
        this.direction = null;
    }

    nextStep( direction : String) : Object {
        var y : number = this.y;
        var x : number = this.x; 
        if (direction == "ArrowUp")
            return { 'x' : x, 'y' : y - 1 };
        else if (direction == "ArrowDown")
            return { 'x' : x, 'y' : y + 1 };
        else if (direction == "ArrowRight")
            return { 'x' : x + 1, 'y' : y };
        else if (direction == "ArrowLeft")
            return { 'x' : x - 1, 'y' : y };
    }

    move() {
        const newCoords = this.nextStep( this.direction);
        this.x = newCoords['x'];
        this.y = newCoords['y'];
    }

    changeDirection( newDirection : String) {
        const newCoords = this.nextStep( newDirection);
        if (newCoords['x'] == this.previous.x && newCoords['y'] == this.previous.y)
            return;
        this.direction = newDirection;
    }

    getDirection() {
        return this.direction;
    }

    grow() {
        this.previous.growing = true;
        this.growing = false;
    }
}

export class Tail extends Segment {
    constructor( xInit : number, yInit : number, next : Segment) {
        super( xInit, yInit);
        this.next = next;
    }

    move() {
        this.x = this.next.x;
        this.y = this.next.y;
    }

    grow() {
        if (this.previous == null) {
            const xNew = this.x - (this.next.x - this.x);
            const yNew = this.y - (this.next.y - this.y);
            this.previous = new Tail( xNew, yNew, this);
        }
        else
            this.previous.growing = true;
        this.growing = false;
    }
}