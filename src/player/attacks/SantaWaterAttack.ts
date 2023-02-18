import { Enemy } from "../../enemies/Enemy";
import GameScene from "../../scenes/GameScene";
import { PLayer } from "../Player";
import { Attack } from "./Attack";
import { CircleHitBox } from "./CircleHitbox";
import { HitBox } from "./HitBox";

export class SantaWaterAttack extends Attack {
    hitboxes: HitBox[] = [];
    public attacRate: number = 3;
    public attackTimeout: number = 3;
    public damage: number = 10;

    constructor(scene: GameScene, player: PLayer) {
        super(scene, player);

        for (let i = 0; i < 2; i++)
        {
            const hitbox = new CircleHitBox(scene, 0, 0, 'circle_hitbox', this.damage, 64, true)
                .setTint(0x00fff0)
                .setDepth(500);
            hitbox.duration = 1000;

            hitbox.disableBody(true, true);
            this.hitboxes.push(hitbox);
        }
    }

    Attack() {
        for (let i = 0; i < this.hitboxes.length; i++)
        {
            const x = (this.scene.cameras.main.displayWidth * Math.random()) + this.scene.cameras.main.scrollX;
            const y = (this.scene.cameras.main.displayHeight * Math.random()) + this.scene.cameras.main.scrollY;

            this.hitboxes[ i ].enable(x, y);
        }
    }
}