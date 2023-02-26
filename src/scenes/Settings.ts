import Game from "../Game";
import { Utils } from "../Utils/Utils";
import BaseScene from "./Scene";

export class SettingsScene extends BaseScene {
    public static SceneName: string = 'SettingsScene';

    musicMeterFillMask: Phaser.GameObjects.Graphics;
    musicVolumeMeterFill: Phaser.GameObjects.RenderTexture;
    sfxMeterFillMask: Phaser.GameObjects.Graphics;
    sfxVolumeMeterFill: Phaser.GameObjects.RenderTexture;

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

        {   // MUSIC VOLUME
            const volumeText = this.add.rexBBCodeText(0, 0, 'MUSIC VOLUME', {
                fontFamily: 'FutilePro',
                color: '#ffffff',
                fontSize: '35px',
                halign: 'center',
                valign: 'center'
            }).setOrigin(0.5, 0).setResolution(5);
            Phaser.Display.Align.In.Center(volumeText, panel, 0, -50);

            const volumeMeterBG = this.add.nineslice(0, 0, 300, 32, 'meter', [ 9, 9, 9, 9 ]);
            Phaser.Display.Align.In.Center(volumeMeterBG, panel, 0, -10);
            const volumeMeterFill = this.musicVolumeMeterFill = this.add.nineslice(0, 0, 300, 32, 'meter-fill', [ 9, 9, 9, 9 ])
                .setTint(0x00ffff);
            Phaser.Display.Align.In.Center(volumeMeterFill, panel, 0, -10);

            this.musicMeterFillMask = this.make.graphics({});
            this.musicMeterFillMask.setPosition(0, 0).fillStyle(0xffffff);
            this.musicMeterFillMask.beginPath();
            this.musicMeterFillMask.fillRect(volumeMeterFill.x, volumeMeterFill.y, Game.Instance.music.volume * volumeMeterFill.width, 32);

            volumeMeterFill.setMask(this.musicMeterFillMask.createGeometryMask());

            const lowerVolButton = this.add.image(0, 0, 'vol_button').setFlipX(true);
            Phaser.Display.Align.To.LeftCenter(lowerVolButton, volumeMeterBG, 10, 0);
            Utils.AddButtonBounce(this, lowerVolButton, () => {
                Game.Instance.music.LowerVolume();
                this.musicMeterFillMask.clear();
                this.musicMeterFillMask.fillRect(volumeMeterFill.x, volumeMeterFill.y, Game.Instance.music.volume * volumeMeterFill.width, 32);
                Game.Instance.playerData.save();
                Game.Instance.sfx.PlayButton(Game.Instance.music.volume);
            });
            const raiseVolButton = this.add.image(0, 0, 'vol_button');
            Phaser.Display.Align.To.RightCenter(raiseVolButton, volumeMeterBG, 10, 0);
            Utils.AddButtonBounce(this, raiseVolButton, () => {
                Game.Instance.music.RaiseVolume();
                this.musicMeterFillMask.clear();
                this.musicMeterFillMask.fillRect(volumeMeterFill.x, volumeMeterFill.y, Game.Instance.music.volume * volumeMeterFill.width, 32);
                Game.Instance.playerData.save();
                Game.Instance.sfx.PlayButton(Game.Instance.music.volume);
            });
        }
        {   // SFX VOLUME
            const volumeText = this.add.rexBBCodeText(0, 0, 'SFX VOLUME', {
                fontFamily: 'FutilePro',
                color: '#ffffff',
                fontSize: '35px',
                halign: 'center',
                valign: 'center'
            }).setOrigin(0.5, 0).setResolution(5);
            Phaser.Display.Align.In.Center(volumeText, panel, 0, -140);

            const volumeMeterBG = this.add.nineslice(0, 0, 300, 32, 'meter', [ 9, 9, 9, 9 ]);
            Phaser.Display.Align.In.Center(volumeMeterBG, panel, 0, -100);
            const volumeMeterFill = this.sfxVolumeMeterFill = this.add.nineslice(0, 0, 300, 32, 'meter-fill', [ 9, 9, 9, 9 ])
                .setTint(0x00ffff);
            Phaser.Display.Align.In.Center(volumeMeterFill, panel, 0, -100);

            this.sfxMeterFillMask = this.make.graphics({});
            this.sfxMeterFillMask.setPosition(0, 0).fillStyle(0xffffff);
            this.sfxMeterFillMask.beginPath();
            this.sfxMeterFillMask.fillRect(volumeMeterFill.x, volumeMeterFill.y, Game.Instance.sfx.volume * volumeMeterFill.width, 32);

            volumeMeterFill.setMask(this.sfxMeterFillMask.createGeometryMask());

            const lowerVolButton = this.add.image(0, 0, 'vol_button').setFlipX(true);
            Phaser.Display.Align.To.LeftCenter(lowerVolButton, volumeMeterBG, 10, 0);
            Utils.AddButtonBounce(this, lowerVolButton, () => {
                Game.Instance.sfx.LowerVolume();
                this.sfxMeterFillMask.clear();
                this.sfxMeterFillMask.fillRect(volumeMeterFill.x, volumeMeterFill.y, Game.Instance.sfx.volume * volumeMeterFill.width, 32);
                Game.Instance.playerData.save();
                Game.Instance.sfx.PlayButton(Game.Instance.sfx.volume);
            });
            const raiseVolButton = this.add.image(0, 0, 'vol_button');
            Phaser.Display.Align.To.RightCenter(raiseVolButton, volumeMeterBG, 10, 0);
            Utils.AddButtonBounce(this, raiseVolButton, () => {
                Game.Instance.sfx.RaiseVolume();
                this.sfxMeterFillMask.clear();
                this.sfxMeterFillMask.fillRect(volumeMeterFill.x, volumeMeterFill.y, Game.Instance.sfx.volume * volumeMeterFill.width, 32);
                Game.Instance.playerData.save();
                Game.Instance.sfx.PlayButton(Game.Instance.sfx.volume);
            });
        }

