import { GameT, enemyState } from ".";
import { boxT } from "../box";
import { fontFnsT } from "../font";
import { CoreT } from "../lib/core";
import { SpriteT } from "../lib/sprite";
import { Ref } from "../lib/utils";

export const commandsGen = (arg: {
    Game: { readonly lang: "ja" | "en" },
    Core: CoreT,
    Font: fontFnsT,
    hp_bar: () => void,
    box: boxT,
    enemy: { s: SpriteT, stamp: (state: enemyState) => void, state: enemyState },
    scene: Ref<string>
}) => {
    const { Game, Core, Font, hp_bar,enemy,box, scene } = arg;
    const a_tick = () => {
        box.draw();
        hp_bar();
        enemy.stamp(enemy.state);
        const command_draw = (x: number, y: number, n: number, s: boolean) => Core.cLib.stamp(`cmd_${Game.lang}`, x, y, 0, 100, 1, "center", 1, { left: s ? 113 : 0, top: 45 * n, width: 112, height: 44 });
        [0, 1, 2, 3].forEach(i => command_draw(320 + (i - 1.5) * 155, 27, i, false));
    }
    const flavorPlane = async (str: string) => {
        const flavor = new Font.Plane(str, 80, 205, 0, 200, "white", 0, 0, 1, Game.lang, true, "text")
        await Core.while(() => !flavor.solved, () => {
            b_tick();
            Font.write("*", 50, 205, 0, 200);
            flavor.process();
            flavor.write();
            a_tick();
        })
    }
    const b_tick = () => { }
    const items = [
        {
            name: "パイ",
            heal: 99,
            behavior: async () => {
                await flavorPlane("バタースコッチシナモンパイを食べた。\nHPがまんたんになった！");
            }
        },
    ]
    const actions = [
        {
            name: "しらべる", behavior: async () => {
                await flavorPlane("サンズ！！！");
            }
        },
    ]
    return { items, actions }
}


type behavior = ((Core: CoreT, player: { hp: number, hp_max: number }, Font: fontFnsT) => Promise<void>);