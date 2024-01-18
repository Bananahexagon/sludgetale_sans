import { CoreT } from "../lib/core";
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
    enemy: {
        x: 320,
        y: 320,
        name: "サンズ",
        hp: 10000,
        costume: "sans",
        size: 200,
        avoid: true
    },
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