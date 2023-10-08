import { Dict } from "./utils"

export const frameWhile = (condition: () => boolean, proc: () => void) => {
    if (!condition()) { proc(); requestAnimationFrame(() => frameWhile(condition, proc)) }
}

export const frameFor = (condition: number, proc: (arg: number) => void, i: number = 0) => {
    if (i < condition) { proc(i); requestAnimationFrame(() => frameFor(condition, proc, i + 1)) }
}

export const frameLoop = (proc: () => void) => { proc(); requestAnimationFrame(() => frameLoop(proc)) };
