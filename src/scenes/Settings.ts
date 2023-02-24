import Game from "../Game";
import { Utils } from "../Utils/Utils";
import BaseScene from "./Scene";

export class SettingsScene extends BaseScene {
    public static SceneName: string = 'SettingsScene';

    meterFillMask: Phaser.GameObjects.Graphics;
    volumeMeterFill: Phaser.GameObjects.RenderTexture;

    create(): void {
        super.create();
        const bg = this.add.image(0, 0, 'box')
            .setTint(0x000000)
            .setAlpha(0.7)
            .setInteractive()
            .setOrigin(0)
            .setDisplaySize(Game.Instance.DefaultWidth, Game.Instance.DefaultHeight);

        const panel = this.add.nineslice(Game.Instance.DefaultWidth / 2, Game.Instance.DefaultHeight / 2, 400, 500, 'panel_bg', [ 10, 10, 10, 10 ]).setOrigin(0.5);

        const header = this.add.rexBBCodeText(0, 0, 'SETTINGS', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '50px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5, 0).setResolution(5);
        Phaser.Display.Align.In.TopCenter(header, panel, 0, -25);

        const volumeText = this.add.rexBBCodeText(0, 0, 'VOLUME', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '35px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5, 0).setResolution(5);
        Phaser.Display.Align.In.Center(volumeText, panel, 0, -100);

        const volumeMeterBG = this.add.nineslice(0, 0, 300, 32, 'meter', [ 9, 9, 9, 9 ]);
        Phaser.Display.Align.In.Center(volumeMeterBG, panel, 0, -60);
        const volumeMeterFill = this.volumeMeterFill = this.add.nineslice(0, 0, 300, 32, 'meter-fill', [ 9, 9, 9, 9 ])
            .setTint(0x00ffff);
        Phaser.Display.Align.In.Center(volumeMeterFill, panel, 0, -60);

        this.meterFillMask = this.make.graphics({});
        this.meterFillMask.setPosition(0, 0).fillStyle(0xffffff);
        this.meterFillMask.beginPath();
        this.meterFillMask.fillRect(volumeMeterFill.x, volumeMeterFill.y, Game.Instance.music.volume * volumeMeterFill.width, 32);

        volumeMeterFill.setMask(this.meterFillMask.createGeometryMask());

        const lowerVolButton = this.add.image(0, 0, 'vol_button').setFlipX(true);
        Phaser.Display.Align.To.LeftCenter(lowerVolButton, volumeMeterBG, 10, 0);
        Utils.AddButtonBounce(this, lowerVolButton, () => {
            Game.Instance.music.LowerVolume();
            this.meterFillMask.clear();
            this.meterFillMask.fillRect(volumeMeterFill.x, volumeMeterFill.y, Game.Instance.music.volume * volumeMeterFill.width, 32);
            Game.Instance.playerData.save();
        });
        const raiseVolButton = this.add.image(0, 0, 'vol_button');
        Phaser.Display.Align.To.RightCenter(raiseVolButton, volumeMeterBG, 10, 0);
        Utils.AddButtonBounce(this, raiseVolButton, () => {
            Game.Instance.music.RaiseVolume();
            this.meterFillMask.clear();
            this.meterFillMask.fillRect(volumeMeterFill.x, volumeMeterFill.y, Game.Instance.music.volume * volumeMeterFill.width, 32);
            Game.Instance.playerData.save();
        });

        const reset = this.add.nineslice(0, 0, 325, 56, 'meter', [ 9, 9, 9, 9 ]);
        const resetText = this.add.rexBBCodeText(0, 0, 'Reset Progress', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '35px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5).setResolution(5);

        Utils.AddButtonBounce(this, reset, () => this.addResetPanel(), resetText);
        Phaser.Display.Align.In.Center(reset, panel, 0, 60);
        Phaser.Display.Align.In.Center(resetText, reset);

        const close = this.add.nineslice(0, 0, 180, 56, 'meter', [ 9, 9, 9, 9 ]);
        const buttonText = this.add.rexBBCodeText(0, 0, 'CLOSE', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '40px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5).setResolution(5);
        Utils.AddButtonBounce(this, close, () => Game.Instance.scene.stop(SettingsScene.SceneName), buttonText);

        Phaser.Display.Align.In.BottomCenter(close, panel, 0, -25);
        Phaser.Display.Align.In.Center(buttonText, close);
    }

    private addResetPanel() {
        const closePanel = () => {
            bg.destroy();
            panel.destroy();
            text.destroy();
            yes.destroy();
            yesText.destroy();
            no.destroy();
            noText.destroy();
        };

        const bg = this.add.image(0, 0, 'box')
            .setTint(0x000000)
            .setAlpha(0.7)
            .setInteractive()
            .setOrigin(0)
            .setDisplaySize(Game.Instance.DefaultWidth, Game.Instance.DefaultHeight);

        const panel = this.add.nineslice(Game.Instance.DefaultWidth / 2, Game.Instance.DefaultHeight / 2, 500, 200, 'panel_bg', [ 10, 10, 10, 10 ]).setOrigin(0.5);

        const text = this.add.rexBBCodeText(0, 0, 'Are you sure?', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '40px',
            halign: 'center',
            valign: 'center'
        });
        Phaser.Display.Align.In.TopCenter(text, panel, 0, -25);

        const yes = this.add.nineslice(0, 0, 180, 56, 'meter', [ 9, 9, 9, 9 ]);
        const yesText = this.add.rexBBCodeText(0, 0, 'YES', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '40px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5).setResolution(5);
        Utils.AddButtonBounce(this, yes, () => {
            Game.Instance.playerData.reset();

            Game.Instance.music.SetVolume(Game.Instance.playerData.saveData.volume);
            this.meterFillMask.clear();
            this.meterFillMask.fillRect(this.volumeMeterFill.x, this.volumeMeterFill.y, Game.Instance.music.volume * this.volumeMeterFill.width, 32);

            closePanel();
        }, yesText);

        Phaser.Display.Align.In.BottomLeft(yes, panel, -25, -25);
        Phaser.Display.Align.In.Center(yesText, yes);

        const no = this.add.nineslice(0, 0, 180, 56, 'meter', [ 9, 9, 9, 9 ]);
        const noText = this.add.rexBBCodeText(0, 0, 'NO', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '40px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5).setResolution(5);
        Utils.AddButtonBounce(this, no, () => {
            closePanel();
        }, noText);

        Phaser.Display.Align.In.BottomRight(no, panel, -25, -25);
        Phaser.Display.Align.In.Center(noText, no);
    }
}