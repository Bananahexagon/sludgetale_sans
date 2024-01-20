import { aLibT } from "./lib/audios";
import { cLibT } from "./lib/canvas";
import { SpriteClassT, SpriteT } from "./lib/sprite";
import { sin360, cos360 } from "./lib/utils";



const gbFnsGen = (cLib: cLibT, aLib: aLibT, Sprite: SpriteClassT, player: {
    damage(color?: "white" | "blue" | "orange", arg?: number): void; soul: SpriteT, hp: number
}, Game: {
    color: { white: string, blue: string, orange: string }
}) => {
    let gbMap = new Map<number, any>();
    class Blaster extends Sprite {
        private s_x: number;
        private s_y: number;
        private s_d: number;
        private t_x: number;
        private t_y: number;
        private t_d: number;
        private age: number;
        private id: number;
        private gb_width: number;
        private c_t: number;
        private b_s: number;
        private b_d: number;
        private d_t: number;
        private c_s: number;
        private gain: number;
        private color: "white" | "blue" | "orange";
        constructor(tx: number, ty: number, td: number, fx: number, fy: number, fd: number, size: number, width: number, ct: number | { v: number, s: number }, bs: number, bd: number, dt: number, color: "white" | "blue" | "orange", gain: number = 1) {
            super(fx, fy, fd, size, `gb_${color}_1`, 1, width);
            this.s_x = fx;
            this.s_y = fy;
            this.s_d = fd;
            this.t_x = tx;
            this.t_y = ty;
            this.t_d = td;
            this.c_t = typeof ct == "number" ? ct : ct.v;
            this.c_s = typeof ct == "number" ? 4 : ct.s;
            this.b_s = bs;
            this.b_d = bd;
            this.d_t = dt;
            this.gb_width = width;
            this.age = 0;
            this.id = Blaster.current_id;
            this.color = color;
            this.gain = gain;
            gbMap.set(this.id, this);
            Blaster.current_id++
            aLib.play("gb_charge", 1, gain)
        }
        private move_self() {
            if (this.age < this.c_t) {
                let ratio = ((this.c_t - this.age) ** this.c_s) / (this.c_t ** this.c_s);
                this.x = ratio * this.s_x + (1 - ratio) * this.t_x;
                this.y = ratio * this.s_y + (1 - ratio) * this.t_y;
                this.d = ratio * this.s_d + (1 - ratio) * this.t_d;
            } else if (this.age == this.c_t) {
                this.x = this.t_x;
                this.y = this.t_y;
                this.d = this.t_d;
            }
            if (this.b_s + this.c_t <= this.age && -960 < this.x && this.x < 960 && -960 < this.y && this.y < 960) {
                let far = ((this.age - (this.b_s + this.c_t)) ** 2);
                this.x = this.t_x;
                this.y = this.t_y;
                this.move(far / 2);
            }
        }
        private draw() {
            const len = 4800;
            if (this.b_s + this.c_t <= this.age) {
                const age = this.age - this.b_s + this.c_t;
                cLib.drawRect(
                    this.x + sin360(this.d) * len / -2,
                    this.y + cos360(this.d) * len / -2,
                    this.width * this.size / 5 * (1 + sin360(age * 10) * 0.2),
                    len,
                    Game.color[this.color],
                    this.d + 180,
                    Math.max(0, Math.min(1 - (this.age - (this.b_d + this.b_s + this.c_t)) / this.d_t, 1)),
                    "center++"
                );
            }
            if (this.age == this.b_s + this.c_t - 2) this.costume = `gb_${this.color}_2`;
            if (this.age == this.b_s + this.c_t - 1) this.costume = `gb_${this.color}_2`;
            if (this.age == this.b_s + this.c_t) this.costume = `gb_${this.color}_2`;
            if (this.b_s + this.c_t < this.age) this.costume = `gb_${this.color}_${(this.age - (this.b_s + this.c_t)) % 2 + 5}`;
            this.stamp()
        }
        private judge() {
            const relative_x = player.soul.x - this.x;
            const relative_y = player.soul.y - this.y;
            const turned_x = relative_x * cos360(this.d) + relative_y * -sin360(this.d);
            const turned_y = relative_y * cos360(this.d) + relative_x * sin360(this.d);
            if (this.b_s + this.c_t <= this.age && this.age <= this.b_s + this.c_t + this.b_d && 0 > turned_y && this.gb_width * this.size / 10 > turned_x && turned_x > -this.gb_width * this.size / 10) {
                player.damage(this.color);
            }
        }
        public static process() {
            gbMap.forEach((gb: Blaster, id, Map) => {
                gb.move_self();
                gb.draw();
                gb.judge();
                gb.age++;
                if (gb.c_t + gb.b_s == gb.age) aLib.play("gb_fire", 1, gb.gain)
                if (gb.c_t + gb.b_s + gb.b_d + gb.d_t <= gb.age) gbMap.delete(id)
            })
        }
        private static current_id = 0;
    }
    const process = () => {
        Blaster.process();
    };
    return {
        gbMap: gbMap as Map<number, Blaster>,
        gb: Blaster,
        process
    }
}


type gbFnsT = ReturnType<typeof gbFnsGen>

export { gbFnsGen, gbFnsT }