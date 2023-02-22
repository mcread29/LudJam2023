import Game from "../Game";
import GameScene from "../scenes/GameScene";
import { Chimken } from "./Chickmen";
import { Coin } from "./Coin";
import { Pickup } from "./PIckup";

type pickUp = (typeof Chimken | typeof Coin);

export class Destructable extends Phaser.Physics.Arcade.Sprite {
    private _timeToReenable: number = 30000;
    private _disabledTime: number = 0;


    private _pickups: pickUp[] = [
        Coin,
        Chimken
    ];

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, 'tree');
        this.setOrigin(0.5, 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setDepth((this.y / this.scene.physics.world.bounds.height) * Game.maxDepth);

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

        const index = Math.floor(Math.random() * this._pickups.length);
        const p: pickUp = this._pickups[ index ];
        console.log(p, this._pickups, index);

        new p(this.scene as GameScene, this.x, this.y);
    }
}