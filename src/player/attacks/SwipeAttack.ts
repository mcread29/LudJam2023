import GameScene from "../../scenes/GameScene";
import { Vector } from "../../Utils/Vector";
import { PLayer } from "../Player";
import { Attack } from "./Attack";
import { HitBox } from "./HitBox";

export class SwipeAttack extends Attack {
    parent: Phaser.GameObjects.Container;

    damage = 20;
    attacRate = 1.5;
    attackTimeout = 1.5;
    hitboxes = [];

    leftAttack: HitBox;
    rightAttack: HitBox;

    public hitDelay: number = 1;
    public clearAllAfterDelay: boolean = true;

    constructor(scene: GameScene, player: PLayer) {
        super(scene, player);

        this.leftAttack = new HitBox(scene, -player.width / 2, 0, 'box', this.damage, true)
            .setOrigin(1, 0.5)
            .setScale(0.3, 0.1)
            .setTint(0x00fff0);
        this.leftAttack.disableBody(true, true);

        this.rightAttack = new HitBox(scene, player.width / 2, 0, 'box', this.damage, true)
            .setOrigin(0, 0.5)
            .setScale(0.3, 0.1)
            .setTint(0x00fff0);
        this.rightAttack.disableBody(true, true);

        this.hitboxes = [ this.leftAttack, this.rightAttack ];

        this.parent = scene.add.container(0, 0, [ this.leftAttack, this.rightAttack ])
            .setDepth(500);
    }

    setPosition(x?: number, y?: number, z?: number, w?: number): this {
        this.parent.setPosition(x, y, z);
        return this;
    }

    Attack() {
        this.setPosition(this.player.x, this.player.y);

        this.leftAttack.enable(-this.player.width / 2, 0);
        this.rightAttack.enable(this.player.width / 2, 0);
    }
}