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
            x: Math.floor(Math.random() * 100),
            y: 100
        });
    }

    moveLeft() {
        this.player.x -= 20;
    }

    moveRight() {
        this.player.x += 20;
    }

    isPlayerHit() {
        return this.rainDrops.some(d => d.x === this.player.x && d.y === 0);
    }

    dropRainDrops() {
        for (const rainDrop in this.rainDrops) {
            rainDrop.x -= 5;
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

function tick() {
    updatePlayerLocation();
}

setInterval(tick, 25);

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
