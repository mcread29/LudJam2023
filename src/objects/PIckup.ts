import Game from "../Game";
import { PLayer } from "../player/Player";
import GameScene from "../scenes/GameScene";


export abstract class Pickup extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: GameScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.pickups.add(this);

        this.setDepth((this.y / this.scene.physics.world.bounds.height) * Game.maxDepth);
    }

    abstract Pickup(player: PLayer);
}