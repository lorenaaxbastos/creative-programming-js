"use strict";

const canvasSketch = require("canvas-sketch");

const settings = {
    dimensions: [2048, 2048],
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = "#fff";
        context.fillRect(0, 0, width, height);
        context.lineWidth = width * 0.01;

        const n = 5;
        const w = width * 0.1;
        const h = height * 0.1;
        const gap = w / 3;
        const mgH = (width - w * n - gap * (n - 1)) / 2;
        const mgV = (height - h * n - gap * (n - 1)) / 2;
        const offset = 0.1;
        let x, y;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                x = mgH + (w + gap) * i;
                y = mgV + (h + gap) * j;
                context.beginPath();
                context.rect(x, y, w, h);
                context.stroke();

                if (Math.random() > 0.5) {
                    context.beginPath();
                    context.rect(
                        x + w * offset,
                        y + h * offset,
                        w - w * offset * 2,
                        h - h * offset * 2
                    );
                    context.stroke();
                }
            }
        }
    };
};

canvasSketch(sketch, settings);
