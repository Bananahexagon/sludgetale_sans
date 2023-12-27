import { Dict, Opt } from "./utils"
type bool = boolean;

type cLibT = {
    stamp: (name: string, dx: number, dy: number, dd?: number, size?: number, alpha?: number, align?: "center" | "start", box?: { left: number, top: number, width: number, height: number, }, absolute?: boolean) => void;
    drawRect: (dx: number, dy: number, width: number, height: number, color: string, direction?: number, alpha?: number, type?: string) => void;
    drawLine: (lx: number, ly: number, d: number, len: number, width: number, color: string, type?: number) => void;
    drawText: (tx: string, lx: number, ly: number, size: number, color: string, font?: string, align?: "left" | "right" | "center" | "start" | "end") => void;
}

type aLibT = {
    play: (name: string, delay?: number, gain?:number) => void;
    tick: () => void;
}

type configT = {
    display_quality: number,
    stage_width: number,
    stage_height: number,
    display_width: number,
    display_height: number,
    canvas_name: string,
}
type Assets = {
    Images: Dict<HTMLImageElement>
    Audios: Dict<{ ctx: AudioBuffer, data: HTMLAudioElement, time: number }>,
    Fonts: Dict<FontFace>,
}
type CanvasProps = {
    x: number,
    y: number,
    d: number,
    size: number,
}

type CoreT = {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    Images: Dict<HTMLImageElement>,
    Audios: Dict<{ ctx: AudioBuffer, data: HTMLAudioElement, time: number }>,
    Fonts: Dict<FontFace>,
    inputKeys: inputKeysT
    inputMouse: inputMouseT
    props: Dict<any>,
    cLib: cLibT,
    aLib: aLibT,
    Sprite: SpriteClassT,
    while: (condition: () => boolean, proc: () => void) => Promise<void>,
    for: (condition: number, proc: (arg: number) => void, i: number) => Promise<void>,
    loop: (proc: () => void) => void,
}

type inputKeysT = {
    up: boolean, down: boolean, left: boolean, right: boolean, z: boolean, x: boolean, c: boolean, d: boolean
    f: {
        up: boolean, down: boolean, left: boolean, right: boolean, z: boolean, x: boolean, c: boolean, d: boolean
    }
};


type inputMouseT = { x: number, y: number, clicking: boolean, is_in_rect: (dx: number, dy: number, w: number, h: number, type?: string) => boolean };


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
class SpriteClass {
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
    }
    move(far: number) {
    }
    act() {
    }
}
type SpriteClassT = typeof SpriteClass;
const Sprite = new SpriteClass(0, 0);
type SpriteT = typeof Sprite;
export {
    CoreT,
    cLibT,
    configT,
    Assets,
    CanvasProps,
    SpriteClassT,
    SpriteT,
    bool,
    inputKeysT,
    inputMouseT,
    aLibT,
}