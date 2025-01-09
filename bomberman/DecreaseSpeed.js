import SpecialAbility from "./SpecialAbillity.js";

export default class DecreaseSpeed extends SpecialAbility {
    static #instance = null;

    constructor() {
        super();
        if (DecreaseSpeed.#instance !== null) {
            throw new Error("Cannot instantiate more than one DecreaseSpeed instance, use DecreaseSpeed.instance()");
        }
    }

    affectPlayer(p) {
        if (!p.decreasedSpeed) {
            p.speed += 0.5; 
            p.decreasedSpeed = true;

            setTimeout(() => {
                p.speed -= 0.5;
                p.decreasedSpeed = false;
            }, 10000); 
        }
    }

    static instance() {
        if (DecreaseSpeed.#instance === null) {
            DecreaseSpeed.#instance = new DecreaseSpeed();
        }
        return DecreaseSpeed.#instance;
    }
}
