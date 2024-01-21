import { Game } from "./game";
import fontDataEn from "./data/font_en.json";
import fontDataStatus from "./data/font_status.json";
import fontDataDamage from "./data/font_damage.json";
import fontDataJa from "./data/font_ja.json";
import { cLibT } from "./lib/canvas";
import { aLibT } from "./lib/audios";
import { inputKeysT } from "./lib/core";

const set_ja = (() => {
    let s = new Set<string>();
    for (const c in fontDataJa) s.add(c);
    return s;
})();

type charDataT = {
    left: number,
    up: number,
    width: number,
    height: number,
    gap: number,
}

type FontDataT = typeof fontDataEn;

interface FontI {
    process: () => void,
    write: () => void,
}

type fontColor = "white"|"red"|"blue"|"orange"|"purple"|"black"|"yellow";

const fontFnsGen = (Audios: Map<string, { ctx: AudioBuffer, data: HTMLAudioElement, time: number }>, cLib: cLibT, aLib: aLibT, inputKeys: inputKeysT,) => {
    const fontData = {
        en: fontDataEn,
        status: fontDataStatus,
        damage: fontDataDamage,
        ja: fontDataJa
    };


    class Super implements FontI {
        _: {
            all_str: string,
            now: { str: string, color: string, spacing_x: number, spacing_y: number, voice?: string }[],
            len_allow: number,
            count: number,
            current_char: number,
            current_char_true: number,
        };
        x: number;
        y: number;
        direction: number;
        size: number;
        data: { str: string, speed: number, color?: string, spacing_x?: number, spacing_y?: number, voice?: string }[]
        font: FontDataT;
        z: boolean;
        promise: Promise<void>;
        resolve: () => void;
        solved: boolean;
        constructor(x: number, y: number, d: number, size: number, font: string, input: { str: string, speed: number, color?: fontColor, spacing_x?: number, spacing_y?: number, voice?: string }[], z: boolean) {
            this._ = {
                all_str: input.reduce((a, c) => a + c.str, ""),
                now: [{ str: "", color: input[0].color ?? "white", spacing_x: input[0].spacing_x ?? 0, spacing_y: input[0].spacing_y ?? 0, voice: input[0].voice }],
                len_allow: 0,
                count: 0,
                current_char: 0,
                current_char_true: 0,
            }
            console.log(input)
            this.x = x;
            this.y = y;
            this.direction = d;
            this.size = size;
            this.data = input;
            this.font = ((f) => {
                switch (f) {
                    case "status":
                        return fontData.status;
                    case "damage":
                        return fontData.damage as FontDataT;
                    case "ja":
                    case "jp":
                        return fontData.ja as unknown as FontDataT;
                    case "en":
                        return fontData.en;
                    default:
                        return fontData[Game.lang] as unknown as FontDataT;
                }
            })(font)
            this.resolve = () => 0;
            this.promise = (() => new Promise((resolve) => { this.resolve = resolve }))();
            this.solved = false;
            this.z = z;
            this.process();
        }
        write() {
            const size = this.size;
            const d = this.direction * Math.PI / 180;
            const input_str_length = this._.now.reduce((a, c) => a + c.str.length, 0);
            let x = 0;
            let y = 0;
            let count = 0;
            const charDataf = ((c: string): [charDataT, string] => {
                if (this.font.props.name == "dt_ja") {
                    if (c in fontDataEn) {
                        return [fontDataEn[c as keyof FontDataT] as unknown as charDataT, "determination"];
                    } else if (set_ja.has(c)) {
                        return [fontDataJa[c as keyof typeof fontDataJa] as unknown as charDataT, "dt_ja"];
                    } else {
                        return [fontDataEn.space, "determination"]
                    }
                } else {
                    if (c in this.font) {
                        return [this.font[c as keyof FontDataT] as charDataT, this.font.props.name];
                    } else {
                        return [this.font.space, this.font.props.name];
                    }
                }
            })
            this._.now.forEach((e) => {
                const s = e.str.split("");
                s.forEach((c) => {
                    const [charData, fn] = charDataf(c)
                    if (c == "\n") {
                        x = 0;
                        y -= this.font.props.height_basic + e.spacing_y;
                    } else {
                        cLib.stamp(fn + "_" + e.color,
                            this.x + (Math.cos(d) * x - Math.sin(d) * (y - charData.gap)) * size / 100,
                            this.y + (Math.sin(d) * x + Math.cos(d) * (y - charData.gap)) * size / 100,
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
            if (this._.len_allow == input_str_length && inputKeys.z && this.z) {
                this.resolve();
                this.solved = true;
            } else if (inputKeys.x) {
                this._.len_allow = input_str_length;
                this._.current_char = input_str_length;
            } else if (this._.len_allow < input_str_length) {
                this._.len_allow += 1 / this.data[this._.count].speed;
                this._.current_char += 1 / this.data[this._.count].speed;
            }
            if (this._.current_char_true < Math.min(this._.len_allow, input_str_length)) this.data[this._.count].voice && Audios.has(this.data[this._.count].voice!) && aLib.play(this.data[this._.count].voice!);
            while (this._.current_char_true < Math.min(this._.len_allow, input_str_length)) {
                this._.now[this._.count].str += this.data[this._.count].str[this._.now[this._.count].str.length];
                this._.current_char_true++
                while (this.data[this._.count].str.length <= this._.now[this._.count].str.length) {
                    if (this._.count + 1 < this.data.length) {
                        this._.count++;
                        this._.now.push({
                            str: "",
                            color: this.data[this._.count].color ?? "white",
                            spacing_x: this.data[this._.count].spacing_x ?? 0,
                            spacing_y: this.data[this._.count].spacing_y ?? 0
                        })
                        this._.current_char -= this.data[this._.count].str.length;
                    } else {
                        break;
                    };
                };
            };
        }
    };

    class Plane implements FontI {
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
        promise: Promise<void>;
        solved: boolean;
        z: boolean;
        resolve: (value: void | PromiseLike<void>) => void;
        constructor(str: string, x: number, y: number, d: number, size: number, color: fontColor, spacing_x: number, spacing_y: number, speed: number, font: string = "default", z: boolean, voice?: string) {
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
                    case "damage":
                        return fontData.damage as FontDataT;
                    case "ja":
                    case "jp":
                        return fontData.ja as unknown as FontDataT;
                    case "en":
                        return fontData.en;
                    case "default":
                    default:
                        return fontData[Game.lang] as unknown as FontDataT;
                }
            })(font)
            this.len_allow = 0;
            this.voice = voice;
            this.resolve = () => { };
            this.promise = (() => new Promise((resolve) => { this.resolve = resolve }))();
            this.solved = false;
            this.z = z;
            this.process();
        }
        write() {
            const chars = this.str_now;
            const size = this.size;
            const d = this.direction * Math.PI / 180;
            let x, y;
            [x, y] = [0, 0];
            const charDataf = ((c: string): [charDataT, string] => {
                if (this.font.props.name == "dt_ja") {
                    if (c in fontDataEn) {
                        return [fontDataEn[c as keyof FontDataT] as unknown as charDataT, "determination"];
                    } else if (set_ja.has(c)) {
                        return [fontDataJa[c as keyof typeof fontDataJa] as unknown as charDataT, "dt_ja"];
                    } else {
                        return [fontDataEn.space, "determination"]
                    }
                } else {
                    if (c in this.font) {
                        return [this.font[c as keyof FontDataT] as charDataT, this.font.props.name];
                    } else {
                        return [this.font.space, this.font.props.name];
                    }
                }
            })
            for (let i = 0; i < chars.length; i++) {
                const [charData, fn] = charDataf(chars[i])
                if (chars[i] == "\n") {
                    x = 0;
                    y -= this.font.props.height_basic + this.spacing_y;
                } else {
                    cLib.stamp(fn + "_" + (!this.color ? "white" : this.color),
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
            if (this.str.length <= this.len_allow && inputKeys.z && this.z) {
                this.resolve();
                this.solved = true;
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

    const write = (str: string, x: number, y: number, d: number, size: number, color: fontColor = "white", spacing_x: number = 0, spacing_y: number = 0, font: string = "default") => {
        const _ = new Plane(str, x, y, d, size, color, spacing_x, spacing_y, 0, font, false);
        _.write();
    };
    const len = (s: string, f: string) => {
        const font = ((f) => {
            switch (f) {
                case "status":
                    return fontData.status;
                case "damage":
                    return fontData.damage as FontDataT;
                case "ja":
                case "jp":
                    return fontData.ja as unknown as FontDataT;
                case "en":
                    return fontData.en;
                case "default":
                default:
                    return fontData[Game.lang] as unknown as FontDataT;
            }
        })(f)
        let r = 0;
        for (let i = 0; i < s.length; i++) {
            const c = s[i];
            const f = (c in font ? font[c as keyof Omit<typeof font, "props">] : font.space);
            if (i + 1 < s.length) r += font.props.width_basic;
            r += f.width;
        }
        return r;
    }
    return {
        write,
        Super,
        Plane,
        len,
    }
}

type fontFnsT = ReturnType<typeof fontFnsGen>;

type PlaneT = fontFnsT["Plane"];
type Plane = InstanceType<PlaneT>

export {
    fontFnsGen,
    fontFnsT,
    PlaneT,
    Plane,
    FontI,
    fontColor
}