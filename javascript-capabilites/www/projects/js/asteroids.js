// ej 15

// Constantes y variables 
// --------------------------------------------------------------------------------------------------
const IMAGES_BASE_PATH = "/projects/images/"; // Esto nos ayuda a tener la ruta donde el servidor sirve las imágenes en un solo sitio, por si cambia
const imageSpaceship = new Image();
imageSpaceship.src = IMAGES_BASE_PATH + 'spaceship.png';

const GAME_STATE = {
    shipPosX: 372,
    shipPosY: 289,
    pressedKeys: {
        left: false,
        right: false,
        up: false,
        down: false
    },
    //ej 18
    asteroids: [],
    isGameOver: false


}
//ej 16
const VELOCITY = 94; // pxs / sec
//ej 19
const ASTEROID_SIZE = 71;
const imageAsteroid = new Image();
imageAsteroid.src = IMAGES_BASE_PATH + 'asteroid.png';

//ej 21
const imageGameover = new Image();
imageGameover.src = IMAGES_BASE_PATH + 'game_end.png';

const CANVAS = document.getElementById("gameContainer");
const CANVAS_CTX = CANVAS.getContext("2d");
let lastRender = 0;
// Actualizar estado del juego
// --------------------------------------------------------------------------------------------------

//ej 16
function updateSpaceship(timeDelta) {
    const distanceTraveled = VELOCITY * timeDelta;

    if (GAME_STATE.pressedKeys.right === true) {
        if (GAME_STATE.shipPosX > CANVAS.width - SHIP_SIZE) {
            GAME_STATE.shipPosX = CANVAS.width - SHIP_SIZE;
        }
        else {
            GAME_STATE.shipPosX = GAME_STATE.shipPosX + distanceTraveled;

        }
    }
    if (GAME_STATE.pressedKeys.left == true) {
        if (GAME_STATE.shipPosX < 0) {
            GAME_STATE.shipPosX = 0;
        }
        else {
            GAME_STATE.shipPosX = GAME_STATE.shipPosX - distanceTraveled;

        }
    }
    if (GAME_STATE.pressedKeys.up == true) {
        if (GAME_STATE.shipPosY < 0) {
            GAME_STATE.shipPosY = 0;
        }
        else {
            GAME_STATE.shipPosY = GAME_STATE.shipPosY - distanceTraveled;
        }
    }
    if (GAME_STATE.pressedKeys.down == true) {
        if (GAME_STATE.shipPosY > CANVAS.height - SHIP_SIZE) {
            GAME_STATE.shipPosY = CANVAS.height - SHIP_SIZE;
        }
        else {
            GAME_STATE.shipPosY = GAME_STATE.shipPosY + distanceTraveled;
        }
    }
}
//ej 19
function updateAsteroid(asteroid, timeDelta) {
    asteroid.posX += asteroid.velX * timeDelta;
    asteroid.posY += asteroid.velY * timeDelta;
    if (asteroid.posX > CANVAS.width) {
        asteroid.posX -= (CANVAS.width + ASTEROID_SIZE)
    } else if (asteroid.posX < -ASTEROID_SIZE) {
        asteroid.posX += CANVAS.width + ASTEROID_SIZE
    } else if (asteroid.posY > CANVAS.height) {
        asteroid.posY -= (CANVAS.height + ASTEROID_SIZE)
    } else if (asteroid.posY < -ASTEROID_SIZE) {
        asteroid.posY += CANVAS.height + ASTEROID_SIZE
    }
}


function update(progressInMilliseconds) {
    console.log("Han transcurrido " + progressInMilliseconds + " ms desde la última actualización");
    //ej 19
    const progressInSeconds = progressInMilliseconds / 1000;
    updateSpaceship(progressInSeconds);

    for (const asteroid of GAME_STATE.asteroids) {
        updateAsteroid(asteroid, progressInSeconds)
        //ej 21
        if (isCollisioning(asteroid)) {
            console.log("La nave espacial ha explotado");
            GAME_STATE.isGameOver = true;
        }

    }

}

//ej 21
function isPointInsideRectangle(pointX, pointY, rectangleX, rectangleY, rectangleWidth, rectangleHeight) {
    const rectangleLeftSide = rectangleX;
    const rectangleRightSide = rectangleX + rectangleWidth;
    const rectangleTopSide = rectangleY;
    const rectangleBottomSide = rectangleY + rectangleHeight;
    return (pointX > rectangleLeftSide) && (pointX < rectangleRightSide) && (pointY > rectangleTopSide) && (pointY < rectangleBottomSide);

}
function isCollisioning(asteroid) {
    const spaceshipMidX = GAME_STATE.shipPosX + (SHIP_SIZE / 2);
    const spaceshipMidY = GAME_STATE.shipPosY + (SHIP_SIZE / 2);
    return isPointInsideRectangle(spaceshipMidX, spaceshipMidY, asteroid.posX, asteroid.posY, ASTEROID_SIZE, ASTEROID_SIZE);
}


// Bucle de renderizado
// --------------------------------------------------------------------------------------------------
function draw() {
    renderBackground();
    for (const asteroid of GAME_STATE.asteroids) {
        CANVAS_CTX.drawImage(imageAsteroid, asteroid.posX, asteroid.posY, ASTEROID_SIZE, ASTEROID_SIZE);
    }
    CANVAS_CTX.drawImage(imageSpaceship, GAME_STATE.shipPosX, GAME_STATE.shipPosY, SHIP_SIZE, SHIP_SIZE);
}

function loop(timestamp) {
    const progress = timestamp - lastRender;
    update(progress);
    draw();
    lastRender = timestamp;
    if (GAME_STATE.isGameOver === true) { // Condición de guarda
        return;
    } else {
        window.requestAnimationFrame(loop);
    }




}

function renderBackground() {
    CANVAS_CTX.fillStyle = "#110201";
    CANVAS_CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
}

// Código principal
// --------------------------------------------------------------------------------------------------

CANVAS.width = 640;
CANVAS.height = 480;
CANVAS.style.margin = "auto";
CANVAS.style.display = "block";
const SHIP_SIZE = 53;
window.requestAnimationFrame(loop);

for (let i = 0; i < 1; i++) {
    generateAsteroid();
}

//ej 16
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

function setPressedKey(keyCode, isPressed) {
    if (keyCode === 68) {
        GAME_STATE.pressedKeys['right'] = isPressed;
    }
    if (keyCode === 65) {
        GAME_STATE.pressedKeys['left'] = isPressed;
    }
    if (keyCode === 87) {
        GAME_STATE.pressedKeys['up'] = isPressed;
    }
    if (keyCode === 83) {
        GAME_STATE.pressedKeys['down'] = isPressed;
    }
}

function onKeyDown(event) {
    console.log("Has pulsado la tecla con código: " + event.keyCode);
    setPressedKey(event.keyCode, true);
}

function onKeyUp(event) {
    console.log("Has soltado la tecla con código: " + event.keyCode);
    setPressedKey(event.keyCode, false);
}

// ej 18
function generateAsteroid() {
    const randomVelocityX = Math.trunc(Math.random() * 100) - 50; // [-50, +50]
    const randomVelocityY = Math.trunc(Math.random() * 100) - 50; // [-50, +50]
    const newAsteroid = {
        "posX": CANVAS.width,
        "posY": CANVAS.height,
        "velX": randomVelocityX,
        "velY": randomVelocityY
    };
    GAME_STATE.asteroids.push(newAsteroid);
    console.log('Se ha creado un asteroide');
    console.log('velX=' + randomVelocityX);
    console.log('velY=' + randomVelocityY);

    setTimeout(generateAsteroid, 8000);

}
