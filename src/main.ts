import { CoreT, init } from "./lib/core";
import { Opt, sin360, distance, cos360, Ref, random } from "./lib/utils";
import { boneFnsGen } from "./bone";
import { FontI, Plane, PlaneT, fontColor, fontFnsGen, fontFnsT } from "./font";
import { boxFnsGen } from "./box";
import { gbFnsGen } from "./gb";
import { Game, enemyState } from "./game"
import { playerObjGen } from "./player";
import { config } from "./config.json";
import { SpriteT } from "./lib/sprite";
import { cLibT } from "./lib/canvas";

export const entry = async () => {
    const Core = await init(config);
    const Font = fontFnsGen(Core.Audios, Core.cLib, Core.aLib, Core.inputKeys);
    const is_hp_inf: Ref<boolean> = { v: false };
    while (true) {
        let [scene, sub_scene] = [{ v: "menu" }, { v: "command" }];
        await main(Core, scene, sub_scene, Font, is_hp_inf)
    }
}

const main = async (Core: CoreT, scene: Ref<string>, sub_scene: Ref<string>, Font: fontFnsT, is_hp_inf: Ref<boolean>): Promise<void> => {
    {
        let cursor = 0;
        await Core.while(() => (scene.v == "menu"), () => {
            if (Core.inputKeys.f.up) { cursor--; Core.aLib.play("cursor_move") }
            if (Core.inputKeys.f.down) { cursor++; Core.aLib.play("cursor_move") }
            cursor = Math.max(Math.min(cursor, 1), 0)
            Core.cLib.stamp("soul", 220, -cursor * 50 + 265);
            Font.write("play", 270, 275, 0, 200, cursor == 0 ? "yellow" : "white", 0, 0, "en");
            Font.write("HP INF", 270, 225, 0, 200, is_hp_inf.v ? "yellow" : "white", 0, 0, "en");
            if (Core.inputKeys.f.z) switch (cursor) {
                case 0: {
                    scene.v = "battle";
                    Core.aLib.play("cursor_confirm")
                } break;
                case 1: {
                    is_hp_inf.v = !is_hp_inf.v
                    Core.aLib.play("cursor_move")
                } break;
            }
        });
    }
    await Core.for(0, i => i < 75, i => {
        const j = Math.max(0, Math.min(45, i - 15));
        Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
        Core.cLib.stamp("soul", 220, 265);
        Font.write("play", 270, 275, 0, 200, "yellow", 0, 0, "en");
        Font.write("HP INF", 270, 225, 0, 200, is_hp_inf.v ? "yellow" : "white", 0, 0, "en");
        Core.cLib.drawRect(0, 0, 640, 480, "#000", 0, (j / 45), "start", true);
    })
    let timer = 0;
    const soul = new Core.Sprite(320, 240, 0, 80, "soul", 1, 1);
    const Box = boxFnsGen(Core.cLib, soul, Game);
    const box = Box.box;
    const enemy = (() => {
        const s = new Core.Sprite(Game.enemy.x, Game.enemy.y, 0, Game.enemy.size, typeof Game.enemy.costume == "string" ? Game.enemy.costume : undefined, 1);
        return {
            s,
            hp: Game.enemy.hp,
            hp_max: Game.enemy.hp,
            avoid: Game.enemy.avoid,
            stamp: (typeof Game.enemy.costume == "string") ? (state: typeof Game.enemy.state) => s.stamp() : Game.enemy.costume(s, Core),
            state: JSON.parse(JSON.stringify(Game.enemy.state)) as enemyState,
            custom: Game.enemy.custom ?? {}
        }
    })();
    const game_state = JSON.parse(JSON.stringify(Game.state)) as typeof Game.state;
    const player = playerObjGen(soul, Game, Core, scene, enemy, Box.box, Core.b_tick, is_hp_inf, game_state);
    const turn_progress: Ref<"fight" | "normal" | "random" | "stop"> = { v: Game.turn_progress }
    Core.a_tick.push(() => {
        game_state.c_gap = Math.floor(game_state.c_gap * 0.9 * 100) / 100;
        const d = Math.random() * 360;
        Core.props.canvas.x = Math.round(cos360(d) * game_state.c_gap);
        Core.props.canvas.y = Math.round(sin360(d) * game_state.c_gap);
    });
    {
        timer = 0;
        const Blaster = gbFnsGen(Core.cLib, Core.aLib, game_state, Core.Sprite, player, Game);
        const Bone = boneFnsGen(Core.cLib, Core.aLib, Core.Sprite, player, Game);
        const hp_bar = hp_bar_gen(Core.cLib, Font.write, player, Font.len, Game, is_hp_inf, Game.player.karma);
        const cmdBehaviors = Game.commands({ Game, Core, Font, hp_bar, scene, enemy, box })
        const { 0: start_turn, 1: Turns } = Game.turnsGen({ Game, Core, Gb: Blaster, Bone, Box, Font, box, player, enemy, hp_bar, scene })
        let turn = { v: 0, first: true };
        box.set({ x: 320, y: 160, d: 0, w: 562, h: 132 });
        await Core.for(0, i => i < 30, i => {
            const j = Math.min(24, i);
            if (j % 10 == 0) Core.aLib.play("tick")
            if (j % 10 < 5) Core.cLib.stamp("soul", 320, 240, 0, 80)
        });
        Core.aLib.play("battle_start")
        if (start_turn == "none") {
            await Core.for(0, i => i < 30, i => {
                const ratio = (1 - i / 30) ** 3;
                Core.cLib.stamp("soul", 320 * ratio + (1 - ratio) * 49.5, 240 * ratio + (1 - ratio) * 27, 0, 80, (1 - i / 30));
            });
            await Core.for(0, i => i < 10, i => {
                box.draw();
                enemy.stamp(enemy.state);
                const command_draw = (x: number, y: number, n: number, s: boolean) => Core.cLib.stamp(`cmd_${Game.lang}`, x, y, 0, 100, 1, "center", 1, { left: s ? 113 : 0, top: 45 * n, width: 112, height: 44 });
                [0, 1, 2, 3].forEach(i => command_draw(320 + (i - 1.5) * 155, 27, i, i == 0));
                hp_bar();
                [player.soul.x, player.soul.y] = [49.5, 27]
                player.stamp();
                Core.cLib.drawRect(0, 0, 640, 480, "#000", 0, (1- i / 10), "start", true);
            });
        } else {
            await Core.for(0, i => i < 30, i => {
                const ratio = (1 - i / 30) ** 3;
                Core.cLib.stamp("soul", 320, 240 * ratio + (1 - ratio) * 160, 0, 80, (1 - i / 30));
            });
            await Core.for(0, i => i < 10, i => {
                box.draw();
                enemy.stamp(enemy.state);
                const command_draw = (x: number, y: number, n: number, s: boolean) => Core.cLib.stamp(`cmd_${Game.lang}`, x, y, 0, 100, 1, "center", 1, { left: s ? 113 : 0, top: 45 * n, width: 112, height: 44 });
                [0, 1, 2, 3].forEach(i => command_draw(320 + (i - 1.5) * 155, 27, i, false));
                hp_bar();
                [player.soul.x, player.soul.y] = [320, 160]
                player.stamp();
                Core.cLib.drawRect(0, 0, 640, 480, "#000", 0, (1- i / 10), "start", true);
            });

            await start_turn();
            Bone.boneMap.clear();
            Blaster.gbMap.clear();
        }
        if (Game.bgm !== undefined) Core.aLib.play_html(Game.bgm as string, 0, true);
        while (scene.v == "battle") {
            if (sub_scene.v == "command") {
                let choice: number[] = [];
                const txt: FontI = Turns[turn.v]?.flavor();
                let command = 0;
                let result: undefined | Plane = undefined;
                await Core.while(() => sub_scene.v == "command" && scene.v == "battle", async () => {
                    box.draw();
                    enemy.stamp(enemy.state);
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
                                    enemy.avoid ? 0 : Game.player.attack * (1 - Math.abs(choice[1] - 48) * 0.8 / 48) * (1 + (Math.random() - 0.5) / 10)
                                ));
                                enemy.hp -= choice[3];
                                Core.aLib.play("slash");
                                if (turn_progress.v == "fight") { turn.v += 1; turn.first = true };
                            }
                            if (96 <= choice[1] && choice[1] < 156) {
                                const jump = Math.max(0, -(choice[1] - 96) * (choice[1] - 126) / 5);
                                Core.cLib.stamp("damage_miss", Game.enemy.x, Game.enemy.y + 20 + jump, 0, 400)
                            } else if (choice[1] == 156) {
                                sub_scene.v = "enemy"
                            }
                            Core.cLib.stamp("attack_gauge", 320, 160, 0, 300, ratio, "center", ratio);
                            Core.cLib.stamp(`attack_bar_${Math.floor(choice[1] / 8 % 2)}`, 80 + choice[1] * 5, 160, 0, 300, ratio);
                        } else if (choice[0] == 1 && choice.length == 2) {
                            menu(cmdBehaviors.actions);
                            if (Core.inputKeys.f.z) {
                                choice.push(0);
                            };
                        } else if (choice[0] == 2) {
                            menu(cmdBehaviors.items)
                            if (Core.inputKeys.f.z) {
                                choice.push(0);
                                if (cmdBehaviors.items[choice[1]].heal != 0) {
                                    if (!is_hp_inf.v || 0 < cmdBehaviors.items[choice[1]].heal) player.hp = Math.min(player.hp_max, player.hp + cmdBehaviors.items[choice[1]].heal);
                                    if (0 < cmdBehaviors.items[choice[1]].heal) Core.aLib.play("heal");
                                    else Core.aLib.play("damage");
                                    if (player.hp <= 0) scene.v = "game_over"
                                };
                            };
                        } else if (choice[0] == 3) {
                            if (Core.inputKeys.f.up || Core.inputKeys.f.down) { choice[1] = (choice[1] + 1) % 2; Core.aLib.play("cursor_move"); }
                            if (Core.inputKeys.f.z) sub_scene.v = "enemy";
                            Font.write("*", 80, 205, 0, 200);
                            Font.write(Game.lang == "ja" ? "みのがす" : "Spare", 110, 205, 0, 200);
                            Font.write("*", 80, 165, 0, 200);
                            Font.write(Game.lang == "ja" ? "にげる" : "Quit", 110, 165, 0, 200);
                            [player.soul.x, player.soul.y] = [55, 195 - choice[1] * 40];
                        }
                    } else if (choice.length == 3) {
                        if (choice[0] == 0) throw new Error();
                        else if (choice[0] == 1) {
                            const behavior = cmdBehaviors.actions[choice[1]].behavior;
                            await behavior();
                            sub_scene.v = "enemy"
                        } else if (choice[0] == 2) {
                            const behavior = cmdBehaviors.items[choice[1]].behavior;
                            await behavior();
                            cmdBehaviors.items.splice(choice[1], 1)
                            sub_scene.v = "enemy"
                        } else if (choice[0] == 3) { }
                    } else if (choice.length == 4) {
                        if (choice[0] == 0) {
                            player.soul.alpha = 0;
                            if (choice[2] < 48) Core.cLib.stamp(`slash_${Math.floor(choice[2] / 8) % 6}`, 320, 300, 0, 200);
                            else if (choice[2] == 48 && 1 <= choice[3]) Core.aLib.play("e_damage");
                            if (!enemy.avoid) {
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
                            } else {
                                const ratio =
                                    choice[2] < 32 ? 1 - ((32 - choice[2]) / 32) ** 3
                                        : choice[2] < 76 ? 1
                                            : choice[2] < 108 ? ((108 - choice[2]) / 32) ** 3 : 0
                                enemy.s.x = Game.enemy.x - ratio * 100;
                                if (48 <= choice[2] && choice[2] < 108) {
                                    const jump = Math.max(0, -(choice[2] - 48) * (choice[2] - 78) / 5);
                                    Core.cLib.stamp("damage_miss", Game.enemy.x, Game.enemy.y + 20 + jump, 0, 400)
                                };
                            }
                            enemy.s.alpha = 0 < enemy.hp ? 1 : 1 - Math.min(1, Math.max(choice[2] - 93, 0) / 25);
                            if (choice[2] == 128) {
                                sub_scene.v = enemy.hp <= 0 ? "clear" : "enemy";
                            };
                            const ratio = 1 - Math.min(20, Math.max(0, choice[2] - 108)) / 20;
                            Core.cLib.stamp("attack_gauge", 320, 160, 0, 300, ratio, "center", ratio);
                            Core.cLib.stamp(`attack_bar_${Math.floor((choice[1] + choice[2] + 1) / 4 % 2)}`, 80 + choice[1] * 5, 160, 0, 300, ratio);
                            choice[2]++;
                        }
                    }
                    player.stamp();
                });
                if (turn_progress.v == "normal") turn.v += 1;
            } else if (sub_scene.v == "enemy") {
                player.soul.alpha = 1;
                [player.soul.x, player.soul.y] = [box.center_x, box.center_y];
                await Turns[turn.v]?.proc(turn.first)
                sub_scene.v = "command";
                turn.first = false;
            } else if (sub_scene.v == "clear") {
                const result = new Font.Plane(Game.clear_text, 80, 205, 0, 200, "white", 0, 0, 1, Game.lang, false, "text");
                await Core.loop(() => {
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
        Core.aLib.pause_html(Game.bgm as string);
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

const hp_bar_gen = (cLib: cLibT, write: (str: string, x: number, y: number, d: number, size: number, color?: fontColor, spacing_x?: number, spacing_y?: number, font?: string) => void, player: { name: string, hp: number, kr: number, hp_max: number, lv: number },
    len: (s: string, f: string) => number, Game: { color: { [keys: string]: string }, styles: { player_hp: string, player_kr: string, player_hp_back: string } }, is_hp_inf: Ref<boolean>, karma: boolean) => {
    const name_len = len(player.name, "status");
    const hp_color = Game.color[Game.styles.player_hp] ?? Game.styles.player_hp;
    const kr_color = Game.color[Game.styles.player_kr] ?? Game.styles.player_kr;
    const hp_back = Game.color[Game.styles.player_hp_back] ?? Game.styles.player_hp_back;
    return () => {
        write(player.name, 32, 75, 0, 300, "white", 0, 0, "status");
        write("lv", 62 + name_len * 3, 75, 0, 300, "white", 0, 0, "status");
        const hp_len = Math.max(2, `${player.hp_max}`.length);
        const lv_len = Math.max(2, `${player.lv}`.length);
        hp_len * 3 * 5;
        lv_len * 3 * 5;
        write(`${("0".repeat(lv_len) + player.lv).slice(-lv_len)}`, 101 + name_len * 3
            , 75, 0, 300, "white", 0, 0, "status");

        if (is_hp_inf.v) {
            write("inf",
                player.hp_max * 1.2 + 204 + lv_len * 3 * 5 + name_len * 3
                , 77, 0, 300, "white", 0, 0, "status");
        } else {
            write(`${("0".repeat(hp_len) + player.hp).slice(-hp_len)}`,
                player.hp_max * 1.2 + 204 + lv_len * 3 * 5 + name_len * 3, 77, 0, 300,
                (0 < player.kr) ? "purple" : "white", 0, 0, "status");
            write("/", player.hp_max * 1.2 + 213 + hp_len * 3 * 5 + lv_len * 3 * 5 + name_len * 3, 77, 0, 300,
                (0 < player.kr) ? "purple" : "white", 0, 0, "status");
            write(`${("0".repeat(hp_len) + player.hp_max).slice(-hp_len)}`, player.hp_max * 1.2 + 237 + hp_len * 3 * 5 + lv_len * 3 * 5 + name_len * 3, 77, 0, 300,
                (0 < player.kr) ? "purple" : "white", 0, 0, "status");
        }
        cLib.drawRect(154 + lv_len * 3 * 5 + name_len * 3, 59, player.hp_max * 1.2, 21, hp_back, 0, 1, "start");
        cLib.drawRect(154 + lv_len * 3 * 5 + name_len * 3, 59, player.hp * 1.2, 21, kr_color, 0, 1, "start");
        cLib.drawRect(154 + lv_len * 3 * 5 + name_len * 3, 59, (player.hp - player.kr) * 1.2, 21, hp_color, 0, 1, "start");
        cLib.stamp("hp_kr_white", 122 + lv_len * 3 * 5 + name_len * 3, 74, 0, 100, 1, "start", 1, { left: 0, top: 0, width: 23, height: 10 });
        cLib.stamp((0 < player.kr) ? "hp_kr_purple" : "hp_kr_white", player.hp_max * 1.2 + 165 + lv_len * 3 * 5 + name_len * 3, 74, 0, 100, karma ? 1 : 0.5, "start", 1, { left: 0, top: 11, width: 23, height: 10 });

    };
}