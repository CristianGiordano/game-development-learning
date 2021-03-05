const SNAKE_COLOUR = '#56C936'

class Snake {

    constructor(position) {
        this.body = [position]
        this.velocity = createVector(0, 0)
        this.skipLastSegment = false
    }

    head() {
        return this.body[0]
    }

    grow() {
        this.body.push(this.head().copy())
        this.skipLastSegment = true
    }

    /**
     * Steering vector
     * @param direction
     */
    steer(direction) {
        // Prevents going back on itself, ie. go left when travelling right
        if (p5.Vector.dot(this.velocity, direction) === 0) {
            this.velocity = direction
        }
    }

    /**
     * World scale is the actual number of cells in the rows and columns
     * but our position is zero indexed which is why must check >=.
     * @param world
     * @private
     */
    _checkOffscreenWrapping(world) {
        // Off the right side
        if (this.head().x >= world.scale) {
            return this.head().x = 0;
        }
        // Off the left
        if (this.head().x < 0) {
            return this.head().x = world.scale - 1;
        }

        // Off the bottom
        if (this.head().y >= world.scale) {
            return this.head().y = 0;
        }

        // Off the top
        if (this.head().y < 0) {
            return this.head().y = world.scale - 1;
        }
    }

    update(world) {
        // Move the head forward
        this.body.unshift(this.head().copy().add(this.velocity))

        // Drop the last segment to move everything forward
        this.body.pop();

        this._checkOffscreenWrapping(world)

        this.skipLastSegment = false
    }

    draw(world) {
        for (let i = 0; i < this.body.length; i++) {
            noStroke()
            fill(SNAKE_COLOUR)
            square(
                this.body[i].x * world.cellSize,
                this.body[i].y * world.cellSize,
                world.cellSize,
                4 // border radius
            )
        }
    }

    died() {
        /**
         * Iterate backwards to check the body and skip the head checking itself
         */
        for (let i = this.body.length - 1; i > 0; i--) {

            // When we "grow" we want to skip this segment as we won't move that frame
            if (this.skipLastSegment && this.isLastSegment(i)) {
                continue;
            }

            if (this.head().equals(this.body[i])) {
                return true;
            }
        }

        return false;
    }

    isLastSegment(i) {
        return i === this.body.length - 1;
    }
}