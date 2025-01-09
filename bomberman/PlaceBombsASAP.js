import SpecialAbility from "./SpecialAbillity.js";

export default class PlaceBombsASAP extends SpecialAbility {
    static #instance = null;

    constructor() {
        super();
        if (PlaceBombsASAP.#instance !== null) {
            throw new Error("Cannot instantiate more than one PlaceBombsASAP instance, use PlaceBombsASAP.instance()");
        }
    }

    affectPlayer(p) {
        p.placeBombsASAP = true;
        setTimeout(() => {
            p.placeBombsASAP = false;
        }, 10000); 
    }

    static instance() {
        if (PlaceBombsASAP.#instance === null) {
            PlaceBombsASAP.#instance = new PlaceBombsASAP();
        }
        return PlaceBombsASAP.#instance;
    }
}
