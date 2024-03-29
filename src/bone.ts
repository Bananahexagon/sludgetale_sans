import { aLibT } from "./lib/audios";
import { cLibT } from "./lib/canvas";
import { SpriteClassT, SpriteT } from "./lib/sprite";
import { sin360, cos360 } from "./lib/utils";

type Move = number | {
    type: "sin" | "cos",
    amp: number,
    cycle: number,
} | {
    type: "custom",
    fn: (age: number) => number
};

const boneFnsGen = (cLib: cLibT, aLib: aLibT, Sprite: SpriteClassT, player: {
    damage(color?: "white" | "blue" | "orange", val?: number): void; soul: SpriteT, hp: number
}, Game: {
    color: { white: string, blue: string, orange: string }
}) => {
    interface Bone {
        life: number,
        age: number,
        move_self(): void,
        draw(): void,
        judge(): void,
    }
    let boneMap = new Map<string, any>();
    class normalBone extends Sprite implements Bone {
        start_x: number;
        start_y: number;
        start_d: number;
        move_x: Move;
        move_y: Move;
        move_d: Move;
        start_len: number;
        move_len: Move;
        len: number;
        age: number;
        id: string;
        b_width: number;
        life: number;
        color: "white" | "blue" | "orange";
        constructor(x: number, y: number, d: number, width: number, len: number, mx: Move, my: Move, md: Move, ml: Move, life: number, color: "white" | "blue" | "orange" = "white") {
            super(x, y, d, width, undefined, 1, 1);
            this.start_x = x;
            this.start_y = y;
            this.start_d = d;
            this.move_x = mx;
            this.move_y = my;
            this.move_d = md;
            this.start_len = len;
            this.move_len = ml;
            this.len = len;
            this.age = 0;
            this.id = `NB$${normalBone.current_id++}`;
            this.b_width = width;
            this.life = life;
            this.color = color
            boneMap.set(this.id, this);
        }
        move_self() {
            this.age++;
            this.x = this.start_x + normalBone.get_move(this.move_x, this.age);
            this.y = this.start_y + normalBone.get_move(this.move_y, this.age);
            this.d = this.start_d + normalBone.get_move(this.move_d, this.age);
            this.len = this.start_len + normalBone.get_move(this.move_len, this.age);
            this.move(this.b_width * 3 / 6, this.d - 90)
        }
        draw() {
            cos360(this.d)
            cLib.stamp(`bone_head_${this.color}`,
                this.x + cos360(this.d) * this.b_width * 8 / 6,
                this.y - sin360(this.d) * this.b_width * 8 / 6,
                this.d + 180, this.b_width * 100 / 6, 1, "start"
            );
            cLib.drawRect(
                this.x + sin360(this.d) * this.b_width * 6 / 6,
                this.y + cos360(this.d) * this.b_width * 6 / 6,
                this.b_width, this.len + this.b_width * 2 / 6, Game.color[this.color], this.d, 1, "start"
            );
            cLib.stamp(`bone_head_${this.color}`,
                this.x + sin360(this.d) * (this.len + this.b_width * 14 / 6) - cos360(this.d) * this.b_width * 2 / 6,
                this.y + cos360(this.d) * (this.len + this.b_width * 14 / 6) + sin360(this.d) * this.b_width * 2 / 6,
                this.d, this.b_width * 100 / 6, 1, "start"
            );
        }
        judge() {
            {
                const relative_x = player.soul.x - this.x;
                const relative_y = player.soul.y - this.y;
                const turned_x = relative_x * cos360(this.d) + relative_y * -sin360(this.d);
                const turned_y = relative_y * cos360(this.d) + relative_x * sin360(this.d);
                if (this.len + this.b_width * 14 / 6 > turned_y && turned_y > 0 && this.b_width > turned_x && turned_x > 0) {
                    player.damage(this.color);
                }
            }
        }
        private static current_id = 0;
        private static get_move(move: Move, age: number): number {
            if (typeof move == "number") return move * age;
            switch (move.type) {
                case "sin":
                case "cos": {
                    return sin360(move.cycle * age) * move.amp;
                }
                case "custom": {
                    return move.fn(age)
                }
            }
        };
    }
    class stabBone extends Sprite implements Bone {
        b_x: number;
        b_y: number;
        b_d: number;
        age: number;
        id: string;
        w: number;
        h: number;
        t1: number;
        t2: { v: number, s: number };
        t3: number;
        t4: { v: number, s: number };
        life: number;
        color: "white" | "blue" | "orange";
        constructor(x: number, y: number, d: number, w: number, h: number, t1: number, t2: number | { v: number, s: number }, t3: number, t4: number | { v: number, s: number }, color: "white" | "blue" | "orange" = "white") {
            super(x, y, d, 100, `bone_stab_${color}`, 1, 1);
            this.b_x = x;
            this.b_y = y;
            this.b_d = d;
            this.age = 0;
            this.id = `SB$${stabBone.current_id++}`;
            this.w = w;
            this.h = h;
            this.t1 = t1;
            this.t2 = typeof t2 == "number" ? { v: t2, s: 4 } : t2;
            this.t3 = t3;
            this.t4 = typeof t4 == "number" ? { v: t4, s: 4 } : t4;
            this.life = this.t1 + this.t2.v + this.t3 + this.t4.v;
            this.color = color;
            boneMap.set(this.id, this);
            aLib.play("warning");
        }
        move_self(): void {
            if (this.age < this.t1) {
                this.x = this.b_x;
                this.y = this.b_y;
                this.move(-640);
            } else if (this.age < this.t1 + this.t2.v) {
                if (this.age == this.t1) aLib.play("stab")
                this.x = this.b_x;
                this.y = this.b_y;
                this.move(-640);
                const ratio = 1 - (1 - (this.age - this.t1) / this.t2.v) ** this.t2.s
                this.move(ratio * this.h);
            } else if (this.age < this.t1 + this.t2.v + this.t3) {
                this.x = this.b_x;
                this.y = this.b_y;
                this.move(-640 + this.h);
            } else {
                this.x = this.b_x;
                this.y = this.b_y;
                this.move(-640 + this.h);
                const ratio = 1 - (1 - (this.age - (this.t1 + this.t2.v + this.t3)) / this.t4.v) ** this.t4.s
                this.move(-this.h * ratio);
            }
            this.age += 1;
        }
        draw(): void {
            if (this.age < this.t1) {
                cLib.strokeRect(this.b_x - cos360(this.d) * this.w / 2, this.b_y + sin360(this.d) * this.w / 2, this.w, this.h, this.age % 8 < 4 ? "red" : "yellow", this.b_d, 1, "start", 2, "inner");
            } else {
                this.stamp();
            }
            //cLib.strokeRect(this.b_x - cos360(this.d) * this.w / 2, this.b_y + sin360(this.d) * this.w / 2, this.w, this.h, this.age % 8 < 4 ? "red" : "yellow", this.b_d, 1, "start", 2, "inner");
            //this.stamp();
        }
        judge(): void {
            this.move(640);
            const relative_x = player.soul.x - this.x;
            const relative_y = player.soul.y - this.y;
            //const turned_x = relative_x * cos360(this.d) + relative_y * -sin360(this.d);
            const turned_y = relative_y * cos360(this.d) + relative_x * sin360(this.d);
            if (turned_y < 0 && this.t1 <= this.age) {
                player.damage(this.color);
            }
            this.move(-640);
        }
        private static current_id = 0;
    }
    const process = () => {
        boneMap.forEach((b, id, boneMap) => {
            const bone = b as Bone;
            if (bone.age < bone.life) {
                bone.move_self();
                bone.draw();
                bone.judge();
            }
            else boneMap.delete(id);
        })
    };
    return {
        boneMap: boneMap as Map<string, Bone>,
        normal: normalBone,
        stab: stabBone,
        process
    }
}

type boneFnsT = ReturnType<typeof boneFnsGen>

export {
    boneFnsGen,
    boneFnsT
}