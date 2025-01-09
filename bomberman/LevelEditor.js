import MapElement from './MapElement.js';
import BoardView from './BoardView.js';
import saveMapToJson from './saveMapToJson.js';
import loadMapFromJson from './loadMapFromJson.js';

export default class LevelEditor {
    constructor(size) {
        this.matrix = this.createEmptyMatrix(size);
        this.size = this.matrix.length;
        this.boardView = new BoardView();
        this.boardView.renderMatrix(this.matrix);

        this.setupEventListeners();
        this.setupsaveLoad();
    }

    checkRules(){
        // check there is one player of each type
        let playerOneCount = 0;
        let playerTwoCount = 0;
        let monstersCount = 0;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.matrix[i][j].classType === "player playerOne") {
                    playerOneCount++;
                }
                if (this.matrix[i][j].classType === "player playerTwo") {
                    playerTwoCount++;
                }
                if (this.matrix[i][j].classType === "monster") {
                    monstersCount++;
                }
            }
        }
        if (playerOneCount !== 1 || playerTwoCount !== 1) {
            alert("There should be one player of each type");
            return false;
        }
        if (monstersCount < 1) {
            alert("There should be at least one monster");
            return false;
        }

        return true;
    }

    setupsaveLoad() {
        document.querySelector('#saveLevel').addEventListener('click', () => {
            if (this.checkRules()) {
            saveMapToJson(this.matrix);
        }});

        document.querySelector('#loadLevel').addEventListener('click', async () => {
            const fileInput = document.getElementById("mapFileEditor");
            const jsonData = fileInput.files[0];
            this.matrix = await loadMapFromJson(jsonData);
            this.boardView.renderMatrix(this.matrix);

        });
    }

    createEmptyMatrix(size) {
        const matrix = [];
        for (let i = 0; i < size; i++) {
            matrix.push(Array(size).fill(MapElement.Field)); // Initialize with default element
        }
        return matrix;
    }


    setupEventListeners() {
        document.querySelector('table#map').addEventListener('click', event => {
            let target = event.target;
            while (target && target.tagName !== 'TD') {
                target = target.parentNode;
            }
            if (target) {
                const rowIndex = target.dataset.i;
                const colIndex = target.dataset.j;
                this.cycleMapElement(rowIndex, colIndex);
            }
        });
    }


    cycleMapElement(rowIndex, colIndex) {
        const mapElements = ["field", "wall", "box", "monster", "player playerOne", "player playerTwo"];
        const currentCell = document.querySelector(`td[data-i='${rowIndex}'][data-j='${colIndex}']`);
        const currentClass = this.matrix[rowIndex][colIndex].classType;
        const currentIndex = mapElements.indexOf(currentClass);
        const newIndex = (currentIndex + 1) % mapElements.length;
        const newClass = mapElements[newIndex];
        currentCell.className = `grid ${newClass}`;
        this.matrix[rowIndex][colIndex] = new MapElement(newClass);
    }

}
