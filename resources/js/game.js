
// Get Computer Choice
function getComputerChoice() {
    let choice = ['pierre', 'papier', 'ciseaux'];
    let index = Math.floor(Math.random()*3);
    return choice[index];
}

// findWinner Function
function findWinner(playerChoice, computerChoice) {
    if (playerChoice == computerChoice) {
        return "Tied";
    } else if (playerChoice == 'pierre') {
        if (computerChoice == 'ciseaux') {
            return 'Won';
        } else {
            return 'Lost';
        }
    } else if (playerChoice == 'papier') {
        if (computerChoice == 'pierre') {
            return 'Won';
        } else {
            return 'Lost';
        }
    } else if (playerChoice == 'ciseaux') {
        if (computerChoice == 'papier') {
            return 'Won';
        } else {
            return 'Lost';
        }
    } else if (playerChoice == 'bomb') {
        return 'Won';
    }
}

// Function playGame
function playGame(playerChoice, img) {
    // Computer Choice
    const result = document.querySelector('#computerChoice');
    const div = document.createElement('div');
    const computerChoice = document.createElement('img');
    computerChoice.src = img;
    computerChoice.alt = playerChoice;
    computerChoice.width = 200;
    const p = document.createElement('h2');
    p.textContent = "Computer Choice";
    div.appendChild(p);
    div.appendChild(computerChoice);
    result.appendChild(div);
    
    // Result
    document.querySelector('#result').textContent = findWinner(playerChoice, getComputerChoice());
}

// Launch the game
document.querySelectorAll('#playerChoice img').forEach(function (element) {
    element.addEventListener('click', function() {
        if (document.querySelector('#computerChoice').firstChild != null) {
            document.querySelector('#computerChoice').firstChild.remove();
        }
        playGame(element.alt, element.src);
    });
});