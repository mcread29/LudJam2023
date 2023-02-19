import { Enemy } from "../../enemies/Enemy";
import GameScene from "../../scenes/GameScene";
import { PLayer } from "../Player";
import { Attack } from "./Attack";
import { HitBox } from "./HitBox";

export class LightningAttack extends Attack {
    protected _name: string = 'Kitty Lightning';
    protected _desc: string = 'Strikes at random enemies';
    protected _icon: string = 'kitty_lit';

    _hitboxes: HitBox[] = [];

    public attacRate: number = 0.75;
    public attackTimeout: number = 0.75;
    public damage: number = 5;

    public hitDelay: number = 0.5;
    public clearAllAfterDelay: boolean = true;

    public Activate(player: PLayer): void {
        super.Activate(player);

        for (let i = 0; i < 2; i++)
        {
            const hitbox = new HitBox(this.scene, 0, 0, 'box', this.damage, true)
                .setScale(0.1)
                .setTint(0x00fff0)
                .setDepth(500);

            hitbox.disableBody(true, true);
            this._hitboxes.push(hitbox);
        }
    }

    Attack() {
        const enemies = this.scene.enemies.children.entries.filter((value: Enemy) => this.scene.cameras.main.worldView.contains(value.x, value.y));
        let enemiesToTarget: Enemy[] = enemies.sort(() => 0.5 - Math.random()) as Enemy[];

        for (let i = 0; i < this._hitboxes.length; i++)
        {
            let enemy = enemiesToTarget[ i ];
            if (enemy)
            {
                this._hitboxes[ i ].enable(enemiesToTarget[ i ].x, enemiesToTarget[ i ].y);
            }
        }
        console.log('atack');
    }

    Upgrade() {
        this._level++;
        console.log('Lightning is now: ', this._level);
    }
}