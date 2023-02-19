import { Enemy } from "../../enemies/Enemy";
import GameScene from "../../scenes/GameScene";
import { PLayer } from "../Player";
import { HitBox } from "./HitBox";

export abstract class Attack {
    protected _level = 0;
    public get level(): number { return this._level; }

    public get maxLevel() { return 8; };

    public get name(): string { return this._name; }
    protected abstract _name: string;

    public get desc(): string { return this._desc; }
    protected abstract _desc: string;

    public get icon(): string { return this._icon; }
    protected abstract _icon: string;

    public get hitboxes(): HitBox[] { return this._hitboxes; }
    declare protected abstract _hitboxes: HitBox[];

    protected abstract attacRate: number;
    protected abstract attackTimeout: number;
    protected abstract damage: number;

    protected abstract hitDelay: number;
    protected abstract clearAllAfterDelay: boolean;

    private hitEnemies: Map<Enemy, number>;
    protected _player: PLayer;

    private _active: boolean = false;
    public get active(): boolean { return this._active; }

    constructor(protected scene: GameScene) {
        this.hitEnemies = new Map<Enemy, number>();

        scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            console.log('shutdown');
            this.scene.events.off(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
            this.scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this.postUpdate, this);
        });
    }

    public Activate(player: PLayer) {
        this._active = true;
        this._player = player;

        this.scene.events.on(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
        this.scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this.postUpdate, this);
    }

    protected preUpdate(time: number, delta: number): void {
        this.attackTimeout -= delta / 1000;
        if (this.attackTimeout <= 0)
        {
            this.Attack();
            this.attackTimeout = this.attacRate;
        }
    }

    protected postUpdate(time: number, delta: number): void {
        for (let [ key, value ] of this.hitEnemies)
        {
            const newValue = value - delta / 1000;
            this.hitEnemies.set(key, value - delta / 1000);
            if (newValue <= 0 && this.clearAllAfterDelay)
            {
                this.hitEnemies.clear();
                break;
            }
        }
    }

    public CanHit(enemy: Enemy): boolean {
        if (this.hitEnemies.has(enemy) === false || this.hitEnemies.get(enemy) <= 0) return true;
        return false;
    }

    public Hit(enemy: Enemy) {
        this.hitEnemies.set(enemy, this.hitDelay);
        enemy.TakeDamage(this.damage);
    }

    abstract Attack();
    Upgrade() {
        this._level++;
    }
}