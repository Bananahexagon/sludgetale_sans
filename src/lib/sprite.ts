import { CoreT, cLibT, SpriteClassT } from "./types";
import { Dict, Opt, sin360, cos360 } from "./utils"

export const SpriteLibGen = (cLib: cLibT): SpriteClassT => {
    type Self = {
        x: number,
        y: number,
        d: number,
        size: number,
        costume: string,
        visible: boolean,
        stamp: () => void,
        move: (f: number) => void;
    };
    class Sprite {
        x: number;
        y: number;
        d: number;
        size: number;
        costume: string;
        visible: boolean;
        act_: undefined | ((self: Self) => void);
        constructor(x: number, y: number, d: number = 0, size: number = 100, costume: string = "", visible: boolean = false, act?: (self: Self) => void) {
            this.x = x;
            this.y = y;
            this.d = d;
            this.size = size;
            this.costume = costume;
            this.visible = visible;
            this.act_ = act;
        }
        stamp() {
            if (this.visible) {
                cLib.stamp(this.costume, this.x, this.y, this.d, this.size);
            }
        }
        move(far: number) {
            this.x += sin360(this.d) * far;
            this.y += cos360(this.d) * far;
        }
        act() {
            (this.act_ || (() => { }))(this)
        }
    }
    return Sprite;
}