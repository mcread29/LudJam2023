import Game from "../Game";
import { Gem } from "../objects/Gem";
import { PLayer } from "../player/Player";
import GameScene from "../scenes/GameScene";
import { EnemyPool } from "./EnemyPool";

export abstract class Enemy extends Phaser.Physics.Arcade.Sprite {
    protected abstract _Type: string;
    public get Type(): string { return this._Type; }

    declare body: Phaser.Physics.Arcade.Body;

    shutdown: () => void;

    protected abstract _health: number;
    protected abstract _exp: number;
    protected abstract _speed: number;
    protected abstract _power: number;
    public get power(): number { return this._power; }

    constructor(scene: GameScene, key: string) {
        super(scene, 0, 0, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.Disable();

        this.shutdown = () => scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this.postUpdate, this);
        scene.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown);
    }

    public Enable() {
        (this.scene as GameScene).enemies.add(this);
        this.enableBody(false, this.x, this.y, true, true);
        this.scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this.postUpdate, this);
    }

    public Disable() {
        (this.scene as GameScene).enemies.remove(this);
        this.disableBody(true, true);
        this.scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this.postUpdate, this);
        this.setPosition(-100, -100);
    }

    private postUpdate() {
        if (this.scene)
        {
            this.scene.physics.moveToObject(this, Game.Instance.manager.player, this._speed);
            this.setFlipX(this.body.velocity.x < 0);
            this.setDepth((this.y / Game.Instance.DefaultHeight) * 100);
        }
    }

    destroy(fromScene?: boolean): void {
        if (!fromScene)
        {
            this.scene.events.off(Phaser.Scenes.Events.SHUTDOWN, this.shutdown);
            this.shutdown();
        }
        super.destroy(fromScene);
    }

    TakeDamage(damage: number) {
        this._health -= damage;

        if (this._health <= 0) this.Kill();
    }

    Kill() {
        new Gem(this.scene as GameScene, this.x, this.y, this._exp);
        Game.Instance.manager.eventCenter.emit('enemyKilled');
        this.Disable();
        EnemyPool.ReturnEnemy(this);
    }
}

export class BasicEnemy extends Enemy {
    protected _Type: string = 'BasicEnemy';

    protected _health: number = 5;
    protected _exp: number = 1;
    protected _speed: number = 140;
    protected _power: number = 5;

    constructor(scene: GameScene) {
        super(scene, 'clover_kitty');
        this.body.setCircle(this.width / 3, this.width / 6, this.width / 3).setBounce(1, 1);
    }
}

export class BasicEnemyBoss extends Enemy {
    protected _Type: string = 'BasicEnemyBoss';
    protected _health: number = 50;
    protected _exp: number = 30;
    protected _speed: number = 60;
    protected _power: number = 10;

    constructor(scene: GameScene) {
        super(scene, 'clover_kitty_boss');
        this.body.setCircle(this.width / 3, this.width / 6, this.width / 3).setBounce(1, 1);
    }
}

export class LudBoss extends Enemy {
    protected _Type: string = 'LudBoss';
    protected _health: number = Number.MAX_SAFE_INTEGER;
    protected _exp: number = Number.MAX_SAFE_INTEGER;
    protected _speed: number = 1000;
    protected _power: number = 1000;

    constructor(scene: GameScene) {
        super(scene, 'clover_kitty_boss');
        this.body.setCircle(this.width / 3, this.width / 6, this.width / 3).setBounce(1, 1);
    }
}