        const icon = this.add.image(0, 0, 'icon_bg');
        const fill = this.add.image(0, 0, 'upgrade_fill');
        if (Game.Instance.playerData.saveData.SkipCutscenes) fill.setTint(0x00ffff);
        const skip = this.add.nineslice(0, 0, 250, 46, 'meter', [ 9, 9, 9, 9 ]);
        const skipText = this.add.rexBBCodeText(0, 0, 'Skip Cutscenes', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '30px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5).setResolution(5);

        Utils.AddButtonBounce(this, skip, () => {
            Game.Instance.sfx.PlayButton();
            Game.Instance.playerData.saveData.SkipCutscenes = !Game.Instance.playerData.saveData.SkipCutscenes;
            Game.Instance.playerData.save();
            console.log(Game.Instance.playerData.saveData.SkipCutscenes);
            if (Game.Instance.playerData.saveData.SkipCutscenes) fill.setTint(0x00ffff);
            else fill.setTint(0xffffff);
        }, skipText);

        Phaser.Display.Align.In.Center(icon, panel, -134, 50);
        Phaser.Display.Align.In.Center(fill, panel, -134, 50);
        Phaser.Display.Align.In.Center(skip, panel, 22, 50);
        Phaser.Display.Align.In.Center(skipText, skip);

        const reset = this.add.nineslice(0, 0, 325, 56, 'meter', [ 9, 9, 9, 9 ]);
        const resetText = this.add.rexBBCodeText(0, 0, 'Reset Progress', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '35px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5).setResolution(5);

        Utils.AddButtonBounce(this, reset, () => {
            Game.Instance.sfx.PlayButton();
            this.addResetPanel();
        }, resetText);
        Phaser.Display.Align.In.Center(reset, panel, 0, 120);
        Phaser.Display.Align.In.Center(resetText, reset);

        const close = this.add.nineslice(0, 0, 180, 56, 'meter', [ 9, 9, 9, 9 ]);
        const buttonText = this.add.rexBBCodeText(0, 0, 'CLOSE', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '40px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5).setResolution(5);
        Utils.AddButtonBounce(this, close, () => {
            Game.Instance.sfx.PlayButton();
            Game.Instance.scene.stop(SettingsScene.SceneName);
        }, buttonText);

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
            Game.Instance.sfx.PlayButton();
            Game.Instance.playerData.reset();

            Game.Instance.music.SetVolume(Game.Instance.playerData.saveData.musicVolume);
            this.musicMeterFillMask.clear();
            this.musicMeterFillMask.fillRect(this.musicVolumeMeterFill.x, this.musicVolumeMeterFill.y, Game.Instance.music.volume * this.musicVolumeMeterFill.width, 32);

            this.sfxMeterFillMask.clear();
            this.sfxMeterFillMask.fillRect(this.sfxVolumeMeterFill.x, this.sfxVolumeMeterFill.y, Game.Instance.music.volume * this.sfxVolumeMeterFill.width, 32);

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
            Game.Instance.sfx.PlayButton();
            closePanel();
        }, noText);

        Phaser.Display.Align.In.BottomRight(no, panel, -25, -25);
        Phaser.Display.Align.In.Center(noText, no);
    }
}