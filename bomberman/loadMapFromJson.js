import MapElement from './MapElement.js';

// LoadMapFromJson.js
async function loadMapFromJson(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = event => {
            try {
                const jsonData = event.target.result;
                const mapData = JSON.parse(jsonData);
                const sizeX = mapData.sizeX;
                const sizeY = mapData.sizeY;
                const data = mapData.data;

                // Construct the matrix from the loaded data
                let matrix = [];
                for (let i = 0; i < sizeX; i++) {
                    const row = [];
                    for (let j = 0; j < sizeY; j++) {
                        // console.log('data ij:', data[i][j]);
                        // row.push(new MapElement(data[i][j]));
                        switch (data[i][j]) {
                            case 'player playerOne':
                                row.push(MapElement.Player1);
                                break;
                            case 'player playerTwo':
                                row.push(MapElement.Player2);
                                break;
                            case 'monster':
                                row.push(MapElement.Monster);
                                break;
                            case 'box':
                                row.push(MapElement.Box);
                                break;
                            case 'wall':
                                row.push(MapElement.Wall);
                                break;
                            case 'field':
                                row.push(MapElement.Field);
                                break;
                            default:
                                // row.push(MapElement.Field);
                                break;
                        }
                    }
                    matrix.push(row);
                }

                resolve(matrix);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = error => {
            reject(error);
        };

        reader.readAsText(file);
    });
}

export default loadMapFromJson;