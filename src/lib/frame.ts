export const frameLibGen = (b_tick: (() => void)[], a_tick: (() => void)[]) => {
    const fW = async (condition: () => boolean, proc: (() => void) | (() => Promise<void>), resolve: () => void) => {
        if (condition()) {
            b_tick.forEach(e => e());
            await proc();
            a_tick.forEach(e => e());
            requestAnimationFrame(() => fW(condition, proc, resolve));
        } else {
            resolve();
        }
    }
    const frameWhile = (condition: () => boolean, proc: (() => void) | (() => Promise<void>)): Promise<void> => {
        return new Promise((resolve) => {
            fW(condition, proc, resolve);
        })
    }
    const fF = async (condition: (arg: number) => boolean, proc: ((arg: number) => void) | ((arg: number) => Promise<void>), i: number, resolve: () => void) => {
        if (condition(i)) {
            b_tick.forEach(e => e());
            await proc(i);
            a_tick.forEach(e => e());
            requestAnimationFrame(() => fF(condition, proc, i + 1, resolve))
        } else {
            resolve()
        }
    }

    const frameFor = (i: number, condition: (arg: number) => boolean, proc: (arg: number) => void): Promise<void> => {
        return new Promise((resolve) => {
            fF(condition, proc, i, resolve);
        })
    }
    const fL = async (proc: (() => void) | (() => Promise<void>)) => {
        b_tick.forEach(e => e());
        await proc();
        a_tick.forEach(e => e());
        requestAnimationFrame(() => frameLoop(proc));
    };
    const frameLoop = (proc: (() => void) | (() => Promise<void>)): Promise<never> => {
        return new Promise(() => {
            fL(proc)
        })
    };
    return {
        frameWhile, frameFor, frameLoop
    }
}