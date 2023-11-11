import { Dict } from "./utils"
import { aLibT } from "./types";

export const frameLibGen = (aLib: aLibT) => {
    const frameWhile = (condition: () => boolean, proc: () => void) => {
        if (!condition()) { proc(); aLib.tick(); requestAnimationFrame(() => frameWhile(condition, proc)) }
    }

    const frameFor = (condition: number, proc: (arg: number) => void, i: number = 0) => {
        if (i < condition) { proc(i); aLib.tick(); requestAnimationFrame(() => frameFor(condition, proc, i + 1)) }
    }

    const frameLoop = (proc: () => void) => { proc(); aLib.tick(); requestAnimationFrame(() => frameLoop(proc)) };
    return {
        frameWhile, frameFor, frameLoop
    }
}