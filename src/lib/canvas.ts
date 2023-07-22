module.exports = (ctx: CanvasRenderingContext2D, Images: { [keys: string]: HTMLImageElement, },) => {
    const stamp = (name: string, dx: number, dy: number, dd: number = 0, size: number = 100,
        wh: number = 1, sx: number = 0, sy: number = 0, sw: number | undefined = undefined, sh: number | undefined = undefined) => {
        const costume = Images[name];
        const sw2 = sw != undefined ? sw : costume.width - sx;
        const sh2 = sh != undefined ? sh : costume.height - sy;
        ctx.save();
        ctx.translate(dx, dy);
        ctx.rotate(dd * Math.PI / 180);
        ctx.drawImage(costume, sx, sy, sw2, sh2, -sw2 * size * wh / 200, -sh2 * size / 200, sw2 * size * wh / 100, sh2 * size / 100);
        ctx.restore();
    };
    const drawRect = (dx: number, dy: number, width: number, heigth: number, color: string, direction: number = 0, type: 0 | 1 = 1) => {
        ctx.save();
        ctx.translate(dx + width * type / 2, dy + heigth * type / 2);
        ctx.rotate(direction * Math.PI / 180);
        ctx.beginPath();
        ctx.rect(-width * type / 2, -heigth * type / 2, width, heigth);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    };
    const drawLine = (lx: number, ly: number, d: number, len: number, width: number, color: string, type: number = 0) => {
        ctx.beginPath();
        switch (type) {
            case 0: {
                ctx.moveTo(lx * 2 - len * Math.sin(d), ly * 2 + len * Math.cos(d));
                ctx.lineTo(lx * 2 + len * Math.sin(d), ly * 2 - len * Math.cos(d));
            } break;
            case 1: {
                ctx.moveTo(lx * 2, ly * 2);
                ctx.lineTo(lx * 2 + len * Math.sin(d) * 2, ly * 2 - len * Math.cos(d) * 2);
            } break;
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
    }
    return {
        stamp,
        drawRect,
        drawLine,
    }
}