const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const settings = {
    dimensions: [1080, 1080],
    animate: true,
};

const sketch = ({ width, height }) => {
    const dots = [];
    const maxDist = 300;
    const n = 25;

    for (let i = 0; i < n; i++) {
        const x = random.range(0, width);
        const y = random.range(0, height);
        dots.push(new Agent(x, y));
    }

    return ({ context, width, height }) => {
        context.fillStyle = "#fff";
        context.fillRect(0, 0, width, height);

        for (let i = 0; i < dots.length; i++) {
            const dot = dots[i];

            for (let j = i + 1; j < dots.length; j++) {
                const other = dots[j];
                const dist = dot.pos.getDistance(other.pos);

                if (dist < maxDist) {
                    context.lineWidth = math.mapRange(dist, 0, maxDist, 8, 1);

                    context.beginPath();
                    context.moveTo(dot.pos.x, dot.pos.y);
                    context.lineTo(other.pos.x, other.pos.y);
                    context.stroke();
                }
            }
        }

        dots.forEach((dot) => {
            dot.update();
            dot.draw(context, (filled = 0));
            dot.bounce(width, height);
        });
    };
};

canvasSketch(sketch, settings);

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getDistance(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }
}

class Agent {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(random.range(-2, 2), random.range(-2, 2));
        this.radius = random.range(4, 12);
    }

    draw(context, filled = 1) {
        context.save();

        context.translate(this.pos.x, this.pos.y);

        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2);
        if (filled) {
            context.fillStyle = "#000";
            context.fill();
        } else {
            context.lineWidth = 3;
            context.fillStyle = "#fff";
            context.strokeStyle = "#000";
            context.fill();
            context.stroke();
        }

        context.restore();
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    bounce(width, height) {
        if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
        if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
    }

    warp(width, height) {
        if (this.pos.x <= 0) this.pos.x = width;
        else if (this.pos.x >= width) this.pos.x = 0;
        if (this.pos.y <= 0) this.pos.y = height;
        else if (this.pos.y >= height) this.pos.y = 0;
    }
}
