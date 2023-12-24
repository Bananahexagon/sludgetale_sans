import { Dict } from "./utils"
import { aLibT } from "./types";

export const frameLibGen = (aLib: aLibT) => {
    const fW = (condition: () => boolean, proc: () => void, resolve: () => void) => {
        if (condition()) { proc(); aLib.tick(); requestAnimationFrame(() => fW(condition, proc, resolve)) } else {resolve()}
    }
    const frameWhile = (condition: () => boolean, proc: () => void): Promise<void> => {
        return new Promise((resolve) => {
            fW(condition, proc, resolve);
        })
    }
    const fF = (condition: number, proc: (arg: number) => void, i: number, resolve: () => void) => {
        if (i < condition) { proc(i); aLib.tick(); requestAnimationFrame(() => fF(condition, proc, i + 1, resolve)) } else {resolve()}
    }
    const frameFor = (condition: number, proc: (arg: number) => void, i: number = 0): Promise<void> => {
        return new Promise((resolve) => {
            fF(condition, proc, i, resolve);
        })
    }

    const frameLoop = (proc: () => void) => { proc(); aLib.tick(); requestAnimationFrame(() => frameLoop(proc)) };
    return {
        frameWhile, frameFor, frameLoop
    }
}