import { cLibT } from "../lib/canvas";
import { CoreT } from "../lib/core";
import { SpriteT } from "../lib/sprite";
import { cos360, sin360 } from "../lib/utils";
import { turnsGen } from "./turns";

const Game = {
    lang: "ja" as "ja" | "en",
    bgm: "megalopollution" as string | undefined,
    turn_progress: "fight" as "fight" | "normal" | "random" | "stop",
    player: {
        name: "banahex",
        attack: 2500,
        lv: 19,
        hp_max: 92,
        damage: 1,
        damage_time: 1,
        karma: true,
    },
    enemy: (() => {
        const state = {
            body: { c: 0, x: 0, y: 0 },
            head: { c: 4, x: 0, y: 0 },
            moving: false,
        }
        return {
            x: 320,
            y: 320,
            name: "サンズ",
            hp: 10000,
            costume: (s: SpriteT, Core: CoreT) => (st: typeof state) => {
                const y = s.y - 42;
                Core.cLib.stamp("sans_leg", s.x, y, 0, 200, 1);
                Core.cLib.stamp(`sans_body_${st.body.c}`,
                    s.x + st.body.x + ({ 0: 0, 1: 9, 2: 0, 3: 2, 4: 8, 5: 3, 6: 22, 7: 21 }[st.body.c] ?? 0),
                    y + st.body.y + 38 + ({ 0: 0, 1: 0, 2: 0, 3: 21, 4: 16, 5: -5, 6: 0, 7: 0 }[st.body.c] ?? 0),
                    0, 200, 1
                );
                Core.cLib.stamp(`sans_head_${st.head.c}`, s.x + st.head.x, y + st.head.y + 82, 0, 200, 1);
            },
            state,
            size: 200,
            avoid: true,
            custom: {
                slam: (d: -1 | 0 | 1 | 2 | 3, b: -1 | 0 | 1 | 2 | 3, f: number, st: typeof state) => {
                    let is_slamming = 0 as -1 | 0 | 9 | 13;
                    if (!(d == -1 && b == -1)) {
                        is_slamming = -1;
                        if (d != -1) {
                            const dc = [[4, 5], [7, 0], [4, 3], [7, 6]];
                            const dx = [
                                [0, 0, 0, 0],
                                [2, -2, 0, 0],
                                [0, 0, 0, 0],
                                [-2, 2, 4, 2]
                            ];
                            const dy = [
                                [2, -2, -4, -2],
                                [0, 0, 0, 0],
                                [-2, 2, 4, 2],
                                [0, 0, 0, 0]
                            ];
                            let i_c = f < 4 ? 0 : f < 8 ? 1 : 2;
                            if (f < 8) st.body.c = dc[d][i_c] ?? 0;
                            let i_p = f < 4 ? 0 : f < 8 ? 1 : f < 12 ? 2 : 3;
                            if (f < 13) {
                                st.body.x = dx[d][i_p] ?? 0;
                                st.body.y = dy[d][i_p] ?? 0;
                                st.head.x = dx[d][i_p] ?? 0;
                                st.head.y = dy[d][i_p] ?? 0;
                            } else is_slamming = 13;
                        } else {
                            const dc = [7, 0, 7, 7];
                            const dx = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
                            const dy = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
                            if (f < 5) st.body.c = f < 4 ? dc[b] ?? 0 : 0;
                            let i_p = f < 4 ? 0 : f < 8 ? 1 : 2;
                            if (f < 9) {
                                st.body.x = (dx[b + 1])[i_p] ?? 0;
                                st.body.y = (dy[b + 1])[i_p] ?? 0;
                                st.head.x = (dx[b + 1])[i_p] ?? 0;
                                st.head.y = (dy[b + 1])[i_p] ?? 0;
                            } else is_slamming = 9;
                        }
                    }
                    console.log(is_slamming, st.moving)
                    if (is_slamming != -1 && st.moving) {
                        const i = f - is_slamming;
                        const j = i * 3.775;
                        const sx = sin360(j * 1);
                        const sy = sin360(j * 2);
                        st.body.x = (Math.round(Math.sin(sx)*Math.abs(sx) ** 0.3 * 1) * 1.5 + 0) * 1;
                        st.body.y = (Math.round(Math.sin(sy)*Math.abs(sy) ** 0.3 * 1) * 1.5 + 0) * 0.5;
                        st.head.x = (Math.round(Math.sin(sx)*Math.abs(sx) ** 0.3 * 1) * 1.5 + 0) * 1.5;
                        st.head.y = (Math.round(Math.sin(sy)*Math.abs(sy) ** 0.3 * 1) * 1.5 + 0) * 0.75;
                    }
                }
            }
        }
    })(),
    items: [
        {
            name: "パイ",
            heal: 99,
            text: "バタースコッチシナモンパイを食べた。\nHPがまんたんになった！",
            behavior: "default"
        }, {
            name: "高級バナナ",
            heal: 60,
            text: "高級バナナを食べた。\nHPが60回復した！",
            behavior: "default"
        }, {
            name: "からあげ",
            heal: 45,
            text: "唐揚げを食べた。\nHPが45回復した！",
            behavior: "default"
        }, {
            name: "からあげ",
            heal: 45,
            text: "唐揚げを食べた。\nHPが45回復した！",
            behavior: "default"
        }, {
            name: "からあげ",
            heal: 45,
            text: "唐揚げを食べた。\nHPが45回復した！",
            behavior: "default"
        }, {
            name: "抹茶バウム",
            heal: 42,
            text: "抹茶バウムを食べた。\nHPが42回復した！",
            behavior: "default"
        }, {
            name: "ハンバーガー",
            heal: 40,
            text: "ハンバーガーを食べた。\nHPが40回復した！",
            behavior: "default"
        }, {
            name: "ハンバーガー",
            heal: 40,
            text: "ハンバーガーを食べた。\nHPが40回復した！",
            behavior: "default"
        },
    ] as { name: string, heal: number, text: string, behavior: behavior }[],
    actions: [
        { name: "しらべる", text: "サンズ 2 ATK 1 DEF\n最も楽な敵。", behavior: "default" },
    ] as { name: string, text: string, behavior: behavior }[],
    clear_text: "YOU WIN!! \n0EXPと0Gを獲得した!",
    styles: {
        player_hp: "green",
        player_kr: "purple",
        player_hp_back: "red_dark",
        enemy_hp: "yellow",
        enemy_hp_back: "red_dark"
    },
    color: {
        white: "#99867a",
        blue: "#5c7d99",
        orange: "#997d5c",
        yellow: "#99935c",
        green: "#5c9962",
        red: "#995c5c",
        red_dark: "#803333",
        purple: "#995c99"
    },
    turnsGen
} as const

type GameT = typeof Game;

export { Game, GameT }
type behavior = "default" | ((Core: CoreT, player: { hp: number, hp_max: number }) => void);