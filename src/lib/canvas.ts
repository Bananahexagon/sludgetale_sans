import { configT, CanvasProps, cLibT } from "./types";
import { sin360, cos360 } from "./utils";

export const CanvasLibGen = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, Images: { [keys: string]: HTMLImageElement, }, Fonts: { [keys: string]: FontFace }, config: configT, props: CanvasProps): cLibT => {
    const stamp = (name: string, dx: number, dy: number, dd: number = 0, size: number = 100,alpha:number = 1, align: string = "center", absolute = false) => {
        if (absolute) {
            const costume = Images[name];
            const sw = costume.width;
            const sh = costume.height;
            ctx.globalAlpha = alpha;
            switch (align) {
                case "center": {
                    ctx.save();
                    ctx.translate(dx * config.display_quality, -dy * config.display_quality + canvas.height);
                    ctx.rotate(dd * Math.PI / 180);
                    ctx.drawImage(costume, (-sw * size / 200) * config.display_quality, (-sh * size / 200) * config.display_quality, (sw * size / 100) * config.display_quality, (sh * size / 100) * config.display_quality);
                    ctx.restore();
                } break;
                case "start": {
                    ctx.save();
                    ctx.translate(dx * config.display_quality, -dy * config.display_quality + canvas.height);
                    ctx.rotate(dd * Math.PI / 180);
                    ctx.drawImage(costume, 0, 0, (sw * size / 100) * config.display_quality, (sh * size / 100) * config.display_quality);
                    ctx.restore();
                }
            }
        } else {
            const x = (cos360(props.d) * dx - sin360(props.d) * dy + props.x) * props.size / 100;
            const y = (sin360(props.d) * dx + cos360(props.d) * dy + props.y) * props.size / 100;
            const d = dd + props.d;
            stamp(name, x, y, d, size * props.size / 100, alpha,align, true);
        }
    };
    const drawRect = (dx: number, dy: number, width: number, height: number, color: string, direction: number = 0, type: string = "center") => {
        ctx.save();
        switch (type) {
            case "center++": {
                ctx.translate(dx * config.display_quality, -dy * config.display_quality + canvas.height);
                ctx.rotate(direction * Math.PI / 180);
                ctx.beginPath();
                ctx.rect((-width / 2) * config.display_quality, (-height / 2) * config.display_quality, (width) * config.display_quality, (height) * config.display_quality);
            } break;
            case "center": {
                ctx.translate((dx - width / 2) * config.display_quality, -(dy - height / 2) * config.display_quality + canvas.height);
                ctx.rotate(direction * Math.PI / 180);
                ctx.beginPath();
                ctx.rect(0, 0, (width) * config.display_quality, -(height) * config.display_quality);
            } break;
            case "start":
            default: {
                ctx.translate(dx * config.display_quality, -dy * config.display_quality + canvas.height);
                ctx.rotate(direction * Math.PI / 180);
                ctx.beginPath();
                ctx.rect(0, 0, (width) * config.display_quality, -(height) * config.display_quality);
            } break;
        }
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    };
    const drawLine = (lx: number, ly: number, d: number, len: number, width: number, color: string, type: number = 0) => {
        ctx.beginPath();
        switch (type) {
            case 0: {
                ctx.moveTo((lx - len * Math.sin(d) / 2) * config.display_quality, -(ly + len * Math.cos(d) / 2) * config.display_quality + canvas.height);
                ctx.lineTo((lx + len * Math.sin(d) / 2) * config.display_quality, -(ly - len * Math.cos(d) / 2) * config.display_quality + canvas.height);
            } break;
            case 1: {
                ctx.moveTo(lx * config.display_quality, -ly * config.display_quality + canvas.height);
                ctx.lineTo((lx + len * Math.sin(d)) * config.display_quality, -(ly - len * Math.cos(d)) * config.display_quality + canvas.height);
            } break;
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = width * config.display_quality;
        ctx.stroke();
    }
    const drawText = (tx: string, lx: number, ly: number, size: number, color: string, font: string = "serif", align: "left" | "right" | "center" | "start" | "end" = "left") => {
        const [x, y] = [lx * config.display_quality, -ly * config.display_quality + canvas.height];
        ctx.font = `${size * config.display_quality}px ${font}`;
        ctx.textAlign = align;
        ctx.fillStyle = color;
        ctx.fillText(tx, x, y);
    }
    return {
        stamp,
        drawRect,
        drawLine,
        drawText,
    }
}
