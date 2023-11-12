import { SpriteClassT, SpriteT, aLibT, cLibT } from "./lib/types";
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

export const boneFnsGen = (cLib: cLibT,aLib: aLibT, Sprite: SpriteClassT, player: { soul: SpriteT, hp: number }) => {
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
                this.x + sin360(this.d) * this.width * 6 / 6,
                this.y + cos360(this.d) * this.width * 6 / 6,
                this.width, this.len + this.width * 2 / 6, "white", this.d, "start"
            );
            cLib.stamp("bone_head_white",
                this.x + sin360(this.d) * (this.len + this.width * 14 / 6) - cos360(this.d) * this.width * 2 / 6,
                this.y + cos360(this.d) * (this.len + this.width * 14 / 6) + sin360(this.d) * this.width * 2 / 6,
                this.d, this.width * 100 / 6, 1, "start"
            );
        }
        private judge() {
            //cLib.drawRect(
            //    this.x,
            //    this.y,
            //    this.width, this.len + this.width * 14 / 6, "red", this.d, "start"
            //);
            //cLib.drawRect(
            //    this.x + sin360(this.d) * (this.len / 2 + this.width * 7 / 6) + cos360(this.d) * this.width * 3 / 6,
            //    this.y + cos360(this.d) * (this.len / 2 + this.width * 7 / 6) - sin360(this.d) * this.width * 3 / 6,
            //    this.width, this.len + this.width * 14 / 6, "blue", this.d, "center++"
            //);
            {
                const relative_x = player.soul.x - this.x;
                const relative_y = player.soul.y - this.y;
                const turned_x = relative_x * cos360(this.d) + relative_y * -sin360(this.d);
                const turned_y = relative_y * cos360(this.d) + relative_x * sin360(this.d);
                if (this.len + this.width * 14 / 6 > turned_y && turned_y > 0 && this.width > turned_x && turned_x > 0) {
                    player.hp -= 1;
                    aLib.play_ctx("damage",2);
                }
            }

        }
        public static process() {
            for (const id in boneDict) {
                const bone = boneDict[id];
                bone.move_self();
                bone.draw();
                bone.judge();
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
    const process = () => {
        normalBone.process();
    };
    return {
        boneDict: boneDict as Dict<normalBone>,
        normal: normalBone,
        process
    }
}