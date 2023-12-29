export const Game = {
    enemy_name: "dummy",
    items: [
        {
            name: "test_food",
            heal: 99,
            text: "You ate a test.",
            behavior: "default" as "default" | (() => void),
        }
    ],
    enemy_speak: ["Lorem Ipsum dolor sit\namet."],
    enemy_attack:[300],
    actions: [
        { name: "check", text: "Dummy 0 ATK 0 DEF\ntest enemy." }
    ]
}
