import { SpriteT, cLibT } from "./lib/types";
import { cos360, sin360 } from "./lib/utils";

export const BoxFnsGen = (cLib: cLibT, soul: SpriteT) => {
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
            cLib.drawRect(this.dx, this.dy, this.len, this.width, "white", this.dd, "center++");
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
            cLib.drawRect(x, y, 640, 640, "#ffffff88", this.dd, "center++");
        }
    }
    const box = {
        center_x: 320,
        center_y: 240,
        width: 100,
        height: 100,
        thickness: 6,
        walls: [] as Wall2[],
        draw() {
            this.walls.forEach(e => {
                const wx = e.dx + 640 * sin360(e.dd);
                const wy = e.dy + 640 * cos360(e.dd);
                cLib.drawRect(wx, wy, 1280, 1280, "#ffffff", e.dd, "center++");
            });
            this.walls.forEach(e => {
                const wx = e.dx + 640 * sin360(e.dd);
                const wy = e.dy + 640 * cos360(e.dd);
                cLib.drawRect(wx, wy, 1280 - e.width * 2, 1280 - e.width * 2, "#000000", e.dd, "center++");
            });
        },
        judge() {
            this.walls.forEach(e => { e.judge() });
        },
        update() {
            this.walls[0].dx = this.center_x;
            this.walls[0].dy = this.center_y + this.height / 2;

            this.walls[1].dx = this.center_x + this.width / 2;
            this.walls[1].dy = this.center_y;

            this.walls[2].dx = this.center_x;
            this.walls[2].dy = this.center_y - this.height / 2;

            this.walls[3].dx = this.center_x - this.width / 2;
            this.walls[3].dy = this.center_y;
        },
        init() {
            this.walls.push(new Wall2(0, 0, 0, this.thickness));
            this.walls.push(new Wall2(0, 0, 90, this.thickness));
            this.walls.push(new Wall2(0, 0, 180, this.thickness));
            this.walls.push(new Wall2(0, 0, 270, this.thickness));
        },
    }
    box.init();
    return { Wall, box };
}