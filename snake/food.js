const FOOD_COLOUR = '#C93F36';
class Food {
    constructor(position, cellSize) {
        this.position = position
        this.cellSize = cellSize
    }

    reposition(position) {
        this.position = position
    }

    draw(world) {
        noStroke()
        fill(FOOD_COLOUR)
        square(
            this.position.x * world.cellSize,
            this.position.y * world.cellSize,
            world.cellSize,
            12
        )
    }
}