import SpecialAbility from "./SpecialAbillity.js";
import MapElement from "./MapElement.js";

export default class Ghost extends SpecialAbility {
        static #instance = null;
    
        constructor() {
            super();
            if (Ghost.#instance !== null) {
                throw new Error("Cannot instantiate more than one Ghost instance, use Ghost.instance()");
            }
        }
    
        affectPlayer(p) {
            p.ghost = true;
            p.mapElem.extraClasses.push("ghostyPlayer");

            let ssid

            setTimeout(() => {
                ssid = setInterval(() => {
                    Ghost.visualEffect(p)
                }, 250);
            }, 6000);

            setTimeout(() => {
                p.ghost = false;
                clearInterval(ssid);
            }, 10000);
        }

        static visualEffect(p) {
            if (p.mapElem.extraClasses.indexOf("ghostyPlayer") > -1)
                p.mapElem.extraClasses.splice(p.mapElem.extraClasses.indexOf("ghostyPlayer"), 1)
            else 
                p.mapElem.extraClasses.push("ghostyPlayer");   
        }
    
        static instance() {
            if (Ghost.#instance === null) {
                Ghost.#instance = new Ghost();
            }
            return Ghost.#instance;
     }
    
    
}
