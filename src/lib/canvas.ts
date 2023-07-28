type configT = {
    display_quality: number;
}

export const cLibGen = (ctx: CanvasRenderingContext2D, Images: { [keys: string]: HTMLImageElement, }, config: configT) => {
    const stamp = (name: string, dx: number, dy: number, dd: number = 0, size: number = 100,
        wh: number = 1, sx: number = 0, sy: number = 0, sw: number | undefined = undefined, sh: number | undefined = undefined) => {
        const costume = Images[name];
        const sw2 = sw != undefined ? sw : costume.width - sx;
        const sh2 = sh != undefined ? sh : costume.height - sy;
        ctx.save();
        ctx.translate((dx) * config.display_quality, (dy) * config.display_quality);
        ctx.rotate(dd * Math.PI / 180);
        ctx.drawImage(costume, sx, sy, sw2, sh2, (-sw2 * size * wh / 200) * config.display_quality, (-sh2 * size / 200) * config.display_quality, (sw2 * size * wh / 100) * config.display_quality, (sh2 * size / 100) * config.display_quality);
        ctx.restore();
    };
    const drawRect = (dx: number, dy: number, width: number, height: number, color: string, direction: number = 0, type: 0 | 1 = 1) => {
        ctx.save();
        ctx.translate((dx + width * type / 2) * config.display_quality, (dy + height * type / 2) * config.display_quality);
        ctx.rotate(direction * Math.PI / 180);
        ctx.beginPath();
        ctx.rect((-width * type / 2) * config.display_quality, (-height * type / 2) * config.display_quality, (width) * config.display_quality, (height) * config.display_quality);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    };
    const drawLine = (lx: number, ly: number, d: number, len: number, width: number, color: string, type: number = 0) => {
        ctx.beginPath();
        switch (type) {
            case 0: {
                ctx.moveTo((lx - len * Math.sin(d) / 2) * config.display_quality, (ly + len * Math.cos(d) / 2) * config.display_quality);
                ctx.lineTo((lx + len * Math.sin(d) / 2) * config.display_quality, (ly - len * Math.cos(d) / 2) * config.display_quality);
            } break;
            case 1: {
                ctx.moveTo(lx * config.display_quality, ly * config.display_quality);
                ctx.lineTo((lx + len * Math.sin(d) )* config.display_quality, (ly - len * Math.cos(d)) * config.display_quality);
            } break;
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = width * config.display_quality;
        ctx.stroke();
    }
    return {
        stamp,
        drawRect,
        drawLine,
    }
}