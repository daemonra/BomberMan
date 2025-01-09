import SpecialAbility from "./SpecialAbillity.js";

export default class DecreaseBlastRange extends SpecialAbility {
    static #instance = null;

    constructor() {
        super();
        if (DecreaseBlastRange.#instance !== null) {
            throw new Error("Cannot instantiate more than one DecreaseBlastRange instance, use DecreaseBlastRange.instance()");
        }
    }

    affectPlayer(p) {
        const eredeti = p.blastRange;
        p.blastRange = 1;
        setTimeout(() => {
            p.blastRange = eredeti; 
        }, 10000); 
    }

    static instance() {
        if (DecreaseBlastRange.#instance === null) {
            DecreaseBlastRange.#instance = new DecreaseBlastRange();
        }
        return DecreaseBlastRange.#instance;
    }
}
