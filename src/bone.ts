import { SpriteClassT, cLibT } from "./lib/types";
import { sin360, cos360 } from "./lib/utils";
import { Dict } from "./lib/utils";

type Move = number | {
    type: "sin" | "cos",
    amp: number,
    cycle: number,
} | {
    type: "custom",
    fn: (age: number) => number
};

export const boneFnsGen = (cLib: cLibT, Sprite: SpriteClassT) => {
    let boneDict: Dict<any> = {}
    class normalBone extends Sprite {
        private start_x: number;
        private start_y: number;
        private start_d: number;
        private move_x: Move;
        private move_y: Move;
        private move_d: Move;
        private start_len: number;
        private move_len: Move;
        private len: number;
        private age: number;
        private id: number;
        private width: number;
        constructor(x: number, y: number, d: number, width: number, len: number, mx: Move, my: Move, md: Move, ml: Move, life: number) {
            super(x, y, d, width, undefined, true);
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
            this.id = normalBone.current_id;
            this.width = width;
            boneDict[this.id] = this;
            normalBone.current_id++;
        }
        private move_self() {
            this.age++;
            this.x = this.start_x + normalBone.get_move(this.move_x, this.age);
            this.y = this.start_y + normalBone.get_move(this.move_y, this.age);
            this.d = this.start_d + normalBone.get_move(this.move_d, this.age);
            this.len = this.start_len + normalBone.get_move(this.move_len, this.age);
        }
        private draw() {
            cos360(this.d)
            cLib.stamp("bone_head_white",
                this.x + cos360(this.d) * this.width * 8 / 6,
                this.y - sin360(this.d) * this.width * 8 / 6,
                this.d + 180, this.width * 100 / 6, 1, "start"
            );
            cLib.drawRect(
                this.x + sin360(this.d) * this.width * 7 / 6,
                this.y + cos360(this.d) * this.width * 7 / 6,
                this.width, this.len, "white", this.d, "start"
            );
            cLib.stamp("bone_head_white",
                this.x + sin360(this.d) * (this.len + this.width * 14 / 6) - cos360(this.d) * this.width * 2 / 6,
                this.y + cos360(this.d) * (this.len + this.width * 14 / 6) + sin360(this.d) * this.width * 2 / 6,
                this.d, this.width * 100 / 6, 1, "start"
            );
        }
        public static process() {
            for (const id in boneDict) {
                const bone = boneDict[id];
                bone.move_self();
                bone.draw();
            }
        }
        private static current_id = 0;
        private static get_move(move: Move, age: number): number {
            if (typeof move == "number") return move * age;
            switch (move.type) {
                case "sin":
                case "cos": {
                    return 0;
                }
                case "custom": {
                    return move.fn(age)
                }
            }
        };
    }
    const process = () => {
        normalBone.process();
    };
    return {
        boneDict: boneDict as Dict<normalBone>,
        normal: normalBone,
        process
    }
}