
import { Ref } from "./lib/utils";
import { Game as G } from "./game";
import { SpriteT } from "./lib/sprite";
import { CoreT } from "./lib/core";

const playerObjGen = (soul: SpriteT, Game: typeof G, Core: CoreT,
    scene: Ref<string>, box: { judge: () => void, is_jumpable: () => boolean }, b_tick: (() => void)[]) => {
    let damage_time = 0;
    const player = ({
        name: Game.player.name,
        lv: Game.player.lv,
        hp: Game.player.hp_max,
        hp_max: Game.player.hp_max,
        soul: soul,
        stamp() {
            this.soul.costume = {
                0: "soul",
                1: "soul_blue",
            }[this.type] ?? "soul";
            this.soul.stamp();
            if (0 < damage_time) Core.cLib.stamp("soul_black", this.soul.x, this.soul.y, 0, 80, 0.5)
        },
        type: 0,

        damage(color: "white" | "blue" | "orange" = "white", d?: number) { },
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
    let [bx, by] = [0, 0];
    b_tick.push(() => { bx = soul.x; by = soul.y; damage_time--; });
    player.damage = function (color: "white" | "blue" | "orange" = "white", d?: number) {
        if (damage_time <= 0 && (color == "white" || (color == "blue") !== (bx == this.soul.x && by == this.soul.y))) {
            console.log(damage_time);
            damage_time = Game.player.damage_time;
            this.hp -= d ?? Game.player.damage;
            Core.aLib.play("damage");
            color == "white" || (color == "blue") !== (bx == this.soul.x && by == this.soul.y)
            if (this.hp <= 0) {
                scene.v = "game_over";
            }
        }
    };
    return player
};

type playerT = ReturnType<typeof playerObjGen>

export {
    playerObjGen,
    playerT,
}