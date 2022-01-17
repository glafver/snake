let gameView = document.querySelector('#gameView');

let ctx = gameView.getContext('2d');
let windowSize;
let headSize;

const totalElementsAmount = 20;

let headX;
let headY;
let snakeSize;
let snakeBody;

let appleX;
let appleY;

let direction;
let lastUpdTime;
let snakeVelocity;

const rescaleGameView = function() {
    let type;

    if (window.innerWidth > innerHeight) {
        windowSize = window.innerHeight * 0.85;
        type = 'vertical';
    } else {
        windowSize = window.innerWidth * 0.95;
        type = 'horizontal';
    }
    gameView.width = windowSize;
    gameView.height = windowSize;
    headSize = windowSize / totalElementsAmount;
    // headSize = Math.trunc(windowSize / totalElementsAmount);
    console.log(type, window.innerWidth, window.innerHeight, headSize);
};

const getRndInteger = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const initGame = function() {
    direction = 'right';
    lastUpdTime = 0;
    snakeVelocity = 300;

    snakeSize = 2;
    snakeBody = [];
    headX = getRndInteger(0, totalElementsAmount) * headSize;
    headY = getRndInteger(0, totalElementsAmount) * headSize;

    appleX = getRndInteger(0, totalElementsAmount) * headSize;
    appleY = getRndInteger(0, totalElementsAmount) * headSize;
}

const playGame = function() {

    let currentTime = Date.now();

    if (currentTime - lastUpdTime < snakeVelocity) {
        window.requestAnimationFrame(playGame);
        return;
    }

    lastUpdTime = currentTime;
    ctx.clearRect(0, 0, windowSize, windowSize);
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

    if (Math.abs(headX - appleX) < 2 && Math.abs(headY - appleY) < 2) {
        appleX = getRndInteger(0, totalElementsAmount) * headSize;
        appleY = getRndInteger(0, totalElementsAmount) * headSize;
        snakeSize++;
        snakeVelocity -= 10;
    }

    // snakeBody.unshift([headX, headY]);
    snakeBody.unshift({ x: headX, y: headY });

    if (snakeBody.length > snakeSize) {
        snakeBody.pop();
    }

    for (let i = 1; i < snakeBody.length; i++) {
        if (Math.abs(snakeBody[i].x - headX) < 2 && Math.abs(snakeBody[i].y - headY) < 2) {
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
    if (e.code === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    }
    // up
    else if (e.code === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    }
    // right
    else if (e.code === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    }
    // down
    else if (e.code === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    }
})

document.querySelector('.joystick').addEventListener('click', function(e) {
    // left
    if (e.target.id === 'btn--left' && direction !== 'right') {
        direction = 'left';
    }
    // up
    else if (e.target.id === 'btn--up' && direction !== 'down') {
        direction = 'up';
    }
    // right
    else if (e.target.id === 'btn--right' && direction !== 'left') {
        direction = 'right';
    }
    // down
    else if (e.target.id === 'btn--down' && direction !== 'up') {
        direction = 'down';
    }
})
rescaleGameView();
initGame();
window.requestAnimationFrame(playGame);