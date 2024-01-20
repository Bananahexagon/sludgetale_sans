import { GameT } from ".";
import { boneFnsT } from "../bone";
import { boxFnsT, boxT } from "../box";
import { fontFnsT } from "../font";
import { gbFnsT } from "../gb";
import { CoreT } from "../lib/core";
import { SpriteT } from "../lib/sprite";
import { Ref, cos360, sin360 } from "../lib/utils";
import { playerT } from "../player";

export function turnsGen(arg: { Game: { lang: "ja" | "en" }, Core: CoreT, Gb: gbFnsT, Bone: boneFnsT, Box: boxFnsT, Font: fontFnsT, box: boxT, player: playerT, enemy: { s: SpriteT, stamp: (state: GameT["enemy"]["state"]) => void, state: GameT["enemy"]["state"] }, hp_bar: () => void, scene: Ref<string> }) {
    const { Game, Core, Gb, Bone, Box, Font, box, enemy, player, hp_bar, scene } = arg;
    const a_tick = () => {
        Bone.process();
        box.draw();
        hp_bar();
        enemy.stamp(enemy.state);
        player.stamp();
        const command_draw = (x: number, y: number, n: number, s: boolean) => Core.cLib.stamp(`cmd_${Game.lang}`, x, y, 0, 100, 1, "center", 1, { left: s ? 113 : 0, top: 45 * n, width: 112, height: 44 });
        [0, 1, 2, 3].forEach(i => command_draw(320 + (i - 1.5) * 155, 27, i, false));
        Gb.process();
    }
    const b_tick = () => {
        player.move()
        box.judge();
    }
    const bubble = (a: number) => Core.cLib.stamp("speech_bubble", 380, 380, 0, 150, a, "start");
    const speak = async (tx: string, speed: number, voice: boolean = true) => {
        const quote = new Font.Plane("_", tx, 420, 360, 0, 100, "black", 0, 0, speed, Game.lang, true, voice ? "sans" : undefined);
        await Core.while(() => !quote.solved, () => {
            b_tick();
            a_tick();
            bubble(1)
            Core.cLib.stamp("speech_bubble", 380, 380, 0, 150, 1, "start");
            quote.process();
            quote.write();
        })
    }

    const turns = () => [
        {
            flavor: "何かが始まる...",
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
        },
        {
            flavor: "！仮置きテキスト！",
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
                    await Core.for(0, i => i < 70, i => {
                        b_tick();
                        if (i % 35 == 0) {
                            new Bone.normal(270, 60, 0, 5, 40, 4, 0, 0, 0, 25);
                            new Bone.normal(370, 60, 0, 5, 40, -4, 0, 0, 0, 25);
                            new Bone.normal(270, 260, 180, 5, 120, 4, 0, 0, 0, 25);
                            new Bone.normal(370, 260, 180, 5, 120, -4, 0, 0, 0, 25);
                        }
                        a_tick();
                    })
                    player.slam(2)
                    await Core.for(0, i => i < 70, i => {
                        b_tick();
                        if (i % 35 == 0) {
                            new Bone.normal(270, 260, 180, 5, 40, 4, 0, 0, 0, 25);
                            new Bone.normal(370, 260, 180, 5, 40, -4, 0, 0, 0, 25);
                            new Bone.normal(270, 60, 0, 5, 120, 4, 0, 0, 0, 25);
                            new Bone.normal(370, 60, 0, 5, 120, -4, 0, 0, 0, 25);
                        }
                        a_tick();
                    })
                }
                {
                    const b_y = box.move({ x: 320, y: 160, d: 0, w: 562, h: 132 }, 10, 2)
                    await Core.for(0, i => i < 10, i => { b_tick(); a_tick(); b_y.yield(i); })
                    b_y.finish();
                }
                Gb.gbMap.clear();
                Bone.boneMap.clear();
            },
        }
    ]


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
        await Core.for(0, i => i < 10 && scene.v != "game_over", i => {
            b_tick();
            a_tick();
            Core.cLib.drawRect(320, 240, 640, 480, "#000")
        })
        enemy.state.head.c = 5;
        await speak("二度と息が吸えなく\nなってもいいよな。", 4, false);
        player.slam(0);
        new Bone.stab(320, 80, 0, 122, 70, 20, 25, 45, 20, "white");
        await Core.for(0, i => i < 40 && scene.v != "game_over", i => {
            b_tick();
            a_tick();
        })
        player.slam(3)
        new Bone.stab(400, 160, 270, 122, 65, 20, 25, 125, 20, "white");
        new Bone.stab(240, 160, 90, 122, 65, 20, 25, 125, 20, "white");
        await Core.for(0, i => i < 30 && scene.v != "game_over", i => {
            b_tick();
            a_tick();
        })
        player.type = 0;
        await Core.for(0, i => i < 120 && scene.v != "game_over", i => {
            b_tick()
            if (i % 5 == 0) {
                let d = i * 4;
                let [s, c] = [sin360(d), cos360(d)]
                new Bone.normal(220, 60, 0, 8, 65 + s * 25, 5, 0, 0, 0, 80);
                new Bone.normal(220, 260, 180, 8, 65 - s * 25, 5, 0, 0, 0, 80);
                new Bone.normal(420, 60, 0, 8, 65 + s * 25, -5, 0, 0, 0, 80);
                new Bone.normal(420, 260, 180, 8, 65 - s * 25, -5, 0, 0, 0, 80);
            }
            a_tick()
        })
        await Core.for(0, i => i < 30 && scene.v != "game_over", i => { b_tick(); a_tick() })
        new Gb.gb(320, 320, 0, 320, 960, 90, 300, 1, 30, 20, 30, 20, "white")
        new Gb.gb(480, 160, 90, 320, 1120, 180, 300, 1, 30, 20, 30, 20, "white")
        await Core.for(0, i => i < 50 && scene.v != "game_over", i => { b_tick(); a_tick() })
        new Gb.gb(320, 360, 0, 320, 1120, 0, 700, 1, 40, 20, 30, 20, Math.floor(Math.random() * 2) == 0 ? "blue" : "orange")
        new Gb.gb(160, 320, -45, 320, 960, 0, 300, 1, 40, 20, 30, 20, "white")
        new Gb.gb(480, 320, 45, 320, 960, 0, 300, 1, 40, 20, 30, 20, "white")
        await Core.for(0, i => i < 120 && scene.v != "game_over", i => { b_tick(); a_tick() })
        player.slam(0);
        new Bone.stab(320, 80, 0, 122, 70, 15, 25, 15, 20, "white");
        await Core.for(0, i => i < 80 && scene.v != "game_over", i => {
            b_tick();
            a_tick();
        })
        if (scene.v == "game_over") return;
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
    }) as (() => Promise<void>) | "none";
    return ({
        0: start, 1: turns()
    })
}