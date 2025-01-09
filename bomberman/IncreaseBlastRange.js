import SpecialAbility from "./SpecialAbillity.js";

export default class IncreaseBlastRange extends SpecialAbility {
    static #instance = null;

    constructor() {
        super();
        if (IncreaseBlastRange.#instance !== null) {
            throw new Error("Cannot instantiate more than one IncreaseBlastRange instance, use IncreaseBlastRange.instance()");
        }
    }

    affectPlayer(p) {
        p.blastRange +=1;
    }

    static instance() {
        if (IncreaseBlastRange.#instance === null) {
            IncreaseBlastRange.#instance = new IncreaseBlastRange();
        }
        return IncreaseBlastRange.#instance;
    }
}