import { Scene } from "phaser";
import GameScene from "../../scenes/GameScene";
import { PLayer } from "../Player";
import { Attack } from "./Attack";
import { HitBox } from "./HitBox";

export class BookAttack extends Attack {
    protected _name: string = 'Book of Pawbs';
    protected _desc: string[] = [
        'Orbits around the player',
        'Fires 1 more projectile',
        'Base speed up by 30%. Base area up by 25%',
        'Effect lasts 0.5 seconds longer. Base damage up by 10',
        'Fires 1 more projectile',
        'Base speed up by 30%. Base area up by 25%',
        'Effect lasts 0.5 seconds longer. Base damage up by 10',
        'Fires 1 more projectile'
    ];
    protected _icon: string = 'book_of_pawbs';

    protected _hitboxes: HitBox[] = [];
    public attacRate: number = 2;
    public attackTimeout: number = 2;
    public damage: number = 5;

    private duration: number = 3;
    private enableTime: number = 0;

    public hitDelay: number = 1.5;
    public clearAllAfterDelay: boolean = true;

    parent: Phaser.GameObjects.Container;

    tween: Phaser.Tweens.Tween;

    private _speedMod: number = 1;
    private _baseSpeed: number = 1500;

    public Activate(player: PLayer): void {
        super.Activate(player);

        this.parent = this.scene.add.container(0, 0).setDepth(500).setActive(false);

        this.tween = this.scene.tweens.add({
            targets: this.parent,
            angle: 360,
            duration: this._baseSpeed,
            loop: -1
        });

        for (let i = 0; i < 2; i++)
        {
            const hitbox = new HitBox(this.scene, 0, 0, 'box', this.damage, false)
                .setBaseScale(0.1)
                .setTint(0x00fff0)
                .setDepth(500);
            this._hitboxes.push(hitbox);
            this.parent.add(hitbox);
            Phaser.Actions.RotateAroundDistance([ hitbox ], { x: 0, y: 0 }, (i / 2) * Math.PI * 2, 96);
        }
    }

    protected preUpdate(time: number, delta: number): void {
        this.parent.setPosition(this._player.x, this._player.y);

        if (this.enableTime >= this.duration) super.preUpdate(time, delta);
        else
        {
            this.enableTime += delta / 1000;
            if (this.enableTime >= this.duration)
            {
                this.parent.setActive(false);
                for (let box of this._hitboxes) box.disable();
            }
        }
    }

    Attack() {
        this.enableTime = 0;

        this.parent.setActive(true);
        for (let box of this._hitboxes)
        {
            box.enable(box.x, box.y);
        }
    }

    Upgrade() {
        super.Upgrade();
        if (this._level === 2)
        {
            this.addProjectile();
        }
        else if (this._level === 3)
        {
            this._speedMod = 0.7;

            this.scene.tweens.killTweensOf(this.parent);
            this.parent.setAngle(0);
            this.tween = this.scene.tweens.add({
                targets: this.parent,
                angle: 360,
                duration: this._baseSpeed * (1 - 0.3),
                loop: -1
            });

            this.IncreaseAreaMod(0.25);
        }
        else if (this._level === 4)
        {
            this.duration += 0.5;
            this.damage += 10;
        }
        else if (this._level === 5)
        {
            this.addProjectile();
        }
        else if (this.level === 6)
        {
            this._speedMod = 0.4;

            this.scene.tweens.killTweensOf(this.parent);
            this.parent.setAngle(0);
            this.tween = this.scene.tweens.add({
                targets: this.parent,
                angle: 360,
                duration: this._baseSpeed * (1 - 0.3),
                loop: -1
            });

            this.IncreaseAreaMod(0.25);
        }
        else if (this._level === 7)
        {
            this.duration += 0.5;
            this.damage += 10;
        }
        else if (this._level === 8)
        {
            this.addProjectile();
        }

        this.Attack();
    }

    private addProjectile() {
        const hitbox = new HitBox(this.scene, 0, 0, 'box', this.damage, false)
            .setBaseScale(0.1)
            .setScale(this._areaMod)
            .setTint(0x00fff0)
            .setDepth(500);
        this._hitboxes.push(hitbox);
        this.parent.add(hitbox);

        for (let i = 0; i < this._hitboxes.length; i++)
        {
            this._hitboxes[ i ].setPosition(0, 0);
            Phaser.Actions.RotateAroundDistance([ this._hitboxes[ i ] ], { x: 0, y: 0 }, (i / this._hitboxes.length) * Math.PI * 2, 96);
        }
    }
}