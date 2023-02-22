import { HitBox } from "./HitBox";

export class CircleHitBox extends HitBox {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, damage: number, radius: number, autoDisable = false, _showBox = true) {
        super(scene, x, y, texture, damage, autoDisable, _showBox);

        this.body.setCircle(radius);
    }
}