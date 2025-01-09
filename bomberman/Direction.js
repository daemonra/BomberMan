export default class Direction {
    
    static Right = new Direction(0, 1);
    static Left = new Direction(0, -1);
    static Up = new Direction(-1, 0);
    static Down = new Direction(1, 0);
    x
    y

    constructor(x, y) {  
        this.x = x;
        this.y = y;    
    }

    static allDirection(){
        let arr=[]
        arr.push(this.Right)
        arr.push(this.Left)
        arr.push(this.Up)
        arr.push(this.Down)

        return arr;
    }

    static randomize() {
        return this.allDirection()[Math.floor(Math.random() * (3+1))];
    }
}