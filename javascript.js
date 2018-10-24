class RainFall {
    constructor() {
        this.initializePlayer();
        this.generateRainDrops();
        this.gameover = false;
    }

    initializePlayer() {
        this.player = {
            x: 325
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
            x: Math.floor(Math.random() * 515),
            y: 0
        });
    }

    moveLeft() {
        if (this.player.x > 90) {
            this.player.x -= 5;
        }
    }

    moveRight() {
        if (this.player.x < 560) {
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
                rainDrop.x <= newGame.player.x - 50 &&
                rainDrop.x >= newGame.player.x - 80
            ) {
                alert("You've losed");
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

setInterval(tick, 30);

// class DOMRainFall {
//     constructor(rootSelector) {
//         this.gameState = new RainFall();
//         this.root = document.querySelector(rootSelector);
//         this.setupDOM();
//     }

//     setupDOM() {
//         this.setupPlayer();
//         this.setupRainDrops();
//     }

//     setupPlayer() {
//         this.playerElement = document.querySelector(".user");
//     }

//     setupRainDrops() {
//         for (var rainDrop of this.gameState.rainDrops) {
//             var newDrop = `<div class="rain" style="top: ${
//                 rainDrop.y
//             }px; left: ${rainDrop.x}px;"></div>`;
//             this.root
//                 .querySelector(".rainFall")
//                 .insertAdjacentElement("beforebegin", newDrop);
//         }
//     }

//     updatePlayerLocation() {
//         this.playerElement.style.left = `${this.player.x}%`;
//     }

//     tick() {
//         this.gameState.tick();
//         this.updateDOM();
//     }
// }

// var newGame = new DOMRainFall(".gameContainer");

// document.addEventListener("keypress", function(event) {
//     if (event.key === "ArrowRight") {
//         newGame.gameState.moveRight();
//     } else if (event.key === "ArrowLeft") {
//         newGame.gameState.moveLeft();
//     }
// });

// setInterval(newGame.tick, 500);
