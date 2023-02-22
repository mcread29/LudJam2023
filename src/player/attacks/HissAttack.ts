import Game from "../../Game";
import GameScene from "../../scenes/GameScene";
import { PLayer } from "../Player";
import { Attack } from "./Attack";
import { CircleHitBox } from "./CircleHitbox";
import { HitBox } from "./HitBox";

export class HissAttack extends Attack {
    protected _name: string = 'Uh Oh';
    protected _desc: string[] = [
        'Damages nearby enemies',
        'Base area up by 40%. Base damage up by 2',
        'Cooldown reduced by 0.1 seconds. Base damage up by 1',
        'Base area up by 20%. Base damage up by 1',
        'Cooldown reduced by 0.1 seconds. Base damage up by 2',
        'Base area up by 20%. Base damage up by 1',
        'Cooldown reduced by 0.1 seconds. Base damage up by 1',
        'Base area up by 20%. Base damage up by 1'
    ];
    protected _icon: string = 'uh_oh';

    _hitboxes: HitBox[];
    public attacRate: number = 0;
    public attackTimeout: number = 0;
    public damage: number = 5;

    public hitDelay: number = 1;
    public clearAllAfterDelay: boolean = false;

    public Activate(player: PLayer): void {
        this._hitboxes = [
            new CircleHitBox(this.scene, 0, 0, 'circle_hitbox', this.damage, 64, false)
                .setTint(0x00fff0)
                .setDepth(Game.maxDepth)
                .setAlpha(0.25)
        ];

        super.Activate(player);
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);
        this._hitboxes[ 0 ].setPosition(this._player.x, this._player.y);
    }

    Attack() {
        // throw new Error("Method not implemented.");
    }

    Upgrade() {
        super.Upgrade();

        if (this._level === 2)
        {
            this.damage += 2;
            this.IncreaseAreaMod(0.4);
        }
        else if (this._level === 3)
        {
            this.damage += 1;
            this.hitDelay -= 0.1;
        }
        else if (this._level === 4)
        {
            this.damage += 1;
            this.IncreaseAreaMod(0.2);
        }
        else if (this._level === 5)
        {
            this.damage += 2;
            this.hitDelay -= 1;
        }
        else if (this.level === 6)
        {
            this.damage += 1;
            this.IncreaseAreaMod(0.2);
        }
        else if (this._level === 7)
        {
            this.damage += 1;
            this.hitDelay -= 0.1;
        }
        else if (this._level === 8)
        {
            this.damage += 1;
            this.IncreaseAreaMod(0.2);
        }

        this.Attack();
    }
}