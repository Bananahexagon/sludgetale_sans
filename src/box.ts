type cLibT = {
    drawRect: (dx: number, dy: number, width: number, height: number, color: string, direction?: number, type?: 0 | 1) => void;
    drawLine: (lx: number, ly: number, d: number, len: number, width: number, color: string, type?: number) => void;
    [keys: string]: Function;
}

type boxObjT = {
    center: {
        x: number,
        y: number,
    }
    direction: number,
    width: number,
    height: number,
}

type lineT = {
    calc: Function,
    drawLine: Function,
    drawWhite: Function,
    drawBlack: Function,
}

const boxFnsGen = (cLib: cLibT) => {
    const line = (lx: number, ly: number, d: number, len: number, width: number = 8, type: "line" | "wall" = "line"): lineT => {
        let position: boolean;
        return {
            calc: (px: number, py: number) => {
                let ptx = (px - lx) * Math.sin(d) - (py - ly) * Math.cos(d);
                let pty = (px - lx) * Math.cos(d) + (py - ly) * Math.sin(d);
                if (type == "line") position = 0 < pty;
                if (-len / 2 < ptx && ptx < len / 2 || type == "wall") {
                    if (position) {
                        if (pty < width) pty = width;
                    } else {
                        if (-width < pty) pty = -width;
                    }
                }
                let prx = -ptx * Math.sin(-d) + pty * Math.cos(-d);
                let pry = -ptx * Math.cos(-d) - pty * Math.sin(-d);
                return [prx + lx, pry + ly];
            },
            drawLine: () => {
                cLib.drawLine(lx, ly, d, len, 10, "#ffffff");
            },
            drawWhite: () => {
                cLib.drawRect(lx + (640 * Math.sin(d)), ly - (640 * Math.cos(d)), 1280, 1280, "#ffffff", d * 180 / Math.PI, 0);
            },
            drawBlack: () => {
                cLib.drawRect(lx + (640 * Math.sin(d) + (width / 2 + 1) * Math.cos(d)), ly - (640 * Math.cos(d) - (width / 2 + 1) * Math.sin(d)), 1280, 1280, "#000000", d * 180 / Math.PI, 0);
            }
        }
    }

    const boxGet = (boxObj: boxObjT): lineT[] => {
        return [
            line(
                boxObj.center.x + boxObj.width * Math.cos(boxObj.direction * Math.PI / 180),
                boxObj.center.y + boxObj.width * Math.sin(boxObj.direction * Math.PI / 180),
                boxObj.direction * Math.PI / 180, 640, 8, "wall"
            ),
            line(
                boxObj.center.x - boxObj.height * Math.sin(boxObj.direction * Math.PI / 180),
                boxObj.center.y + boxObj.height * Math.cos(boxObj.direction * Math.PI / 180),
                (boxObj.direction + 90) * Math.PI / 180, 640, 8, "wall"
            ),
            line(
                boxObj.center.x - boxObj.width * Math.cos(boxObj.direction * Math.PI / 180),
                boxObj.center.y - boxObj.width * Math.sin(boxObj.direction * Math.PI / 180),
                (boxObj.direction + 180) * Math.PI / 180, 640, 8, "wall"
            ),
            line(
                boxObj.center.x + boxObj.height * Math.sin(boxObj.direction * Math.PI / 180),
                boxObj.center.y - boxObj.height * Math.cos(boxObj.direction * Math.PI / 180),
                (boxObj.direction - 90) * Math.PI / 180, 640, 8, "wall"
            ),
        ];
    }
    return {
        line,
        boxGet
    }
}

export { boxFnsGen };