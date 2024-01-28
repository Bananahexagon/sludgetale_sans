import { GameT, enemyState } from ".";
import { boxT } from "../box";
import { fontColor, fontFnsT } from "../font";
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
    const { Game, Core, Font, hp_bar, enemy, box, scene } = arg;
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
    const flavorSuper = async (inputs: { str: string, speed: number, color?: fontColor, spacing_x?: number, spacing_y?: number, voice?: string }[]) => {
        const flavor = new Font.Super(80, 205, 0, 200, Game.lang, inputs, true)
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
            behavior: () => flavorPlane("バタースコッチシナモンパイを食べた。\nHPがまんたんになった！"),
        },
        {
            name: "高級バナナ",
            heal: 87,
            behavior: () => flavorPlane("高級バナナを食べた。\nHPが87回復した！"),
        },
        {
            name: "中級バナナ",
            heal: 55,
            behavior: () => flavorPlane("中級バナナを食べた。\nHPが55回復した！"),
        },
        {
            name: "低級バナナ",
            heal: 35,
            behavior: () => flavorPlane("低級バナナを食べた。\nHPが35回復した！"),
        },
        {
            name: "抹茶バウム",
            heal: 42,
            behavior: async () => {
                if (Math.floor(Math.random() * 4) == 0) {
                    await flavorPlane("抹茶バウムを食べた。\nHPが40回復した！");
                    await flavorSuper([
                        { str: "...\n", speed: 20, voice: "text" },
                        { str: "抹茶バウムは", speed: 1, voice: "text", color: "white" },
                        { str: "抹茶バウむ君", speed: 1, voice: "text", color: "yellow" },
                        { str: "だった！\n", speed: 1, voice: "text", color: "white" },
                        { str: "メガミュウツーY", speed: 1, voice: "text", color: "purple" },
                        { str: "が持ち物に加わった！", speed: 1, voice: "text", color: "white" },
                    ],);
                    items.push({
                        name: "メガミュウツーY",
                        heal: 35,
                        behavior: () => flavorPlane("メガミュウツーYを使った。\nHPが35回復した！"),
                    })
                } else {
                    await flavorPlane("抹茶バウムを食べた。\nHPが40回復した！");
                }
            }
        },
        {
            name: "からあげ",
            heal: 40,
            behavior: async () => flavorPlane("からあげを食べた。\nHPが40回復した！"),
        },
        {
            name: "からあげ",
            heal: 40,
            behavior: async () => flavorPlane("からあげを食べた。\nHPが40回復した！"),
        },
        {
            name: "からあげ",
            heal: 40,
            behavior: async () => flavorPlane("からあげを食べた。\nHPが40回復した！"),
        },
    ]
const actions = [
    {
        name: "しらべる", behavior: async () => flavorSuper([
            { str: "サンズ ATK 1 DEF 1\n", speed: 1, voice: "text" },
            { str: "最も楽な敵。", speed: 1, voice: "text", color: "yellow" },
        ],),
    },
]
return { items, actions }
}


type behavior = ((Core: CoreT, player: { hp: number, hp_max: number }, Font: fontFnsT) => Promise<void>);