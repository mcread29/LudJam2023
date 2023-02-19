import GameScene from "../../scenes/GameScene";
import { PLayer } from "../Player";
import { Attack } from "./Attack";
import { CircleHitBox } from "./CircleHitbox";
import { HitBox } from "./HitBox";

export class HissAttack extends Attack {
    protected _name: string = 'Uh Oh';
    protected _desc: string = 'Damages nearby enemies';
    protected _icon: string = 'uh_oh';

    _hitboxes: HitBox[];
    public attacRate: number = 0;
    public attackTimeout: number = 0;
    public damage: number = 5;

    public hitDelay: number = 1;
    public clearAllAfterDelay: boolean = false;

    public Activate(player: PLayer): void {
        super.Activate(player);

        this._hitboxes = [ new CircleHitBox(this.scene, 0, 0, 'circle_hitbox', this.damage, 64, false)
            .setTint(0x00fff0)
            .setDepth(500)
            .setAlpha(0.25)
        ];
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);
        this._hitboxes[ 0 ].setPosition(this._player.x, this._player.y);
    }

    Attack() {
        // throw new Error("Method not implemented.");
    }

    Upgrade() {
        this._level++;
        console.log('Hiss is now: ', this._level);
    }
}