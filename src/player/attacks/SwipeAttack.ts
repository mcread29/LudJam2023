import Game from "../../Game";
import GameScene from "../../scenes/GameScene";
import { Vector } from "../../Utils/Vector";
import { PLayer } from "../Player";
import { Attack } from "./Attack";
import { HitBox } from "./HitBox";

export class SwipeAttack extends Attack {
    protected _name: string = 'Swpies';
    protected _desc: string[] = [
        'Attacks enemies horizontally, passes through enemies',
        'Base damage up by 5',
        'Base damage up by 5',
        'Base damage up by 5. Base area up by 10%',
        'Base damage up by 5',
        'Base damage up by 5. Base area up by 10%',
        'Base damage up by 5',
        'Base damage up by 5'
    ];
    protected _icon: string = 'kitty_slash';

    parent: Phaser.GameObjects.Container;

    damage = 20;
    attacRate = 1.5;
    attackTimeout = 1.5;
    _hitboxes = [];

    leftAttack: HitBox;
    rightAttack: HitBox;

    public hitDelay: number = 1;
    public clearAllAfterDelay: boolean = true;

    public Activate(player: PLayer): void {
        this.leftAttack = new HitBox(this.scene, -player.width / 2, 0, 'slash', this.damage, true)
            .setOrigin(1, 0.5)
            .setBaseScale(0.5)
            .setTint(0x00fff0);
        this.leftAttack.duration = 150;
        this.leftAttack.disableBody(true, true);

        this.rightAttack = new HitBox(this.scene, player.width / 2, 0, 'slash', this.damage, true)
            .setOrigin(0, 0.5)
            .setBaseScale(0.5)
            .setTint(0x00fff0)
            .setFlip(true, true);
        this.rightAttack.duration = 150;
        this.rightAttack.disableBody(true, true);

        this.parent = this.scene.add.container(0, 0, [ this.leftAttack, this.rightAttack ])
            .setDepth(Game.maxDepth);

        this._hitboxes = [ this.leftAttack, this.rightAttack ];

        super.Activate(player);
    }

    setPosition(x?: number, y?: number, z?: number, w?: number): this {
        this.parent.setPosition(x, y, z);
        return this;
    }

    Attack() {
        this.setPosition(this._player.x, this._player.y);

        this.leftAttack.enable(-this._player.width / 2, 0);
        this.rightAttack.enable(this._player.width / 2, 0);
    }

    Upgrade() {
        super.Upgrade();

        if (this._level === 2)
        {
            this.damage += 5;
        }
        else if (this._level === 3)
        {
            this.damage += 5;
        }
        else if (this._level === 4)
        {
            this.damage += 5;
            this.IncreaseAreaMod(0.1);
        }
        else if (this._level === 5)
        {
            this.damage += 5;
        }
        else if (this.level === 6)
        {
            this.damage += 5;
            this.IncreaseAreaMod(0.1);
        }
        else if (this._level === 7)
        {
            this.damage += 5;
        }
        else if (this._level === 8)
        {
            this.damage += 5;
        }

        this.Attack();
    }
}