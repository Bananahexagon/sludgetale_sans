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
        name: "dummy",
        hp: 1000,
    },
    items: [
        {
            name: "test_food",
            heal: 99,
            text: "You ate a test.",
            behavior: "default" as "default" | (() => void),
        }
    ],
    enemy_speak: ["Lorem Ipsum dolor sit\namet."],
    enemy_attack: [300],
    actions: [
        { name: "check", text: "Dummy 0 ATK 0 DEF\ntest enemy." },
        { name: "悪鬼滅殺", text: "？？？「鬼滅の刃のパクリじゃーん！」" }
    ],
    clear_text: "お前の勝ちだ!!You win!!!おめでとう!!!"
}

