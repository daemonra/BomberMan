/**
 * @jest-environment jsdom
 */
import Game from '../Game'; 
import Model from '../Model';
import BoardView from '../BoardView';


// Mock Model class
jest.mock('../Model');

// Mock BoardView class
jest.mock('../BoardView');

describe('Game', () => {
  let game;

  beforeEach(() => {
    // Mock Matrix and Size
    const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    const size = 3;
    
    // Create a new instance of Game
    game = new Game(matrix, size);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  test('constructor should initialize the game correctly', () => {
    // Mock Model constructor
    expect(Model).toHaveBeenCalledWith([[1, 2, 3], [4, 5, 6], [7, 8, 9]] , 3);
    
    // Mock BoardView constructor
    expect(BoardView).toHaveBeenCalledTimes(1);

    
  });
// Other tests as needed

});
