import Game from "../Game";
import { Attack, PowerUp } from "../player/attacks/Attack";
import BaseScene from "./Scene";

export class PowerUpDisplay extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number, attack: PowerUp, callback: () => void, callbackContext: any) {
        super(scene, x, y,);
        scene.add.existing(this);

        const bg = scene.add.nineslice(0, 0, 360, 100, 'border_1', [ 44, 44, 44, 44 ])
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, () => {
                Game.Instance.manager.AddAttack(attack);
                callback.call(callbackContext);
            });

        const icon = scene.add.image(25, 25, attack.icon);

        const name = scene.add.rexBBCodeText(30 + icon.width / 2, 25, attack.name, {
            fontFamily: 'Comic Sans MS',
            color: '#ffffff',
            fontSize: '20px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0, 0.5);

        const desc = scene.add.rexBBCodeText(25 - icon.width / 2, 30 + icon.height / 2, attack.desc, {
            fontFamily: 'Comic Sans MS',
            color: '#ffffff',
            fontSize: '15px',
            halign: 'left',
            valign: 'center',
            wrap: {
                mode: 'word',
                width: 240
            }
        }).setOrigin(0, 0);

        this.add([ bg, icon, name, desc ]);
    }
}

export class LevelUpScene extends BaseScene {
    public static SceneName = 'LevelUpScene';

    attacks: PowerUp[];

    init(data: { attacks: PowerUp[]; }) {
        this.attacks = data.attacks;
    }

    create(): void {
        const meterBG = this.add.nineslice(0, 0, Game.Instance.DefaultWidth, 32, 'meter', [ 9, 9, 9, 9 ]);
        const meterFill = this.add.nineslice(0, 0, Game.Instance.DefaultWidth, 32, 'meter-fill', [ 9, 9, 9, 9 ])
            .setTint(0x7556e8);

        this.tweens.addCounter({
            from: 255,
            to: 0,
            duration: 500,
            onUpdate: function (tween) {
                const value = Math.floor(tween.getValue());
                meterFill.setTint(Phaser.Display.Color.GetColor(value, value, value));
            },
            loop: -1,
            yoyo: true
        });

        const bg = this.add.nineslice(280, 100, 400, 115 + 105 * this.attacks.length, 'panel_bg', [ 5, 5, 5, 5 ]);

        let space = 0;
        for (const attack of this.attacks)
        {
            new PowerUpDisplay(this, 300, 200 + space, attack, this.close, this);
            space += 105;
        }

        this.add.rexBBCodeText(480, 150, 'Level Up!', {
            fontFamily: 'Comic Sans MS',
            color: '#ffffff',
            fontSize: '50px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5);

        const startButton = this.add.image(Game.Instance.DefaultWidth / 2, Game.Instance.DefaultHeight / 2 + 200, 'box')
            .setScale(1, 0.3)
            .setInteractive().on(Phaser.Input.Events.POINTER_DOWN, () => {
                Game.Instance.manager.LevelUpClosed();
            });

        const startText = this.add.rexBBCodeText(Game.Instance.DefaultWidth / 2, Game.Instance.DefaultHeight / 2, 'Close [TEMP]', {
            fontFamily: 'Comic Sans MS',
            color: '#ff0000',
            fontSize: '25px',
            halign: 'center',
            valign: 'center'
        }).setDepth(100).setOrigin(0.5);
        Phaser.Display.Align.In.Center(startText, startButton);
    }

    close() {
        Game.Instance.manager.LevelUpClosed();
    }
}