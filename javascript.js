class RainFall {
    constructor(amount) {
        this.initializePlayer();
        this.amount = amount;
        this.generateRainDrops();
        this.gameover = false;
    }

    initializePlayer() {
        this.player = {
            x: 220
        };
    }

    generateRainDrops() {
        this.rainDrops = [];
        for (let i = 0; i < this.amount; i++) {
            this.generateRainDrop();
        }
    }

    generateRainDrop() {
        this.rainDrops.push({
            x: Math.floor(Math.random() * 480),
            y: 0
        });
    }

    moveLeft() {
        if (this.player.x > 0) {
            this.player.x -= 10;
        }
    }

    moveRight() {
        if (this.player.x < 440) {
            this.player.x += 10;
        }
    }

    checkForEndGame() {
        this.gameover = this.isPlayerHit();
    }

    tick() {
        this.dropRainDrops();
        this.removeFallenRainDrops();
        this.addMoreRainDrops();
        this.checkForEndGame();
    }
}

var newGame = new RainFall(5);
var interval;

function updatePlayerLocation() {
    var user = document.querySelector(".user");
    user.style.left = `${newGame.player.x}px`;
}

document.addEventListener("keydown", function(event) {
    if (event.keyCode == 37) {
        newGame.moveLeft();
    } else if (event.keyCode == 39) {
        newGame.moveRight();
    }
});

function updateRain() {
    document.querySelector(".sky").innerHTML = "";
    for (var rainDrop of newGame.rainDrops) {
        shownDrop = `<span class="rain" style="left: ${rainDrop.x}px; top: ${
            rainDrop.y
        }px;"></span>`;
        document
            .querySelector(".sky")
            .insertAdjacentHTML("afterbegin", shownDrop);
    }
}

function dropRain() {
    for (var rainDrop of newGame.rainDrops) {
        rainDrop.y += 5;
        rainDrop.x += rainDrop.x > newGame.player.x + 20 ? -1 : 1;
    }
}

function callModal() {
    var finalScore = document.querySelector(".finalScore");
    var userScore = document.querySelector(".userScore").innerText;
    finalScore.innerText = userScore;
    $("#myModal").modal({ backdrop: "static", keyboard: false });
    $("#myModal").modal("show");
}

function hitCheck() {
    for (var rainDrop of newGame.rainDrops) {
        if (rainDrop.y === 240) {
            if (
                rainDrop.x <= newGame.player.x + 40 &&
                rainDrop.x >= newGame.player.x + 5
            ) {
                clearInterval(interval);
                callModal();
            }
        }
    }
}

document.querySelector(".modalButton").addEventListener("click", function() {
    document.location.reload();
});

function rainAmount() {
    var score = Number(document.querySelector(".userScore").innerText);
    if (score < 5000) {
        newGame.amount = 5;
    } else if (score < 10000) {
        newGame.amount = 6;
    } else if (score < 15000) {
        newGame.amount = 7;
    } else if (score < 20000) {
        newGame.amount = 8;
    } else if (score < 25000) {
        newGame.amount = 9;
    } else {
        newGame.amount = 10;
    }
}

function rainCheck() {
    for (var rainDrop of newGame.rainDrops) {
        if (rainDrop.y >= 280) {
            rainAmount();
            newGame.generateRainDrops();
        }
    }
}

function addToScore() {
    var score = document.querySelector(".userScore");
    score.innerText = Number(score.innerText) + 10;
}

function tick() {
    rainCheck();
    hitCheck();
    dropRain();
    updatePlayerLocation();
    updateRain();
    addToScore();
}

function runNewGame() {
    var container = document.querySelector(".gameContainer");
    document.querySelector(".startText").innerHTML = "";
    interval = setInterval(tick, 30);
    container.removeEventListener("click", runNewGame);
}

function showHighScore(score) {
    document.querySelector(".highScoreUsers").innerText =
        score.name + " " + score.number;
}

document.querySelector(".gameContainer").addEventListener("click", runNewGame);

function getHighScore() {
    fetch("http://rainfall-backend.herokuapp.com/high-score", {
        mode: "cors"
    })
        .then(r => r.json())
        .then(showHighScore);
}

getHighScore();
