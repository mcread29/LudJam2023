import Game from "../../Game";
import { PLayer } from "../Player";
import { Attack } from "./Attack";
import { CircleHitBox } from "./CircleHitbox";
import { HitBox } from "./HitBox";

export class SantaWaterAttack extends Attack {
    protected _name: string = 'Kitty Water';
    protected _desc: string[] = [
        'Generate damaging zones',
        'Fires 1 more projectile. Base area up by 20%',
        'Base damage up by 10. Effect lasts 0.5 seconds longer',
        'Fires 1 more projectile. Base area up by 20%',
        'Base damage up by 10. Effect lasts 0.3 seconds longer',
        'Fires 1 more projectile. Base area up by 20%',
        'Base damage up by 5. Effect lasts 0.3 seconds longer',
        'Base damage up by 5. Base area up by 20%'
    ];
    protected _icon: string = 'kitty_water';

    protected _hitboxes: HitBox[] = [];
    public attacRate: number = 3;
    public attackTimeout: number = 3;
    public damage: number = 10;

    public hitDelay: number = 1.5;
    public clearAllAfterDelay: boolean = false;

    private _duration = 1000;

    public Activate(player: PLayer): void {
        for (let i = 0; i < 2; i++)
        {
            this.addProjectile();
        }

        super.Activate(player);
    }

    Attack() {
        for (let i = 0; i < this._hitboxes.length; i++)
        {
            const x = (this.scene.cameras.main.displayWidth * Math.random()) + this.scene.cameras.main.scrollX;
            const y = (this.scene.cameras.main.displayHeight * Math.random()) + this.scene.cameras.main.scrollY;

            const water = this.scene.add.image(x, -50, 'waterAttack');
            this.scene.add.tween({
                targets: water,
                y: y,
                duration: 650,
                delay: Math.random() * 50,
                onComplete: () => {
                    water.destroy();
                    this._hitboxes[ i ].enable(x, y);
                    const anim = this.scene.add.sprite(x, y, 'waterAnim')
                        .play({ key: 'Flames', repeat: -1 })
                        .setDepth((y / Game.Instance.DefaultHeight) * Game.maxDepth)
                        .setScale(this._areaMod * 5);
                    setTimeout(() => {
                        if (anim) anim.destroy();
                    }, this._duration);
                }
            });
        }
    }

    private EnableHitboxes() {
    }

    Upgrade() {
        super.Upgrade();


        if (this._level === 2)
        {
            this.addProjectile();
            this.IncreaseAreaMod(0.2);
        }
        else if (this._level === 3)
        {
            this.damage += 10;
            this._duration += 500;
            for (let box of this.hitboxes) box.duration = this._duration;
        }
        else if (this._level === 4)
        {
            this.addProjectile();
            this.IncreaseAreaMod(0.2);
        }
        else if (this._level === 5)
        {
            this.damage += 10;
            this._duration += 300;
            for (let box of this.hitboxes) box.duration = this._duration;
        }
        else if (this.level === 6)
        {
            this.addProjectile();
            this.IncreaseAreaMod(0.2);
        }
        else if (this._level === 7)
        {
            this.damage += 5;
            this._duration += 300;
            for (let box of this.hitboxes) box.duration = this._duration;
        }
        else if (this._level === 8)
        {
            this.damage += 5;
            this.IncreaseAreaMod(0.2);
        }

        this.Attack();
    }

    private addProjectile() {
        const hitbox = new CircleHitBox(this.scene, 0, 0, 'circle_hitbox', this.damage, 64, true, false)
            .setTint(0x00fff0)
            .setDepth(Game.maxDepth);
        hitbox.duration = this._duration;

        hitbox.disableBody(true, true);
        this._hitboxes.push(hitbox);
    }
}