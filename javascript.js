class RainFall {
    constructor() {
        this.initializePlayer();
        this.generateRainDrops();
        this.gameover = false;
    }

    initializePlayer() {
        this.player = {
            x: 240
        };
    }

    generateRainDrops() {
        this.rainDrops = [];
        for (let i = 0; i < 1; i++) {
            this.generateRainDrop();
        }
    }

    generateRainDrop() {
        this.rainDrops.push({
            x: Math.floor(Math.random() * 515),
            y: 0
        });
    }

    moveLeft() {
        if (this.player.x > 0) {
            this.player.x -= 5;
        }
    }

    moveRight() {
        if (this.player.x < 480) {
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
        if (rainDrop.y === 260) {
            if (
                // console.log(rainDrop.x, newGame.player.x + 20)
                rainDrop.x <= newGame.player.x + 35 &&
                rainDrop.x >= newGame.player.x + 15
            ) {
                alert("Game Over");
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

function tick() {
    rainCheck();
    hitCheck();
    dropRain();
    updatePlayerLocation();
    updateRain();
}

document.querySelector(".startButton").addEventListener("click", function() {
    var startButton = document.querySelector(".startButton");
    startButton.setAttribute("disabled", "disabled");
    setInterval(tick, 50);
});
