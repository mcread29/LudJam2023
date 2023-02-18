import Game from "../Game";
import { PLayer } from "../player/Player";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
    declare body: Phaser.Physics.Arcade.Body;

    protected inHitStun: boolean = false;
    protected hitStun: number = 100;
    protected health: number = 20;

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

    destroy(fromScene?: boolean): void {
        if (fromScene === false)
        {
            //drop gems here
        }

        super.destroy(fromScene);
        if (this.scene) this.scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this.postUpdate, this);
    }

    TakeDamage(damage: number) {
        if (this.inHitStun) return;

        this.inHitStun = true;
        this.health -= damage;

        if (this.health <= 0) this.destroy();
        else setTimeout(() => this.inHitStun = false, this.hitStun);
    }
}