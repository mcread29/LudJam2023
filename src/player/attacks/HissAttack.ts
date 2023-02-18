import GameScene from "../../scenes/GameScene";
import { PLayer } from "../Player";
import { Attack } from "./Attack";
import { CircleHitBox } from "./CircleHitbox";
import { HitBox } from "./HitBox";

export class HissAttack extends Attack {
    hitboxes: HitBox[];
    public attacRate: number = 0;
    public attackTimeout: number = 0;
    public damage: number = 1;

    constructor(scene: GameScene, player: PLayer) {
        super(scene, player);

        this.hitboxes = [ new CircleHitBox(scene, 0, 0, 'circle_hitbox', this.damage, 64, false)
            .setTint(0x00fff0)
            .setDepth(500)
            .setAlpha(0.25)
        ];
    }

    protected preUpdate(time: number, delta: number): void {
        this.hitboxes[ 0 ].setPosition(this.player.x, this.player.y);
    }

    Attack() {
        // throw new Error("Method not implemented.");
    }

}