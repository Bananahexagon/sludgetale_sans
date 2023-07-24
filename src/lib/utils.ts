class Opt<T> {
    is_some: boolean;
    value: T | undefined;
    constructor(is_some: boolean, value: T | undefined = undefined) {
        this.is_some = is_some;
        this.value = value;
    }
    unwrap(): T {
        if(this.is_some) {
            return this.value!;
        } else {
            throw new Error();
        }
    }
    unwrap_or(arg: T): T {
        if(this.is_some) {
            return this.value!;
        } else {
            return arg;
        }
    }
    unwrap_or_else(fn: ()=>T): T {
        if(this.is_some) {
            return this.value!;
        } else {
            return fn();
        }
    }
}
class Res<Ok, Err> {
    is_ok: boolean;
    value: Ok | Err | undefined;
    constructor(is_ok: boolean, value: Ok | Err | undefined = undefined) {
        this.is_ok = is_ok;
        this.value = value;
    }
    unwrap(): Ok {
        if(this.is_ok) {
            return this.value as Ok;
        } else {
            throw new Error(this.value as Err as string);
        }
    }
    unwrap_or(arg: Ok): Ok {
        if(this.is_ok) {
            return this.value as Ok;
        } else {
            return arg;
        }
    }
    unwrap_or_else(fn: (arg0: Err) => Ok): Ok {
        if(this.is_ok) {
            return this.value as Ok;
        } else {
            return fn(this.value as Err);
        }
    }
}
