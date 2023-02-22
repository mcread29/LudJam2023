import Game from "../Game";
import { PLayer } from "../player/Player";
import GameScene from "../scenes/GameScene";
import { Pickup } from "./Chickmen";

export class Chest extends Pickup {
    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, 'chest');
    }

    Pickup(player: PLayer) {
        Game.Instance.manager.eventCenter.emit('pickup-chest');
        this.destroy();
    }
}