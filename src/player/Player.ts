import { Enemy } from "../enemies/Enemy";
import Game from "../Game";
import GameScene from "../scenes/GameScene";
import { Vector } from "../Utils/Vector";
import { Attack } from "./attacks/Attack";
import { BookAttack } from "./attacks/BookAttack";
import { HissAttack } from "./attacks/HissAttack";
import { HitBox } from "./attacks/HitBox";
import { LightningAttack } from "./attacks/LightningAttack";
import { SantaWaterAttack } from "./attacks/SantaWaterAttack";
import { SwipeAttack } from "./attacks/SwipeAttack";

const speed = 300;

export class PLayer extends Phaser.Physics.Arcade.Sprite {
    declare body: Phaser.Physics.Arcade.Body;

    keys: { [ k: string ]: Phaser.Input.Keyboard.Key; };

    colliding = false;

    maxHealth = 100;
    health = 100;
    hitstun = 1;

    healthBarBG: Phaser.GameObjects.Image;
    healthBarFG: Phaser.GameObjects.Image;

    dead: boolean = false;

    public maxAttacks = 3;
    attacks: Attack[];

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'coots');
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.body.setSize(this.width, this.height / 4);
        this.body.setOffset(0, this.displayHeight - this.displayHeight / 4);

        this.setCollideWorldBounds(true);

        this.keys = scene.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D,

            up: Phaser.Input.Keyboard.KeyCodes.UP,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        }) as { [ k: string ]: Phaser.Input.Keyboard.Key; };

        scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this.postUpdate, this);

        this.healthBarBG = scene.add.image(0, 0, 'box').setScale(0.2, 0.05).setTint(0x282828).setDepth(500).setOrigin(0, 0.5);
        this.healthBarFG = scene.add.image(0, 0, 'box').setScale(0.2, 0.05).setTint(0xff0000).setDepth(500).setOrigin(0, 0.5);

        this.attacks = [];

        scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            console.log('shutdown');
            scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this.postUpdate, this);
            this.health = 0;
            this.attacks = [];
        });
    }

    protected preUpdate(time: number, delta: number): void {
        this.colliding = false;
    }

    postUpdate(time: number, delta: number) {
        if (this.health <= 0) return;

        this.body.setVelocity(0);
        let inputVector = new Vector(0, 0);

        if (this.keys[ 'w' ].isDown || this.keys[ 'up' ].isDown) inputVector.y--;
        if (this.keys[ 's' ].isDown || this.keys[ 'down' ].isDown) inputVector.y++;
        if (this.keys[ 'a' ].isDown || this.keys[ 'left' ].isDown) inputVector.x--;
        if (this.keys[ 'd' ].isDown || this.keys[ 'right' ].isDown) inputVector.x++;

        if (inputVector.x !== 0)
        {
            this.setFlipX(inputVector.x < 0);
        }

        const move: Vector = inputVector; //.normalize();
        if (move.magnitude > 0) this.body.setImmovable(false);

        this.body.setVelocity(move.x * speed, move.y * speed);

        this.setDepth((this.y / Game.Instance.DefaultHeight) * 100);
        if (this.colliding)
        {
            this.setTint(0xff0000);
            if (this.hitstun <= 0)
            {
                this.health -= 5;
                this.hitstun = 0.5;
                this.healthBarFG.setScale(0.2 * this.health / this.maxHealth, 0.05);

                if (this.health <= 0 && !this.dead)
                {
                    this.dead = true;
                    Game.Instance.manager.eventCenter.emit('player_die');
                }
            }
        }
        else this.setTint(0xffffff);

        this.hitstun -= delta / 1000;

        this.healthBarBG.setPosition(this.x - this.healthBarBG.displayWidth / 2, this.y + this.displayHeight + 5);
        this.healthBarFG.setPosition(this.x - this.healthBarBG.displayWidth / 2, this.y + this.displayHeight + 5);
    }

    collide() {
        this.colliding = true;
        this.body.setImmovable(true);
    }

    AddAttack(attack: Attack) {
        if (attack.active)
        {
            attack.Upgrade();
        }
        else
        {
            attack.Activate(this);
            this.attacks.push(attack);
            this.scene.physics.add.overlap(
                attack.hitboxes,
                (this.scene as GameScene).enemies,
                (a: HitBox, e: Enemy) => attack.Hit(e),
                (a: HitBox, e: Enemy) => attack.CanHit(e)
            );
        }
    }
}