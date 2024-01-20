import { cLibT } from "./canvas";
import { Opt, sin360, cos360 } from "./utils"

const SpriteLibGen = (cLib: cLibT) => {
    type Self = {
        x: number,
        y: number,
        d: number,
        size: number,
        costume?: string,
        alpha: number,
        width: number,
        stamp: () => void,
        move: (f: number) => void;
    };
    class Sprite {
        x: number;
        y: number;
        d: number;
        size: number;
        costume?: string;
        alpha: number;
        width: number;
        act_: undefined | ((self: Self) => void);
        constructor(x: number, y: number, d: number = 0, size: number = 100, costume?: string, alpha: number = 0, width: number = 1, act?: (self: Self) => void) {
            this.x = x;
            this.y = y;
            this.d = d;
            this.size = size;
            this.costume = costume;
            this.alpha = alpha;
            this.width = width;
            this.act_ = act;
        }
        stamp() {
            if (this.alpha != 0 && this.costume != undefined) {
                cLib.stamp(this.costume, this.x, this.y, this.d, this.size, this.alpha, "center", this.width);
            }
        }
        move(far: number, d?: number) {
            this.x += sin360(d ?? this.d) * far;
            this.y += cos360(d ?? this.d) * far;
        }
        act() {
            (this.act_ || (() => { }))(this)
        }
    }
    return Sprite;
}

type SpriteClassT = ReturnType<typeof SpriteLibGen>;
type SpriteT = InstanceType<SpriteClassT>

export {
    SpriteLibGen,
    SpriteClassT,
    SpriteT
}