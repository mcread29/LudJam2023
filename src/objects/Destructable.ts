import Game from "../Game";
import GameScene from "../scenes/GameScene";
import { Chimken } from "./Chickmen";
import { Coin } from "./Coin";
import { Pickup } from "./PIckup";

type pickUps = (typeof Chimken | typeof Coin);

export class Destructable extends Phaser.Physics.Arcade.Sprite {
    private _timeToReenable: number = 30000;
    private _disabledTime: number = 0;

    private _pickup: Pickup;

    private _pickups: pickUps[] = [
        Coin,
        Chimken
    ];

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, 'torchie');
        this.setOrigin(0.5, 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setDepth((this.y / this.scene.physics.world.bounds.height) * Game.maxDepth);

        scene.destructables.add(this);
    }

    protected preUpdate(time: number, delta: number): void {
        this._disabledTime += delta;
        if (this._disabledTime > - this._timeToReenable && this.scene.cameras.main.worldView.contains(this.x, this.y) === false && this.body.enable === false && this._pickup.active === false) 
        {
            this._pickup = null;
            this.enableBody(true, this.x, this.y, true, true);
        }
    }

    Destruct() {
        this.disableBody(false, true);
        this._disabledTime = 0;

        const index = Math.floor(Math.random() * this._pickups.length);
        const p: pickUps = this._pickups[ index ];

        this._pickup = new p(this.scene as GameScene, this.x, this.y);
    }
}