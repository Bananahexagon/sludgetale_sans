import { Core } from "./core";
import { cLibGen } from "./lib/canvas";
import { boxFnsGen } from "./box";
import { boneFnsGen } from "./bone";
import { fontFnsGen } from "./font"

window.onload = async () => {
    await Core.init();
    const cLib = cLibGen(Core.ctx, Core.Images);
    cLib.stamp("bananahexagon", 60, 160);
    const Box = boxFnsGen(cLib);
    const Bone = boneFnsGen(cLib);
    const Font = fontFnsGen(cLib, Core.inputKeys);
}