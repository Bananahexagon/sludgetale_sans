import { init } from "./lib/core";
import { CoreT, SpriteT, SpriteClassT, cLibT } from "./lib/types";
import { Dict, Opt, sin360, distance, cos360 } from "./lib/utils";
import config from "./config.json";
import { boneFnsGen } from "./bone";
import { fontFnsGen, Plane as FontPlaneT } from "./font";
import { BoxFnsGen } from "./box";
import { gbFnsGen } from "./gb";
import { Game } from "./game.json"
import { soulObjGen } from "./soul";

export const main = async () => {
    const Core = await init(config);
    let [scene, sub_scene] = [{ v: "menu" }, "command"];
    const Font = fontFnsGen(Core.cLib, Core.aLib, Core.inputKeys);
    {
        let cursor = 0;
        await Core.while(() => (scene.v === "menu"), () => {
            Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
            if (Core.inputKeys.f.up) { cursor--; Core.aLib.play("cursor_move") }
            if (Core.inputKeys.f.down) { cursor++; Core.aLib.play("cursor_move") }
            Core.cLib.stamp("soul", 220, -cursor * 50 + 240);
            Font.write("play", 270, 250, 0, 200, "yellow", 0, 0, "en");
            if (Core.inputKeys.f.z) { scene.v = "battle"; Core.aLib.play("cursor_confirm") }
        });
    }
    let timer = 0;
    const soul = new Core.Sprite(320, 240, 0, 80, "soul", 1, 1);
    const Box = BoxFnsGen(Core.cLib, soul, Game);
    const box = Box.box;
    const player = soulObjGen(soul, Game, Core, scene, Box.box, Core.b_tick);
    {
        if (Game.bgm != undefined) setInterval(() => Core.aLib.play(Game.bgm as string), Core.Audios[Game.bgm].data.duration * 1000);
        timer = 0;
        const Blaster = gbFnsGen(Core.cLib, Core.aLib, Core.Sprite, player, Game);
        const Bone = boneFnsGen(Core.cLib, Core.aLib, Core.Sprite, player, Game);
        const hp_bar = hp_bar_gen(Core.cLib, Font.write, player, Game);
        box.set(320, 160, 0, 562, 132);
        const enemy = {
            s: new Core.Sprite(Game.enemy.x, Game.enemy.y, 0, Game.enemy.size, Game.enemy.costume, 1),
            hp: Game.enemy.hp,
            hp_max: Game.enemy.hp,
        };
        while (scene.v == "battle") {
            if (sub_scene == "command") {
                let choice: number[] = [];
                const txt = new Font.Plane("_",Game.flavor[0], 80, 205, 0, 200, "white", 0, 0, 1, Game.lang, false, "text");
                type Plane = typeof txt;
                let command = 0;
                let result: undefined | Plane = undefined;
                await Core.while(() => sub_scene == "command" && (scene.v == "battle" && sub_scene == "command"), () => {
                    Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
                    box.draw();
                    enemy.s.stamp();
                    const command_draw = (x: number, y: number, n: number, s: boolean) => Core.cLib.stamp(`cmd_${Game.lang}`, x, y, 0, 100, 1, "center", 1, { left: s ? 113 : 0, top: 45 * n, width: 112, height: 44 });
                    [0, 1, 2, 3].forEach(i => command_draw(320 + (i - 1.5) * 155, 27, i, command == i && choice.length == 0));
                    hp_bar();
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
                            Font.write("*", 80, 205, 0, 200);
                            Font.write(`${Game.enemy.name}`, 110, 205, 0, 200);
                            [player.soul.x, player.soul.y] = [55, 195];
                        }
                        if (choice[0] == 0) {
                            Core.cLib.drawRect(380, 185, 120, 20, Game.color[Game.styles.enemy_hp_back as keyof typeof Game.color] ?? Game.styles.enemy_hp_back, 0, 1, "start")
                            Core.cLib.drawRect(380, 185, enemy.hp / enemy.hp_max * 120, 20, Game.color[Game.styles.enemy_hp as keyof typeof Game.color] ?? Game.styles.enemy_hp, 0, 1, "start")
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
                                    Font.write("*", 80 + i % 2 * 281, 205 - Math.floor((i % 4) / 2) * 40, 0, 200);
                                    Font.write(`${v[i].name}`, 110 + i % 2 * 281, 205 - Math.floor((i % 4) / 2) * 40, 0, 200);
                                }
                            })
                            else[4, 5, 6, 7].forEach(i => {
                                if (i < v.length) {
                                    Font.write("*", 80 + i % 2 * 281, 205 - Math.floor((i % 4) / 2) * 40, 0, 200);
                                    Font.write(`${v[i].name}`, 110 + i % 2 * 281, 205 - Math.floor((i % 4) / 2) * 40, 0, 200);
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
                            player.soul.alpha = 0;
                            choice[1]++;
                            const ratio = 1 - Math.min(20, Math.max(0, choice[1] - 96)) / 20;
                            if (choice[1] < 96 && Core.inputKeys.f.z) {
                                choice.push(0);
                                choice.push(Math.floor(
                                    Game.player.attack * (1 - Math.abs(choice[1] - 48) * 0.8 / 48) * (1 + (Math.random() - 0.5) / 10)
                                ));
                                enemy.hp -= choice[3];
                                Core.aLib.play("slash")
                            }
                            if (96 <= choice[1] && choice[1] < 156) {
                                const jump = Math.max(0, -(choice[1] - 96) * (choice[1] - 126) / 5);
                                Core.cLib.stamp("damage_miss", Game.enemy.x, Game.enemy.y + 20 + jump, 0, 400)
                            } else if (choice[1] == 156) {
                                sub_scene = "enemy_speak"
                            }
                            Core.cLib.stamp("attack_gauge", 320, 160, 0, 300, ratio, "center", ratio);
                            Core.cLib.stamp(`attack_bar_${Math.floor(choice[1] / 8 % 2)}`, 80 + choice[1] * 5, 160, 0, 300, ratio);
                        } else if (choice[0] == 1 && choice.length == 2) {
                            menu(Game.actions);
                            if (Core.inputKeys.f.z) {
                                choice.push(0);
                                const behavior = Game.actions[choice[1]].behavior;
                                if (behavior !== "default") behavior(Core, player);
                            };
                        } else if (choice[0] == 2) {
                            menu(Game.items)
                            if (Core.inputKeys.f.z) {
                                choice.push(0);
                                const behavior = Game.items[choice[1]].behavior;
                                if (behavior == "default") {
                                    player.hp = Math.min(player.hp_max, player.hp + Game.items[choice[1]].heal);
                                    Core.aLib.play("heal");
                                } else behavior(Core, player);
                            };
                        } else if (choice[0] == 3) {
                            if (Core.inputKeys.f.up || Core.inputKeys.f.down) { choice[1] = (choice[1] + 1) % 2; Core.aLib.play("cursor_move"); }
                            if (Core.inputKeys.f.z) sub_scene = "enemy_speak";
                            Font.write("*", 80, 205, 0, 200);
                            Font.write("Spare", 110, 205, 0, 200);
                            Font.write("*", 80, 165, 0, 200);
                            Font.write("Quit", 110, 165, 0, 200);
                            [player.soul.x, player.soul.y] = [55, 195 - choice[1] * 40];
                        }
                    } else if (choice.length == 3) {
                        if (choice[0] == 0) throw new Error();
                        else if (choice[0] == 1) {
                            player.soul.alpha = 0;
                            if (result === undefined) {
                                result = new Font.Plane("_", `${Game.actions[choice[1]].text}`, 80, 205, 0, 200, "white", 0, 0, 1, Game.lang, true, "text");
                            } else { result.process() }
                            if (!result.solved) {
                                result.write();
                                Font.write("*", 50, 205, 0, 200);
                            } else sub_scene = "enemy_speak"
                        } else if (choice[0] == 2) {
                            player.soul.alpha = 0;
                            if (result === undefined) {
                                result = new Font.Plane("_", `${Game.items[choice[1]].text}`, 80, 205, 0, 200, "white", 0, 0, 1, Game.lang, true, "text");
                            } else {
                                result.process();
                            }
                            if (!result.solved) {
                                result.write();
                                Font.write("*", 50, 205, 0, 200);
                            } else sub_scene = "enemy_speak"
                        } else if (choice[0] == 3) { }
                    } else if (choice.length == 4) {
                        if (choice[0] == 0) {
                            player.soul.alpha = 0;
                            if (choice[2] < 48) Core.cLib.stamp(`slash_${Math.floor(choice[2] / 8) % 6}`, 320, 300, 0, 200)
                            else if (choice[2] == 48 && 1 <= choice[3]) Core.aLib.play("e_damage")
                            if (48 <= choice[2] && choice[2] < 108) {
                                if (1 <= choice[3]) {
                                    Core.cLib.drawRect(Game.enemy.x - 60, Game.enemy.y - 20, 120, 20, Game.color[Game.styles.enemy_hp_back as keyof typeof Game.color] ?? Game.styles.enemy_hp_back, 0, 1, "start")
                                    Core.cLib.drawRect(Game.enemy.x - 60, Game.enemy.y - 20, Math.max(0, enemy.hp / enemy.hp_max * 120), 20, Game.color[Game.styles.enemy_hp as keyof typeof Game.color] ?? Game.styles.enemy_hp, 0, 1, "start")
                                    const jump = Math.max(0, -(choice[2] - 48) * (choice[2] - 78) / 5);
                                    const px = (`${choice[3]}`.length * 8) - ((`${choice[3]}`.match(/1/) ?? []).length * 3) - 1
                                    Font.write(`${choice[3]}`, Game.enemy.x - px * 2, Game.enemy.y + 20 + jump, 0, 400, "red", 0, 0, "damage");
                                    const ratio = ((107 - choice[2]) ** 6) / (60 ** 6);
                                    enemy.s.x = Game.enemy.x + (choice[2] % 2 * 2 - 1) * ratio * 20;
                                    if (enemy.hp <= 0 && choice[2] == 93) Core.aLib.play("dust")
                                } else {
                                    const jump = Math.max(0, -(choice[2] - 48) * (choice[2] - 78) / 5);
                                    Core.cLib.stamp("damage_miss", Game.enemy.x, Game.enemy.y + 20 + jump, 0, 400)
                                }
                            };
                            enemy.s.alpha = 0 < enemy.hp ? 1 : 1 - Math.min(1, Math.max(choice[2] - 93, 0) / 25);
                            if (choice[2] == 128) {
                                sub_scene = enemy.hp <= 0 ? "clear" : "enemy_speak";
                            };
                            const ratio = 1 - Math.min(20, Math.max(0, choice[2] - 108)) / 20;
                            Core.cLib.stamp("attack_gauge", 320, 160, 0, 300, ratio, "center", ratio);
                            Core.cLib.stamp(`attack_bar_${Math.floor((choice[1] + choice[2] + 1) / 4 % 2)}`, 80 + choice[1] * 5, 160, 0, 300, ratio);
                            choice[2]++;
                        }
                    }
                    player.stamp();

                })
            } else if (sub_scene == "enemy_speak") {
                player.soul.alpha = 1;
                let timer = 0;
                [player.soul.x, player.soul.y] = [box.center_x, box.center_y];
                const quote = new Font.Plane("_", Game.enemy_speak[0], 420, 360, 0, 100, "black", 0, 0, 1, Game.lang, true, "talk_default");
                await Core.while(() => sub_scene == "enemy_speak" && (scene.v == "battle" && sub_scene == "enemy_speak"), () => {
                    Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
                    player.move()
                    timer++;
                    const ratio = 1 - Math.max(1 - timer / 15, 0) ** 4;
                    box.set(320, 160, 30 * ratio + 0 * (1 - ratio), 132 * ratio + 562 * (1 - ratio), 132)
                    box.draw();
                    box.judge();
                    enemy.s.stamp();
                    Core.cLib.stamp("speech_bubble", 380, 380, 0, 150, 1, "start");
                    const command_draw = (x: number, y: number, n: number, s: boolean) => Core.cLib.stamp(`cmd_${Game.lang}`, x, y, 0, 100, 1, "center", 1, { left: s ? 113 : 0, top: 45 * n, width: 112, height: 44 });
                    [0, 1, 2, 3].forEach(i => command_draw(320 + (i - 1.5) * 155, 27, i, false));
                    player.stamp();
                    hp_bar();
                    quote.process();
                    if (!(quote.solved && ratio == 1)) {
                        quote.write();
                    } else {
                        sub_scene = "enemy_attack"
                    }
                })
                box.set(320, 160, 0, 562, 132)
            } else if (sub_scene == "enemy_attack") {
                box.set(320, 160, 0, 132, 132)
                let timer = 0;
                let test_b = new Bone.normal(320, 160, 0, 10, 80, 0, 0, 5, 0, 180, "blue");
                await Core.for(0, i => i < Game.enemy_attack[0] && (scene.v == "battle" && sub_scene == "enemy_attack"), (i) => {
                    timer++;
                    Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
                    player.move()
                    box.judge();
                    Bone.process();
                    box.draw();
                    enemy.s.stamp();
                    const command_draw = (x: number, y: number, n: number, s: boolean) => Core.cLib.stamp(`cmd_${Game.lang}`, x, y, 0, 100, 1, "center", 1, { left: s ? 113 : 0, top: 45 * n, width: 112, height: 44 });
                    [0, 1, 2, 3].forEach(i => command_draw(320 + (i - 1.5) * 155, 27, i, false));
                    player.stamp();
                    hp_bar();
                })
                Bone.boneDict = {};
                Blaster.gbDict = {};
                await Core.for(0, i => i < 15 && (scene.v == "battle" && sub_scene == "enemy_attack"), (i) => {
                    const ratio = 1 - Math.max(1 - (i + 1) / 15, 0) ** 4;
                    player.move()
                    box.set(320, 160, 0 * ratio + 30 * (1 - ratio), 562 * ratio + 132 * (1 - ratio), 132)
                    Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
                    box.draw();
                    box.judge();
                    enemy.s.stamp();
                    const command_draw = (x: number, y: number, n: number, s: boolean) => Core.cLib.stamp(`cmd_${Game.lang}`, x, y, 0, 100, 1, "center", 1, { left: s ? 113 : 0, top: 45 * n, width: 112, height: 44 });
                    [0, 1, 2, 3].forEach(i => command_draw(320 + (i - 1.5) * 155, 27, i, false));
                    player.stamp();
                    hp_bar();
                })
                sub_scene = "command";
            } else if (sub_scene == "clear") {
                const result = new Font.Plane("_", Game.clear_text, 80, 205, 0, 200, "white", 0, 0, 1, Game.lang, false, "text");
                await Core.loop(() => {
                    Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
                    box.draw();
                    const command_draw = (x: number, y: number, n: number, s: boolean) => Core.cLib.stamp(`cmd_${Game.lang}`, x, y, 0, 100, 1, "center", 1, { left: s ? 113 : 0, top: 45 * n, width: 112, height: 44 });
                    [0, 1, 2, 3].forEach(i => command_draw(320 + (i - 1.5) * 155, 27, i, false));
                    hp_bar();
                    Font.write("*", 50, 205, 0, 200);
                    result.process();
                    result.write();
                });
                throw new Error()
            } else throw new Error()
        };
    }
    {
        timer = 0;
        let broken_hearts: SpriteT[] = [];
        await Core.while(() => (scene.v === "game_over"), () => {
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
                scene.v = "waiting";
            }
            timer++;
        })
    }
};

