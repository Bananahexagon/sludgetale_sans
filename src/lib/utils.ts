
class Opt<T> {
    is_some: boolean;
    value: T | undefined;
    constructor(is_some: boolean, value: T | undefined = undefined) {
        this.is_some = is_some;
        this.value = value;
    }
    unwrap(): T {
        if (this.is_some) {
            return this.value!;
        } else {
            throw new Error();
        }
    }
    unwrap_or(arg: T): T {
        if (this.is_some) {
            return this.value!;
        } else {
            return arg;
        }
    }
    unwrap_or_else(fn: () => T): T {
        if (this.is_some) {
            return this.value!;
        } else {
            return fn();
        }
    }
    static None<T>() {
        return new Opt<T>(false);
    }
    static Some<T>(arg: T) {
        return new Opt<T>(true, arg);
    }
    static try<T>(fn: () => T) {
        try {
            const v = fn();
            return Opt.Some<T>(v);
        } catch {
            return Opt.None<T>();
        }
    }
}

class Res<T, E> {
    is_ok: boolean;
    value: T | E | undefined;
    constructor(is_ok: boolean, value: T | E | undefined = undefined) {
        this.is_ok = is_ok;
        this.value = value;
    }
    unwrap(): T {
        if (this.is_ok) {
            return this.value as T;
        } else {
            throw new Error(this.value as E as string);
        }
    }
    unwrap_or(arg: T): T {
        if (this.is_ok) {
            return this.value as T;
        } else {
            return arg;
        }
    }
    unwrap_or_else(fn: (arg0: E) => T): T {
        if (this.is_ok) {
            return this.value as T;
        } else {
            return fn(this.value as E);
        }
    }
    static Ok<T, E>(arg: T) {
        return new Res<T, E>(true, arg);
    }
    static Err<T, E>(err: E) {
        return new Res<T, E>(false);
    }
    static try<T>(fn: () => T) {
        try {
            const v = fn();
            return Res.Ok(v);
        } catch (err) {
            return Res.Err(err);
        }
    }
}


type Dict<T> = {
    [keys: string]: T,
}

const sin360 = (d: number) => Math.sin(d / 360 * Math.PI * 2);
const cos360 = (d: number) => Math.cos(d / 360 * Math.PI * 2);
const tan360 = (d: number) => Math.tan(d / 360 * Math.PI * 2);

const distance = (lx: number, ly: number, rx: number, ry: number): number => {
    return Math.sqrt((rx - lx) ** 2 + (ry - ly) ** 2)
}

export {
    Opt,
    Res,
    Dict,
    sin360,
    cos360,
    tan360,
    distance,
}