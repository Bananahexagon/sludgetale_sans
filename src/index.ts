import { Dict } from "./lib/utils"

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

    let Game: Dict<any> = {
        player: {
            x: 0,
            y: 0,
        }
    }

    const boxObj = {
        center: {
            x: 320,
            y: 240,
        },
        width: 30,
        height: 120,
        direction: 0,
    };
    const box = Box.boxGet(boxObj);

    const update = () => {
        Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
        if (Core.inputKeys.up) Game.player.y -= 3;
        if (Core.inputKeys.down) Game.player.y += 3;
        if (Core.inputKeys.left) Game.player.x -= 3;
        if (Core.inputKeys.right) Game.player.x += 3;

        box.forEach(e => {
            e.drawWhite();
            [Game.player.x, Game.player.y] = e.calc(Game.player.x, Game.player.y);
        })
        box.forEach(e => {
            e.drawBlack();
        })

        new Font.Plane("test", "MEGALOVANIA", 100, 200, 30, 200, "white", 0, 0, 0, "determination").write().delete()

        cLib.stamp("soul", Game.player.x, Game.player.y);

        window.requestAnimationFrame(update);
    }

    window.requestAnimationFrame(update);
}

