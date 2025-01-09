import SpecialAbility from "./SpecialAbillity.js";

export default class Rollerskate extends SpecialAbility {
    static #instance = null;

    constructor() {
        super();
        if (Rollerskate.#instance !== null) {
            throw new Error("Cannot instantiate more than one Rollerskate instance, use Rollerskate.instance()");
        }
    }

    affectPlayer(p) {
        if(!p.rollerskate) {
            p.speed -= 0.5;
            p.rollerskate = true;
        }
    }

    static instance() {
        if (Rollerskate.#instance === null) {
            Rollerskate.#instance = new Rollerskate();
        }
        return Rollerskate.#instance;
    }
}
