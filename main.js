// DOM stuff

const gridContainer = document.getElementById('gameContainer');
const playerContainer = document.getElementById('playerContainer');
const buttonStartGame = document.querySelector('#start-game');
const divStartBtn = document.getElementById('start-btn-display');
const scoreEnergy = document.getElementById('score-energy');
const scoreFood = document.getElementById('score-food');
const scoreWater = document.getElementById('score-water');

// Events

document.addEventListener('keydown', movePlayer);
// document.addEventListener('keydown', displayLoseWin);



// Moving player and Energy, Water, Food points calculation
let rowNumber = 1;
let colNumber = 1;


let energy = 100;
let food = 100;
let water = 100;

scoreEnergy.innerHTML = energy;
scoreFood.innerHTML = food;
scoreWater.innerHTML = water;

function movePlayer(event) {
  displayLoseWin(energy);
  
  
  if (event.key == 'ArrowDown' && rowNumber != 12) {
    rowNumber++;
    playerContainer.style.gridArea = `${rowNumber} / ${colNumber} / auto / auto`;
  }
  else if (event.key == 'ArrowUp' && rowNumber != 1) {
    rowNumber--;
    playerContainer.style.gridArea = `${rowNumber} / ${colNumber} / auto / auto`;
  }
  else if (event.key == 'ArrowRight' && colNumber != 12) {
    colNumber++;
    playerContainer.style.gridArea = `${rowNumber} / ${colNumber} / auto / auto`;
  }
  else if (event.key == 'ArrowLeft' && colNumber != 1) {
    colNumber--;
    playerContainer.style.gridArea = `${rowNumber} / ${colNumber} / auto / auto`;
  }
  else {
    return;
  }
  
  // match div with tiles and player container
  let divAtribute = `div[style="grid-area: ${rowNumber} / ${colNumber} / auto / auto;"]`;
  let grabDiv = document.querySelector(divAtribute);
  
  // Health Energy and Food and Water
  switch(grabDiv.classList.value) {
    case 'mountain':
      if (event.key == 'ArrowDown') {
        rowNumber--;
        playerContainer.style.gridArea = `${rowNumber} / ${colNumber} / auto / auto`;
      }
      else if (event.key == 'ArrowUp') {
        rowNumber++;
        playerContainer.style.gridArea = `${rowNumber} / ${colNumber} / auto / auto`;
      }
      else if (event.key == 'ArrowRight') {
        colNumber--;
        playerContainer.style.gridArea = `${rowNumber} / ${colNumber} / auto / auto`;
      }
      else if (event.key == 'ArrowLeft') {
        colNumber++;
        playerContainer.style.gridArea = `${rowNumber} / ${colNumber} / auto / auto`;
      }
      break;
    case 'plain':
      energy = energy - 2;
      water = water - 4;
      food = food - 2;
      break;
    case 'desert':
      energy = energy - 6;
      water = water - 6;
      food = food - 6;
      break;
    case 'forest':
      energy = energy - 3;
      water = water - 3;
      food = food - 1;
      break;
    case 'marsh':
      energy = energy - 4;
      water = water - 1;
      food = food - 3;
      break;
    case 'town':
      energy = energy - 1;
      water = water - 5;
      food = food - 4;
      break;
    case 'home':
      energy = 100;
      water = 100;
      food = 100;
      break;
    case 'finish':
      alert('You Win!');
      location.reload();
      break;
    
      
  }
  scoreEnergy.innerHTML = energy;
  scoreFood.innerHTML = food;
  scoreWater.innerHTML = water;

};


// display when lose or win 

function displayLoseWin() {
  if(scoreEnergy.innerHTML <= 0 || scoreFood.innerHTML <= 0 || scoreWater.innerHTML <= 0){
    alert('YOU lost!')
    location.reload();
  }
}
displayLoseWin();
// setInterval(displayLoseWin, 1000)

// game map

