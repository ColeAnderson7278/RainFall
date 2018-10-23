function moveCharacterRight() {
    var user = document.querySelector(".user");
    var positionNum = document.querySelector(".positionNum");
    if (positionNum.innerText < 450) {
        positionNum.innerText = Number(positionNum.innerText) + 10;
        user.style.remove = "left";
        user.style.left = `${positionNum.innerText}px`;
    }
}

function moveCharacterLeft() {
    var user = document.querySelector(".user");
    var positionNum = document.querySelector(".positionNum");
    if (positionNum.innerText > -1) {
        positionNum.innerText = Number(positionNum.innerText) - 10;
        user.style.remove = "left";
        user.style.left = `${positionNum.innerText}px`;
    }
}

document.addEventListener("keypress", function(event) {
    if (event.key === "ArrowRight") {
        moveCharacterRight();
    } else if (event.key === "ArrowLeft") {
        moveCharacterLeft();
    }
});
