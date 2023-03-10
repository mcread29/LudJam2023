import Game from "../Game";
import { Utils } from "../Utils/Utils";
import GameScene from "./GameScene";
import MainMenu from "./MainMenu";
import BaseScene from "./Scene";
import { SettingsScene } from "./Settings";
import { UIScene } from "./UIScene";

export class InGameSettingsScene extends BaseScene {
    public static SceneName: string = 'InGameSettingsScene';

    musicMeterFillMask: Phaser.GameObjects.Graphics;
    musicVolumeMeterFill: Phaser.GameObjects.RenderTexture;
    sfxMeterFillMask: Phaser.GameObjects.Graphics;
    sfxVolumeMeterFill: Phaser.GameObjects.RenderTexture;
    esc: Phaser.Input.Keyboard.Key;

    shutdown() {
        this.musicMeterFillMask = null;
        this.musicVolumeMeterFill = null;
        this.sfxMeterFillMask = null;
        this.sfxVolumeMeterFill = null;

        super.shutdown();
    }

    create(): void {
        super.create();
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

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

        const reset = this.add.nineslice(0, 0, 325, 56, 'meter', [ 9, 9, 9, 9 ]);
        const resetText = this.add.rexBBCodeText(0, 0, 'Quit Game', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '35px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5).setResolution(5);

        Utils.AddButtonBounce(this, reset, () => {
            Game.Instance.sfx.PlayButton();
            this.addQuitPanel();
        }, resetText);
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
        Utils.AddButtonBounce(this, close, () => {
            Game.Instance.sfx.PlayButton();
            Game.Instance.scene.stop(InGameSettingsScene.SceneName).resume(GameScene.SceneName).resume(UIScene.SceneName);
        }, buttonText);

        Phaser.Display.Align.In.BottomCenter(close, panel, 0, -25);
        Phaser.Display.Align.In.Center(buttonText, close);
    }

    private addQuitPanel() {
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
            Game.Instance.scene.stop(InGameSettingsScene.SceneName)
                .stop(GameScene.SceneName)
                .stop(UIScene.SceneName)
                .start(MainMenu.SceneName);
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

    update(time: number, delta: number): void {
        if (Phaser.Input.Keyboard.JustDown(this.esc))
        {
            Game.Instance.scene.stop(InGameSettingsScene.SceneName).resume(GameScene.SceneName).resume(UIScene.SceneName);
        }
    }
}