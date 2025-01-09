import SpecialAbility from "./SpecialAbillity.js";

export default class IncreaseBombsNumber extends SpecialAbility {
    static #instance = null;

    constructor() {
        super();
        if (IncreaseBombsNumber.#instance !== null) {
            throw new Error("Cannot instantiate more than one IncreaseBombsNumber instance, use IncreaseBombsNumber.instance()");
        }
    }

    affectPlayer(player) {
        player.bombsNumber += 1;
    }

    static instance() {
        if (IncreaseBombsNumber.#instance === null) {
            IncreaseBombsNumber.#instance = new IncreaseBombsNumber();
        }
        return IncreaseBombsNumber.#instance;
    }
}
