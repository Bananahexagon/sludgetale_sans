type Ref<T> = {
    v: T
}

const sin360 = (d: number) => Math.sin(d / 360 * Math.PI * 2);
const cos360 = (d: number) => Math.cos(d / 360 * Math.PI * 2);
const tan360 = (d: number) => Math.tan(d / 360 * Math.PI * 2);
const random = (l: number, h: number) => Math.floor(Math.random() * (h - l + 1)) + l;

const distance = (lx: number, ly: number, rx: number, ry: number): number => {
    return Math.sqrt((rx - lx) ** 2 + (ry - ly) ** 2)
}

export {
    sin360,
    cos360,
    tan360,
    distance,
    Ref,
    random
}