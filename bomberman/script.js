import Home from './Home.js';
import MapElement from './MapElement.js';
import saveMapToJson from './saveMapToJson.js';
import loadMapFromJson from './loadMapFromJson.js';
import LevelEditor from './LevelEditor.js';

let home = new Home();

// Function to check if a position is at least 2 tiles away from the player's starting position
function isFarFromPlayer(playerPos, boxPos) {
    const distanceX = Math.abs(playerPos[0] - boxPos[0]);
    const distanceY = Math.abs(playerPos[1] - boxPos[1]);
    return distanceX >= 2 && distanceY >= 2;
}

// Function to generate an empty map with walls surrounding and inside fields
function generateEmptyMap(size) {
    let matrix = [];

    for (let i = 0; i < size + 2; i++) {
        matrix[i] = [];
        for (let j = 0; j < size + 10; j++) {
            matrix[i][j] = MapElement.Field;

            // Add walls around the border
            if (i == 0 || j == 0 || i == size + 1 || j == size + 9) {
                matrix[i][j] = MapElement.Wall;
            }
        }
    }

    return matrix;
}

// Function to generate a map
function generateMap(mapIndex) {
    let matrix = [];
    let size = 13;

    for (let i = 0; i < size + 2; i++) {
        matrix[i] = [];
        for (let j = 0; j < size + 10; j++) {
            matrix[i][j] = MapElement.Field;

            // Add walls around the border
            if (i == 0 || j == 0 || i == size + 1 || j == size + 9) {
                matrix[i][j] = MapElement.Wall;
            }
        }
    }

    // Customize the map based on mapIndex
    switch (mapIndex) {
        case 0:
            customizeMap1(matrix, size);
            break;
        case 1:
            customizeMap2(matrix, size);
            break;
        case 2:
            customizeMap3(matrix, size);
            break;
        default:
            break;
    }

    // Place players
    matrix[1][1] = MapElement.Player1;
    matrix[size][size + 8] = MapElement.Player2;

    // Ensure players are not surrounded by boxes
    ensurePlayersNotSurrounded(matrix, size);

    return matrix;
}

// Function to customize Map 1
function customizeMap1(matrix, size) {
    let insideWalls = 0;

    // Walls distribution and count inside walls:
    for (let i = 1; i <= size; i++) {
        if (i % 2 === 0) {
            for (let j = 2; j <= size + 7; j += 2) {
                matrix[i][j] = MapElement.Wall;
                insideWalls++;
            }
        }
    }

    // Calculate the number of boxes (half of inside walls + 10):
    const totalBoxes = 80;

    // Randomly place boxes:
    let boxesPlaced = 0;
    while (boxesPlaced < totalBoxes) {
        let x = Math.floor(Math.random() * (size - 1)) + 1;
        let y = Math.floor(Math.random() * (size + 7)) + 1;
        if (matrix[x][y] == MapElement.Field && isFarFromPlayer([1, 1], [x, y])) { // Check distance from player position
            matrix[x][y] = MapElement.Box;
            boxesPlaced++;
        }
    }

    // Monsters distribution:
    let monstersPlaced = 0;
    while (monstersPlaced < 6) {
        let x = Math.floor(Math.random() * (size - 1)) + 1;
        let y = Math.floor(Math.random() * (size + 7)) + 1;
        if (matrix[x][y] === MapElement.Field) {
            matrix[x][y] = MapElement.Monster;
            monstersPlaced++;
        }
    }
}

// Function to ensure players are not surrounded by boxes
function ensurePlayersNotSurrounded(matrix, size) {
    // Check Player1 surroundings
    if (matrix[1][2] == MapElement.Box && matrix[2][1] === MapElement.Box) {
        matrix[1][2] = MapElement.Field;
    }

    // Check Player2 surroundings
    if (matrix[size][size + 6] == MapElement.Box && matrix[size - 1][size + 7] === MapElement.Box) {
        matrix[size][size + 6] = MapElement.Field;
    }
}

// Function to customize Map 2
function customizeMap2(matrix, size) {
}

// Function to customize Map 3
function customizeMap3(matrix, size) {
}

function navigateToList() {
    const menuLinks = document.querySelectorAll("[data-target]");
    menuLinks.forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            const targetMenuId = link.getAttribute("data-target");
            const originMenuId = link.getAttribute("data-origin");
            const mapIndex = link.getAttribute("data-index");

            if (targetMenuId === 'levelEditorMenu') {
                home.hideModule('firstMenu');
                home.showModule('gameMap');
                home.showModule('levelEditorMenu');

                const levelEditor = new LevelEditor(13);
            }
            
            else {

                home.showModule(targetMenuId);
                home.hideModule(originMenuId);

                if (mapIndex === '3') {

                    const fileInput = document.getElementById("mapFileInput");
                    const jsonData = fileInput.files[0];
                    const matrix = await loadMapFromJson(jsonData);
                    home.newGame(matrix, 13, 13);

                }

                if (targetMenuId == 'gameMap' && mapIndex !== null && mapIndex !== '3') {
                    const matrix = generateMap(parseInt(mapIndex));
                    const size = 13;
                   home.newGame(matrix, size + 2, size + 10);
                }
                if (targetMenuId == 'firstMenu') {
                    home.hideModule('gameMap');
                }
            }

        });
    });
}

navigateToList();
