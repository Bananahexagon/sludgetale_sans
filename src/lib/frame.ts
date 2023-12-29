import { Dict } from "./utils"
import { aLibT } from "./types";

export const frameLibGen = (b_tick:()=>void,a_tick:()=>void) => {
    const fW = (condition: () => boolean, proc: () => void, resolve: () => void) => {
        if (condition()) { b_tick(); proc(); a_tick(); requestAnimationFrame(() => fW(condition, proc, resolve)) } else {resolve()}
    }
    const frameWhile = (condition: () => boolean, proc: () => void): Promise<void> => {
        return new Promise((resolve) => {
            fW(condition, proc, resolve);
        })
    }
    const fF = (condition: (arg:number)=>boolean, proc: (arg: number) => void, i: number, resolve: () => void) => {
        if (condition(i)) { b_tick(); proc(i); a_tick(); requestAnimationFrame(() => fF(condition, proc, i + 1, resolve)) } else {resolve()}
    }
    const frameFor = ( i: number,condition: (arg:number)=>boolean, proc: (arg: number) => void): Promise<void> => {
        return new Promise((resolve) => {
            fF(condition, proc, i, resolve);
        })
    }

    const frameLoop = (proc: () => void) => { b_tick(); proc(); a_tick(); requestAnimationFrame(() => frameLoop(proc)) };
    return {
        frameWhile, frameFor, frameLoop
    }
}