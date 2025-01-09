import BoardView from "./BoardView.js";
import Model from "./Model.js";
import Direction from "./Direction.js";
import Position from "./Position.js";
import MapElement from "./MapElement.js";

export default class Game {
    #matrix
    #sizeX
    #sizeY
    #boardView
    #model
    #time
    #possibleWinner
    #battleRoyale
    #battleRoyaleRound

    constructor(m, sizeX, sizeY) {
        this.#matrix = m;
        this.#sizeX = sizeX;
        this.#sizeY = sizeY;
        this.#boardView = new BoardView();
        this.#model = new Model(this.#matrix, this.#sizeX, this.#sizeY); // attention to size
        this.#time = 2400;
        this.#possibleWinner = 0;
        this.#battleRoyale = [600, 500, 400, 300, 200]
        this.#battleRoyaleRound = 0
        this.ControlEventSetup();
        this.#boardView.renderMatrix(this.#matrix);

    
            
    

        const self = this;

        let ssid = setInterval(function () {
            let actualWinner = self.#model.getWinner()
            if (self.#possibleWinner > 0) {
                if (self.#possibleWinner == actualWinner) {
                    console.log("Winner: Player "+ actualWinner);
                    self.EndGameMessage("The Winner is: Player "+ actualWinner+ "!");
                } else {
                    console.log("Draw");
                    self.EndGameMessage("The Game Ended in Draw!");
                }
                clearInterval(ssid);
            }

            if(actualWinner > 0) {
                setTimeout(() => {
                    self.#possibleWinner = actualWinner;
                }, 5000);
            }

            if(self.#time == 0) {
                if(actualWinner <= 0) {
                    self.EndGameMessage("The Game Ended in Draw!");
                    console.log("Draw");
                } else {
                    self.EndGameMessage("The Winner is: Player "+ actualWinner+ "!");
                }
                clearInterval(ssid);
            }

            if (self.#battleRoyale[self.#battleRoyaleRound] == 0 && self.#battleRoyaleRound < 5) {
                self.#model.battleRoyale();
                self.#battleRoyaleRound++
            }

            self.#matrix = self.#model.updateMatrix();
            self.#boardView.renderMatrix(self.#matrix);
            self.#boardView.updateGameTimer(Math.floor(self.#time / 10))
            self.#time--;

            if (self.#battleRoyaleRound < 5) {
                self.#battleRoyale[self.#battleRoyaleRound]--;
                self.#boardView.updateBattleRoyaleTime(Math.floor(self.#battleRoyale[self.#battleRoyaleRound] / 10))
            }

        }, 100);
    }

    EndGameMessage(m) {
        document.getElementById("winLoseMessage").innerHTML = m;
        this.#boardView.showModule("endGameStatusPopup");
    }
    
    ControlEventSetup() {

        document.addEventListener("keydown", (event) => {
            switch(event.code) {
                case "KeyA":
                    this.#model.movePlayer(1, Direction.Left);
                    break;
                case "KeyS":
                    this.#model.movePlayer(1, Direction.Down);
                    break;
                case "KeyD":
                    this.#model.movePlayer(1, Direction.Right);
                    break;
                case "KeyW":
                    this.#model.movePlayer(1, Direction.Up);
                    break;
                default:
                    // code block
            }
        })

        document.addEventListener("keyup", (event) => {
            switch(event.code) {
                case "KeyA":
                    this.#model.stopPlayer(1);
                    break;
                case "KeyS":
                    this.#model.stopPlayer(1);
                    break;
                case "KeyD":
                    this.#model.stopPlayer(1);
                    break;
                case "KeyW":
                    this.#model.stopPlayer(1);
                    break;
                case "KeyC":
                    this.#model.placeBomb(1);
                    break;
                case "KeyF":
                    this.#model.placeBox(1);
                    break;
                default:
                    // code block
            }
        })

        document.addEventListener("keydown", (event) => {
            switch(event.code) {
                case "KeyJ":
                    this.#model.movePlayer(2, Direction.Left);
                    break;
                case "KeyK":
                    this.#model.movePlayer(2, Direction.Down);
                    break;
                case "KeyL":
                    this.#model.movePlayer(2, Direction.Right);
                    break;
                case "KeyI":
                    this.#model.movePlayer(2, Direction.Up);
                    break;
                default:
                    // code block
            }
        })

        document.addEventListener("keyup", (event) => {
            switch(event.code) {
                case "KeyJ":
                    this.#model.stopPlayer(2);
                    break;
                case "KeyK":
                    this.#model.stopPlayer(2);
                    break;
                case "KeyL":
                    this.#model.stopPlayer(2);
                    break;
                case "KeyI":
                    this.#model.stopPlayer(2);
                    break;
                case "KeyN":
                    this.#model.placeBomb(2);
                    break;
                case "KeyH":
                    this.#model.placeBox(2);
                    break;
                default:
                    // code block
            }
        })
    }
}