const hp_bar_gen = (cLib: cLibT, write: (str: string, x: number, y: number, d: number, size: number, color?: string, spacing_x?: number, spacing_y?: number, font?: string) => void, player: { name: string, hp: number, hp_max: number, lv: number },
    Game: { color: { [keys: string]: string }, styles: { player_hp: string, player_kr: string, player_hp_back: string } }) => {
    const hp_color = Game.color[Game.styles.player_hp] ?? Game.styles.player_hp;
    const kr_color = Game.color[Game.styles.player_kr] ?? Game.styles.player_kr;
    const hp_back = Game.color[Game.styles.player_hp_back] ?? Game.styles.player_hp_back;
    return () => {
        write(player.name, 32, 75, 0, 300, "white", 0, 0, "status");
        write("lv", 134, 75, 0, 300, "white", 0, 0, "status");
        const hp_len = Math.max(2, `${player.hp_max}`.length);
        const lv_len = Math.max(2, `${player.lv}`.length);
        hp_len * 3 * 5;
        lv_len * 3 * 5;
        write(`${("0".repeat(lv_len) + player.lv).slice(-lv_len)}`, 173, 75, 0, 300, "white", 0, 0, "status");
        write(`${("0".repeat(hp_len) + player.hp).slice(-hp_len)}`, player.hp_max * 1.2 + 276 + lv_len * 3 * 5, 77, 0, 300, "white", 0, 0, "status");
        write("/", player.hp_max * 1.2 + 285 + hp_len * 3 * 5 + lv_len * 3 * 5, 77, 0, 300, "white", 0, 0, "status");
        write(`${("0".repeat(hp_len) + player.hp_max).slice(-hp_len)}`, player.hp_max * 1.2 + 309 + hp_len * 3 * 5 + lv_len * 3 * 5, 77, 0, 300, "white", 0, 0, "status");

        cLib.drawRect(226 + lv_len * 3 * 5, 59, player.hp_max * 1.2, 21, hp_back, 0, 1, "start");
        cLib.drawRect(226 + lv_len * 3 * 5, 59, player.hp * 1.2, 21, hp_color, 0, 1, "start");
        cLib.stamp("hp_kr_white", 194 + lv_len * 3 * 5, 74, 0, 100, 1, "start", 1, { left: 0, top: 0, width: 23, height: 10 });
        cLib.stamp("hp_kr_white", player.hp_max * 1.2 + 237 + lv_len * 3 * 5, 74, 0, 100, 1, "start", 1, { left: 0, top: 11, width: 23, height: 10 });
    };
}