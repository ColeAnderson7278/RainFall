class RainFall {
    constructor() {
        this.initializePlayer();
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
        for (let i = 0; i < 10; i++) {
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
            this.player.x -= 5;
        }
    }

    moveRight() {
        if (this.player.x < 440) {
            this.player.x += 5;
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

var newGame = new RainFall();

function updatePlayerLocation() {
    var user = document.querySelector(".user");
    user.style.left = `${newGame.player.x}px`;
}

document.addEventListener("keypress", function(event) {
    if (event.key === "ArrowLeft") {
        newGame.moveLeft();
    } else if (event.key === "ArrowRight") {
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
    }
}

function hitCheck() {
    for (var rainDrop of newGame.rainDrops) {
        if (rainDrop.y === 240) {
            if (
                // console.log(rainDrop.x, newGame.player.x + 20)
                rainDrop.x <= newGame.player.x + 45 &&
                rainDrop.x >= newGame.player.x + 5
            ) {
                alert(
                    `   Game Over\nYour Score Was:\n       ${
                        document.querySelector(".userScore").innerText
                    }`
                );
                document.location.reload();
            }
        }
    }
}

function rainCheck() {
    for (var rainDrop of newGame.rainDrops) {
        if (rainDrop.y === 280) {
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
    setInterval(tick, 30);
    container.removeEventListener("click", runNewGame);
}

document.querySelector(".gameContainer").addEventListener("click", runNewGame);
