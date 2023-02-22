import Game from "../Game";
import { PLayer } from "../player/Player";
import GameScene from "../scenes/GameScene";

const expToTexture = (exp: number) => {
    if (exp < 5) return 'gem_a';
    else if (exp < 10) return 'gem_b';
    else return 'gem_c';
};

export class Gem extends Phaser.Physics.Arcade.Sprite {
    public get exp(): number { return this._exp; }

    private _collecting: boolean = false;

    private _lifespan = 60000;
    private _destroyTimeout: NodeJS.Timeout;

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

        this._destroyTimeout = setTimeout(() => {
            this.destroy();
        }, this._lifespan);
    }

    startCollect() {
        clearTimeout(this._destroyTimeout);

        this.scene.tweens.killTweensOf(this);

        if (this._collecting) return;

        this._collecting = true;
        this.scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this.postUpdate, this);
    }

    postUpdate() {
        if (this.scene)
        {
            this.scene.physics.moveToObject(this, Game.Instance.manager.player, 350);
            this.setDepth((this.y / Game.Instance.DefaultHeight) * Game.maxDepth);
        }
    }

    destroy(fromScene?: boolean): void {
        if (this.scene && !fromScene)
        {
            this.scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this.postUpdate, this);
        }
        super.destroy(fromScene);
    }
}