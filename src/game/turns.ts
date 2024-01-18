import { GameT } from ".";
import { boneFnsT } from "../bone";
import { boxFnsT, boxT } from "../box";
import { fontFnsT } from "../font";
import { gbFnsT } from "../gb";
import { CoreT } from "../lib/core";
import { SpriteT } from "../lib/sprite";
import { Ref, cos360, sin360 } from "../lib/utils";
import { playerT } from "../soul";

export function turnsGen(arg: { Game: { lang: "ja" | "en" }, Core: CoreT, Gb: gbFnsT, Bone: boneFnsT, Box: boxFnsT, Font: fontFnsT, box: boxT, player: playerT, enemy: { s: SpriteT }, hp_bar: () => void, scene: Ref<string> }) {
    const { Game, Core, Gb, Bone, Box, Font, box, enemy, player, hp_bar, scene } = arg;
    const a_tick = () => {
        Bone.process();
        box.draw();
        hp_bar();
        enemy.s.stamp();
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
    const speak = async (tx: string, speed: number) => {
        const quote = new Font.Plane("_", tx, 420, 360, 0, 100, "black", 0, 0, speed, Game.lang, true, "sans");
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
                    const b_y = box.move({ x: 320, y: 160, d: 0, w: 232, h: 132 }, 10, 2)
                    await Core.for(0, i => i < 10, i => { b_tick(); a_tick(); b_y.yield(i); })
                    b_y.finish();
                }
                if (first) {
                    await speak("どうした？\nお前だっていつも避けてるだろ？", 2);
                } else {
                    await speak("...", 2);
                }
                //TODO
                {
                    const b_y = box.move({ x: 320, y: 160, d: 0, w: 562, h: 132 }, 10, 2)
                    await Core.for(0, i => i < 10, i => { b_tick(); a_tick(); b_y.yield(i); })
                    b_y.finish();
                }
            },
        }
    ]


    const start = (async () => {
        {
            const b_y = box.move({ x: 320, y: 160, d: 0, w: 132, h: 132 }, 10, 2)
            await Core.for(0, i => i < 10, i => { b_tick(); a_tick(); b_y.yield(i) })
            b_y.finish();
        }
        await speak("！仮置きテキスト！", 2)
        await speak("！仮置きテキスト！", 2)
        await speak("！仮置きテキスト！", 2)
        await Core.for(0, i => i < 300 && scene.v != "game_over", i => {
            b_tick()
            if (i % 5 == 0) {
                let d = i * 4;
                let [s, c] = [sin360(d), cos360(d)]
                new Gb.gb(320 + 120 * s, 160 + 120 * c, d, 320 + 960 * s, 160 + 960 * c, d + 180, 200, 0.5, 30, 10, 15, 5, "white", 1);
                d += 180;
                [s, c] = [sin360(d), cos360(d)]
                new Gb.gb(320 + 120 * s, 160 + 120 * c, d, 320 + 960 * s, 160 + 960 * c, d + 180, 200, 0.5, 30, 10, 15, 5, "white", 0);
            }
            a_tick()
        })
        await Core.for(0, i => i < 60 && scene.v != "game_over", i => { b_tick(); a_tick() })
        Gb.gbMap.clear();
        if (scene.v != "game_over") {
            await speak("へへ...", 2)
            await speak("さっさと始めようぜ", 2)
            {
                const b_y = box.move({ x: 320, y: 160, d: 0, w: 562, h: 132 }, 10, 2)
                await Core.for(0, i => i < 10, i => { b_tick(); a_tick(); b_y.yield(i); })
                b_y.finish();
            }
        }
    }) as (() => Promise<void>) | "none";
    return ({
        0: start, 1: turns()
    })
}