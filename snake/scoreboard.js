class Scoreboard {
    constructor() {
        this.score = 0;
    }

    increase() {
        this.score ++
    }

    draw(world) {
        textSize(24)
        fill(250)
        text(`Score: ${this.score}`, 10, 10, world.boardSize - 10, 24)
    }
}