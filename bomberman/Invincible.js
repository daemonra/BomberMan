import SpecialAbility from "./SpecialAbillity.js";
import MapElement from "./MapElement.js";

export default class Invincible extends SpecialAbility {
    static #instance = null;

    constructor() {
        super();
        if (Invincible.#instance !== null) {
            throw new Error("Cannot instantiate more than one Invincible instance, use Invincible.instance()");
        }
    }

    affectPlayer(p) {
        p.invincible = true;
        p.mapElem.extraClasses.push("inviPlayer");

        let ssid 
        
        setTimeout(() => {
            ssid = setInterval(() => {
                Invincible.visualEffect(p)
            }, 250);
        }, 6000);

        setTimeout(() => {
            p.invincible = false;
            clearInterval(ssid);
        }, 10000)
    }

    static visualEffect(p) {
        if (p.mapElem.extraClasses.indexOf("inviPlayer") > -1)
            p.mapElem.extraClasses.splice(p.mapElem.extraClasses.indexOf("ghostyPlayer"), 1)
        else 
            p.mapElem.extraClasses.push("inviPlayer");   
    }

    static instance() {
        if (Invincible.#instance === null) {
            Invincible.#instance = new Invincible();
        }
        return Invincible.#instance;
    }
}