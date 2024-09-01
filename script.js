// Only run this script if we're on the Rock, Paper, Scissors page
if (document.querySelectorAll(".choice").length) {
    const choices = ["rock", "paper", "scissors"];
    const resultText = document.getElementById("game-result");
    const playerMoveText = document.getElementById("player-move");
    const computerMoveText = document.getElementById("computer-move");

    function getComputerChoice() {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return "It's a tie!";
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            return "You win!";
        } else {
            return "Computer wins!";
        }
    }

    document.querySelectorAll(".choice").forEach(button => {
        button.addEventListener("click", function() {
            const playerChoice = this.id;
            const computerChoice = getComputerChoice();

            playerMoveText.textContent = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1);
            computerMoveText.textContent = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
            resultText.textContent = determineWinner(playerChoice, computerChoice);
        });
    });
}
// Ball Bouncing game logic
if (window.location.pathname.includes("ball-bouncing.html")) {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    let ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        dx: 4,  // Horizontal speed
        dy: 4,  // Vertical speed
    };

    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#E91E63';
        ctx.fill();
        ctx.closePath();
    }

    function updateBallPosition() {
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Bounce off the walls
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
        }
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
        }
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        updateBallPosition();
        requestAnimationFrame(gameLoop);
    }

    // Start the game
    gameLoop();
}
// Memory Match card game logic with 23 flags and a timer
if (window.location.pathname.includes("card-game.html")) {
    const flagsArray = [
        'flags/flag1.png', 'flags/flag1.png',
        'flags/flag2.png', 'flags/flag2.png',
        'flags/flag3.png', 'flags/flag3.png',
        'flags/flag4.png', 'flags/flag4.png',
        'flags/flag5.png', 'flags/flag5.png',
        'flags/flag6.png', 'flags/flag6.png',
        'flags/flag7.png', 'flags/flag7.png',
        'flags/flag8.png', 'flags/flag8.png',
        'flags/flag9.png', 'flags/flag9.png',
        'flags/flag10.png', 'flags/flag10.png',
        'flags/flag11.png', 'flags/flag11.png',
        'flags/flag12.png', 'flags/flag12.png',
        'flags/flag13.png', 'flags/flag13.png',
        'flags/flag14.png', 'flags/flag14.png',
        'flags/flag15.png', 'flags/flag15.png',
        'flags/flag16.png', 'flags/flag16.png',
        'flags/flag17.png', 'flags/flag17.png',
        'flags/flag18.png', 'flags/flag18.png',
        'flags/flag19.png', 'flags/flag19.png',
        'flags/flag20.png', 'flags/flag20.png',
        'flags/flag21.png', 'flags/flag21.png',
        'flags/flag22.png', 'flags/flag22.png',
        'flags/flag23.png', 'flags/flag23.png'
    ];
    let firstCard, secondCard;
    let lockBoard = false;
    let matches = 0;
    let timer;
    let seconds = 0;

    function startTimer() {
        timer = setInterval(() => {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            document.getElementById('timer').textContent = `Time: ${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function createBoard() {
        const gameBoard = document.getElementById('game-board');
        shuffle(flagsArray);

        flagsArray.forEach(flagSrc => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front"></div>
                    <div class="card-back">
                        <img src="${flagSrc}" alt="Flag">
                    </div>
                </div>
            `;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });

        startTimer(); // Start the timer when the game board is created
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        const firstFlag = firstCard.querySelector('.card-back img').src;
        const secondFlag = secondCard.querySelector('.card-back img').src;
        const isMatch = firstFlag === secondFlag;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        matches += 2;

        if (matches === flagsArray.length) {
            stopTimer();
            setTimeout(() => alert(`You found all matches in ${document.getElementById('timer').textContent.split(' ')[1]}!`), 500);
        }

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    // Start the game
    createBoard();
}
