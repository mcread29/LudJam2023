import Game from "../Game";
import { Attack } from "../player/attacks/Attack";
import BaseScene from "./Scene";

export class LevelUpScene extends BaseScene {
    public static SceneName = 'LevelUpScene';

    attacks: Attack[];

    init(data: { attacks: Attack[]; }) {
        this.attacks = this.attacks;
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

        const bg = this.add.nineslice(280, 100, 400, 600, 'panel_bg', [ 5, 5, 5, 5 ]);

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
}