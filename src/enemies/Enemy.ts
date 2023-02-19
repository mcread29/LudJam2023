import Game from "../Game";
import { Gem } from "../objects/Gem";
import { PLayer } from "../player/Player";
import GameScene from "../scenes/GameScene";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
    declare body: Phaser.Physics.Arcade.Body;

    protected health: number = 20;
    protected exp = 1;

    shutdown: () => void;

    constructor(scene: GameScene, x: number, y: number, key: string, private _player: PLayer) {
        super(scene, x, y, key);

        scene.physics.add.existing(this);

        this.body.setCircle(this.width / 2, 0, this.height - this.width);

        scene.add.existing(this);
        scene.sys.updateList.add(this);
        scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this.postUpdate, this);

        this.shutdown = () => {
            scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this.postUpdate, this);
        };
        scene.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown);
    }

    postUpdate() {
        if (this.scene)
        {
            this.scene.physics.moveToObject(this, this._player, 100);
            this.setDepth((this.y / Game.Instance.DefaultHeight) * 100);
        }
    }

    destroy(fromScene?: boolean): void {
        if (!fromScene)
        {
            this.shutdown();
            this.scene.events.off(Phaser.Scenes.Events.SHUTDOWN, this.shutdown);
        }
        super.destroy(fromScene);
    }

    TakeDamage(damage: number) {
        this.health -= damage;

        if (this.health <= 0) this.Kill();
    }

    Kill() {
        //drop gem
        new Gem(this.scene as GameScene, this.x, this.y, this.exp);

        this.destroy();
    }
}