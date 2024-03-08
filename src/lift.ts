import { boxFnsT } from "./box";
import { cLibT } from "./lib/canvas";
import { SpriteClassT } from "./lib/sprite";

type Move = number | ((age: number) => number);

const liftFnsGen = (cLib: cLibT, Box: boxFnsT, Sprite: SpriteClassT) => {
    let liftMap = new Map<string, any>();
    let id = 0;
    class Lift extends Sprite {
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
        life: number;
        id: string;
        wall: InstanceType<boxFnsT["Wall"]>;
        constructor(x: number, y: number, d: number, len: number, mx: Move, my: Move, md: Move, ml: Move, life: number) {
            super(x, y, d, 0, undefined, 0, 0);
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
            this.life = life;
            this.id = `NB$${id++}`;
            this.wall = new Box.Wall(x, y, d, len, "center");
            liftMap.set(this.id, this);
        }
        move_self() {
            this.age++;
            this.x = this.start_x + get_move(this.move_x, this.age);
            this.y = this.start_y + get_move(this.move_y, this.age);
            this.d = this.start_d + get_move(this.move_d, this.age);
            this.len = this.start_len + get_move(this.move_len, this.age);
            [this.wall.dx, this.wall.dy, this.wall.dd, this.wall.len] = [this.x, this.y, this.d, this.len];
        }
        draw() {
            cLib.strokeRect(this.x, this.y, this.len, 7, "green", this.d, 1, "center++", 1, "inner");
            this.move(-4, this.d);
            cLib.strokeRect(this.x, this.y, this.len, 7, "white", this.d, 1, "center++", 1, "inner");
            this.move(4, this.d);
        }
        judge() {
            this.wall.judge();
        }
    }
    const process = () => {
        (liftMap as Map<string, Lift>).forEach((l, id, Map) => {
            if (l.age < l.life) {
                l.move_self();
                l.draw();
                l.judge();
            }
            else Map.delete(id);
        })
    }
    const is_jumpable = (sd: number) => {
        let r = false;
        (liftMap as Map<string, Lift>).forEach((l, id, Map) => {
            r = r || l.wall.is_jumpable(sd)
        })
        return r;
    }
    return { Lift, liftMap, process, is_jumpable };
}

const get_move = (move: Move, age: number): number => {
    if (typeof move == "number") return move * age;
    else return move(age)
}

type liftFnsT = ReturnType<typeof liftFnsGen>

export {
    liftFnsGen,
    liftFnsT
}
