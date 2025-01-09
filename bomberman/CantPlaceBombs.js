import SpecialAbility from "./SpecialAbillity.js";

export default class CantPlaceBombs extends SpecialAbility {
    static #instance = null;

    constructor() {
        super();
        if (CantPlaceBombs.#instance !== null) {
            throw new Error("Cannot instantiate more than one CantPlaceBombs instance, use CantPlaceBombs.instance()");
        }
    }

    affectPlayer(p) {
        p.cantPlaceBombs = true;
        setTimeout(() => {
            p.cantPlaceBombs = false;
        }, 10000); 
    }

    static instance() {
        if (CantPlaceBombs.#instance === null) {
            CantPlaceBombs.#instance = new CantPlaceBombs();
        }
        return CantPlaceBombs.#instance;
    }
}
