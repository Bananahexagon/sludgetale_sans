import { CoreT } from "./lib/types";

export const Game = {
    lang: "ja" as "ja" | "en",
    bgm: undefined as string | undefined,
    player: {
        name: "frisk",
        attack: 2500,
        lv: 19,
        hp_max: 92,
    },
    enemy: {
        x: 310,
        y: 320,
        name: "百均のマネキン",
        hp: 10000,
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
    enemy_speak: ["唐揚げ食べたい"],
    enemy_attack: [300],
    actions: [
        { name: "しらべる", text: "百均のマネキン 0 ATK 0 DEF\n安物のマネキンだ。", behavior: "default" },
        {
            name: "筋トレ", text: "筋トレをした。HPが増えた！", behavior: (Core, player) => {
                Core.aLib.play("determination")
                player.hp_max += 12;
                player.hp += 12;
            }
        },
    ] as { name: string, text: string, behavior: behavior }[],
    clear_text: "YOU WIN!! \n0EXPと0Gを獲得した!",
    color: {
        white: "#99867a",
        blue: "#5c7d99",
        orange: "#997d5c"
    },
}

type behavior = "default" | ((Core: CoreT, player: { hp: number, hp_max: number }) => void);