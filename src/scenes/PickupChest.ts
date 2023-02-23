import Game from "../Game";
import { PowerUp } from "../player/attacks/Attack";
import BaseScene from "./Scene";

export class PickupChestScene extends BaseScene {
    public static SceneName = 'PickupChestScene';

    powerUp: PowerUp;
    animComplete: boolean;

    init(data: { powerUp: PowerUp; }) {
        this.powerUp = data.powerUp;
    }

    shutdown(): void {
        this.powerUp = null;
        this.animComplete = null;

        super.shutdown();
    }

    create(): void {
        this.animComplete = false;
        const bg = this.add.nineslice(280, 100, 400, 430, 'panel_bg', [ 5, 5, 5, 5 ]);

        const done = () => {
            if (this.animComplete === false) return;

            this.animComplete = false;
            arrow.setTexture('arrow_2');

            this.add.tween({
                targets: arrow,
                x: -100,
                duration: 300,
                delay: 500,
                ease: Phaser.Math.Easing.Sine.Out,
            });

            this.add.tween({
                targets: text,
                x: -100,
                duration: 300,
                delay: 500,
                ease: Phaser.Math.Easing.Sine.Out
            });

            this.add.tween({
                targets: button,
                x: -100,
                duration: 300,
                delay: 500,
                ease: Phaser.Math.Easing.Sine.Out,
                onComplete: () => {
                    Game.Instance.manager.AddAttack(this.powerUp);
                    Game.Instance.manager.PickupChestClosed();
                }
            });
        };

        this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (e: Phaser.Input.Keyboard.Key) => {
            if (e.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE || e.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER)
            {
                done();
            }
        });

        const mask1 = this.make.graphics({})
            .setPosition(0, 0)
            .fillStyle(0xffffff)
            .beginPath()
            .fillRect(285, 105, 390, 430)
            .createGeometryMask();

        const button = this.add.nineslice(480, 460, 360, 100, 'border_1', [ 44, 44, 44, 44 ])
            .setOrigin(0.5)
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, done)
            .setMask(mask1);

        const text = this.add.rexBBCodeText(button.x, button.y, 'DONE', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '50px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5).setMask(mask1);

        const arrow = this.add.image(0, 490, 'arrow_1').setMask(mask1);

        const chest = this.add.sprite(button.x, 385, 'chestAnim')
            .setOrigin(0.5, 1)
            .play({ key: 'Big_Chest' })
            .on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.add.tween({
                    targets: icon,
                    y: 175,
                    ease: Phaser.Math.Easing.Quadratic.Out,
                    duration: 500,
                    onComplete: () => {
                        this.add.tween({
                            targets: arrow,
                            x: 300,
                            duration: 300,
                            ease: Phaser.Math.Easing.Sine.Out,
                            onComplete: () => this.animComplete = true
                        });
                    }
                });
            });

        const mask2 = this.make.graphics({})
            .setPosition(0, 0)
            .fillStyle(0xffffff)
            .beginPath()
            .fillRect(285, 105, 390, 261)
            .createGeometryMask();

        const icon = this.add.image(button.x, 400, this.powerUp.icon).setMask(mask2);
    }

}