import GameScene from "../scenes/GameScene";

const expToTexture = {
    1: 'gem_a',
    5: 'gem_b',
    10: 'gem_c'
};

export class Gem extends Phaser.Physics.Arcade.Sprite {
    public get exp(): number { return this._exp; }

    constructor(scene: GameScene, x: number, y: number, private _exp = 1 | 5 | 10) {
        super(scene, x, y, expToTexture[ _exp ]);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        scene.gems.add(this);

        scene.tweens.add({
            targets: this,
            y: y - 10,
            duration: 1000,
            yoyo: true,
            loop: -1
        });
    }
}