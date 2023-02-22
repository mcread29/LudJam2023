import Game from "../Game";
import { PLayer } from "../player/Player";
import GameScene from "../scenes/GameScene";
import { Pickup } from "./PIckup";

export class Chimken extends Pickup {
    private _health = 10;
    public get health(): number { return this._health; }

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, 'chimken');
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    Pickup(player: PLayer) {
        player.Heal(this._health);
        this.destroy();
    }
}