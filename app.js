let gameView = document.querySelector('#gameView');
let ctx = gameView.getContext('2d');

let snakeVelocity = 500;

let headX = 100;
let headY = 100;
let snakeSize = 1;
let snakeBody = [];

const headSize = 20;

let direction = 'right';
let lastUpdTime = 0;

const getRndInteger = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let appleX = getRndInteger(0, 20) * headSize;
let appleY = getRndInteger(0, 20) * headSize;

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
    if (e.which === 37) {
        direction = 'left';
    }
    // up
    else if (e.which === 38) {
        direction = 'up';
    }
    // right
    else if (e.which === 39) {
        direction = 'right';
    }
    // down
    else if (e.which === 40) {
        direction = 'down';
    }
})

window.requestAnimationFrame(playGame);