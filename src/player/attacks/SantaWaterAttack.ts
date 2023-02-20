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

    public Activate(player: PLayer): void {
        for (let i = 0; i < 2; i++)
        {
            const hitbox = new CircleHitBox(this.scene, 0, 0, 'circle_hitbox', this.damage, 64, true)
                .setTint(0x00fff0)
                .setDepth(500);
            hitbox.duration = 1000;

            hitbox.disableBody(true, true);
            this._hitboxes.push(hitbox);
        }

        super.Activate(player);
    }

    Attack() {
        for (let i = 0; i < this._hitboxes.length; i++)
        {
            const x = (this.scene.cameras.main.displayWidth * Math.random()) + this.scene.cameras.main.scrollX;
            const y = (this.scene.cameras.main.displayHeight * Math.random()) + this.scene.cameras.main.scrollY;

            this._hitboxes[ i ].enable(x, y);
        }
    }

    Upgrade() {
        this._level++;
    }
}