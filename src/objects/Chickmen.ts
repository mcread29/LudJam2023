import Game from "../Game";
import { PLayer } from "../player/Player";
import GameScene from "../scenes/GameScene";

export abstract class Pickup extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: GameScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.pickups.add(this);

        this.setDepth((this.y / Game.Instance.DefaultHeight) * Game.maxDepth);
    }

    abstract Pickup(player: PLayer);
}

export class Chimken extends Pickup {
    private _health = 10;
    public get health(): number { return this._health; }

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, 'chimken');
        console.log(scene);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    Pickup(player: PLayer) {
        player.Heal(this._health);
        this.destroy();
    }
}