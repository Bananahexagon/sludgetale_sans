import { sin360, cos360 } from "./utils";
import { configT } from "../config.json";

const CanvasLibGen = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, Images: Map<string, HTMLImageElement>,
    Fonts: Map<string, FontFace>, config: configT, props: CanvasProps,) => {
    const stamp = (name: string, dx: number, dy: number, dd: number = 0, size: number = 100, alpha: number = 1, align: "center" | "start" = "center", ex_width: number = 1, box?: { left: number, top: number, width: number, height: number, }, absolute = false) => {
        if (absolute) {
            const costume = Images.get(name)!;
            const [sx, sy, sw, sh] = box === undefined ? [0, 0, costume.width, costume.height] : [box.left, box.top, box.width, box.height];
            ctx.globalAlpha = alpha;
            switch (align) {
                case "center": {
                    ctx.save();
                    ctx.translate(dx * config.display_quality, -dy * config.display_quality + canvas.height);
                    ctx.rotate(dd * Math.PI / 180);
                    ctx.drawImage(costume, sx, sy, sw, sh, (-sw * ex_width * size / 200) * config.display_quality, (-sh * size / 200) * config.display_quality, (sw * ex_width * size / 100) * config.display_quality, (sh * size / 100) * config.display_quality);
                    ctx.restore();
                } break;
                case "start": {
                    ctx.save();
                    ctx.translate(dx * config.display_quality, -dy * config.display_quality + canvas.height);
                    ctx.rotate(dd * Math.PI / 180);
                    ctx.drawImage(costume, sx, sy, sw, sh, 0, 0, (sw * ex_width * size / 100) * config.display_quality, (sh * size / 100) * config.display_quality);
                    ctx.restore();
                }
            }
        } else {
            const x = (cos360(props.d) * dx - sin360(props.d) * dy + props.x) * props.size / 100;
            const y = (sin360(props.d) * dx + cos360(props.d) * dy + props.y) * props.size / 100;
            const d = dd + props.d;
            stamp(name, x, y, d, size * props.size / 100, alpha, align, ex_width, box, true);
        }
    };
    const drawRect = (dx: number, dy: number, width: number, height: number, color: string, direction: number = 0, alpha?: number, type: "center++" | "center" | "start" = "center", absolute = false) => {
        if (absolute) {
            ctx.globalAlpha = alpha === undefined ? 1 : alpha;
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
                case "start": {
                    ctx.translate(dx * config.display_quality, -dy * config.display_quality + canvas.height);
                    ctx.rotate(direction * Math.PI / 180);
                    ctx.beginPath();
                    ctx.rect(0, 0, (width) * config.display_quality, -(height) * config.display_quality);
                } break;
            }
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();
        } else {
            const x = (cos360(props.d) * dx - sin360(props.d) * dy + props.x) * props.size / 100;
            const y = (sin360(props.d) * dx + cos360(props.d) * dy + props.y) * props.size / 100;
            const d = direction + props.d;
            drawRect(x, y, width * props.size / 100, height * props.size / 100, color, d, alpha, type, true);
        }
    };
    const strokeRect = (dx: number, dy: number, width: number, height: number, color: string, direction: number = 0, alpha?: number,
        type: "center++" | "center" | "start" = "center", lw: number = 1, pos: "inner" | "outer" | "default" = "inner", absolute = false) => {
        if (absolute) {
            if (pos == "default") {
                ctx.globalAlpha = alpha === undefined ? 1 : alpha;
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
                ctx.lineWidth = lw * config.display_quality;
                ctx.strokeStyle = color;
                ctx.stroke();
                ctx.restore();
            } else if (pos == "inner") {
                strokeRect(dx - lw / 2, dy - lw / 2, width, height, color, direction, alpha, type, lw, "default")
            } else if (pos == "outer") {
                strokeRect(dx + lw / 2, dy + lw / 2, width, height, color, direction, alpha, type, lw, "default")
            }
        } else {
            const x = (cos360(props.d) * dx - sin360(props.d) * dy + props.x) * props.size / 100;
            const y = (sin360(props.d) * dx + cos360(props.d) * dy + props.y) * props.size / 100;
            const d = direction + props.d;
            strokeRect(x, y, width * props.size / 100, height * props.size / 100, color, d, alpha, type, lw, pos, true);
        }
    };
    const drawLine = (lx: number, ly: number, ld: number, len: number, width: number, color: string, type: number = 0, absolute = false) => {
        if (absolute) {
            ctx.globalAlpha = 1;
            ctx.beginPath();
            switch (type) {
                case 0: {
                    ctx.moveTo((lx - len * Math.sin(ld) / 2) * config.display_quality, -(ly + len * Math.cos(ld) / 2) * config.display_quality + canvas.height);
                    ctx.lineTo((lx + len * Math.sin(ld) / 2) * config.display_quality, -(ly - len * Math.cos(ld) / 2) * config.display_quality + canvas.height);
                } break;
                case 1: {
                    ctx.moveTo(lx * config.display_quality, -ly * config.display_quality + canvas.height);
                    ctx.lineTo((lx + len * Math.sin(ld)) * config.display_quality, -(ly - len * Math.cos(ld)) * config.display_quality + canvas.height);
                } break;
            }
            ctx.strokeStyle = color;
            ctx.lineWidth = width * config.display_quality;
            ctx.stroke();
        } else {
            const x = (cos360(props.d) * lx - sin360(props.d) * ly + props.x) * props.size / 100;
            const y = (sin360(props.d) * lx + cos360(props.d) * ly + props.y) * props.size / 100;
            const d = ld + props.d;
            drawLine(x, y, d, len * props.size / 100, width * props.size / 100, color, type, true)
        }
    }
    const drawText = (tx: string, lx: number, ly: number, size: number, color: string, font: string = "serif", align: "left" | "right" | "center" | "start" | "end" = "left") => {
        ctx.globalAlpha = 1;
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
        strokeRect,
    }
}

type cLibT = ReturnType<typeof CanvasLibGen>

type CanvasProps = {
    size: number,
    x: number,
    y: number,
    d: number,
}

export {
    CanvasLibGen,
    cLibT,
    CanvasProps
}