export const Game = {
    lang: "ja" as "ja" | "en",
    bgm: undefined as string | undefined,
    player: {
        attack: 2500,
        lv: 19,
        hp_max: 92,
    },
    enemy: {
        x: 310,
        y: 320,
        name: "サンズモドキ",
        hp: 10000,
    },
    items: [
        {
            name: "腐ったパン",
            heal: -20,
            text: "パンはパンでも食べられないパンはな～んだ",
            behavior: "default" as "default" | (() => void),
        }
    ],
    enemy_speak: ["街並みをやがて"],
    enemy_attack: [300],
    actions: [
        { name: "しらべる", text: "サンズモドキ 0 ATK 0 DEF\nサンズに似てる。なんだろうね？これ" },
        { name: "悪鬼滅殺", text: "？？？「鬼滅の刃のパクリじゃーん！」" }
    ],
    clear_text: "YOU WIN!! \n0EXPと0Gを獲得した!"
}

