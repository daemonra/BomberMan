import Entity from "./Entity.js";

export default class Player extends Entity {
    moving 
    constructor(p, speed = 1, mapElem) {
        super(p, speed);
        this.mapElem = mapElem;
        this.moving = false;
        this.moveId = null;
        this.boxesNumber = 0;
        this.boxesPlaced = [];
        this.score = 0;                        // Player's score
        this.bombsNumber = 1;                  // Number of bombs the player can carry
        this.bombsPlaced = [];                 // Number of bombs currently placed by the player
        this.invincible = false;               // Flag indicating if the player is invincible
        this.detonator = false;                // Flag indicating if the player has the detonator ability
        this.rollerskate = false;              // Flag indicating if the player has the rollerskate ability
        this.ghost = false;                    // Flag indicating if the player is in ghost mode
        this.decreasedSpeed = false;           // Flag indicating if the player's speed is decreased
        this.blastRange = 2;                   // Flag indicating if the player has increased bomb blast range
        this.cantPlaceBombs = false;           // Flag indicating if the player can't place bombs
        this.placeBombsASAP = false;           // Flag indicating if the player should place bombs as soon as possible
    }

    affectPlayer(sa) {
        sa.affectPlayer(this);
    }
}
