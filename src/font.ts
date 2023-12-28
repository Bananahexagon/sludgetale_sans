import fontDataEn from "./data/font_en.json";
import fontDataStatus from "./data/font_status.json";

import { aLibT, cLibT, inputKeysT } from "./lib/types";


type charDataT = {
    left: number,
    up: number,
    width: number,
    height: number,
    gap: number,
}

type FontDataT = typeof fontDataEn;

export const fontFnsGen = (cLib: cLibT, aLib: aLibT, inputKeys: inputKeysT,) => {
    const fontData = {
        en: fontDataEn,
        status: fontDataStatus
    };
    let current_id = 0;
    let displayDict: { [keys: string]: any } = {}
    class Font {
        name: string
        constructor(name: string) { this.name = name }
        delete() {
            delete displayDict[this.name];
        }
    }

    class Super extends Font {
        _: {
            all_str: string,
            now: { str: string, color: string, spacing_x: number, spacing_y: number }[],
            len_allow: number,
            count: number,
            current_char: number,
            current_char_true: number,
        };
        x: number;
        y: number;
        direction: number;
        size: number;
        data: { str: string, speed: number, color: string, spacing_x: number, spacing_y: number }[]
        font: FontDataT
        constructor(name: string, x: number, y: number, d: number, size: number, font: string, input: { str: string, speed: number, color: string, spacing_x: number, spacing_y: number }[]) {
            super(name);
            this._ = {
                all_str: input.reduce((a, c) => a + c.str, ""),
                now: [{ str: "", color: input[0].color, spacing_x: input[0].spacing_x, spacing_y: input[0].spacing_y }],
                len_allow: 0,
                count: 0,
                current_char: 0,
                current_char_true: 0,
            }
            this.x = x;
            this.y = y;
            this.direction = d;
            this.size = size;
            this.data = input;
            this.font = ((f) => {
                switch (f) {
                    case "status":
                        return fontData.status;
                    default:
                        return fontData.en;
                }
            })(font)
            displayDict[name == "_" ? `auto$${current_id++}` : name] = this;
            this.process();
        }
        write() {
            const size = this.size;
            const d = this.direction * Math.PI / 180;
            const input_str_length = this._.now.reduce((a, c) => a + c.str.length, 0);
            let x = 0;
            let y = 0;
            let count = 0;
            const charDataf = ((c: string): charDataT => {
                if (c in this.font) {
                    return this.font[c as keyof FontDataT] as unknown as charDataT;
                } else {
                    return this.font.space;
                }
            })
            this._.now.forEach((e) => {
                const s = e.str.split("");
                s.forEach((c) => {
                    const charData = charDataf(c)
                    if (c == "\n") {
                        x = 0;
                        y += this.font.props.height_basic + e.spacing_y;
                    } else {
                        cLib.stamp(this.font.props.name + "_" + e.color,
                            this.x + (Math.cos(d) * x - Math.sin(d) * (y + charData.gap / 2)) * size / 100,
                            this.y + (Math.sin(d) * x + Math.cos(d) * (y + charData.gap / 2)) * size / 100,
                            this.direction, size, 1, "start", 1, { left: charData.left, top: charData.up, width: charData.width, height: charData.height }
                        );
                        if (count + 1 < input_str_length) x += charData.width + this.font.props.width_basic + e.spacing_x;
                    }
                    count++
                })
            });
            return this;
        };
        process() {
            const input_str_length = this.data.reduce((a, c) => a + c.str.length, 0);
            if (this._.len_allow == input_str_length && inputKeys.z) {
                delete displayDict[this.name];
                return;
            } else if (inputKeys.x) {
                this._.len_allow = input_str_length;
                this._.current_char = input_str_length;
            } else if (this._.len_allow < input_str_length) {
                this._.len_allow += 1 / this.data[this._.count].speed;
                this._.current_char += 1 / this.data[this._.count].speed;
            }
            while (this._.current_char_true < Math.min(this._.len_allow, input_str_length)) {
                this._.now[this._.count].str += this.data[this._.count].str[this._.now[this._.count].str.length];
                this._.current_char_true++
                while (this.data[this._.count].str.length <= this._.now[this._.count].str.length) {
                    if (this._.count + 1 < this.data.length) {
                        this._.count++;
                        this._.now.push({
                            str: "",
                            color: ((this.data[this._.count].color === undefined) ? "white" : this.data[this._.count].color),
                            spacing_x: this.data[this._.count].spacing_x,
                            spacing_y: this.data[this._.count].spacing_y
                        })
                        this._.current_char -= this.data[this._.count].str.length;
                    } else {
                        break;
                    };
                };
            };
        }
    };

    class Plane extends Font {
        str_now: string;
        len_now: number;
        str: string;
        x: number;
        y: number;
        direction: number;
        size: number;
        color: string;
        spacing_x: number;
        spacing_y: number;
        speed: number;
        font: FontDataT;
        len_allow: number;
        voice: string | undefined;
        constructor(name: string, str: string, x: number, y: number, d: number, size: number, color: string, spacing_x: number, spacing_y: number, speed: number, font: string = "en", voice?: string) {
            super(name);
            this.str_now = "";
            this.len_now = 0;
            this.str = str
            this.x = x;
            this.y = y;
            this.direction = d;
            this.size = size;
            this.color = color;
            this.spacing_x = spacing_x;
            this.spacing_y = spacing_y;
            this.speed = speed;
            this.font = ((f) => {
                switch (f) {
                    case "status":
                        return fontData.status;
                    default:
                        return fontData.en;
                }
            })(font)
            this.len_allow = 0;
            displayDict[name == "_" ? `auto$${current_id++}` : name] = this;
            this.voice = voice;
            this.process();
        }
        write() {
            const chars = this.str_now;
            const size = this.size;
            const d = this.direction * Math.PI / 180;
            let x, y;
            [x, y] = [0, 0];
            const charDataf = ((c: string): charDataT => {
                if (c in this.font) {
                    return this.font[c as keyof FontDataT] as unknown as charDataT;
                } else {
                    return this.font.space;
                }
            })
            for (let i = 0; i < chars.length; i++) {
                const charData: charDataT = charDataf(chars[i] as keyof FontDataT)
                if (chars[i] == "\n") {
                    x = 0;
                    y -= this.font.props.height_basic + this.spacing_y;
                } else {
                    cLib.stamp(this.font.props.name + "_" + (!this.color ? "white" : this.color),
                        this.x + (Math.cos(d) * x - Math.sin(d) * (y - charData.gap)) * size / 100,
                        this.y + (Math.sin(d) * x + Math.cos(d) * (y - charData.gap)) * size / 100,
                        this.direction, size, 1, "start", 1, { left: charData.left, top: charData.up, width: charData.width, height: charData.height }
                    );
                    if (i + 1 < chars.length) x += charData.width + this.font.props.width_basic + this.spacing_x;
                };
            };
            return this;
        };
        process() {
            if (this.len_allow == this.str.length && inputKeys.z) {
                delete displayDict[this.name];
            } else if (inputKeys.x) {
                this.len_allow = this.str.length;
            } else if (this.len_allow < this.str.length) {
                this.len_allow += 1 / this.speed;
            }
            if (this.str_now.length < Math.min(this.len_allow, this.str.length)) {
                let s = false;
                while (this.str_now.length < Math.min(this.len_allow, this.str.length)) {
                    this.str_now += this.str[this.str_now.length];
                    s = s || this.str[this.str_now.length] !== " ";
                };
                this.voice && s && aLib.play(this.voice);
            }
        }
    };

    const write = (str: string, x: number, y: number, d: number, size: number, color: string = "white", spacing_x: number = 0, spacing_y: number = 0, font: string = "en") => {
        const _ = new Plane("_", str, x, y, d, size, color, spacing_x, spacing_y, 0, font);
        _.write();
        _.delete();
    };


    const process = () => {
        for (const name in displayDict) {
            displayDict[name].process()
        };
    };
    /*
     *Template
     *new FontSuper("name", 64, 128, 0, 400, "determination", [
     *    { str: "text", color: "white", spacing_x: 0, spacing_y: 0, speed: 2 },
     *])
     */
    return {
        write,
        Super,
        Plane,
        process,
        dict: displayDict as (Plane | Super)[],
    }
}

const tmp = class Plane {
    str_now: string;
    len_now: number;
    str: string;
    x: number;
    y: number;
    direction: number;
    size: number;
    color: string;
    spacing_x: number;
    spacing_y: number;
    speed: number;
    font: FontDataT;
    len_allow: number;
    constructor(name: string, str: string, x: number, y: number, d: number, size: number, color: string, spacing_x: number, spacing_y: number, speed: number, font: string) {
        this.str_now = "";
        this.len_now = 0;
        this.str = str
        this.x = x;
        this.y = y;
        this.direction = d;
        this.size = size;
        this.color = color;
        this.spacing_x = spacing_x;
        this.spacing_y = spacing_y;
        this.speed = speed;
        this.font = undefined as unknown as FontDataT;
        this.len_allow = 0;
    }
    write() { };
    process() { };
    delete() { };
}
export type Plane = typeof tmp;