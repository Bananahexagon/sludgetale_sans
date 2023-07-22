window.onload = async () => {
    let Core =  require("./core");
    const cLibGen = require("./lib/canvas.ts");
    await Core.init();
    const cLib = cLibGen(Core.ctx, Core.Images);
    cLib.stamp("bananahexagon", 60, 160);
}