/**
 * @jest-environment jsdom
 */

import BoardView from '../BoardView.js';
import MapElement from '../MapElement.js';

describe('BoardView', () => {
  let boardView;

  beforeEach(() => {
    // Create a new instance of BoardView before each test
    boardView = new BoardView();
  });

  test('showModule should display the module with the given ID', () => {
    // Mock the necessary elements in the DOM
    document.body.innerHTML = '<div id="module1" style="display: flex;" class="hidden"></div>';
    const moduleId = 'module1';
    const moduleElement = document.getElementById(moduleId);     

    // Call the showModule method
    boardView.showModule(moduleId);

    // Expect the module to be displayed
    expect(moduleElement.style.display).toBe('flex');
  });


  test('renderMatrix should update the table#map with the provided matrix', () => {
    // Mock the necessary elements in the DOM
    document.body.innerHTML = '<table id="map"></table>';
    const matrix = [
      [MapElement.Field, MapElement.Wall],
      [MapElement.Player1, MapElement.Player2]
    ];

    // Call the renderMatrix method
    boardView.renderMatrix(matrix);

    // Expect the table#map to be updated with the matrix
    const table = document.querySelector('table#map');
    expect(table.innerHTML).toMatchSnapshot();
  });

  test('displayExitPopUp should do something', () => {
    // Mock any necessary elements or DOM manipulation needed for this method
    
    // Call the displayExitPopUp method
    boardView.displayExitPopUp();

    // Assert expectations here
  });

  // Add tests here if necessary
});
