import Game from "../Game";
import GameScene from "../scenes/GameScene";
import { Chimken } from "./Chickmen";

export class Destructable extends Phaser.Physics.Arcade.Sprite {
    private _timeToReenable: number = 30000;
    private _disabledTime: number = 0;

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, 'tree');
        this.setOrigin(0.5, 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setDepth((this.y / Game.Instance.DefaultHeight) * Game.maxDepth);

        scene.destructables.add(this);
    }

    protected preUpdate(time: number, delta: number): void {
        this._disabledTime += delta;
        if (this._disabledTime > - this._timeToReenable && this.scene.cameras.main.worldView.contains(this.x, this.y) === false && this.body.enable === false) 
        {
            this.enableBody(true, this.x, this.y, true, true);
        }
    }

    Destruct() {
        this.disableBody(false, true);
        this._disabledTime = 0;

        new Chimken(this.scene as GameScene, this.x, this.y);
    }
}