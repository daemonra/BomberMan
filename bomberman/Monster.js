import Direction from './Direction.js';
import Entity from './Entity.js';

export default class Monster extends Entity {
    constructor(p, speed = 1) {
        super(p, speed);
        this.movingDirection = Direction.randomize();
        this.movingDirectionChange = 10 + Math.floor(Math.random() * (5+1));
        
        const self = this
        setInterval(() => {
            self.movingDirection = Direction.randomize();            
        }, this.movingDirectionChange*1000);
    }

    oppositeMovingDirection() {
        switch (this.movingDirection) {
            case Direction.Up:
                this.movingDirection = Direction.Down;
                break;
            case Direction.Down:
                this.movingDirection = Direction.Up;
                break;
            case Direction.Left:
                this.movingDirection = Direction.Right;
                break;
            case Direction.Right:
                this.movingDirection = Direction.Left;
                break;
            default:
                break;
        }
    }
}