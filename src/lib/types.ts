import { Dict, Opt } from "./utils"
type bool = boolean;

type cLibT = {
    stamp: (name: string, dx: number, dy: number, dd?: number, size?: number, alpha?: number, align?: string, box?: { left: number, top: number, width: number, height: number, }, absolute?: boolean) => void;
    drawRect: (dx: number, dy: number, width: number, height: number, color: string, direction?: number, type?: string) => void;
    drawLine: (lx: number, ly: number, d: number, len: number, width: number, color: string, type?: number) => void;
    drawText: (tx: string, lx: number, ly: number, size: number, color: string, font?: string, align?: "left" | "right" | "center" | "start" | "end") => void;
}

type aLibT = {
    play: (name: string, start?:number,delay?:number) => void;
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
    Audios: Dict<AudioBuffer>,
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
    Audios: Dict<AudioBuffer>,
    Fonts: Dict<FontFace>,
    inputKeys: {
        up: boolean, down: boolean, left: boolean, right: boolean, z: boolean, x: boolean, c: boolean, d: boolean
    };
    inputMouse: { x: number, y: number, clicking: boolean, is_in_rect: (dx: number, dy: number, w: number, h: number, type?: string) => boolean },
    props: Dict<any>,
    cLib: cLibT,
    aLib: aLibT,
    Sprite: SpriteClassT,
    while: (condition: () => boolean, proc: () => void) => void,
    for: (condition: number, proc: (arg: number) => void, i: number) => void,
    loop: (proc: () => void) => void,
}

type inputKeysT = {
    up: boolean, down: boolean, left: boolean, right: boolean, z: boolean, x: boolean, c: boolean, d: boolean
};


type inputMouseT = { x: number, y: number, clicking: boolean, is_in_rect: (dx: number, dy: number, w: number, h: number, type?: string) => boolean };


class SpriteClass {
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
    stamp(): void { }
    move(far: number): void { }
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