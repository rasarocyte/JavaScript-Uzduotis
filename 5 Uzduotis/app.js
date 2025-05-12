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


let geriausias = localStorage.getItem("bestScore");

if (geriausias === null) {
    geriausias = 0;
} else {
    geriausias = parseInt(geriausias);
}

document.getElementById("bestScore").textContent = "Geriausias rezultatas:" + geriausias;


startGame.addEventListener("click", function () {
    startScreen.style.display = "none";
    gameScreen.classList.remove("hidden");
});

startButton.addEventListener("click", function () {
    pradetiLaika();
    shuffleCards();
    enableCardClick();
});

restartButton.addEventListener("click", function () {
    clearInterval(laikmatis);
    liko = 60;
    score = 0;
    document.getElementById("time").innerHTML = "0:30";
    document.getElementById("score").textContent = "0";
    document.getElementById("bestScore").textContent = "Geriausias rezultatas: " + geriausias + " taškai!";

    const korteles = document.querySelectorAll(".card");
    korteles.forEach(card => {
        card.classList.remove("flipped");
        card.style.visibility = "visible";
    });

    shuffleCards();
    enableCardClick();
});


function pradetiLaika() {
    clearInterval(laikmatis);
    liko = 60;

    const timeEl = document.getElementById("time");
    timeEl.classList.remove("blinking");

    laikmatis = setInterval(function () {
        let min = Math.floor(liko / 60);
        let sec = liko % 60;
        document.getElementById("time").innerHTML = min + ":" + (sec < 10 ? "0" : "") + sec;
        liko--;

        if (liko === 10) {
            timeEl.classList.add("blinking");
        }
        if (liko < 0) {
            clearInterval(laikmatis);
            document.getElementById("time").innerHTML = "0:00";
            timeEl.classList.remove("blinking");
            alert("Laikas baigėsi!\nTavo rezultatas: " + score + " taškai!");
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

    let firstValue = firstCard.getAttribute("data-value");
    let secondValue = secondCard.getAttribute("data-value");

    if (firstValue === secondValue) {
        score += 10;
        document.getElementById("score").textContent = score;


        if (score > geriausias) {
            geriausias = score;
            localStorage.setItem("bestScore", geriausias);
            document.getElementById("bestScore").textContent = "Geriausias rezultatas: " + geriausias + " taškai!";
        }

        setTimeout(() => {
            firstCard.style.visibility = "hidden";
            secondCard.style.visibility = "hidden";
            resetCards();


            const allCards = document.querySelectorAll(".card");
            const pasleptos = Array.from(allCards).filter(c => c.style.visibility === "hidden");

            if (pasleptos.length === allCards.length) {
                setTimeout(() => {
                    restartRound();
                }, 500);
            }

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

function restartRound() {
    const korteles = document.querySelectorAll(".card");
    korteles.forEach(card => {
        card.classList.remove("flipped");
        card.style.visibility = "visible";
    });
    shuffleCards();
    enableCardClick();
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
