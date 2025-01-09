import MapElement from './MapElement.js';
import Position from './Position.js';
import Player from './Player.js';
import Monster from './Monster.js';
import Direction from './Direction.js';
import Ghost from './Ghost.js';

export default class Model {
    #matrix
    #sizeX
    #sizeY
    #battleRoyale
    #monsters = []
    #player1
    #player2

    constructor(matrix, sizeX, sizeY) {
        this.#matrix = matrix
        this.#sizeX = sizeX
        this.#sizeY = sizeY
        this.#battleRoyale = 1
        this.InitEntities()
        
        this.#monsters.forEach(m => {
            this.moveIndividualMonster(m);
        });
    }

    InitEntities() {
        for (let i = 0; i < this.#matrix.length; i++) {
            for (let j = 0; j < this.#matrix[i].length; j++) {
                if (this.#matrix[i][j] == MapElement.Player1)
                    this.#player1 = new Player(new Position(i,j), 1, MapElement.Player1);
                else if (this.#matrix[i][j] == MapElement.Player2)
                    this.#player2 = new Player(new Position(i,j), 1, MapElement.Player2);
                else if (this.#matrix[i][j] == MapElement.Monster)
                    this.#monsters.push(new Monster(new Position(i, j)));
            }
        }
    }

    updateMatrix() {
        return this.#matrix;
    }

    moveIndividualMonster(monster) {
        const self = this;
        setInterval(function() {
            self.monsterMovementLogic(monster)
        }, monster.speed * 800)    
    }

    monsterMovementLogic(monster) {
        let nextSpot = monster.position.translate(monster.movingDirection)
        if (!monster.alive) {
            return
        }

        if (this.inBound(nextSpot) && !this.isWall(nextSpot) && !this.isBox(nextSpot) && !this.isBomb(nextSpot)) {
            
            if (this.isPlayer(nextSpot)) {
                let player = this.getPlayer(nextSpot)
                if (!player.invincible) {
                    this.killEntity(player);
                } else {
                    monster.oppositeMovingDirection()
                    return 
                }
            } else if (this.isExplosion(nextSpot)) {
                this.killEntity(monster)
            }

            this.#matrix[monster.position.x][monster.position.y] = MapElement.Field

            if (monster.alive) {
                this.#matrix[nextSpot.x][nextSpot.y] = MapElement.Monster
                monster.position = nextSpot;
            }

        } else {
            monster.movingDirection = Direction.randomize();
        }
    }

    movePlayer(playerNum, d) {
        let player = playerNum == 1 ? this.#player1 : this.#player2;
        const self = this;
        if (!player.moving) {
            self.movementLogic(player, d, playerNum)
            player.moveId = setInterval(function () {
                self.movementLogic(player, d, playerNum)
            }, 500*player.speed)
            player.moving = true
        }
    }

    stopPlayer(playerNum) {
        let player = playerNum == 1 ? this.#player1 : this.#player2;
        if(player.moving) {
            clearInterval(player.moveId);
            player.moving = false;
        }
    }

    movementLogic(p, d, playerNum) {
        let playerMapElement = playerNum == 1 ? MapElement.Player1 : MapElement.Player2;
        let player = playerNum == 1 ? this.#player1 : this.#player2;

        if (!player.alive) return 

        let nextSpot = p.position.translate(d)

        if (!this.inBound(nextSpot)) return

        if ((player.ghost || !this.isBox(nextSpot) && !this.isWall(nextSpot) && !this.isBomb(nextSpot)) && !this.isPlayer(nextSpot)) {
            
            if (this.isMonster(nextSpot) || this.isExplosion(nextSpot)) {
                if (!player.invincible) {
                    this.killEntity(player)
                    return
                } else if (this.isMonster(nextSpot)) {
                    return
                } 
            } else if (this.isPowerUp(nextSpot)) {
                this.collectPowerup(nextSpot, player)
            } else if (this.isCurse(nextSpot)) {
                this.collectCurse(player)
            } else {
    
            }

            
            if (player.mapElem.extraClasses.indexOf("onWall") > -1) {

                this.#matrix[p.position.x][p.position.y] = MapElement.Wall
                player.mapElem.extraClasses.splice(p.mapElem.extraClasses.indexOf("onWall"), 1)

            } else if (player.mapElem.extraClasses.indexOf("onEBox") > -1) { 

                this.#matrix[p.position.x][p.position.y] = MapElement.BoxEmpty
                player.mapElem.extraClasses.splice(p.mapElem.extraClasses.indexOf("onEBox"), 1)

            } else if (player.mapElem.extraClasses.indexOf("onFBox") > -1) { 

                this.#matrix[p.position.x][p.position.y] = MapElement.Box
                player.mapElem.extraClasses.splice(p.mapElem.extraClasses.indexOf("onFBox"), 1)

            } else if (player.mapElem.extraClasses.indexOf("onBomb") > -1) { 

                this.#matrix[p.position.x][p.position.y] = MapElement.Bomb
                player.mapElem.extraClasses.splice(p.mapElem.extraClasses.indexOf("onBomb"), 1)

            } else if (this.#matrix[p.position.x][p.position.y] == MapElement.BombInPlace) {
                
                this.#matrix[p.position.x][p.position.y] = MapElement.Bomb
            
            } else if (this.#matrix[p.position.x][p.position.y] == MapElement.BoxInPlace) {
                
                this.#matrix[p.position.x][p.position.y] = MapElement.BoxEmpty

            } else { 
                this.#matrix[p.position.x][p.position.y] = MapElement.Field
            }

            if (this.isEmptyBox(nextSpot)) {
                player.mapElem.extraClasses.push("onEBox");
            } else if (this.isFullBox(nextSpot)) {
                player.mapElem.extraClasses.push("onFBox");
            } else if (this.isBomb(nextSpot)) {
                player.mapElem.extraClasses.push("onBomb");
            } else if (this.isWall(nextSpot)) {
                player.mapElem.extraClasses.push("onWall");
                console.log("wall")
            }

            if (player.alive) {
                this.#matrix[nextSpot.x][nextSpot.y] = playerMapElement
                p.position = nextSpot;

                if (player.placeBombsASAP) {
                    this.placeBomb(playerNum)
                }
            }   
        }
    }

    placeBomb(playerNum) {
        let player = playerNum == 1 ? this.#player1 : this.#player2;
        let bombedPosition = player.position

        if (player.bombsNumber <= player.bombsPlaced.length && player.detonator) {
            this.explodeAllBombs(playerNum)
            return
        }

        if (player.bombsNumber > player.bombsPlaced.length && !player.cantPlaceBombs  && this.nothingPlaced(bombedPosition)) {
            this.#matrix[bombedPosition.x][bombedPosition.y] = MapElement.BombInPlace
            player.bombsPlaced[player.bombsPlaced.length] = bombedPosition
            const self = this;

            if (!player.detonator) {
                setTimeout(() => {
                    self.explodeBomb(bombedPosition)                
                }, 3000);
            }
            return true;
        } else {
            return false;
        }
    }

    explodeAllBombs(playerNum) {
        let player = playerNum == 1 ? this.#player1 : this.#player2;

        for (let i = 0; i < player.bombsPlaced.length; i++) {
            this.explodeBomb(player.bombsPlaced[i]);
        }
    }
    
    explodeBomb(position, chainReaction = false) {

        if (!this.isBomb(position) && !chainReaction)
            return

        let player
        if (position.inArr(this.#player1.bombsPlaced))
            player = this.#player1
        else 
            player = this.#player2
        
        let x = position.x;
        let y = position.y;
        let delay = 500;
        const self = this;

        let upStop = false
        let downStop = false
        let leftStop = false
        let rightStop = false

        if (this.#matrix[x][y] == MapElement.BombInPlace) {
            if (!player.invincible)
                this.killEntity(player)
        }

        this.explosionLogic(position, true)
        this.updateBombsPlaced(player, position)

        
        setTimeout(() => {
            self.blastSpread(player, 1, position);
        }, 300);
    }

    blastSpread(player, i, position, u=false, d=false, l=false, r=false) {
        if (i > player.blastRange) return

        let upStop = u || this.isWall(position.translateN(Direction.Up, i)) || this.isBox(position.translateN(Direction.Up, i));
        let downStop = d || this.isWall(position.translateN(Direction.Down, i)) || this.isBox(position.translateN(Direction.Down, i));
        let leftStop = l || this.isWall(position.translateN(Direction.Left, i)) || this.isBox(position.translateN(Direction.Left, i));
        let rightStop = r || this.isWall(position.translateN(Direction.Right, i)) || this.isBox(position.translateN(Direction.Right, i));

        if (!u) {
            let upSide = position.translateN(Direction.Up, i);
            this.explosionLogic(upSide)
        }

        if (!d) {
            let downSide = position.translateN(Direction.Down, i);
            this.explosionLogic(downSide)
        }

        if (!l) {
            let leftSide = position.translateN(Direction.Left, i);
            this.explosionLogic(leftSide)
        }

        if (!r) {
            let rightSide = position.translateN(Direction.Right, i);
            this.explosionLogic(rightSide)
        }

        setTimeout(() => {
            this.blastSpread(player, i+1, position, upStop, downStop, leftStop, rightStop)
        }, 300);
    }

    explosionLogic(position, same = false) {
        if (!this.inBound(position) || this.isWall(position))
            return

        let mapElem = this.#matrix[position.x][position.y]
        this.#matrix[position.x][position.y] = MapElement.Explosion
        const self = this
        let newMapElem = MapElement.Field

        setTimeout(() => {
            self.#matrix[position.x][position.y] = newMapElem           
        }, 2000);


        switch (mapElem) {
            case MapElement.Player1:
                if (!this.#player1.invincible)
                    this.killEntity(this.#player1, false)
                break;
            case MapElement.Player2:
                if (!this.#player2.invincible)
                    this.killEntity(this.#player2, false)
                break;
            case MapElement.Monster:
                let mp = this.getMonster(position)
                this.killEntity(mp)
                this.monsterMovementLogic(mp)
                break;
            case MapElement.Box:
                this.destroyBox(position)
                break;
            case MapElement.BoxEmpty:
                this.destroyEmptyBox(position)
                break;
            case MapElement.Bomb || MapElement.BombInPlace:
                if(!same) this.explodeBomb(position, true)
                break;
            default:
                break;
        }

    }

    placeBox(playerNum) {
        let player = playerNum == 1 ? this.#player1 : this.#player2;
        let boxedPosition = player.position

        if (player.boxesNumber > player.boxesPlaced.length && this.nothingPlaced(boxedPosition)) {
            this.#matrix[boxedPosition.x][boxedPosition.y] = MapElement.BoxInPlace
            player.boxesPlaced.push(boxedPosition)
            return true;
        } else {
            return false;
        }
    }

    destroyBox(position) {
        const self = this
        let newMapElem = MapElement.Field
        let num=Math.random();
        if(num < 0.3) { 
            return;
        } else if(num < 0.5) {
            newMapElem = MapElement.Curse
        } else {
            newMapElem = MapElement.randomizePowerups();
        }

        setTimeout(() => {
            self.#matrix[position.x][position.y] = newMapElem           
        }, 2000);
    }

    destroyEmptyBox(position) {
        let player
        if (position.inArr(this.#player1.boxesPlaced))
            player = this.#player1
        else 
            player = this.#player2

        this.updateBoxesPlaced(player, position)
    }

    collectPowerup(position, player) {
        let powerup = this.#matrix[position.x][position.y]
        player.affectPlayer(powerup.instance);
        const self = this
        if (powerup.instance instanceof Ghost) {
            setTimeout(() => {
                if (player.mapElem.extraClasses.indexOf("onWall") > -1 || player.mapElem.extraClasses.indexOf("onFBox") > -1 || player.mapElem.extraClasses.indexOf("onEBox") > -1) {
                    self.killEntity(player)                    
                }
            }, 10000);
        }
    }

    collectCurse(player) {
        let curse = MapElement.Curse.cursesList[Math.floor(Math.random() * (3+1))]
        console.log(player)
        console.log(curse)
        player.affectPlayer(curse);
    }

    killEntity(e, wipe = true) {
        e.alive = false;
        if (e instanceof Player && wipe)
            this.wipePlayer(e);
    } 

    wipePlayer(p) {
        let player = p
        if (player.mapElem.extraClasses.indexOf("onWall") > -1) {

            this.#matrix[p.position.x][p.position.y] = MapElement.Wall
            player.mapElem.extraClasses.splice(p.mapElem.extraClasses.indexOf("onWall"), 1)

        } else if (player.mapElem.extraClasses.indexOf("onEBox") > -1) { 

            this.#matrix[p.position.x][p.position.y] = MapElement.BoxEmpty
            player.mapElem.extraClasses.splice(p.mapElem.extraClasses.indexOf("onEBox"), 1)

        } else if (player.mapElem.extraClasses.indexOf("onFBox") > -1) { 

            this.#matrix[p.position.x][p.position.y] = MapElement.Box
            player.mapElem.extraClasses.splice(p.mapElem.extraClasses.indexOf("onFBox"), 1)
        } else {
            this.#matrix[p.position.x][p.position.y] = MapElement.Field

        }
    }

    getPlayer(position) {
        if (this.#matrix[position.x][position.y] == MapElement.Player1)
            return this.#player1
        return this.#player2
    }

    getMonster(position) {
        for (let i = 0; i < this.#monsters.length; i++) {
            let mp = this.#monsters[i].position
            if (position.equals(mp)) {
                return this.#monsters[i];
            }
        }
        return undefined
    }

    updateBombsPlaced(player, position) {
        let index = -1
        for (let i = 0; i < player.bombsPlaced.length; i++) {
            let bp = player.bombsPlaced[i]
            if (position.equals(bp)) {
                index = i;
            }
        }
        if (index > -1)
            player.bombsPlaced.splice(index, 1);
    }

    updateBoxesPlaced(player, position) {
        let index = -1
        for (let i = 0; i < player.boxesPlaced.length; i++) {
            let bp = player.boxesPlaced[i]
            if (position.equals(bp)) {
                index = i;
            }
        }
        if (index > -1)
            player.boxesPlaced.splice(index, 1);
    }

    isObstacle(position) {
        if (this.#matrix[position.x][position.y] != MapElement.Field) {
            return true;
        } else {
            return false;
        }
    }

    isFree(position) {
        if (this.#matrix[position.x][position.y] == MapElement.Field) {
            return true;
        } else {
            return false;
        }
    }

    isWall(position) {
        if (this.#matrix[position.x][position.y] == MapElement.Wall) {
            return true;
        } else {
            return false;
        }
    }

    isPlayer(position) {
        if (this.#matrix[position.x][position.y] == MapElement.Player1 || this.#matrix[position.x][position.y] == MapElement.Player2) {
            return true;
        } else {
            return false;
        }
    }

    isMonster(position) {
        if (this.#matrix[position.x][position.y] == MapElement.Monster) {
            return true;
        } else {
            return false;
        }
    }

    isExplosion(position) {
        if (this.#matrix[position.x][position.y] == MapElement.Explosion) {
            return true;
        } else {
            return false;
        }
    }

    isBox(position) {
        if (this.#matrix[position.x][position.y] == MapElement.Box || this.#matrix[position.x][position.y] == MapElement.BoxEmpty) {
            return true;
        } else {
            return false;
        }
    }

    isEmptyBox(position) {
        if (this.#matrix[position.x][position.y] == MapElement.BoxEmpty) {
            return true;
        } else {
            return false;
        }
    }

    isFullBox(position) {
        if (this.#matrix[position.x][position.y] == MapElement.Box) {
            return true;
        } else {
            return false;
        }
    }

    isBomb(position) {
        if (this.#matrix[position.x][position.y] == MapElement.Bomb || this.#matrix[position.x][position.y] == MapElement.BombInPlace) {
            return true;
        } else {
            return false;
        }
    }

    isPowerUp(position) {
        let powerups = MapElement.allPowerups();
        let mapElem = this.#matrix[position.x][position.y] 

        for (let i = 0; i < powerups.length; i++) {
            if (powerups[i] == mapElem) {
                return true
            }            
        }

        return false
    }

    isCurse(position) {
        if (this.#matrix[position.x][position.y] == MapElement.Curse) {
            return true;
        } else {
            return false;
        }
    }

    inBound(position) {
        if (position.x >= 0 && position.x < this.#sizeX && position.y >= 0 && position.y < this.#sizeY)
            return true
        return false
    }

    nothingPlaced(position) {
        if (this.#matrix[position.x][position.y] == MapElement.Player1 || this.#matrix[position.x][position.y] == MapElement.Player2) {
            return true
        } else {
            return false
        }
    }

    getWinner() {
        if (this.#player1.alive && this.#player2.alive) { // nowinner
            return -1
        } else if (this.#player1.alive) { // player1 winner
            return 1
        } else if (this.#player2.alive) { // player2 winner
            return 2
        } else { // draw
            return 0
        }
    }

    battleRoyale() {
        for (let i = 0; i < this.#sizeX; i++) {
            for (let j = 0; j < this.#sizeY; j++) {        
                if (i  == this.#battleRoyale || j == this.#battleRoyale || i == this.#sizeX-1-this.#battleRoyale || j == this.#sizeY-1-this.#battleRoyale) {
                    switch (this.#matrix[i][j]) {
                        case MapElement.Player1:
                            this.killEntity(this.#player1)
                            break;
                        case MapElement.Player2:
                            this.killEntity(this.#player2)
                            break;
                        case MapElement.Monster:
                            let mp = this.getMonster(new Position(i,j))
                            this.killEntity(mp)
                            break;
                        default:
                            break;
                    }
                    this.#matrix[i][j] = MapElement.Wall;
                }
            }
        }

        this.#battleRoyale++;
    }
}