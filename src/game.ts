import { init } from "./lib/core";
import { CoreT, SpriteT, SpriteClassT } from "./lib/types";
import { Dict, Opt, sin360, distance } from "./lib/utils";
import config from "./config.json";
import { boneFnsGen } from "./bone";
import { fontFnsGen } from "./font";

export const main = async () => {
    const Game = await init(config);
    const player = new Game.Sprite(0, 0, 0, 80, "soul", true);
    const Bone = boneFnsGen(Game.cLib, Game.Sprite);
    const Font = fontFnsGen(Game.cLib, Game.inputKeys);
    new Bone.normal(60, 180, 0, 12, 200, 0, 0, 2, 0, 0);
    let test = new Font.Plane("test", "Hello, world!", 60, 180, 0, 400, "white", 0, 0, 5, "en");
    Game.loop(() => {
        Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        if (Game.inputKeys.up) player.y += 3.5;
        if (Game.inputKeys.down) player.y -= 3.5;
        if (Game.inputKeys.right) player.x += 3.5;
        if (Game.inputKeys.left) player.x -= 3.5;
        Bone.process();
        Font.process();
        test.write();
        player.stamp();
    })
};