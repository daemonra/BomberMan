// SaveMapToJson.js
function saveMapToJson(matrix, fileName) {
    if (!fileName) {
        fileName = "map_data" + Date.now();
    }
    const sizeX = matrix.length;
    const sizeY = matrix[0].length;

    const mapData = {
        sizeX: sizeX,
        sizeY: sizeY,
        data: matrix.map(row => row.map(cell => cell.classType))
    };

    const jsonData = JSON.stringify(mapData, null, 2);
    
    // Create a Blob with the JSON data
    const blob = new Blob([jsonData], { type: "application/json" });
    
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create an <a> element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName + ".json";
    
    // Trigger the click event to download the JSON file
    document.body.appendChild(a);
    a.click();
    
}

export default saveMapToJson;