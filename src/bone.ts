type Move = number | {
    type: "sin" | "cos",
    amp: number,
    cycle: number,
} | {
    type: "custom",
    fn: (age: number) => number
};

type cLibT = {
    drawRect: (dx: number, dy: number, width: number, height: number, color: string, direction?: number, type?: 0 | 1) => void;
    drawLine: (lx: number, ly: number, d: number, len: number, width: number, color: string, type?: number) => void;
    [keys: string]: Function;
}

export const boneFnsGen = (cLib: cLibT) => {
    let boneDict: {[keys: string]: any} = {}
    class normalBone {
        x: number;
        y: number;
        d: number;
        len: number;
        sx: number;
        sy: number;
        sd: number;
        slen: number;
        mx: Move;
        my: Move;
        md: Move;
        mlen: Move;
        life: number;
        color: string;
        size: number;
        age: number;
        center: number;
        name: string;
        static autoID = 0;
        constructor(name: string, sx: number, sy: number, sd: number, sl: number, mx: Move, my: Move, md: Move, ml: Move, life: number, color: string, size: number, center: number = 0) {
            this.x = sx;
            this.y = sy;
            this.d = sd;
            this.len = sl;
            this.sx = sx;
            this.sy = sy;
            this.sd = sd;
            this.slen = sl;
            this.mx = mx;
            this.my = my;
            this.md = md;
            this.mlen = ml;
            this.life = life;
            this.color = color;
            this.size = size;
            this.age = 0;
            this.center = center;
            this.name = name ? name : "_auto|" + normalBone.autoID++;
            boneDict[this.name] = this;
        }
        move() {
            this.age++;

            if (typeof (this.mx) == "number") this.x += this.mx;
            else switch (this.mx.type) {
                case "sin": this.x = this.sx + this.mx.amp * Math.sin(this.age / (Math.PI * this.mx.cycle)); break;
                case "cos": this.x = this.sx - this.mx.amp * Math.cos(this.age / (Math.PI * this.mx.cycle)); break;
                case "custom": this.x = this.mx.fn(this.age); break;
            }

            if (typeof (this.my) == "number") this.y += this.my;
            else switch (this.my.type) {
                case "sin": this.y = this.sy + this.my.amp * Math.sin(this.age / (Math.PI * this.my.cycle)); break;
                case "cos": this.y = this.sy - this.my.amp * Math.cos(this.age / (Math.PI * this.my.cycle)); break;
                case "custom": this.y = this.my.fn(this.age); break;
            }
            if (typeof (this.md) == "number") this.d += this.md;
            else switch (this.md.type) {
                case "sin": this.d = this.sd + this.md.amp * Math.sin(this.age / (Math.PI * this.md.cycle)); break;
                case "cos": this.d = this.sd - this.md.amp * Math.cos(this.age / (Math.PI * this.md.cycle)); break;
                case "custom": this.d = this.md.fn(this.age); break;
            }
            if (typeof (this.mlen) == "number") this.len += this.mlen;
            else switch (this.mlen.type) {
                case "sin": this.len = this.slen + this.mlen.amp * Math.sin(this.age / (Math.PI * this.mlen.cycle)); break;
                case "cos": this.len = this.slen - this.mlen.amp * Math.cos(this.age / (Math.PI * this.mlen.cycle)); break;
                case "custom": this.len = this.mlen.fn(this.age); break;
            }
            if (this.life < this.age) this.delete();
        }
        draw() {
            if (this.center == 0) {
                cLib.stamp("bone_head_white", this.x, this.y, this.d - 180, this.size);
                cLib.drawLine(this.x, this.y, this.d * Math.PI / 180, this.len, this.size / 100 * 10, "#ffffff", 1);
                cLib.stamp("bone_head_white", this.x + this.len * Math.sin(this.d * Math.PI / 180), this.y - this.len * Math.cos(this.d * Math.PI / 180), this.d, this.size);
            } else {
                cLib.stamp("bone_head_white", this.x - this.len * Math.sin(this.d * Math.PI / 180) / 2, this.y + this.len * Math.cos(this.d * Math.PI / 180) / 2, this.d - 180, this.size);
                cLib.drawLine(this.x, this.y, this.d * Math.PI / 180, this.len, this.size / 100 * 10, "#ffffff", 0);
                cLib.stamp("bone_head_white", this.x + this.len * Math.sin(this.d * Math.PI / 180) / 2, this.y - this.len * Math.cos(this.d * Math.PI / 180) / 2, this.d, this.size);
            }
        }
        delete() {
            delete boneDict[this.name];
        }
    };
    const process = () => {
        for (const name in boneDict) {
            boneDict[name].move();
            boneDict[name] ? boneDict[name].draw() : 0;
        };
    }

    return {
        dict: boneDict as {[keys: string]: normalBone},
        normalBone,
        process,
    }

    new normalBone("bone1", 170, 240, 60, 150, 0, 0, -2, 0, Infinity, "white", 200)
    new normalBone("bone2", 370, 240, 60, 150, 0, 0, 5, 0, Infinity, "white", 200, 1)
    new normalBone("bone3", 170, 240, 60, 150,
        {
            type: "sin",
            amp: 250,
            cycle: 30,
        },
        {
            type: "cos",
            amp: 250,
            cycle: 30,
        }, 0, 0, Infinity, "white", 200, 1
    )
}