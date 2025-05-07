let startGame = document.getElementById("startGame");
let startButton = document.getElementById("start-button");
let restartButton = document.getElementById("restart-button");
let gameScreen = document.getElementById("gameScreen");
let startScreen = document.getElementById("startScreen");
let score = 0;
let laikmatis;
let liko = 30;
let firstCard = null;
let secondCard = null;
let lockBoard = false;


startGame.addEventListener("click", function () {
    startScreen.style.display = "none";
    gameScreen.classList.remove("hidden");
});


function pradetiLaika() {
    clearInterval(laikmatis);
    liko = 30;

    laikmatis = setInterval(function () {
        let min = Math.floor(liko / 60);
        let sec = liko % 60;
        document.getElementById("time").innerHTML = min + ":" + (sec < 10 ? "0" : "") + sec;
        liko--;
        if (liko < 0) {
            clearInterval(laikmatis);
            document.getElementById("time").innerHTML = "0:00";
            alert("Laikas baigėsi!");
        }
    }, 1000);
}


function handleCardClick(card) {
    if (lockBoard || card.classList.contains("flipped")) return;

    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    const firstValue = firstCard.getAttribute("data-value");
    const secondValue = secondCard.getAttribute("data-value");

    if (firstValue === secondValue) {
        score += 10;
        document.getElementById("score").textContent = score;

        setTimeout(() => {
            firstCard.style.visibility = "hidden";
            secondCard.style.visibility = "hidden";
            resetCards();
        }, 500);
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function enableCardClick() {
    const korteles = document.querySelectorAll(".card");
    korteles.forEach(function (card) {
        card.addEventListener("click", function () {
            handleCardClick(card);
        });
    });
}


function shuffleCards() {
    const gameBoard = document.getElementById("game-board");
    const cards = Array.from(gameBoard.children);
    const sumaisyta = cards.sort(() => 0.5 - Math.random());

    gameBoard.innerHTML = "";
    sumaisyta.forEach(card => gameBoard.appendChild(card));
}


startButton.addEventListener("click", function () {
    pradetiLaika();
    shuffleCards();
    enableCardClick();
});

restartButton.addEventListener("click", function () {
    clearInterval(laikmatis);
    liko = 30;
    score = 0;
    document.getElementById("time").innerHTML = "0:30";
    document.getElementById("score").textContent = "0";

    const korteles = document.querySelectorAll(".card");
    korteles.forEach(card => {
        card.classList.remove("flipped");
        card.style.visibility = "visible";
    });

    shuffleCards();
    enableCardClick();
});
