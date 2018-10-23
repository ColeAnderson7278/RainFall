class RainFall {
    constructor() {
        this.initializePlayer();
        this.generateRainDrops();
        this.gameover = false;
    }

    initializePlayer() {
        this.player = {
            x: 50
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
        this.player.x -= 5;
    }

    moveRight() {
        this.player.x += 5;
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

class DOMRainFall {
    constructor(rootSelector) {
        this.gameState = new RainFall();
        this.root = document.querySelector(rootSelector);
        this.setupDOM();
    }

    setupDOM() {
        this.setupPlayer();
        this.setupRainDrops();
    }

    setupPlayer() {
        this.playerElement = document.createElement("span");
        this.playerElement.classList.add("rainfall__player");
        this.root.appendChild(playerElement);
        this.playerElement.updatePlayerLocation();
    }

    updatePlayerLocation() {
        this.playerElement.style.left = `${this.player.x}%`;
    }

    tick() {
        this.gameState.tick();
        this.updateDOM();
    }
}
