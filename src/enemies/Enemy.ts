import Game from "../Game";
import { PLayer } from "../player/Player";

export class Enemy extends Phaser.GameObjects.Sprite {
    declare body: Phaser.Physics.Arcade.Body;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, private _player: PLayer) {
        super(scene, x, y, key);

        scene.physics.add.existing(this);

        this.setScale(0.3);

        this.body.setCircle(this.width / 2, 0, this.height - this.width);

        scene.add.existing(this);
        scene.sys.updateList.add(this);
        scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this.postUpdate, this);
    }

    protected preUpdate(time: number, delta: number): void {
        // hmm
    }

    postUpdate() {
        if (this.scene)
        {
            this.scene.physics.moveToObject(this, this._player, 100);
            this.setDepth((this.y / Game.Instance.DefaultHeight) * 100);
        }
    }

    // destroy(fromScene?: boolean): void {
    //     console.log('what', fromScene);
    //     if (fromScene === false)
    //     {
    //         this.scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this.postUpdate, this);
    //     }
    //     // super.destroy(fromScene);
    // }
}