import { SpriteT, cLibT } from "./lib/types";
import { cos360, sin360 } from "./lib/utils";

export const BoxFnsGen = (cLib: cLibT, soul: SpriteT) => {
    class Wall {
        dx: number;
        dy: number;
        dd: number;
        len: number;
        align: "center" | "start";
        relative: "minus" | "unknown" | "plus"
        constructor(dx: number, dy: number, dd: number, len: number, align: "center" | "start") {
            this.dx = dx;
            this.dy = dy;
            this.dd = dd;
            this.len = len;
            this.align = align;
            this.relative = (() => {
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
                if (this.relative == "minus" && turned_y > 0 || this.relative == "plus" && 0 > turned_y) {
                    const returned_x = turned_x * cos360(-d)
                    const returned_y = turned_x * sin360(-d)
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
            cLib.drawRect(this.dx, this.dy, this.len, 5, "white", this.dd, "center++");
        }
    }
    return { Wall };
}