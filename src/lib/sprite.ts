import { CoreT, cLibT, SpriteClassT } from "./types";
import { Dict, Opt, sin360, cos360 } from "./utils"

export const SpriteLibGen = (cLib: cLibT): SpriteClassT => {
    class Sprite {
        x: number;
        y: number;
        d: number;
        size: number;
        costume: string;
        visible: boolean;
        constructor(x: number, y: number, d: number = 0, size: number = 100, costume: string = "", visible: boolean = false) {
            this.x = x;
            this.y = y;
            this.d = d;
            this.size = size;
            this.costume = costume;
            this.visible = visible;
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
    }
    return Sprite;
}