export default class Position {
    x
    y

    constructor(x, y) {  
        this.x = x;
        this.y = y;    
    }

    translate(direction) {
        return new Position(this.x + direction.x, this.y + direction.y);
    }

    translateN(direction, n) {
        return new Position(this.x + (direction.x * n), this.y + (direction.y * n));
    }

    equals(position) {
        if (this.y == position.y && this.x == position.x) {
            return true;
        } else {
            return false;
        }
    }

    inArr(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (this.equals(arr[i]))
                return true            
        }
        return false;
    }
}