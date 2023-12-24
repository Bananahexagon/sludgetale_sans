import { init } from "./lib/core";
import { CoreT, SpriteT, SpriteClassT, cLibT } from "./lib/types";
import { Dict, Opt, sin360, distance } from "./lib/utils";
import config from "./config.json";
import { boneFnsGen } from "./bone";
import { fontFnsGen, Plane as FontPlaneT } from "./font";
import { BoxFnsGen } from "./box";
import { gbFnsGen } from "./gb";

export const main = async () => {
    const Core = await init(config);
    let scene = "battle";
    const player = {
        lv: 1,
        hp: 20,
        hp_max: 20,
        soul: new Core.Sprite(320, 240, 0, 80, "soul", true),
        damage(d: number) {
            this.hp -= d;
            Core.aLib.play_ctx("damage", 2);
            if (this.hp <= 0) {
                scene = "game_over";
            }
        }
    };
    const Blaster = gbFnsGen(Core.cLib, Core.aLib, Core.Sprite, player);
    const Bone = boneFnsGen(Core.cLib, Core.aLib, Core.Sprite, player);
    const Font = fontFnsGen(Core.cLib, Core.inputKeys);
    const Box = BoxFnsGen(Core.cLib, player.soul);
    const box = Box.box;
    const hp_bar = hp_bar_gen(Core.cLib, Font.Plane, player);
    let test = new Font.Plane("test", "Hello, world!", 60, 180, 0, 400, "white", 0, 0, 5, "en");
    let timer = 0;
    //const test_b = new Bone.normal(300, 200, 90, 20, 250, 0, 0, 2, 0, Infinity);
    const test_gb = new Blaster.gb(100,200,0,400,600,90,100,1,60,60,60)
    await Core.while(() => (scene === "battle"), () => {
        timer++;
        Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
        if (Core.inputKeys.up) player.soul.y += 3.5;
        if (Core.inputKeys.down) player.soul.y -= 3.5;
        if (Core.inputKeys.right) player.soul.x += 3.5;
        if (Core.inputKeys.left) player.soul.x -= 3.5;
        //box.judge();
        //box.update();
        Bone.process();
        //box.draw();
        Blaster.process();
        Font.process();
        test.write();
        hp_bar();
        player.soul.stamp();
        Core.cLib.stamp("back", 320, 240, 0, 100, 0.2);
    });
    timer = 0;
    let broken_hearts: SpriteT[] = [];
    await Core.while(() => (scene === "game_over"), () => {
        Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
        if (timer == 0) {
            Core.aLib.play_ctx("heartbreak_1", 2)
        } else if (timer < 60) {
            Core.cLib.stamp("death_0", player.soul.x, player.soul.y, 0, 80)
        } else if (timer == 60) {
            Core.aLib.play_ctx("heartbreak_2", 2)
            for (let i = 0; i < 4; i++) {
                let xs = Math.random() * 12 - 6;
                let ys = Math.random() * 8 + 4;
                broken_hearts.push(new Core.Sprite(player.soul.x, player.soul.y, Math.random() * 360, 80, `death_${i + 1}`, true, (self) => {
                    self.x += xs;
                    self.y += ys;
                    self.d += xs;
                    ys -= 0.333;
                    self.stamp();
                }));
            }
        } else if (60 < timer && timer < 180) {
            broken_hearts.forEach(s => s.act());
        } else if (timer == 180) {
            scene = "waiting";
        }
        timer++;
    })
};

const hp_bar_gen = (cLib: cLibT, Font: FontPlaneT, player: { hp: number, hp_max: number, lv: number }) => () => {
    const tmp1 = new Font("_", "chara", 32, 75, 0, 300, "white", 0, 0, 0, "status");
    tmp1.write();
    tmp1.delete();
    const tmp2 = new Font("_", "lV", 134, 75, 0, 300, "white", 0, 0, 0, "status");
    tmp2.write();
    tmp2.delete();
    const tmp3 = new Font("_", `${('00' + player.lv).slice(-2)}`, 173, 75, 0, 300, "white", 0, 0, 0, "status");
    tmp3.write();
    tmp3.delete();
    const tmp4 = new Font("_", `${('00' + player.hp).slice(-2)}`, player.hp_max * 1.2 + 306, 77, 0, 300, "white", 0, 0, 0, "status");
    tmp4.write();
    tmp4.delete();
    const tmp5 = new Font("_", "/", player.hp_max * 1.2 + 345, 77, 0, 300, "white", 0, 0, 0, "status");
    tmp5.write();
    tmp5.delete();
    const tmp6 = new Font("_", `${('00' + player.hp_max).slice(-2)}`, player.hp_max * 1.2 + 369, 77, 0, 300, "white", 0, 0, 0, "status");
    tmp6.write();
    tmp6.delete();
    cLib.drawRect(256, 59, player.hp_max * 1.2, 21, "red", 0,1, "start");
    cLib.drawRect(256, 59, player.hp * 1.2, 21, "yellow", 0,1, "start");
    cLib.stamp("hp_white", 224, 74, 0, 100, 1, "start");
    cLib.stamp("kr_white", player.hp_max * 1.2 + 267, 74, 0, 100, 1, "start");
};