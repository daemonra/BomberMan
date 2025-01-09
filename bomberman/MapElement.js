import SpecialAbillity from "./SpecialAbillity.js";
import Invincible from "./Invincible.js";
import Obstacle from "./Obstacle.js";
import Rollerskate from "./Rollerskate.js";
import IncreaseBombsNumber from "./IncreaseBombsNumber.js";
import IncreaseBlastRange from "./IncreaseBlastRange.js"
import Ghost from "./Ghost.js";
import Detonator from "./Detonator.js";
import DecreaseBlastRange from "./DecreaseBlastRange.js";
import DecreaseSpeed from "./DecreaseSpeed.js";
import PlaceBombsASAP from "./PlaceBombsASAP.js";
import CantPlaceBombs from "./CantPlaceBombs.js";

export default class MapElement {
    
    static Field = new MapElement("field");
    static Wall = new MapElement("wall");
    static Monster = new MapElement("monster");
    static Player1 = new MapElement("player playerOne", null, null, []);
    static Player2 = new MapElement("player playerTwo", null, null, []);
    static Bomb = new MapElement("bomb");
    static BombInPlace = new MapElement("bombip")
    static Explosion = new MapElement("explosion");
    static Box = new MapElement("box");
    static BoxEmpty = new MapElement("box")
    static BoxInPlace = new MapElement("boxip")

    //curses
    static Curse = new MapElement("curse", null, [DecreaseBlastRange.instance(), DecreaseSpeed.instance(), PlaceBombsASAP.instance(), CantPlaceBombs.instance()])
    
    //powerups
    static Invincible = new MapElement("powerup invincible", Invincible.instance());
    static Detonator = new MapElement("powerup detonator", Detonator.instance());
    static Rollerskate = new MapElement("powerup rollerskate", Rollerskate.instance());
    static Ghost = new MapElement("powerup ghost", Ghost.instance());
    static PlaceBoxes = new MapElement("powerup placeBoxes", Obstacle.instance());
    static IncreaseBlastRange = new MapElement("powerup increaseBlastRange", IncreaseBlastRange.instance());
    static IncreaseBombsNumber = new MapElement("powerup increaseBombsNumber", IncreaseBombsNumber.instance());

    constructor(value, instance = null, cursesList = null, extraClasses = null) {  
        this.classType = value;
        this.instance = instance;
        this.cursesList = cursesList;
        this.extraClasses = extraClasses;
    }

    static allPowerups(){
        let arr=[]
        arr.push(this.Invincible)
        arr.push(this.Detonator)
        arr.push(this.Rollerskate)
        arr.push(this.Ghost)
        arr.push(this.PlaceBoxes)
        arr.push(this.IncreaseBlastRange)
        arr.push(this.IncreaseBombsNumber)

        return arr;
    }

    static randomizePowerups() {
        return this.allPowerups()[Math.floor(Math.random() * (6+1))];
    }
}