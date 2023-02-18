import { Scene } from "phaser";
import GameScene from "../../scenes/GameScene";
import { PLayer } from "../Player";
import { Attack } from "./Attack";
import { HitBox } from "./HitBox";

export class BookAttack extends Attack {
    hitboxes: HitBox[] = [];
    public attacRate: number = 2;
    public attackTimeout: number = 2;
    public damage: number = 5;

    private duration: number = 3;
    private enableTime: number = 0;

    parent: Phaser.GameObjects.Container;

    constructor(scene: GameScene, player: PLayer) {
        super(scene, player);

        this.parent = scene.add.container(0, 0).setDepth(500).setActive(false);

        scene.tweens.add({
            targets: this.parent,
            angle: 360,
            duration: 1500,
            loop: -1
        });

        for (let i = 0; i < 3; i++)
        {
            const hitbox = new HitBox(scene, 0, 0, 'box', this.damage, false)
                .setScale(0.1)
                .setTint(0x00fff0)
                .setDepth(500);
            this.hitboxes.push(hitbox);
            this.parent.add(hitbox);
            Phaser.Actions.RotateAroundDistance([ hitbox ], { x: 0, y: 0 }, (i / 3) * Math.PI * 2, 96);
        }
    }

    protected preUpdate(time: number, delta: number): void {
        this.parent.setPosition(this.player.x, this.player.y);

        if (this.enableTime >= this.duration) super.preUpdate(time, delta);
        else
        {
            this.enableTime += delta / 1000;
            if (this.enableTime >= this.duration)
            {
                this.parent.setActive(false);
                for (let box of this.hitboxes)
                {
                    box.disable();
                }
            }
        }
    }

    Attack() {
        this.enableTime = 0;

        this.parent.setActive(true);
        for (let box of this.hitboxes)
        {
            box.enable(box.x, box.y);
        }
    }

}