// Get Computer Choice
function getComputerChoice() {
    let choice = ['pierre', 'papier', 'ciseaux'];
    let index = Math.floor(Math.random()*3);
    return choice[index];
}

// findWinner Function
function findWinner(playerChoice, computerChoice) {
    if (playerChoice == computerChoice) {
        return "Egalité, mange du paté";
    } else if (playerChoice == 'pierre') {
        if (computerChoice == 'ciseaux') {
            return 'Bravo, mon gros Totoro';
        } else {
            return 'Tu as perdu, tu n\'es pas digne de princesse mononoké';
        }
    } else if (playerChoice == 'papier') {
        if (computerChoice == 'pierre') {
            return 'Bravo, mon gros Totoro';
        } else {
            return 'Tu as perdu, tu n\'es pas digne de princesse mononoké';
        }
    } else if (playerChoice == 'ciseaux') {
        if (computerChoice == 'papier') {
            return 'Bravo, mon gros Totoro';
        } else {
            return 'Tu as perdu, tu n\'es pas digne de princesse mononoké';
        }
    } else if (playerChoice == 'bomb') {
        return 'Bravo, mon gros Totoroon';
    }
}

// Function playGame
function playGame(playerChoice) {
    // Get Computer Choice
    const computerChoice = getComputerChoice();
    
    // get computerChoice div
    const result = document.querySelector('#computerChoice');
    
    // Create div element to insert into computerChoice div
    const div = document.createElement('div');
    const divComputerChoice = document.createElement('img');
    divComputerChoice.src = 'resources/img/jpg/players/' + computerChoice + '.jpg';
    divComputerChoice.alt = playerChoice;
    divComputerChoice.width = 200;
    const p = document.createElement('h2');
    p.textContent = "Computer Choice";
    div.appendChild(p);
    div.appendChild(divComputerChoice);

    // Insertion of the create Element into the div computerChoice
    result.appendChild(div);
    
    // Show Result
    document.querySelector('#result').textContent = findWinner(playerChoice, computerChoice);
}

// Launch the game on a player choice
document.querySelectorAll('#playerChoice img').forEach(function (element) {
    element.addEventListener('click', function() {
        if (document.querySelector('#computerChoice').firstChild != null) {
            document.querySelector('#computerChoice').firstChild.remove();
        }
        playGame(element.alt);
    });
});