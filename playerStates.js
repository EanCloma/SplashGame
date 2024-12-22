const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
};

class State {
    constructor(state) {
        this.state = state;
    }
}

export class Sitting extends State {
    constructor(player) {
        super('SITTING');
        this.player = player;
    }

    enter() {
        this.player.maxFrame = 4;
        this.player.frameY = 5;
    }

    handleInput(input) {
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
            this.player.setState(states.RUNNING);
        }
    }
}

export class Running extends State {
    constructor(player) {
        super('RUNNING');
        this.player = player;
    }

    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 6;
        this.player.frameY = 3;
    }

    handleInput(input) {
        if (input.includes('ArrowDown')) {
            this.player.setState(states.SITTING);
        } else if (input.includes('ArrowUp')) {
            this.player.setState(states.JUMPING);
        } else {
            // Set speed based on input
            if (input.includes('ArrowRight')) {
                this.player.speed = this.player.maxSpeed; // Move right
            } else if (input.includes('ArrowLeft')) {
                this.player.speed = -this.player.maxSpeed; // Move left
            } else {
                this.player.speed = 0; // Stop if no input
            }
        }
    }
}

export class Jumping extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player;
    }

    enter() {
        if (this.player.onGround()) {
            this.player.vy -= 27; // Apply jump force
        }
        this.player.frameX = 0;
        this.player.maxFrame = 6;
        this.player.frameY = 1;
    }

    handleInput(input) {
        if (this.player.vy > 0) { // Check if falling
            this.player.setState(states.FALLING);
        }
    }
}

export class Falling extends State {
    constructor(player) {
        super('FALLING');
        this.player = player;
    }

    enter() {
        this.player.frameX = 0;
        this.player.maxFrame = 6;
        this.player.frameY = 2;
    }

    handleInput(input) {
        // Only transition to RUNNING if the player is on the ground and input indicates running
        if (this.player.onGround()) {
            if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
                this.player.setState(states.RUNNING);
            }
        }
    }
}