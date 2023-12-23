import { init } from "./lib/core";
import { CoreT, SpriteT, SpriteClassT, cLibT } from "./lib/types";
import { Dict, Opt, sin360, distance } from "./lib/utils";
import config from "./config.json";
import { boneFnsGen } from "./bone";
import { fontFnsGen, Plane as FontPlaneT } from "./font";
import { BoxFnsGen } from "./box";

export const main = async () => {
    const Game = await init(config);
    const player = {
        lv: 19,
        hp: 92,
        hp_max: 92,
        soul: new Game.Sprite(320, 240, 0, 80, "soul", true),
        damage(d: number) {
            this.hp -= d;
            Game.aLib.play_ctx("damage", 2);
            if (this.hp <= 0) {
                Game.aLib.play_ctx("heartbreak_1",2);
                this.hp = 92;
            }
        }
    };
    const Bone = boneFnsGen(Game.cLib, Game.aLib, Game.Sprite, player);
    const Font = fontFnsGen(Game.cLib, Game.inputKeys);
    const Box = BoxFnsGen(Game.cLib, player.soul);
    const box = Box.box;
    const hp_bar = hp_bar_gen(Game.cLib, Font.Plane, player);
    let test = new Font.Plane("test", "Hello, world!", 60, 180, 0, 400, "white", 0, 0, 5, "en");
    let timer = 0;
    let test_b = new Bone.normal(300,200,90,20,250,0,0,2,0,Infinity)
    Game.loop(() => {
        timer++;
        Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        if (Game.inputKeys.up) player.soul.y += 3.5;
        if (Game.inputKeys.down) player.soul.y -= 3.5;
        if (Game.inputKeys.right) player.soul.x += 3.5;
        if (Game.inputKeys.left) player.soul.x -= 3.5;
        box.judge();
        box.update();
        Bone.process();
        box.draw();
        Font.process();
        test.write();
        hp_bar();
        player.soul.stamp();
        Game.cLib.stamp("back", 320, 240, 0, 100, 0.2);
    })
};

const hp_bar_gen = (cLib: cLibT, Font: FontPlaneT, player: { hp: number, hp_max: number, lv: number }) => () => {
    const tmp1 = new Font("_", "chara", 32, 75, 0, 300, "white", 0, 0, 0, "status");
    tmp1.write();
    tmp1.delete();
    const tmp2 = new Font("_", "lV", 134, 75, 0, 300, "white", 0, 0, 0, "status");
    tmp2.write();
    tmp2.delete(); 
    const tmp3 = new Font("_", `${( '00' + player.lv ).slice( -2 )}`, 173, 75, 0, 300, "white", 0, 0, 0, "status");
    tmp3.write();
    tmp3.delete();
    const tmp4 = new Font("_", `${( '00' + player.hp ).slice( -2 )}`, 416, 77, 0, 300, "white", 0, 0, 0, "status");
    tmp4.write();
    tmp4.delete();
    const tmp5 = new Font("_", "/", 455, 77, 0, 300, "white", 0, 0, 0, "status");
    tmp5.write();
    tmp5.delete();
    const tmp6 = new Font("_", `${( '00' + player.hp_max ).slice( -2 )}`, 479, 77, 0, 300, "white", 0, 0, 0, "status");
    tmp6.write();
    tmp6.delete();
    cLib.drawRect(256, 59, player.hp_max * 1.2, 21, "red", 0, "start");
    cLib.drawRect(256, 59, player.hp * 1.2, 21, "yellow", 0, "start");
    cLib.stamp("hp_white", 224, 74, 0, 100, 1, "start");
    cLib.stamp("kr_white", 377, 74, 0, 100, 1, "start");
};