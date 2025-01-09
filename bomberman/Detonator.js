import SpecialAbility from "./SpecialAbillity.js";

export default class Detonator extends SpecialAbility {
    static #instance = null;

    constructor() {
        super();
        if (Detonator.#instance !== null) {
            throw new Error("Cannot instantiate more than one Detonator instance, use Detonator.instance()");
        }
    }

    affectPlayer(p) {
       p.detonator = true;
        setTimeout(() => {
            p.detonator = false;
        }, 5000);
        
    }

    static instance() {
        if (Detonator.#instance === null) {
            Detonator.#instance = new Detonator();
        }
        return Detonator.#instance;
    }
}
