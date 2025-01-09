export default class Entity {
    constructor(p, speed = 1) {
        this.speed = speed;
        this.alive = true;
        this.position = p;        
    }

    isAlive() {
        return this.alive;
    }
}