let tilesOfMap = {
  type: ['mountain', 'plain', 'desert', 'town', 'marsh', 'forest', 'home', 'finish'],
  createTile() {
    for (let i = 1; i < 13; i++) {
      for (let j = 1; j < 13; j++) {
        if(i == 1 && j == 1){
          createDivContainers(i , j, this.type[6])('base-home', 'house', 'roof', 'door', 'window-home-one', 'window-home-two')('text-home', 'HOME');
        }
        
        if(i == 12 && j == 12){
          createDivContainers(i , j, this.type[7])('base-finish', 'house-finish', 'roof-finish', 'door-finish', 'window-home-one-finish', 'window-home-two-finish')('text-home-finish', 'FINISH');
        }
        
        if ((i != 1 || j != 1) && (i != 12 || j != 12)) {
          let randomNumber = Math.floor(Math.random() * 6);
          if (randomNumber == 0) {
            createDivContainers(i, j, this.type[0])('base-one', 'base-two', 'peak-one', 'peak-two');
          }

          if (randomNumber == 1) {
            createDivContainers(i, j, this.type[1])('base-plain', 'curve-base-one', 'curve-base-two', 'curve-base-three')
          }

          if (randomNumber == 2) {
            createDivContainers(i, j, this.type[2])('base-desert', 'curve-desert-base-one', 'curve-desert-base-two')
          }

          if (randomNumber == 3) {
            createDivContainers(i, j, this.type[3])('base-town', 'tower-one', 'window-one', 'window-two', 'window-three', 'window-four', 'antena-one', 'antena-two', 'antena-three', 'tower-two', 'window-five', 'window-six', 'window-seven', 'window-eight', 'antena-four', 'tree-root-one', 'tree-one', 'tree-two', 'tree-three', 'tree-root-two', 'tree-four', 'tree-five', 'tree-six')
          }

          if(randomNumber == 4) {
            createDivContainers(i, j, this.type[4])('base-marsh', 'lake-one', 'lake-two')
          }

          if(randomNumber == 5) {
            createDivContainers(i, j, this.type[5])('base-forest')
          }
        }
      }

    }
  },
}

tilesOfMap.createTile();

// display game

function displayGame() {
  gridContainer.style.opacity = 1;
  divStartBtn.style.opacity = 0;
  setTimeout(function(){
    gridContainer.style.visibility = 'visible';
    divStartBtn.style.visibility = 'hidden';
  }, 3000)
  
};

// create elements functions 

function createDivContainers(value1, value2, value3) {
  const divMapTiles = document.createElement('div');
  gridContainer.append(divMapTiles);
  divMapTiles.style.gridArea = value1 + ' / ' + value2;
  divMapTiles.classList.add(value3)

  function createDivStylingObject(){
    for (let index = 0; index < arguments.length; index++){
      const createComponentDiv = document.createElement('div');
      divMapTiles.append(createComponentDiv);
      createComponentDiv.classList.add(arguments[index]);
      }

    if(value3 == 'marsh'){
      for(let p = 1; p < 14; p++){
        const createReeds = document.createElement('div');
        createReeds.classList.add('reed' + p);
        divMapTiles.append(createReeds);
      }
    }

    if(value3 == 'forest'){
      for(let n = 1; n < 7; n++){
        const createRoot = document.createElement('div');
        createRoot.classList.add('root' + n);
        divMapTiles.append(createRoot);
      }
      for(let m = 1; m < 7; m++){
        const createTree = document.createElement('div');
        createTree.classList.add('tree' + m);
        divMapTiles.append(createTree);
      }
    }

      function createTextInTiles(addClassList, textDisplay){
        const createDivText = document.createElement('div');
        createDivText.classList.add(addClassList);
        divMapTiles.append(createDivText);
        createDivText.innerHTML = textDisplay;
      }

      return createTextInTiles;
  }

  return createDivStylingObject
}