
import { Ref } from "./lib/utils";
import { Game as G } from "./game";
import { SpriteT } from "./lib/sprite";
import { CoreT } from "./lib/core";

const playerObjGen = (soul: SpriteT, Game: typeof G, Core: CoreT, scene: Ref<string>,
    enemy: {
        custom: { slam: (d: -1 | 0 | 1 | 2 | 3, b: -1 | 0 | 1 | 2 | 3, f: number, state: { body: { c: number, x: number, y: number }, head: { c: number, x: number, y: number }, moving: number }) => void },
        state: { body: { c: number, x: number, y: number }, head: { c: number, x: number, y: number }, moving: number }
    },
    box: { judge: () => void, is_jumpable: (sd: number) => boolean }, b_tick: (() => void)[], is_hp_inf: Ref<boolean>, state: { c_gap: number },) => {
    let damage_time = 0;
    const player = ({
        name: Game.player.name,
        lv: Game.player.lv,
        hp: Game.player.hp_max as number,
        kr: 0,
        hp_max: Game.player.hp_max,
        soul: soul,
        stamp() {
            soul.costume = {
                0: "soul",
                1: "soul_blue",
                2: "soul_blue",
                3: "soul_blue",
                4: "soul_blue",
            }[this.type] ?? "soul";
            if (this.type == 1 || this.type == 2 || this.type == 3 || this.type == 4) soul.d = (this.type - 1) * 90
            else soul.d = 0;
            soul.stamp();
            if (0 < damage_time) Core.cLib.stamp("soul_black", this.soul.x, this.soul.y, soul.d, 80, 0.5)
        },
        type: 0,
        damage(color: "white" | "blue" | "orange" = "white", d?: number) { },
        move() { },
        slam(d: -1 | 0 | 1 | 2 | 3, s: number = 40) { }
    })
    const b_jump = [
        (() => {
            let j = 0;
            return () => {
                const jumpable = box.is_jumpable(0);
                if (jumpable && Core.inputKeys.up) {
                    j = 7;
                    soul.y += Math.sign(j) * Math.abs(j) ** 1.00 * 0.85;
                } else if (!jumpable) {
                    if (0 < j && !Core.inputKeys.up) {
                        j = 0;
                    } else {
                        j -= 1 / 4;
                    }
                    soul.y += Math.sign(j) * Math.abs(j) ** 1.00 * 0.85;
                }
            }
        })(),
        (() => {
            let j = 0;
            return () => {
                const jumpable = box.is_jumpable(90);
                if (jumpable && Core.inputKeys.right) {
                    j = 7;
                    soul.x += Math.sign(j) * Math.abs(j) ** 1.00 * 0.85;
                } else if (!jumpable) {
                    if (0 < j && !Core.inputKeys.right) {
                        j = 0;
                    } else {
                        j -= 1 / 4;
                    }
                    soul.x += Math.sign(j) * Math.abs(j) ** 1.00 * 0.85;
                }
            }
        })(),
        (() => {
            let j = 0;
            return () => {
                const jumpable = box.is_jumpable(180);
                if (jumpable && Core.inputKeys.down) {
                    j = 7;
                    soul.y -= Math.sign(j) * Math.abs(j) ** 1.00 * 0.85;
                } else if (!jumpable) {
                    if (0 < j && !Core.inputKeys.down) {
                        j = 0;
                    } else {
                        j -= 1 / 4;
                    }
                    soul.y -= Math.sign(j) * Math.abs(j) ** 1.00 * 0.85;
                }
            }
        })(),
        (() => {
            let j = 0;
            return () => {
                const jumpable = box.is_jumpable(270);
                if (jumpable && Core.inputKeys.left) {
                    j = 7;
                    soul.x -= Math.sign(j) * Math.abs(j) ** 1.00 * 0.85;
                } else if (!jumpable) {
                    if (0 < j && !Core.inputKeys.left) {
                        j = 0;
                    } else {
                        j -= 1 / 4;
                    }
                    soul.x -= Math.sign(j) * Math.abs(j) ** 1.00 * 0.85;
                }
            }
        })(),
    ];
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
                if (!blue_slamming.is) b_jump[0]();
                const soul_speed = Core.inputKeys.x ? 1 : 2.5;
                if (Core.inputKeys.right) soul.x += soul_speed;
                if (Core.inputKeys.left) soul.x -= soul_speed;
            } break;
            case 2: {
                if (!blue_slamming.is) b_jump[1]();
                const soul_speed = Core.inputKeys.x ? 1 : 2.5;
                if (Core.inputKeys.up) soul.y += soul_speed;
                if (Core.inputKeys.down) soul.y -= soul_speed;
            } break;
            case 3: {
                if (!blue_slamming.is) b_jump[2]();
                const soul_speed = Core.inputKeys.x ? 1 : 2.5;
                if (Core.inputKeys.right) soul.x += soul_speed;
                if (Core.inputKeys.left) soul.x -= soul_speed;
            } break;
            case 4: {
                if (!blue_slamming.is) b_jump[3]();
                const soul_speed = Core.inputKeys.x ? 1 : 2.5;
                if (Core.inputKeys.up) soul.y += soul_speed;
                if (Core.inputKeys.down) soul.y -= soul_speed;
            } break;
        }
    }
    let [bx, by] = [0, 0];
    const blue_slamming = { is: false, s: 0, d: 0 as 0 | 1 | 2 | 3, f: 0, c: { d: -1 as -1 | 0 | 1 | 2 | 3, b: -1 as -1 | 0 | 1 | 2 | 3, b_move: 0 } };
    player.damage = function (color: "white" | "blue" | "orange" = "white", d?: number) {
        if (damage_time <= 0 && (color == "white" || (color == "blue") !== (bx == this.soul.x && by == this.soul.y))) {
            if (!is_hp_inf.v) {
                damage_time = Game.player.damage_time;
                this.hp -= d ?? Game.player.damage;
                if (Game.player.karma) this.kr += d ?? Game.player.damage;
                if (this.hp <= this.kr) this.kr = this.hp - 1;
            }
            Core.aLib.play("damage");
            if (!(player.hp > 0) || isNaN(player.hp + player.kr)) {
                scene.v = "game_over";
            }
        }
    };
    let bd = -1 as -1 | 0 | 1 | 2 | 3;
    player.slam = function slam(d: -1 | 0 | 1 | 2 | 3, s: number = 40) {
        if (d != -1) {
            state.c_gap += 3;
            Core.aLib.play("soul_slamming")
            player.type = d + 1;
            blue_slamming.is = true;
            blue_slamming.s = s;
            blue_slamming.d = d;
            if (enemy.state.moving != 0) blue_slamming.c.b_move = enemy.state.moving;
            enemy.state.moving = 0;
        } else {
            enemy.state.moving = blue_slamming.c.b_move;
        }
        blue_slamming.c.d = d;
        blue_slamming.c.b = bd;
        bd = d;
        blue_slamming.f = 0;
    }
    const slamming = () => {
        blue_slamming.is = blue_slamming.is && 1 <= player.type, player.type <= 4
        if (blue_slamming.is) {
            switch (player.type) {
                case 1: soul.y -= blue_slamming.s; break;
                case 2: soul.x -= blue_slamming.s; break;
                case 3: soul.y += blue_slamming.s; break;
                case 4: soul.x += blue_slamming.s; break;
            }
            if (box.is_jumpable((player.type - 1) * 90)) {
                blue_slamming.is = false;
            }
        }
        //custom
        enemy.custom.slam(blue_slamming.c.d, blue_slamming.c.b, blue_slamming.f, enemy.state)
        blue_slamming.f++
    }
    let kr_count = 0;
    b_tick.push(() => {
        bx = soul.x; by = soul.y; damage_time--; slamming();
        kr_count += Math.abs(player.kr) ** (1 / 3) / 10;
        player.kr = Math.max(0, player.kr - Math.floor(kr_count));
        player.hp -= Math.floor(kr_count);
        kr_count = kr_count % 1;
        if (!(player.hp > 0) || isNaN(player.hp + player.kr)) {
            scene.v = "game_over";
        }
    });
    return player
};

type playerT = ReturnType<typeof playerObjGen>

export {
    playerObjGen,
    playerT,
}