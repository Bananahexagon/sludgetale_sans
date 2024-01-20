import { cLibT } from "../lib/canvas";
import { CoreT } from "../lib/core";
import { SpriteT } from "../lib/sprite";
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
        damage_time: 1
    },
    enemy: (() => {
        const state = {
            body: { c: 0, x: 0, y: 0 },
            head: { c: 0, x: 0, y: 0 }
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
            avoid: true
        }
    })(),
    items: [
        {
            name: "腐ったパン",
            heal: -20,
            text: "パンはパンでも食べられないパンはな～んだ",
            behavior: "default"
        }, {
            name: "唐揚げ",
            heal: 20,
            text: "生殖器の唐揚げｱｱｱｱｧｧｧ----wwwwwwwwwwww",
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
        purple: "#995c5c"
    },
    turnsGen
}

type GameT = typeof Game;

export { Game, GameT }
type behavior = "default" | ((Core: CoreT, player: { hp: number, hp_max: number }) => void);