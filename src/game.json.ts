export const Game = {
    enemy_name: "dummy",
    items: [
        {
            name: "test_food",
            heal: 99,
            text: "You ate a test.",
            behavior: "default" as "default" | (()=>void),
        }
    ],
    actions: [
        { name: "check", text: "Dummy 0 ATK 0 DEF\ntest enemy." }
    ]
}

