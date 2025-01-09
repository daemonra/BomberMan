/**
 * @jest-environment jsdom
 */
import Home from '../Home';
import Game from '../Game';

// Mock the Game module
jest.mock('../Game');

// Test suite for the Home class
describe('Home', () => {
  
  // Variable to store the instance of Home
  let home;

  // Before each test, create a new instance of Home
  beforeEach(() => {
    home = new Home();
  });

  // After each test, clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test for the constructor setting up event listeners
  test('constructor should set up event listeners', () => {
    // Spy on the document's addEventListener method
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    // Create a new instance of Home
    home = new Home();
    // Expect the addEventListener method to be called with 'DOMContentLoaded'
    // and a function as its second argument
    expect(addEventListenerSpy).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
  });

  // Test for the showModule method removing the "hidden" class from a module
  test('showModule should remove "hidden" class from module', () => {
    // Create a div element to serve as the module
    const module = document.createElement('div');
    // Set its id to 'testModule'
    module.id = 'testModule';
    // Add the 'hidden' class to the module
    module.classList.add('hidden');
    // Append the module to the document body
    document.body.appendChild(module);

    // Call the showModule method with the id of the module
    home.showModule('testModule');

    // Expect the 'hidden' class to be removed from the module's classList
    expect(module.classList.contains('hidden')).toBe(false);
  });
});
