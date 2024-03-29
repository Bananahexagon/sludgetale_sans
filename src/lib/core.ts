import { frameLibGen } from "./frame";
import { loadAssets } from "./loader";
import { CanvasLibGen, GetRect, cLibT } from "./canvas";
import { SpriteLibGen } from "./sprite";
import { PositionLibGen } from "./position";
import { AudioLibGen, aLibT } from "./audios";
import { configT } from "../config.json";

const init = async (config: configT) => {
    const canvas = document.getElementById(config.canvas_name) as HTMLCanvasElement;
    canvas.height = config.stage_height * config.display_quality;
    canvas.width = config.stage_width * config.display_quality;
    const ctx = canvas.getContext("2d")!;
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const inputKeys = {
        up: false, down: false, left: false, right: false, z: false, x: false, c: false, d: false,
        f: {
            up: false, down: false, left: false, right: false, z: false, x: false, c: false, d: false,
        }
    };
    const inputMouse = {
        x: 0, y: 0, clicking: false, is_in_rect(dx: number, dy: number, w: number, h: number, type: string = "center") {
            switch (type) {
                case "center": {
                    return (dx - w / 2 < this.x && this.x < dx + w / 2) && (dy - h / 2 < this.y && this.y < dy + h / 2);
                } break;
                case "start":
                default: {
                    return (dx < this.x && this.x < dx + w) && (dy < this.y && this.y < dy + h);
                } break;
            }
        }
    }

    const props = {
        canvas: {
            size: 100,
            x: 0,
            y: 0,
            d: 0,
            align: "center" as "center" | "start"
        },
    };
    const { drawRect, strokeRect } = GetRect(canvas, ctx, config, props.canvas)
    const { Images, Audios, Fonts } = await loadAssets(audioContext, (i, m) => {
        const c = "#99867a";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        strokeRect(200, 220, 240, 40, c, 0, 1, "start", 2, "outer")
        drawRect(200, 220, i / m * 240, 40, c, 0, 1, "start")
    });
    const cLib: cLibT = CanvasLibGen(canvas, ctx, Images, Fonts, config, props.canvas);
    const aLib: aLibT = AudioLibGen(Audios);
    const Sprite = SpriteLibGen(cLib);

    ctx.imageSmoothingEnabled = false;
    const pLib = PositionLibGen(canvas, config, props.canvas);
    window.addEventListener("keydown", e => {
        switch (e.key) {
            case "ArrowUp": {
                inputKeys.up = true;
                inputKeys.f.up = true;
            } break;
            case "ArrowDown": {
                inputKeys.down = true;
                inputKeys.f.down = true;
            } break;
            case "ArrowLeft": {
                inputKeys.left = true;
                inputKeys.f.left = true;
            } break;
            case "ArrowRight": {
                inputKeys.right = true;
                inputKeys.f.right = true;
            } break;
            case "z":
            case "Z": {
                inputKeys.z = true;
                inputKeys.f.z = true;
            } break;
            case "x":
            case "X": {
                inputKeys.x = true;
                inputKeys.f.x = true;
            } break;
            case "c":
            case "C": {
                inputKeys.c = true;
                inputKeys.f.c = true;
            } break;
            case "d":
            case "D": {
                inputKeys.d = true;
                inputKeys.f.d = true;
            } break;
        }
    });
    window.addEventListener("keyup", e => {
        switch (e.key) {
            case "ArrowUp": {
                inputKeys.up = false;
            } break;
            case "ArrowDown": {
                inputKeys.down = false;
            } break;
            case "ArrowLeft": {
                inputKeys.left = false;
            } break;
            case "ArrowRight": {
                inputKeys.right = false;
            } break;
            case "z":
            case "Z": {
                inputKeys.z = false;
            } break;
            case "x":
            case "X": {
                inputKeys.x = false;
            } break;
            case "c":
            case "C": {
                inputKeys.c = false;
            } break;
            case "d":
            case "D": {
                inputKeys.d = false;
            } break;
        }
    });
    canvas.addEventListener("mousedown", e => {
        inputMouse.clicking = true;
        const p = pLib.raw_to_stage(e.x, e.y);
        inputMouse.x = p.x;
        inputMouse.y = p.y;
    });
    canvas.addEventListener("mousemove", e => {
        const p = pLib.raw_to_stage(e.x, e.y);
        inputMouse.x = p.x;
        inputMouse.y = p.y;
    });
    canvas.addEventListener("mouseup", e => {
        inputMouse.clicking = false;
        const p = pLib.raw_to_stage(e.x, e.y);
        inputMouse.x = p.x;
        inputMouse.y = p.y;
    });
    let b_tick: (() => void)[] = [];
    let a_tick: (() => void)[] = [];
    {
        let bk = {
            up: false, down: false, left: false, right: false, z: false, x: false, c: false, d: false,
        }
        let timer = 0;
        b_tick.push(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cLib.drawRect(320, 240, 640, 480, "#000", 0, 1);
            (["up", "down", "left", "right", "z", "x", "c", "d"] as ("up" | "down" | "left" | "right" | "z" | "x" | "c" | "d")[]).forEach(e => {
                if (bk[e]) {
                    inputKeys.f[e] = false;
                }
            })
            bk = { ...inputKeys.f }
            //props.canvas.d=  sin360(timer) * 10;
            timer += 1;
        })
        a_tick.push(() => {
            aLib.tick();
        })
    }
    const { frameWhile, frameFor, frameLoop } = frameLibGen(b_tick, a_tick);
    return {
        screen,
        canvas,
        ctx,
        Images,
        Audios,
        Fonts,
        inputKeys,
        inputMouse,
        props,
        cLib,
        aLib,
        Sprite,
        for: frameFor,
        while: frameWhile,
        loop: frameLoop,
        a_tick,
        b_tick
    }
}

type CoreT = Awaited<ReturnType<typeof init>>
type inputKeysT = CoreT["inputKeys"];
export {
    init,
    CoreT,
    inputKeysT
}