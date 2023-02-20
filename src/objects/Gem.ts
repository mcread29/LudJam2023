import GameScene from "../scenes/GameScene";

const expToTexture = (exp: number) => {
    if (exp < 5) return 'gem_a';
    else if (exp < 10) return 'gem_b';
    else return 'gem_c';
};

export class Gem extends Phaser.Physics.Arcade.Sprite {
    public get exp(): number { return this._exp; }

    constructor(scene: GameScene, x: number, y: number, private _exp: number) {
        super(scene, x, y, expToTexture(_exp));
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