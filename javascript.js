/**
 * Abdulkarim Mrad - 000819421
 */

// Select elements
let startGame = document.getElementById("startGame");
let resetBtn = document.getElementById("reset");
let boxColor = document.getElementById("color");
let errorColor = document.getElementById("errorColor");
let svgBoard = document.getElementById("gameBoard");
let triesInfo = document.getElementById("tries-info");
let difficultySelect = document.getElementById("difficulty");

// Score elements
let winText = document.getElementById("wintimes");
let loseText = document.getElementById("loosetimes");

// Variables to track state
let winning = 0;
let totalLoses = 0;
let maxTries = 3; // Same for all difficulty levels
let attempts = 0;
let hasWon = false;
let boxes = [];

// Number of boxes and positions based on difficulty
let positions = [];
let totalBoxes = 9; // Default for medium

// Function to start the game
startGame.addEventListener("click", function() {
    if (boxColor.value === "#000000") {
        errorColor.textContent = "Error: Color must not be black!";
        return;
    } else {
        errorColor.textContent = "";
        initGame();
    }
});

// Function to initialize the game based on difficulty
function initGame() {
    // Set difficulty
    setDifficulty();

    // Reset the game
    resetGame();
    createBoxes();
    attempts = 0;
    hasWon = false;
    updateTriesInfo();
    updateScores();
}

// Set the difficulty based on user selection
function setDifficulty() {
    const difficulty = difficultySelect.value;
    
    if (difficulty === 'easy') {
        totalBoxes = 6;
        positions = [
            [195, 100], [235, 100], [275, 100],
            [195, 140], [235, 140], [275, 140]
        ];
    } else if (difficulty === 'medium') {
        totalBoxes = 9;
        positions = [
            [195, 100], [235, 100], [275, 100],
            [195, 140], [235, 140], [275, 140],
            [195, 180], [235, 180], [275, 180]
        ];
    } else if (difficulty === 'hard') {
        totalBoxes = 12;
        positions = [
            [195, 100], [235, 100], [275, 100],
            [195, 140], [235, 140], [275, 140],
            [195, 180], [235, 180], [275, 180],
            [195, 220], [235, 220], [275, 220]
        ];
    }
}

// Function to create the boxes
function createBoxes() {
    let winningBoxIndex = Math.floor(Math.random() * totalBoxes); // Random winning box

    positions.forEach((pos, index) => {
        let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", pos[0]);
        rect.setAttribute("y", pos[1]);
        rect.setAttribute("width", "30");
        rect.setAttribute("height", "30");
        rect.style.fill = boxColor.value;
        rect.style.stroke = "white";
        rect.style.strokeWidth = "2";

        rect.addEventListener("click", function() {
            handleBoxClick(index, winningBoxIndex, rect); // Handle box click
        });

        boxes.push(rect);
        svgBoard.appendChild(rect);
    });
}

// Function to handle box clicks
function handleBoxClick(index, winningBoxIndex, rect) {
    if (hasWon || attempts >= maxTries) return;

    if (index === winningBoxIndex) {
        showWinMessage(rect); // Win condition
    } else {
        showLoseMessage(rect); // Wrong guess
        attempts++;
        updateTriesInfo();
        if (attempts === maxTries) {
            handleGameLost(); // Player loses after max tries
        }
    }
}

// Function to show win message with effects
function showWinMessage(rect) {
    hasWon = true;
    winning++;
    updateScores();

    let winMessage = document.createElementNS("http://www.w3.org/2000/svg", "text");
    winMessage.textContent = "You Win!";
    winMessage.setAttribute("x", "185");
    winMessage.setAttribute("y", "150");
    winMessage.setAttribute("font-size", "30");
    winMessage.setAttribute("fill", "green");
    svgBoard.appendChild(winMessage);

    rect.classList.add("win-animate"); // Winning animation
    setTimeout(() => winMessage.remove(), 3000); // Remove after 3 seconds
}

// Function to show lose message with effects
function showLoseMessage(rect) {
    rect.classList.add("lose-animate"); // Losing animation
    updateTriesInfo();
}

// Function to handle losing the game
function handleGameLost() {
    totalLoses++;
    updateScores();

    let loseMessage = document.createElementNS("http://www.w3.org/2000/svg", "text");
    loseMessage.textContent = "You Lost!";
    loseMessage.setAttribute("x", "185");
    loseMessage.setAttribute("y", "150");
    loseMessage.setAttribute("font-size", "30");
    loseMessage.setAttribute("fill", "red");
    svgBoard.appendChild(loseMessage);

    setTimeout(() => loseMessage.remove(), 3000); // Remove after 3 seconds
}

// Function to reset the game
resetBtn.addEventListener("click", resetGame);

function resetGame() {
    svgBoard.innerHTML = '<text x="140" y="50" font-size="20" stroke="yellow">Guess the Winning Box</text>';
    boxes = [];
    attempts = 0;
    hasWon = false;
    updateTriesInfo();
    updateScores();
}

// Function to update tries info
function updateTriesInfo() {
    triesInfo.textContent = `Tries remaining: ${maxTries - attempts}`;
}

// Function to update scores
function updateScores() {
    winText.textContent = "Winnings: " + winning;
    loseText.textContent = "Loses: " + totalLoses;
}
