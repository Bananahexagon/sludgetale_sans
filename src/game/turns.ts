import { GameT } from ".";
import { boneFnsT } from "../bone";
import { boxFnsT, boxT } from "../box";
import { fontFnsT } from "../font";
import { gbFnsT } from "../gb";
import { CoreT, SpriteT } from "../lib/types";
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
        Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
        player.move()
        box.judge();
    }

    const turns = () => [
        {
            flavor: "何かが始まる...",
            quote: "...",
            attack: () => { },
        }
    ]


    const start = (async () => {
        const speak = async (tx: string, speed: number) => {
            const quote = new Font.Plane("_", tx, 420, 360, 0, 100, "black", 0, 0, speed, Game.lang, true, "sans");
            await Core.while(() => !quote.solved, () => {
                b_tick();
                a_tick();
                Core.cLib.stamp("speech_bubble", 380, 380, 0, 150, 1, "start");
                quote.process();
                quote.write();
            })
        }
        {
            const b_y = box.move({ x: 320, y: 160, d: 0, w: 132, h: 132 }, 10, 4)
            await Core.for(0, i => i < 10, i => {
                b_tick();
                a_tick();
                b_y.yield(i);
                Core.cLib.stamp("speech_bubble", 380, 380, 0, 150, i / 10, "start");
            })
            b_y.finish();
        }
        await speak("！仮置きテキスト！", 2)
        await speak("！仮置きテキスト！", 2)
        await speak("！仮置きテキスト！", 2)
        await Core.for(0, i => i < 300 && scene.v != "game_over", i => {
            b_tick()
            if (i % 10 == 0) {
                const d = i * 3;
                const [s, c] = [sin360(d), cos360(d)]
                new Gb.gb(320 + 120 * s, 160 + 120 * c, d, 320 + 960 * s, 160 + 960 * c, d + 90, 200, 0.5, 15, 15, 15,5, "white");
            }
            a_tick()
        })
        Gb.gbDict = {};
        if (scene.v != "game_over") {
            await speak("へへ...", 2)
            await speak("さっさと始めようぜ", 2)
            {
                const b_y = box.move({ x: 320, y: 160, d: 0, w: 562, h: 132 }, 10, 4)
                await Core.for(0, i => i < 10, i => {
                    b_tick();
                    a_tick();
                    b_y.yield(i);
                })
                b_y.finish();
            }
        }
    }) as (() => Promise<void>) | "none";
    return ({
        0: start, 1: turns()
    })
}