let boardSize = 400;
let scale = 20;
let cellSize = Math.floor(boardSize / scale)

const world = {
    boardSize: 400,
    scale: 20, // number of grid squares on each axis
    get cellSize() {
        return Math.floor(this.boardSize / scale)
    }
}

/**
 * @var Snake
 */
let snake, food, scoreboard;
let STEERING_VECTORS

function setup() {
    frameRate(10)
    STEERING_VECTORS = {
        [UP_ARROW]: createVector(0, -1),
        [RIGHT_ARROW]: createVector(1, 0),
        [LEFT_ARROW]: createVector(-1, 0),
        [DOWN_ARROW]: createVector(0, 1),
    }

    scoreboard = new Scoreboard();
    snake = new Snake(randomPosition())
    food = new Food(randomPosition())

    createCanvas(boardSize, boardSize);
}

function randomPosition() {
    return createVector(
        floor(random(scale)),
        floor(random(scale))
    )
}

function keyPressed() {
    let vector = STEERING_VECTORS[keyCode]

    if (vector) {
        snake.steer(vector)
    }
}

function draw() {
    background(0);

    if (p5.Vector.sub(snake.head(), food.position).mag() === 0.0) {
        snake.grow()
        food.reposition(randomPosition())
        scoreboard.increase()
    }

    snake.update(world);

    food.draw(world)
    snake.draw(world)
    scoreboard.draw(world)

    if (snake.died()) {
        // TODO: Add a better game over state
        setup()
    }
}