import { CoreT } from "./lib/types";
import { Ref } from "./lib/utils";
import { Game as G } from "./game.json";
import { SpriteT } from "./lib/types";

export const soulObjGen = (soul: SpriteT, Game: typeof G, Core: CoreT, scene: Ref<string>, box: { judge: () => void, is_jumpable: () => boolean }) => {
    const player = ({
        lv: Game.player.lv,
        hp: Game.player.hp_max,
        hp_max: Game.player.hp_max,
        soul: soul,
        damage(d: number, color: "white" | "blue" | "orange" = "white") {
            this.hp -= d;
            Core.aLib.play("damage", 2);
            if (this.hp <= 0) {
                scene.v = "game_over";
            }
        },
        stamp() {
            this.soul.costume = {
                0: "soul_red",
                1: "soul_blue",
            }[this.type] ?? "soul_red";
            this.soul.stamp();
        },
        type: 1,
        move() { }
    })
    const b_jump = (() => {
        let j = 0;
        return () => {
            const jumpable = box.is_jumpable();
            if (jumpable && Core.inputKeys.up) {
                j = 7;
                soul.y += Math.sign(j) * Math.abs(j) ** 1.5 * 0.45;
            } else if (!jumpable) {
                if (0 < j && !Core.inputKeys.up) {
                    j = 0;
                } else {
                    j -= 0.25;
                }
                soul.y += Math.sign(j) * Math.abs(j) ** 1.5 * 0.45;
            }
            const soul_speed = Core.inputKeys.x ? 1 : 2.5;
            if (Core.inputKeys.right) soul.x += soul_speed;
            if (Core.inputKeys.left) soul.x -= soul_speed;
        }
    })();
    player.move = function () {
        switch (this.type) {
            case 0: {
                const soul_speed = Core.inputKeys.x ? 1 : 2.5;
                if (Core.inputKeys.up) soul.y += soul_speed;
                if (Core.inputKeys.down) soul.y -= soul_speed;
                if (Core.inputKeys.right) soul.x += soul_speed;
                if (Core.inputKeys.left) soul.x -= soul_speed;
            } break;
            case 1: {
                b_jump()
            }
        }
    }
    return player
};