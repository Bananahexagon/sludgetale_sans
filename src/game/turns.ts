import { GameT } from ".";
import { boneFnsT } from "../bone";
import { boxFnsT, boxT } from "../box";
import { FontI, fontFnsT } from "../font";
import { gbFnsT } from "../gb";
import { CoreT } from "../lib/core";
import { SpriteT } from "../lib/sprite";
import { Ref, cos360, random, sin360 } from "../lib/utils";
import { liftFnsT } from "../lift";
import { playerT } from "../player";

export function turnsGen(arg: { Game: { lang: "ja" | "en" }, Core: CoreT, Gb: gbFnsT, Bone: boneFnsT, Box: boxFnsT, Font: fontFnsT, box: boxT, player: playerT, enemy: { s: SpriteT, stamp: (state: GameT["enemy"]["state"]) => void, state: GameT["enemy"]["state"] }, hp_bar: () => void, scene: Ref<string>, Lift: liftFnsT }) {
    const { Game, Core, Gb, Bone, Box, Font, box, enemy, player, hp_bar, scene, Lift } = arg;
    const a_tick = () => {
        Gb.process_b();
        Bone.process();
        box.draw();
        hp_bar();
        enemy.stamp(enemy.state);
        const command_draw = (x: number, y: number, n: number, s: boolean) => Core.cLib.stamp(`cmd_${Game.lang}`, x, y, 0, 100, 1, "center", 1, { left: s ? 113 : 0, top: 45 * n, width: 112, height: 44 });
        [0, 1, 2, 3].forEach(i => command_draw(320 + (i - 1.5) * 155, 27, i, false));
        Gb.process_a();
        player.stamp();
    }
    const b_tick = () => {
        player.move();
        box.judge();
        Lift.process();
    }
    const bubble = (a: number) => Core.cLib.stamp("speech_bubble", 380, 380, 0, 150, a, "start");
    const speak = async (tx: string, speed: number, voice: boolean = true) => {
        const quote = new Font.Plane(tx, 420, 360, 0, 100, "black", 0, 0, speed, Game.lang, true, voice ? "sans" : undefined);
        await Core.while(() => !quote.solved, () => {
            b_tick();
            a_tick();
            bubble(1)
            Core.cLib.stamp("speech_bubble", 380, 380, 0, 150, 1, "start");
            quote.process();
            quote.write();
        })
    }
    const wait = (f: number) => Core.for(0, i => i < f && scene.v != "game_over", i => { b_tick(); a_tick() });

    const turns = () => [
        {
            flavor: () => new Font.Super(80, 205, 0, 200, Game.lang, [
                { str: "あなたは", color: "white", speed: 1, voice: "text" },
                { str: "最悪な時間", color: "red", speed: 1, voice: "text" },
                { str: "を\n過ごすことになる予感がする...", color: "white", speed: 1, voice: "text" }
            ], false),
            proc: async (first: boolean) => {
                {
                    const b_y = box.move({ x: 320, y: 160, d: 0, w: 132, h: 132 }, 10, 2)
                    await Core.for(0, i => i < 10, i => { b_tick(); a_tick(); b_y.yield(i); })
                    b_y.finish();
                }
                if (first) {
                    await speak("...", 2);
                } else {
                    await speak("...", 2);
                }
                {
                    const b_y = box.move({ x: 320, y: 160, d: 0, w: 562, h: 132 }, 10, 2)
                    await Core.for(0, i => i < 10, i => { b_tick(); a_tick(); b_y.yield(i); })
                    b_y.finish();
                }
            },
        }, {
            flavor: () => new Font.Plane("攻撃を続けろ。", 80, 205, 0, 200, "white", 0, 0, 1, Game.lang, false, "text"),
            proc: async (first: boolean) => {
                {
                    const b_y = box.move({ x: 320, y: 160, d: 0, w: 82, h: 132 }, 10, 2)
                    await Core.for(0, i => i < 10, i => { b_tick(); a_tick(); b_y.yield(i); })
                    b_y.finish();
                }
                if (first) {
                    await speak("どうした？\nお前だっていつも\n避けてるだろ？", 2);
                } else {
                    await speak("...", 2);
                }
                for (let i = 0; i < 4; i++) {
                    player.slam(0)
                    await Core.for(0, i => i < 70 && scene.v != "game_over", i => {
                        b_tick();
                        if (i % 35 == 0) {
                            new Bone.normal(270, 60, 0, 7, 40, 4, 0, 0, 0, 25);
                            new Bone.normal(370, 60, 0, 7, 40, -4, 0, 0, 0, 25);
                            new Bone.normal(270, 260, 180, 7, 108, 4, 0, 0, 0, 25);
                            new Bone.normal(370, 260, 180, 7, 108, -4, 0, 0, 0, 25);
                        }
                        a_tick();
                    })
                    if (scene.v == "game_over") return;
                    player.slam(2)
                    await Core.for(0, i => i < 70 && scene.v != "game_over", i => {
                        b_tick();
                        if (i % 35 == 0) {
                            new Bone.normal(270, 260, 180, 7, 40, 4, 0, 0, 0, 25);
                            new Bone.normal(370, 260, 180, 7, 40, -4, 0, 0, 0, 25);
                            new Bone.normal(270, 60, 0, 7, 108, 4, 0, 0, 0, 25);
                            new Bone.normal(370, 60, 0, 7, 108, -4, 0, 0, 0, 25);
                        }
                        a_tick();
                    })
                    if (scene.v == "game_over") return;
                }
                player.slam(-1)
                {
                    const b_y = box.move({ x: 320, y: 160, d: 0, w: 562, h: 132 }, 10, 2)
                    await Core.for(0, i => i < 10, i => { b_tick(); a_tick(); b_y.yield(i); })
                    b_y.finish();
                }
                Gb.gbMap.clear();
                Bone.boneMap.clear();
            },
        }, {
            flavor: () => new Font.Plane("攻撃を続けろ。", 80, 205, 0, 200, "white", 0, 0, 1, Game.lang, false, "text"),
            proc: async (first: boolean) => {
                player.type = 0;
                {
                    const b_y = box.move({ x: 320, y: 160, d: 0, w: 132, h: 132 }, 10, 2)
                    await Core.for(0, i => i < 10, i => { b_tick(); a_tick(); b_y.yield(i); })
                    b_y.finish();
                }
                if (first) {
                    await speak("！仮置きテキスト！", 2); //TODO
                } else {
                    await speak("...", 2);
                }

                await Core.for(0, i => i < 550 && scene.v != "game_over", i => {
                    b_tick()
                    if (i % 5 == 0) {
                        new Bone.normal(420, 60, 0, 7, (i + 100) / 12, -5, 0, 0, 1 / 15, 40);
                        new Bone.normal(220, 60, 90, 7, (i + 100) / 12, 0, 5, 0, 1 / 15, 40);
                        new Bone.normal(220, 260, 180, 7, (i + 100) / 12, 5, 0, 0, 1 / 15, 40);
                        new Bone.normal(420, 260, 270, 7, (i + 100) / 12, 0, -5, 0, 1 / 15, 40);
                    }
                    if (i % 50 == 0) {
                        const x = random(80, 560);
                        const y = random(80, 400);
                        const d = Math.atan((x - player.soul.x) / (y - player.soul.y)) / Math.PI * 180 + (y > player.soul.y ? 0 : 180);
                        const [fx, fy] = [x + sin360(d) * 960, y + cos360(d) * 960];
                        new Gb.gb(x, y, d, fx, fy, d + 90, 200, 0.5, 20, 15, 15, 10, "white", 0.5);
                    }
                    a_tick()
                }); if (scene.v == "game_over") return;
                await Core.for(0, i => i < 30 && scene.v != "game_over", i => {
                    b_tick()
                    if (i % 5 == 0) {
                        new Bone.normal(420, 60, 0, 7, (i + 650) / 12, -5, 0, 0, 1 / 15, 40);
                        new Bone.normal(220, 60, 90, 7, (i + 650) / 12, 0, 5, 0, 1 / 15, 40);
                        new Bone.normal(420, 260, 270, 7, (i + 650) / 12, 0, -5, 0, 1 / 15, 40);
                    }
                    a_tick()
                }); if (scene.v == "game_over") return;
                player.slam(2);
                new Bone.stab(320, 240, 180, 122, 70, 20, 25, 15, 20, "white");
                await wait(30); if (scene.v == "game_over") return;
                player.slam(-1);
                await wait(30); if (scene.v == "game_over") return;
                player.type = 0;
                {
                    const b_y = box.move({ x: 320, y: 160, d: 0, w: 562, h: 132 }, 10, 2)
                    await Core.for(0, i => i < 10, i => { b_tick(); a_tick(); b_y.yield(i); })
                    b_y.finish();
                }
            },
        }, {
            flavor: () => new Font.Plane("攻撃を続けろ。", 80, 205, 0, 200, "white", 0, 0, 1, Game.lang, false, "text"),
            proc: async (first: boolean) => {
                player.type = 0;
                {
                    const b_y = box.move({ x: 320, y: 160, d: 0, w: 132, h: 132 }, 10, 2)
                    await Core.for(0, i => i < 10, i => { b_tick(); a_tick(); b_y.yield(i); })
                    b_y.finish();
                }
                if (first) {
                    await speak("！仮置きテキスト！", 2); //TODO
                } else {
                    await speak("...", 2);
                }
                await Core.for(0, i => i < 500 && scene.v != "game_over", i => {
                    b_tick()
                    a_tick()
                }); if (scene.v == "game_over") return;
                await wait(90); if (scene.v == "game_over") return;
                player.type = 0;
                {
                    const b_y = box.move({ x: 320, y: 160, d: 0, w: 562, h: 132 }, 10, 2)
                    await Core.for(0, i => i < 10, i => { b_tick(); a_tick(); b_y.yield(i); })
                    b_y.finish();
                }
            },
        },
    ] as { flavor: () => FontI, proc: (first: boolean) => Promise<void> }[]


    const start = (async () => {
        {
            const b_y = box.move({ x: 320, y: 160, d: 0, w: 132, h: 132 }, 10, 2)
            await Core.for(0, i => i < 10, i => { b_tick(); a_tick(); b_y.yield(i) })
            b_y.finish();
        }
        await speak("今日は素敵な日だ。", 2)
        await speak("花はいつものように咲き、\n川のせせらぎが\n聞こえてくる。", 2)
        await speak("こんな日には、\nお前のような奴は...", 2)
        Core.aLib.play("tick");
        await Core.for(0, i => i < 20 && scene.v != "game_over", i => {
            b_tick();
            a_tick();
            Core.cLib.drawRect(0, 0, 640, 480, "#000", 0, 1, "start", true);
        })
        Core.aLib.play("tick");
        enemy.state.head.c = 5;
        await speak("二度と息が吸えなく\nなってもいいよな。", 4, false);
        //ここから攻撃
        player.slam(0);
        new Bone.stab(320, 80, 0, 122, 70, 20, 25, 45, 20, "white");
        await wait(40); if (scene.v == "game_over") return;
        player.slam(3)
        new Bone.stab(400, 160, 270, 122, 65, 20, 25, 125, 20, "white");
        new Bone.stab(240, 160, 90, 122, 65, 20, 25, 125, 20, "white");
        await wait(30); if (scene.v == "game_over") return;
        player.slam(-1)
        player.type = 0;
        await Core.for(0, i => i < 120 && scene.v != "game_over", i => {
            b_tick()
            if (i % 5 == 0) {
                let d = i * 4;
                let [s, c] = [sin360(d), cos360(d)]
                new Bone.normal(220, 60, 0, 7, 65 + s * 25, 5, 0, 0, 0, 80);
                new Bone.normal(220, 260, 180, 7, 65 - s * 25, 5, 0, 0, 0, 80);
                new Bone.normal(420, 60, 0, 7, 65 + s * 25, -5, 0, 0, 0, 80);
                new Bone.normal(420, 260, 180, 7, 65 - s * 25, -5, 0, 0, 0, 80);
            }
            a_tick()
        }); if (scene.v == "game_over") return;
        await wait(30); if (scene.v == "game_over") return;
        new Gb.gb(320, 320, 0, 320, 960, 90, 300, 1, 30, 20, 30, 20, "white")
        new Gb.gb(480, 160, 90, 320, 1120, 180, 300, 1, 30, 20, 30, 20, "white")
        await wait(50); if (scene.v == "game_over") return;
        new Gb.gb(320, 360, 0, 320, 1120, 0, 700, 1, 40, 20, 30, 20, Math.floor(Math.random() * 2) == 0 ? "blue" : "orange");
        new Gb.gb(480, 320, 45, 320, 960, 0, 250, 1, 40, 20, 30, 20, "white")
        new Gb.gb(160, 320, -45, 320, 960, 0, 250, 1, 40, 20, 30, 20, "white")
        await wait(120); if (scene.v == "game_over") return;
        player.slam(0);
        new Bone.stab(320, 80, 0, 122, 70, 15, 25, 15, 20, "white");
        await wait(65); if (scene.v == "game_over") return;
        player.slam(-1)
        await wait(15); if (scene.v == "game_over") return;
        enemy.state.head.c = 4;
        await speak("へへ...", 2);
        enemy.state.head.c = 13;
        enemy.state.body.c = 2;
        await speak("さっさと始めようぜ", 2);
        enemy.state.head.c = 0;
        enemy.state.body.c = 0;
        Gb.gbMap.clear();
        Bone.boneMap.clear();
        {
            const b_y = box.move({ x: 320, y: 160, d: 0, w: 562, h: 132 }, 10, 2)
            await Core.for(0, i => i < 10, i => { b_tick(); a_tick(); b_y.yield(i); })
            b_y.finish();
        }
        enemy.state.moving = 1;
    }) as (() => Promise<void>) | "none";
    const debug = (async () => {
        player.slam(0);
        new Lift.Lift(320, 160, 0, 60, 0, 0, 5, 0, Infinity);
        new Lift.Lift(420, 160, 0, 60, 0, 0, 0, (n: number) => sin360(n * 3) * 10, Infinity);
        new Lift.Lift(220, 160, 0, 60, 0, (n: number) => sin360(n * 3) * 10, 0, 0, Infinity);
        await Core.loop(() => {
            b_tick(); a_tick();
        })
    }) as (() => Promise<void>) | "none";
    return ({
        0: debug, 1: turns()
    })
}
