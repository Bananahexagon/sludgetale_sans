import { cLibT } from "./lib/canvas";
import { SpriteT } from "./lib/sprite";
import { cos360, sin360 } from "./lib/utils";


const boxFnsGen = (cLib: cLibT, soul: SpriteT, Game: {
    color: { white: string, blue: string, orange: string }
}) => {
    class Wall {
        dx: number;
        dy: number;
        dd: number;
        len: number;
        width: number;
        align: "center" | "start";
        relative: "minus" | "unknown" | "plus"
        soul_size: number;
        constructor(dx: number, dy: number, dd: number, len: number, align: "center" | "start", relative?: "minus" | "plus", width: number = 4) {
            this.dx = dx;
            this.dy = dy;
            this.dd = dd;
            this.len = len;
            this.align = align;
            this.width = width;
            this.soul_size = 6;
            this.relative = relative ? relative : (() => {
                const d = this.dd
                const relative_x = soul.x - this.dx;
                const relative_y = soul.y - this.dy;
                const turned_y = relative_y * cos360(d) + relative_x * sin360(d);
                if (turned_y > 0) {
                    return "plus"
                } else {
                    return "minus"
                }
            })()
        }
        judge() {
            const d = this.dd
            const relative_x = soul.x - this.dx;
            const relative_y = soul.y - this.dy;
            const turned_x = relative_x * cos360(d) + relative_y * -sin360(d);
            const turned_y = relative_y * cos360(d) + relative_x * sin360(d);
            if (this.len / 2 > turned_x && turned_x > -this.len / 2) {
                if (this.relative == "minus" && turned_y > -(this.width / 2 + this.soul_size) || this.relative == "plus" && (this.width / 2 + this.soul_size) > turned_y) {
                    const returned_x = turned_x * cos360(-d) + ((this.width / 2 + this.soul_size) * (this.relative == "minus" ? 1 : -1)) * sin360(-d);
                    const returned_y = ((this.width / 2 + this.soul_size) * (this.relative == "minus" ? 1 : -1)) * -cos360(-d) + turned_x * sin360(-d)
                    soul.x = returned_x + this.dx;
                    soul.y = returned_y + this.dy;
                }
            } else {
                if (turned_y > 0) {
                    this.relative = "plus"
                } else {
                    this.relative = "minus"
                }
            }
        }
        draw() {
            cLib.drawRect(this.dx, this.dy, this.len, this.width, "white", this.dd, 1, "center++");
        }
        is_jumpable(sd: number) {
            const d = this.dd;
            const relative_x = soul.x - this.dx;
            const relative_y = soul.y - this.dy;
            const turned_x = relative_x * cos360(d) + relative_y * -sin360(d);
            const turned_y = relative_y * cos360(d) + relative_x * sin360(d);
            const d_trans = Math.abs((d - sd + 180) % 360);
            return (
                this.len / 2 > turned_x && turned_x > -this.len / 2 && (
                    this.relative == "minus" && turned_y > -(this.width / 2 + this.soul_size - 3) ||
                    this.relative == "plus" && (this.width / 2 + this.soul_size + 3) > turned_y
                ) &&
                135 <= d_trans && d_trans <= 225);
        }
    }
    class Wall2 {
        dx: number;
        dy: number;
        dd: number;
        width: number;
        constructor(dx: number, dy: number, dd: number, width: number = 4) {
            this.dx = dx;
            this.dy = dy;
            this.dd = dd;
            this.width = width;
        }
        judge() {
            const d = this.dd
            const relative_x = soul.x - this.dx;
            const relative_y = soul.y - this.dy;
            const turned_x = relative_x * cos360(d) + relative_y * -sin360(d);
            const turned_y = relative_y * cos360(d) + relative_x * sin360(d);
            if (turned_y > -this.width) {
                const returned_x = turned_x * cos360(-d) + this.width * sin360(-d);
                const returned_y = this.width * -cos360(-d) + turned_x * sin360(-d)
                soul.x = returned_x + this.dx;
                soul.y = returned_y + this.dy;
            }
        }
        draw() {
            const x = this.dx + 320 * sin360(this.dd)
            const y = this.dy + 320 * cos360(this.dd)
            cLib.drawRect(x, y, 640, 640, Game.color.white, this.dd, 1, "center++");
        }
        is_jumpable(sd: number) {
            const d = this.dd;
            const relative_x = soul.x - this.dx;
            const relative_y = soul.y - this.dy;
            const turned_y = relative_y * cos360(d) + relative_x * sin360(d);
            const d_trans = Math.abs((d - sd) % 360);
            return (turned_y > -this.width - 3) && 135 <= d_trans && d_trans <= 225;
        }
    }
    const box = {
        center_x: 320,
        center_y: 240,
        dire: 0,
        width: 100,
        height: 100,
        thickness: 5,
        walls: [] as Wall2[],
        default() {
            this.center_x = 320;
            this.center_y = 240;
            this.dire = 0;
            this.width = 100;
            this.height = 100;
            this.walls = [] as Wall2[];
            box.init();
        },
        set(arg: { x?: number, y?: number, d?: number, w?: number, h?: number }) {
            this.center_x = arg.x ?? this.center_x;
            this.center_y = arg.y ?? this.center_y;
            this.dire = arg.d ?? this.dire;
            this.width = arg.w ?? this.width;
            this.height = arg.h ?? this.height;
            box.update();
        },
        move(arg: { x?: number, y?: number, d?: number, w?: number, h?: number }, frame: number, speed: number = 1) {
            const f = {
                x: this.center_x,
                y: this.center_y,
                d: this.dire,
                w: this.width,
                h: this.height,
            }
            const y = (i: number) => {
                const j = Math.max(0, Math.min(i, frame));
                const ratio = 1 - (1 - j / frame) ** speed;
                this.center_x = (arg.x ?? f.x) * ratio + f.x * (1 - ratio);
                this.center_y = (arg.y ?? f.y) * ratio + f.y * (1 - ratio);
                this.dire = (arg.d ?? f.d) * ratio + f.d * (1 - ratio);
                this.width = (arg.w ?? f.w) * ratio + f.w * (1 - ratio);
                this.height = (arg.h ?? f.h) * ratio + f.h * (1 - ratio);
                box.update();
            }
            return { yield: y, finish: () => this.set(arg) }
        },
        draw() {
            this.walls.forEach(e => {
                const wx = e.dx + 640 * sin360(e.dd);
                const wy = e.dy + 640 * cos360(e.dd);
                cLib.drawRect(wx, wy, 1280, 1280, Game.color.white, e.dd, 1, "center++");
            });
            this.walls.forEach(e => {
                const wx = e.dx + 640 * sin360(e.dd);
                const wy = e.dy + 640 * cos360(e.dd);
                cLib.drawRect(wx, wy, 1280 - e.width * 2, 1280 - e.width * 2, "#000000", e.dd, 1, "center++");
            });
        },
        judge() {
            this.walls.forEach(e => { e.judge() });
        },
        update() {
            {
                const d = this.dire;
                const x = this.center_x;
                const y = this.center_y;
                const wall = this.walls[0];
                wall.dd = d;
                wall.dx = x + (this.height / 2) * sin360(d);
                wall.dy = y + (this.height / 2) * cos360(d);
            }
            {
                const d = this.dire + 90;
                const x = this.center_x;
                const y = this.center_y;
                const wall = this.walls[1];
                wall.dd = d;
                wall.dx = x + (this.width / 2) * sin360(d);
                wall.dy = y + (this.width / 2) * cos360(d);
            }
            {
                const d = this.dire + 180;
                const x = this.center_x;
                const y = this.center_y;
                const wall = this.walls[2];
                wall.dd = d;
                wall.dx = x + (this.height / 2) * sin360(d);
                wall.dy = y + (this.height / 2) * cos360(d);
            }
            {
                const d = this.dire + 270;
                const x = this.center_x;
                const y = this.center_y;
                const wall = this.walls[3];
                wall.dd = d;
                wall.dx = x + (this.width / 2) * sin360(d);
                wall.dy = y + (this.width / 2) * cos360(d);
            }
        },
        init() {
            this.walls.push(new Wall2(0, 0, 0, this.thickness));
            this.walls.push(new Wall2(0, 0, 90, this.thickness));
            this.walls.push(new Wall2(0, 0, 180, this.thickness));
            this.walls.push(new Wall2(0, 0, 270, this.thickness));
        },
        is_jumpable(sd: number) {
            return this.walls.some(v => v.is_jumpable(sd))
        }
    }
    box.init();
    return { Wall, box };
}

type boxFnsT = ReturnType<typeof boxFnsGen>

type boxT = boxFnsT["box"]

export {
    boxFnsGen,
    boxFnsT,
    boxT
}
