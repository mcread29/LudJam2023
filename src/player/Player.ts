import { Enemy } from "../enemies/Enemy";
import Game from "../Game";
import { Destructable } from "../objects/Destructable";
import GameScene from "../scenes/GameScene";
import { Vector } from "../Utils/Vector";
import { Attack } from "./attacks/Attack";
import { HitBox } from "./attacks/HitBox";
import { Item } from "./items/Item";

const speed = 300;

export class PLayer extends Phaser.Physics.Arcade.Sprite {
    declare body: Phaser.Physics.Arcade.Body;

    attractBody: Phaser.Physics.Arcade.Sprite;

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

    public maxItems = 3;
    items: Item[];

    private _speedMod: number = 1;

    private _attractMod: number = 1;

    private _attackGroup: Phaser.GameObjects.Group;
    public get attackGroup(): Phaser.GameObjects.Group { return this._attackGroup; }

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'coots');
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this._attackGroup = scene.add.group();

        scene.physics.add.overlap(
            this._attackGroup,
            (this.scene as GameScene).enemies,
            (a: HitBox, e: Enemy) => a.attack.Hit(e),
            (a: HitBox, e: Enemy) => a.attack.CanHit(e)
        );

        scene.physics.add.overlap(
            this._attackGroup,
            (this.scene as GameScene).destructables,
            (a: HitBox, d: Destructable) => d.Destruct()
        );

        this.attractBody = new Phaser.Physics.Arcade.Sprite(scene, 0, 0, 'circle_hitbox');
        scene.physics.add.existing(this.attractBody);
        scene.add.existing(this.attractBody);
        this.attractBody.setCircle(64)
            .disableBody(true, true)
            .enableBody(false, 0, 0, true, false);

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

        this.healthBarBG = scene.add.image(0, 0, 'box').setScale(0.2, 0.05).setTint(0x282828).setDepth(Game.maxDepth).setOrigin(0, 0.5);
        this.healthBarFG = scene.add.image(0, 0, 'box').setScale(0.2, 0.05).setTint(0xff0000).setDepth(Game.maxDepth).setOrigin(0, 0.5);


        this.attacks = [];
        this.items = [];

        scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this.postUpdate, this);
            this.health = 0;
            this.attacks = [];
        });

        this.IncreaseSpeedMod(0.05 * Game.Instance.playerData.saveData.WickedTier);
        this.IncreaseAttractMod(1 + (0.05 * Game.Instance.playerData.saveData.SuccTier));
        this.maxHealth *= 1 + (0.05 * Game.Instance.playerData.saveData.StarTier);
        this.health *= 1 + (0.05 * Game.Instance.playerData.saveData.StarTier);

    }

    protected preUpdate(time: number, delta: number): void {
        this.colliding = false;
    }

    postUpdate(time: number, delta: number) {
        if (this.dead) return;

        this.body.setVelocity(0);
        let inputVector = new Phaser.Math.Vector2(0, 0);

        if (this.keys[ 'w' ].isDown || this.keys[ 'up' ].isDown) inputVector.y--;
        if (this.keys[ 's' ].isDown || this.keys[ 'down' ].isDown) inputVector.y++;
        if (this.keys[ 'a' ].isDown || this.keys[ 'left' ].isDown) inputVector.x--;
        if (this.keys[ 'd' ].isDown || this.keys[ 'right' ].isDown) inputVector.x++;

        if (inputVector.x !== 0)
        {
            this.setFlipX(inputVector.x < 0);
        }

        const move: Phaser.Math.Vector2 = inputVector.normalize();
        if (move.length() > 0) this.body.setImmovable(false);
        else this.body.setImmovable(true);

        this.body.setVelocity(Math.round(move.x * speed * this._speedMod), Math.round(move.y * speed * this._speedMod));

        this.setDepth((this.y / this.scene.physics.world.bounds.height) * Game.maxDepth);
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
                    this.body.setImmovable(true);
                    Game.Instance.manager.eventCenter.emit('player_die');
                    for (const attack of this.attacks)
                    {
                        attack.Deactivate();
                    }
                }
            }
        }
        else this.setTint(0xffffff);

        this.hitstun -= delta / 1000;

        this.healthBarBG.setPosition(this.x - this.healthBarBG.displayWidth / 2, this.y + this.displayHeight + 5);
        this.healthBarFG.setPosition(this.x - this.healthBarBG.displayWidth / 2, this.y + this.displayHeight + 5);

        this.attractBody.setPosition(this.x, this.y);
    }

    collide() {
        this.colliding = true;
    }

    IncreaseDamageMod(amount: number) {
        for (let attack of this.attacks)
        {
            attack.IncreaseDamageMod(amount);
        }
    }

    IncreaseHealthMod(amount: number) {
        this.maxHealth *= amount;
        this.health *= amount;
    }

    IncreaseSpeedMod(amount: number) {
        this._speedMod += amount;
    }

    IncreaseAreaMod(amount: number) {
        for (let attack of this.attacks)
        {
            attack.IncreaseAreaMod(amount);
        }
    }

    IncreaseAttractMod(amount: number) {
        this._attractMod *= amount;
        this.attractBody.setScale(this._attractMod);
    }

    Heal(health: number) {
        this.health = Math.min((this.health + health), this.maxHealth);
        this.healthBarFG.setScale(0.2 * this.health / this.maxHealth, 0.05);
    }
}