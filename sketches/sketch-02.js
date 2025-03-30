const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

// const degToRad = (deg) => (deg * Math.PI) / 180;
// const randomRange = (min, max) => min + Math.random() * (max - min);

const settings = {
    dimensions: [1080, 1080],
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = "#fff";
        context.fillRect(0, 0, width, height);
        context.fillStyle = "#000";
        context.strokeStyle = "#000";

        const [cx, cy] = [width / 2, height / 2];
        const ratioSize = 1 / 10;
        const [w, h] = [(width * ratioSize) / 10, height * ratioSize];
        const n = 40;
        const radius = width / 3;
        let x, y;

        // context.translate(cx, cy);

        for (let i = 0; i < n; i++) {
            const slice = math.degToRad(360 / n);
            const angle = slice * i;
            x = cx + Math.sin(angle) * radius;
            y = cy + Math.cos(angle) * radius;

            // rects
            context.save();

            context.translate(x, y);
            context.rotate(-angle);
            context.scale(random.range(0.5, 1.5), random.range(0.5, 1));

            context.beginPath();
            context.rect(-w / 2, random.range(0, -h / 2), w, h);
            context.fill();

            context.restore();

            // arcs
            context.save();

            context.translate(cx, cy);
            context.rotate(-angle);

            context.beginPath();
            context.lineWidth = random.range(1, 25);
            context.arc(
                0,
                0,
                radius * random.range(0.5, 1.4),
                -slice * random.range(0, 15),
                slice * random.range(0, 5)
            );
            context.stroke();

            context.restore();
        }
    };
};

canvasSketch(sketch, settings);
