const canvasSketch = require("canvas-sketch");

const degToRad = (deg) => (deg * Math.PI) / 180;
const minMaxRandom = (min, max) => min + Math.random() * (max - min);

const settings = {
    dimensions: [1080, 1080],
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = "000";
        context.fillRect(0, 0, width, height);
        context.fillStyle = "#fff";

        const [cx, cy] = [width / 2, height / 2];
        const ratioSize = 1 / 10;
        const [w, h] = [(width * ratioSize) / 10, height * ratioSize];
        const n = 50;
        const radius = width / 3;
        let x, y;

        context.translate(cx, cy);

        for (let i = 0; i < n; i++) {
            const angle = degToRad(360 / n) * i;
            x = Math.sin(angle) * radius;
            y = Math.cos(angle) * radius;

            context.save();
            // context.scale(1, 2);
            context.translate(x, y);
            context.rotate(-angle);

            context.beginPath();
            context.scale(minMaxRandom(0.2, 2), minMaxRandom(0.2, 2));
            context.rect(-w / 2, -h / 2, w, h);
            context.fill();

            context.restore();
        }
    };
};

canvasSketch(sketch, settings);
