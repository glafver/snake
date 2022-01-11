let gameView = document.querySelector('#gameView');
let ctx = gameView.getContext('2d');

const headSize = 20;

let headX;
let headY;
let snakeSize;
let snakeBody;

let appleX;
let appleY;

let direction;
let lastUpdTime;
let snakeVelocity;

const getRndInteger = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const initGame = function() {
    direction = 'right';
    lastUpdTime = 0;
    snakeVelocity = 300;

    snakeSize = 2;
    snakeBody = [];
    headX = getRndInteger(0, 20) * headSize;
    headY = getRndInteger(0, 20) * headSize;

    appleX = getRndInteger(0, 20) * headSize;
    appleY = getRndInteger(0, 20) * headSize;
}

const playGame = function() {

    let currentTime = Date.now();

    if (currentTime - lastUpdTime < snakeVelocity) {
        window.requestAnimationFrame(playGame);
        return;
    }

    lastUpdTime = currentTime;
    ctx.clearRect(0, 0, 400, 400);
    if (direction === 'left') {
        headX -= headSize;
        if (headX < 0) {
            headX = gameView.width - headSize;
        }
    }
    // up
    else if (direction === 'up') {
        headY -= headSize;
        if (headY < 0) {
            headY = gameView.height - headSize;
        }
    }
    // right
    else if (direction === 'right') {
        headX += headSize;
        if (headX >= gameView.width) {
            headX = 0;
        }
    }
    // down
    else if (direction === 'down') {
        headY += headSize;
        if (headY >= gameView.height) {
            headY = 0;
        }
    }

    if (headX === appleX && headY === appleY) {
        appleX = getRndInteger(0, 20) * headSize;
        appleY = getRndInteger(0, 20) * headSize;
        snakeSize++;
        snakeVelocity -= 10;
    }

    // snakeBody.unshift([headX, headY]);
    snakeBody.unshift({ x: headX, y: headY });

    if (snakeBody.length > snakeSize) {
        snakeBody.pop();
    }

    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeBody[i].x === headX && snakeBody[i].y === headY) {
            initGame();
        }
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(appleX, appleY, headSize - 1, headSize - 1);

    snakeBody.forEach(e => {
        ctx.fillStyle = 'green';
        ctx.fillRect(e.x, e.y, headSize - 1, headSize - 1);
    })

    window.requestAnimationFrame(playGame);
}

document.addEventListener('keydown', function(e) {
    // left
    if (e.which === 37 && direction !== 'right') {
        direction = 'left';
    }
    // up
    else if (e.which === 38 && direction !== 'down') {
        direction = 'up';
    }
    // right
    else if (e.which === 39 && direction !== 'left') {
        direction = 'right';
    }
    // down
    else if (e.which === 40 && direction !== 'up') {
        direction = 'down';
    }
})

initGame();
window.requestAnimationFrame(playGame);