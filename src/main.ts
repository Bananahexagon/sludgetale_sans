import { init } from "./lib/core";
import { CoreT, SpriteT, SpriteClassT, cLibT } from "./lib/types";
import { Dict, Opt, sin360, distance, cos360 } from "./lib/utils";
import config from "./config.json";
import { boneFnsGen } from "./bone";
import { fontFnsGen, Plane as FontPlaneT } from "./font";
import { BoxFnsGen } from "./box";
import { gbFnsGen } from "./gb";
import Game from "./game.json"

export const main = async () => {
    const Core = await init(config);
    let [scene, sub_scene] = ["menu", "command"];
    const Font = fontFnsGen(Core.cLib, Core.aLib, Core.inputKeys);
    {
        let cursor = 0;
        await Core.while(() => (scene === "menu"), () => {
            Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
            if (Core.inputKeys.f.up) { cursor--; Core.aLib.play("cursor_move") }
            if (Core.inputKeys.f.down) { cursor++; Core.aLib.play("cursor_move") }
            Core.cLib.stamp("soul", 220, -cursor * 50 + 240);
            const tmp = new Font.Plane("_", "play", 270, 250, 0, 200, "yellow", 0, 0, 0, "en");
            tmp.write();
            tmp.delete();
            if (Core.inputKeys.f.z) { scene = "battle"; Core.aLib.play("cursor_confirm") }
        });
    }
    let timer = 0;

    const player = {
        lv: 1,
        hp: 20,
        hp_max: 20,
        soul: new Core.Sprite(320, 240, 0, 80, "soul", 1, 1),
        damage(d: number) {
            this.hp -= d;
            Core.aLib.play("damage", 2);
            if (this.hp <= 0) {
                scene = "game_over";
            }
        }
    };
    {
        timer = 0;
        const Blaster = gbFnsGen(Core.cLib, Core.aLib, Core.Sprite, player);
        const Bone = boneFnsGen(Core.cLib, Core.aLib, Core.Sprite, player);
        const Box = BoxFnsGen(Core.cLib, player.soul);
        const box = Box.box;
        const hp_bar = hp_bar_gen(Core.cLib, Font.Plane, player);
        //const test_b = new Bone.normal(300, 200, 90, 20, 250, 0, 0, 2, 0, Infinity);
        //const test_gb = new Blaster.gb(100, 200, 0, 400, 600, 90, 100, 2, 60, 60, 60);
        box.set(320, 160, 0, 562, 132);
        while (scene == "battle") {
            if (sub_scene == "command") {
                let choice: number[] = [];
                const txt = new Font.Plane("_", "You feel like you're going to\nhave a bad time.", 80, 205, 0, 200, "white", 0, 0, 1, "en", "text");
                type Plane = typeof txt;
                let command = 0;
                let result: undefined | Plane = undefined;
                await Core.while(() => sub_scene == "command", () => {
                    Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
                    if (choice.length == 0) {
                        if (Core.inputKeys.f.right) { command = (command + 1 + 4) % 4; Core.aLib.play("cursor_move"); }
                        if (Core.inputKeys.f.left) { command = (command - 1 + 4) % 4; Core.aLib.play("cursor_move"); }
                        if (Core.inputKeys.f.z) {
                            choice.push(command);
                            Core.aLib.play("cursor_confirm");
                            if (command == 2) choice.push(0);
                            if (command == 3) choice.push(0);
                        }
                        txt.process();
                        txt.write();
                        Font.write("*", 50, 205, 0, 200);
                        [player.soul.x, player.soul.y] = [282 + (command - 1.5) * 155, 27];
                    } else if (choice.length == 1) {
                        if (Core.inputKeys.f.x) { choice.pop(); Core.aLib.play("cursor_move"); }
                        if (Core.inputKeys.f.z) { choice.push(0); Core.aLib.play("cursor_confirm"); }
                        if (choice[0] == 0 || choice[0] == 1) {
                            Font.write(`${Game.enemy_name}`, 80, 205, 0, 200);
                            [player.soul.x, player.soul.y] = [55, 195];
                        }
                    } else if (choice.length == 2) {
                        const menu = (v: { name: string }[]) => {
                            if (Core.inputKeys.f.up) { choice[1] -= 2; Core.aLib.play("cursor_move"); }
                            if (Core.inputKeys.f.down) { choice[1] += 2; Core.aLib.play("cursor_move"); }
                            if (Core.inputKeys.f.right) { choice[1] += 1; Core.aLib.play("cursor_move"); }
                            if (Core.inputKeys.f.left) { choice[1] -= 1; Core.aLib.play("cursor_move"); }
                            choice[1] = Math.max(Math.min(choice[1], 7, v.length - 1), 0);
                            [player.soul.x, player.soul.y] = [55 + choice[1] % 2 * 281, 195 - Math.floor((choice[1] % 4) / 2) * 40];
                            if (choice[1] < 4) [0, 1, 2, 3].forEach(i => {
                                if (i < v.length) {
                                    if (i != choice[1]) Font.write("*", 50 + i % 2 * 281, 205 - Math.floor((i % 4) / 2) * 40, 0, 200);
                                    Font.write(`${v[i].name}`, 80 + i % 2 * 281, 205 - Math.floor((i % 4) / 2) * 40, 0, 200);
                                }
                            })
                            else[4, 5, 6, 7].forEach(i => {
                                if (i < v.length) {
                                    if (i != choice[1]) Font.write("*", 50 + i % 2 * 281, 205 - Math.floor((i % 4) / 2) * 40, 0, 200);
                                    Font.write(`${v[i].name}`, 80 + i % 2 * 281, 205 - Math.floor((i % 4) / 2) * 40, 0, 200);
                                }
                            })

                            if (4 <= v.length) Font.write(`PAGE ${choice[1] < 4 ? 1 : 2}`, 361, 125, 0, 200)
                        }
                        if (choice[0] != 0 && Core.inputKeys.f.x) {
                            if (choice[0] == 1) choice.pop();
                            else { choice.pop(); choice.pop(); }
                            Core.aLib.play("cursor_move");
                        }
                        if (choice[0] == 0) {

                        } else if (choice[0] == 1 && choice.length == 2) {
                            menu(Game.actions);
                            if (Core.inputKeys.f.z) choice.push(0);
                        } else if (choice[0] == 2) {
                            menu(Game.items)
                            if (Core.inputKeys.f.z) choice.push(0);
                        } else if (choice[0] == 3) {

                        }
                    }else if (choice.length == 3) {
                        player.soul.alpha = 0;

                        if (choice[0] == 1) {
                            Font.write("*", 50, 205, 0, 200);
                            if (result === undefined) {
                                result = new Font.Plane("_", `${Game.actions[choice[1]].text}`, 80, 205, 0, 200, "white", 0, 0, 1, "en", "text");
                            } else {result.process()}
                            result.write();
                        } else if (choice[0] == 2) {
                        } else if (choice[0] == 3) {

                        }
                    }
                    box.draw();
                    const command_draw = (x: number, y: number, n: number, s: boolean) => Core.cLib.stamp("commands", x, y, 0, 100, 1, "center", 1, { left: s ? 113 : 0, top: 45 * n, width: 112, height: 44 });
                    [0, 1, 2, 3].forEach(i => command_draw(320 + (i - 1.5) * 155, 27, i, command == i && choice.length == 0));
                    player.soul.stamp()
                    hp_bar();
                })
            }{
            //timer++;
            //Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
            //switch (sub_scene) {
            //    case "enemy_attack": {
            //        if (Core.inputKeys.up) player.soul.y += 3.5;
            //        if (Core.inputKeys.down) player.soul.y -= 3.5;
            //        if (Core.inputKeys.right) player.soul.x += 3.5;
            //        if (Core.inputKeys.left) player.soul.x -= 3.5;
            //        box.judge();
            //    } break;
            //    case "command": {
            //        if (Core.inputKeys.right) player.soul.x += 3.5;
            //        if (Core.inputKeys.left) player.soul.x -= 3.5;
            //    }
            //}
            //box.update();
            //Bone.process();
            //box.draw();
            //Blaster.process();
            //Font.process();
            //test_f.write();
            //Font.write("*", 50, 205, 0, 200);
            //hp_bar();
            //const command = (x: number, y: number, n: number, s: boolean) => Core.cLib.stamp("commands", x, y, 0, 100, 1, "center", 1, { left: s ? 113 : 0, top: 45 * n, width: 112, height: 44 });
            //[0, 1, 2, 3].forEach(i => { command(320 + (i - 1.5) * 155, 27, i, false) });
            //player.soul.stamp();
            //Core.cLib.stamp("back", 320, 240, 0, 100, 0.2);
        }
        };
    }
    {
        timer = 0;
        let broken_hearts: SpriteT[] = [];
        await Core.while(() => (scene === "game_over"), () => {
            Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
            if (timer == 0) {
                Core.aLib.play("heartbreak_1", 2)
            } else if (timer < 60) {
                Core.cLib.stamp("death_0", player.soul.x, player.soul.y, 0, 80)
            } else if (timer == 60) {
                Core.aLib.play("heartbreak_2", 2)
                for (let i = 0; i < 4; i++) {
                    let xs = Math.random() * 12 - 6;
                    let ys = Math.random() * 8 + 4;
                    broken_hearts.push(new Core.Sprite(player.soul.x, player.soul.y, Math.random() * 360, 80, `death_${i + 1}`, 1, 1, (self) => {
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
    }
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
    cLib.drawRect(256, 59, player.hp_max * 1.2, 21, "red", 0, 1, "start");
    cLib.drawRect(256, 59, player.hp * 1.2, 21, "yellow", 0, 1, "start");
    cLib.stamp("hp_white", 224, 74, 0, 100, 1, "start");
    cLib.stamp("kr_white", player.hp_max * 1.2 + 267, 74, 0, 100, 1, "start");
};