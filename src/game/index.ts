import { fontFnsT } from "../font";
import { cLibT } from "../lib/canvas";
import { CoreT } from "../lib/core";
import { SpriteT } from "../lib/sprite";
import { cos360, sin360 } from "../lib/utils";
import { commandsGen } from "./commands";
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
            moving: 0,
        } as enemyState
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
                    let is_slamming = 0 as -1 | 0 | 9;
                    let [bx, by] = [undefined as undefined | number, undefined as undefined | number]
                    let [hx, hy] = [undefined as undefined | number, undefined as undefined | number]
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
                                bx = dx[d][i_p] ?? 0;
                                by = dy[d][i_p] ?? 0;
                                hx = dx[d][i_p] ?? 0;
                                hy = dy[d][i_p] ?? 0;
                            }
                        } else {
                            const dc = [7, 0, 7, 7];
                            const dx = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
                            const dy = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
                            if (f < 5) st.body.c = f < 4 ? dc[b] ?? 0 : 0;
                            let i_p = f < 4 ? 0 : f < 8 ? 1 : 2;
                            if (f < 9) {
                                bx = (dx[b + 1])[i_p] ?? 0;
                                by = (dy[b + 1])[i_p] ?? 0;
                                hx = (dx[b + 1])[i_p] ?? 0;
                                hy = (dy[b + 1])[i_p] ?? 0;
                            } else is_slamming = 9;
                        }
                    }
                    {
                        const i = f - is_slamming;
                        const j = i * 6;
                        const sx = sin360(j * 1);
                        const sy = sin360(j * 2);
                        const [bx2, by2, hx2, hy2] = {
                            0: [0, 0, 0, 0],
                            1: [
                                (Math.round(Math.sin(sx) * Math.abs(sx) ** 0.2 * 1) * 1.5 + 0) * 1,
                                (Math.round(Math.sin(sy) * Math.abs(sy) ** 0.2 * 1) * 1.5 + 0) * 0.5,
                                (Math.round(Math.sin(sx) * Math.abs(sx) ** 0.2 * 1.1) * 1.5 + 0) * 1.5,
                                (Math.round(Math.sin(sy) * Math.abs(sy) ** 0.2 * 1.1) * 1.5 + 0) * 0.75,
                            ],
                        }[st.moving] ?? [0, 0, 0, 0]
                        st.body.x = bx ?? bx2;
                        st.body.y = by ?? by2;
                        st.head.x = hx ?? hx2;
                        st.head.y = hy ?? hy2;
                    }
                }
            }
        }
    })(),
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
    turnsGen,
    commands: commandsGen,
    state: { c_gap: 0 },
}

type enemyState = {
    body: { c: number, x: number, y: number },
    head: { c: number, x: number, y: number },
    moving: number,
}

type GameT = typeof Game;

export { Game, GameT, enemyState }