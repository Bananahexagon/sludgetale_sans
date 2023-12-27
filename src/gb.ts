import { SpriteClassT, SpriteT, aLibT, cLibT } from "./lib/types";
import { sin360, cos360 } from "./lib/utils";
import { Dict } from "./lib/utils";



export const gbFnsGen = (cLib: cLibT, aLib: aLibT, Sprite: SpriteClassT, player: {
    damage(arg0: number): void; soul: SpriteT, hp: number
}) => {
    let gbDict: Dict<any> = {}
    class Blaster extends Sprite {
        private s_x: number;
        private s_y: number;
        private s_d: number;
        private t_x: number;
        private t_y: number;
        private t_d: number;
        private age: number;
        private id: number;
        private width: number;
        private c_t: number;
        private b_s: number;
        private b_d: number;
        constructor(tx: number, ty: number, td: number, fx: number, fy: number, fd: number, size: number, width: number, ct: number, bs: number, bd: number) {
            super(fx, fy, fd, size, "gb_1", true);
            this.s_x = fx;
            this.s_y = fy;
            this.s_d = fd;
            this.t_x = tx;
            this.t_y = ty;
            this.t_d = td;
            this.c_t = ct;
            this.b_s = bs;
            this.b_d = bd;
            this.width = width;
            this.age = 0;
            this.id = Blaster.current_id;
            gbDict[Blaster.current_id] = this;
            Blaster.current_id++
            aLib.play("gb_charge", 1)
        }
        private move_self() {
            if (this.age < this.c_t) {
                let ratio = ((this.c_t - this.age) ** 4) / (this.c_t ** 4);
                this.x = ratio * this.s_x + (1 - ratio) * this.t_x;
                this.y = ratio * this.s_y + (1 - ratio) * this.t_y;
                this.d = ratio * this.s_d + (1 - ratio) * this.t_d;
            } else if (this.age == this.c_t) {
                this.x = this.t_x;
                this.y = this.t_y;
                this.d = this.t_d;
            }
            if (this.b_s + this.c_t <= this.age && -640 < this.x && this.x < 640 && -640 < this.y && this.y < 640) {
                let far = ((this.age - (this.b_s + this.c_t)) ** 2);
                this.x = this.t_x;
                this.y = this.t_y;
                this.move(far / 2);
            }
        }
        private draw() {
            const len = 4800;
            if (this.b_s + this.c_t < this.age) {
                cLib.drawRect(
                    this.x + sin360(this.d) * len / -2,
                    this.y + cos360(this.d) * len / -2,
                    this.width * this.size / 5 * (1 + sin360(this.age * 10) * 0.2),
                    len,
                    "white",
                    this.d + 180,
                    Math.min((this.b_d + this.b_s + this.c_t - this.age) / 15, 1),
                    "center++"
                );
            }
            if (this.age == this.b_s + this.c_t - 2) this.costume = "gb_2";
            if (this.age == this.b_s + this.c_t - 1) this.costume = "gb_3";
            if (this.age == this.b_s + this.c_t) this.costume = "gb_4";
            if (this.b_s + this.c_t < this.age) this.costume = `gb_${(this.age - (this.b_s + this.c_t)) % 2 + 5}`;
            this.stamp()
        }
        private judge() {
            {
                const len = 4800;
                const relative_x = player.soul.x - this.x;
                const relative_y = player.soul.y - this.y;
                const turned_x = relative_x * cos360(this.d) + relative_y * -sin360(this.d);
                const turned_y = relative_y * cos360(this.d) + relative_x * sin360(this.d);
                if (this.b_s + this.c_t <= this.age && 0 > turned_y && this.width * this.size / 10 > turned_x && turned_x > -this.width * this.size / 10) {
                    player.damage(2);
                }
            }

        }
        public static process() {
            for (const id in gbDict) {
                const gb = gbDict[id] as Blaster;
                gb.move_self();
                gb.draw();
                gb.judge();
                gb.age++;
                if (gb.b_d + gb.b_s == gb.age) aLib.play("gb_fire", 1)
                if (gb.b_d + gb.b_s + gb.c_t <= gb.age) delete gbDict[id]
            }
        }
        private static current_id = 0;
    }
    const process = () => {
        Blaster.process();
    };
    return {
        gbDict: gbDict as Dict<Blaster>,
        gb: Blaster,
        process
    }
}