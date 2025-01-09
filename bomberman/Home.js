import Game from "./Game.js";

function showModule(moduleId) {
  const module = document.getElementById(moduleId);
  if (module) {
    module.classList.remove = "hidden"; 
  }
}

function hideModule(moduleId) {
  const module = document.getElementById(moduleId);
  if (module) {
    module.classList.add = "hidden"; 
  }
}

class Home {
  #game;

  constructor() {
    // Ensure the DOM is fully loaded before adding event listeners
    document.addEventListener('DOMContentLoaded', () => {
        this.setupEventListeners();
    });
  }

  showModule(moduleId) {
    const module = document.getElementById(moduleId);
    if (module) {
      module.classList.remove('hidden'); 
    }
  }
  
  hideModule(moduleId) {
    const module = document.getElementById(moduleId);
    if (module) {
      module.classList.add('hidden'); 
    }
  }
  
  setupEventListeners() {
      // Ensure exitNo button is available
      const exitNoButton = document.getElementById('exitNo');
      if (exitNoButton) {
          exitNoButton.addEventListener('click', () => {
              hideModule('exitGamePopup'); // Hide the module when "NO" button is clicked.
          });
      } else {
          console.error('The "exitNo" button was not found.');
      }
  }

  newGame(matrix, sizeX, sizeY) {
    this.#game = new Game(matrix, sizeX, sizeY);
  }
}

export default Home;
