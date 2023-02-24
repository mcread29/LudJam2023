import Game from "../Game";
import { Chest } from "../objects/Chest";
import { Gem } from "../objects/Gem";
import { PLayer } from "../player/Player";
import GameScene from "../scenes/GameScene";
import { EnemyPool } from "./EnemyPool";

export abstract class Enemy extends Phaser.Physics.Arcade.Sprite {
    protected abstract _Type: string;
    public get Type(): string { return this._Type; }

    declare body: Phaser.Physics.Arcade.Body;

    shutdown: () => void;

    protected _health: number;
    protected abstract _maxHealth: number;
    protected abstract _exp: number;
    protected abstract _speed: number;
    protected abstract _power: number;
    protected _isBoss = false;
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
        this._health = this._maxHealth;
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
            this.setDepth((this.y / this.scene.physics.world.bounds.height) * Game.maxDepth);
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

    TakeDamage(damage: number): { damage: number, killed: boolean; } {
        this._health -= damage;

        const text = this.scene.add.rexBBCodeText(Math.round(this.x), Math.round(this.y), `[b]${Math.round(damage)}[/b]`, {
            fontFamily: 'FutilePro',
            color: '#ff0000',
            fontSize: '30px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5)
            .setDepth(Game.maxDepth)
            .setResolution(5)
            .setStroke('0x000000', 5);

        this.scene.add.tween({
            targets: text,
            scale: 1.5,
            ease: Phaser.Math.Easing.Back.Out,
            duration: 700
        });
        this.scene.add.tween({
            targets: text,
            alpha: 0,
            duration: 300,
            delay: 400,
            onComplete: () => text.destroy()
        });

        if (this._health <= 0)
        {
            this.Kill();
            return { damage: damage + this._health, killed: true };
        }
        return { damage: damage, killed: false };
    }

    Kill() {
        if (this._isBoss)
        {
            new Chest(this.scene as GameScene, this.x, this.y);
        }
        else
        {
            new Gem(this.scene as GameScene, this.x, this.y, this._exp);
        }
        Game.Instance.manager.eventCenter.emit('enemyKilled');
        this.Disable();
        EnemyPool.ReturnEnemy(this);
    }
}

export class BasicEnemy extends Enemy {
    protected _Type: string = 'BasicEnemy';

    protected _maxHealth: number = 5;
    protected _exp: number = 1;
    protected _speed: number = 140;
    protected _power: number = 5;

    constructor(scene: GameScene) {
        super(scene, 'clover_kitty');
        this.body.setCircle(this.width / 3, this.width / 6, this.height - (this.height / 3)).setBounce(1, 1);
    }
}

export class BasicEnemyBoss extends Enemy {
    protected _Type: string = 'BasicEnemyBoss';
    protected _maxHealth: number = 50;
    protected _exp: number = 30;
    protected _speed: number = 60;
    protected _power: number = 10;

    constructor(scene: GameScene) {
        super(scene, 'clover_kitty_boss');
        this._isBoss = true;
        this.body.setCircle(this.width / 3, this.width / 6, this.height - (this.height / 3)).setBounce(1, 1);
    }
}

export class LudBoss extends Enemy {
    protected _Type: string = 'LudBoss';
    protected _maxHealth: number = Number.MAX_SAFE_INTEGER;
    protected _exp: number = Number.MAX_SAFE_INTEGER;
    protected _speed: number = 1000;
    protected _power: number = 1000;

    constructor(scene: GameScene) {
        super(scene, 'lud_boss');
        this.setOrigin(0.0, 0.66);
        this.body.setCircle(this.width / 3, this.width / 6, this.height - (this.height / 3)); //.setBounce(1, 1);
    }
}