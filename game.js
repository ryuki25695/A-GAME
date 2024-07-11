const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 20,
    height: 20,
    dx: 5
};

const ad = {
    x: Math.random() * (canvas.width - 120),
    y: 0,
    width: 120,
    height: 50,
    dy: 2
};

let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function drawPlayer() {
    context.beginPath();
    context.rect(player.x, player.y, player.width, player.height);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
}

function drawAd() {
    const adContainer = document.getElementById('ad-container');
    adContainer.style.left = ad.x + 'px';
    adContainer.style.top = ad.y + 'px';
}

function movePlayer() {
    if (rightPressed && player.x < canvas.width - player.width) {
        player.x += player.dx;
    } else if (leftPressed && player.x > 0) {
        player.x -= player.dx;
    }
}

function moveAd() {
    ad.y += ad.dy;
    if (ad.y + ad.height > canvas.height) {
        ad.x = Math.random() * (canvas.width - ad.width);
        ad.y = 0;
    }
}

function detectCollision() {
    if (player.x < ad.x + ad.width &&
        player.x + player.width > ad.x &&
        player.y < ad.y + ad.height &&
        player.y + player.height > ad.y) {
        alert('Game Over');
        document.location.reload();
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawAd();
    movePlayer();
    moveAd();
    detectCollision();
    requestAnimationFrame(draw);
}

draw();
