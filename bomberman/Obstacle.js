import SpecialAbility from "./SpecialAbillity.js";

export default class Obstacle extends SpecialAbility {
    static #instance = null;

    constructor() {
        super();
        if (Obstacle.#instance !== null) {
            throw new Error("Cannot instantiate more than one Obstacle instance, use Obstacle.instance()");
        }
    }

    affectPlayer(p) {
        p.boxesNumber +=3;
    }

    static instance() {
        if (Obstacle.#instance === null) {
            Obstacle.#instance = new Obstacle();
        }
        return Obstacle.#instance;
    }
}
