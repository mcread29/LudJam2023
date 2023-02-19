import { Scene } from "phaser";
import GameScene from "../../scenes/GameScene";
import { PLayer } from "../Player";
import { Attack } from "./Attack";
import { HitBox } from "./HitBox";

export class BookAttack extends Attack {
    protected _name: string = 'Book of Pawbs';
    protected _desc: string = 'Orbits around the player';
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

    public Activate(player: PLayer): void {
        super.Activate(player);

        this.parent = this.scene.add.container(0, 0).setDepth(500).setActive(false);

        this.scene.tweens.add({
            targets: this.parent,
            angle: 360,
            duration: 1500,
            loop: -1
        });

        for (let i = 0; i < 3; i++)
        {
            const hitbox = new HitBox(this.scene, 0, 0, 'box', this.damage, false)
                .setScale(0.1)
                .setTint(0x00fff0)
                .setDepth(500);
            this._hitboxes.push(hitbox);
            this.parent.add(hitbox);
            Phaser.Actions.RotateAroundDistance([ hitbox ], { x: 0, y: 0 }, (i / 3) * Math.PI * 2, 96);
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
        this._level++;
        console.log('Book is now: ', this._level);
    }
}