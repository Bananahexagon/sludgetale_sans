import { Core } from "./core";
import { cLibGen } from "./lib/canvas";
import { boxFnsGen } from "./box"
import { boneFnsGen } from "./bone"

window.onload = async () => {
    await Core.init();
    const cLib = cLibGen(Core.ctx, Core.Images);
    cLib.stamp("bananahexagon", 60, 160);
    const Box = boxFnsGen(cLib);
    cLib.stamp("bananahexagon", 60, 160);
    let boneDict: {[keys: string]: any} = [];
    const Bone = boneFnsGen(cLib, boneDict);
    cLib.stamp("bananahexagon", 60, 160);
}