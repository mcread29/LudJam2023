import Game from "../Game";
import { Attack, PowerUp } from "../player/attacks/Attack";
import BaseScene from "./Scene";

export class PowerUpGameOverDisplay extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number, private _attack: Attack) {
        super(scene, x, y);
        scene.add.existing(this);

        const bg = scene.add.nineslice(0, 0, 360, 100, 'border_1', [ 44, 44, 44, 44 ]);

        const icon = scene.add.image(25, 25, _attack.icon);

        const name = scene.add.rexBBCodeText(30 + icon.width / 2, 25, _attack.name, {
            fontFamily: 'ExpressionPro',
            color: '#ffffff',
            fontSize: '30px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0, 0.5).setResolution(5);

        const desc = scene.add.rexBBCodeText(25, 30 + icon.height / 2, `Enemies Killed: ${_attack.numKilled}`, {
            fontFamily: 'ExpressionPro',
            color: '#ffffff',
            fontSize: '20px',
            halign: 'left',
            valign: 'center',
            wrap: {
                mode: 'word',
                width: 240
            }
        }).setOrigin(0, 0).setResolution(5);

        const text = `Damage: ${Math.round(_attack.damageDealt)}`;
        const lvl = scene.add.rexBBCodeText(25, 30 + icon.height, text, {
            fontFamily: 'ExpressionPro',
            color: '#ffffff',
            fontSize: '20px',
            halign: 'right',
            valign: 'center',
            wrap: {
                mode: 'word',
                width: 240
            }
        }).setOrigin(1, 0).setResolution(5);

        this.add([ bg, icon, name, desc, lvl ]);
    }
}

export class GameOverScene extends BaseScene {
    public static SceneName = 'GameOverScene';

    create(): void {
        const done = () => {
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
                x: -100 + button.width / 2,
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
                    Game.Instance.manager.ReturnToMenu();
                }
            });
        };

        this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (e: Phaser.Input.Keyboard.Key) => {
            if (e.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE || e.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER)
            {
                done();
            }
        });

        const attacks = Game.Instance.manager.player.attacks;
        const bg = this.add.nineslice(280, 100, 400, 115 + 105 * (attacks.length + 1), 'panel_bg', [ 5, 5, 5, 5 ]);

        this.add.rexBBCodeText(480, 150, 'GAME OVER', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '50px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5).setResolution(5);

        let space = 0;
        for (let i = 0; i < attacks.length; i++)
        {
            const attack = attacks[ i ];
            const powerUp = new PowerUpGameOverDisplay(this, 300, 200 + space, attack);
            space += 105;
        }

        const mask1 = this.make.graphics({})
            .setPosition(0, 0)
            .fillStyle(0xffffff)
            .beginPath()
            .fillRect(285, 105, 390, 115 + 100 * (attacks.length + 1))
            .createGeometryMask();

        const button = this.add.nineslice(300, 200 + space, 360, 100, 'border_1', [ 44, 44, 44, 44 ])
            .setOrigin(0)
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, done)
            .setMask(mask1);

        const text = this.add.rexBBCodeText(button.x + button.width / 2, button.y + button.height / 2, 'DONE', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '50px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5).setMask(mask1);

        const arrow = this.add.image(0, 200 + space + 80, 'arrow_1').setMask(mask1);

        this.add.tween({
            targets: arrow,
            x: 300,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.Out
        });
    }
}