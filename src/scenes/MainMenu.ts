import BaseScene, { SceneInit } from "./Scene";
import Game from "../Game";
import GameScene from "./GameScene";
import { SettingsScene } from "./Settings";
import { PLayer } from "../player/Player";

interface MainMenuInit extends SceneInit { }

export default class MainMenu extends BaseScene {
    public static SceneName = 'MainMenu';

    init(data: MainMenuInit) {
        super.init(data);
    }

    create(): void {
        super.create();
        this.cameras.main.setRoundPixels(true);

        const bg = this.add.image(0, 0, 'coots_clash').setOrigin(0);

        const startButton = this.add.image(189.5, 480.5, 'start_button')
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, () => {
                Game.Instance.sfx.PlayButton();
                Game.Instance.manager.StartGame();
            })
            .on(Phaser.Input.Events.POINTER_OVER, () => {
                this.tweens.killTweensOf(startButton);
                this.tweens.add({
                    targets: startButton,
                    scale: 1.15,
                    duration: 100,
                    ease: Phaser.Math.Easing.Quadratic.Out
                });
            })
            .on(Phaser.Input.Events.POINTER_OUT, () => {
                this.tweens.killTweensOf(startButton);
                this.tweens.add({
                    targets: startButton,
                    scale: 1,
                    duration: 100,
                    ease: Phaser.Math.Easing.Quadratic.Out
                });
            });

        const upgradeButton = this.add.image(195, 609, 'upgrade_button')
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, () => {
                Game.Instance.sfx.PlayButton();
                Game.Instance.manager.ShowUpgrades();
                this.tweens.killTweensOf(upgradeButton);
                this.tweens.add({
                    targets: upgradeButton,
                    scale: 1,
                    duration: 100,
                    ease: Phaser.Math.Easing.Quadratic.Out
                });
            })
            .on(Phaser.Input.Events.POINTER_OVER, () => {
                this.tweens.killTweensOf(upgradeButton);
                this.tweens.add({
                    targets: upgradeButton,
                    scale: 1.15,
                    duration: 100,
                    ease: Phaser.Math.Easing.Quadratic.Out
                });
            })
            .on(Phaser.Input.Events.POINTER_OUT, () => {
                this.tweens.killTweensOf(upgradeButton);
                this.tweens.add({
                    targets: upgradeButton,
                    scale: 1,
                    duration: 100,
                    ease: Phaser.Math.Easing.Quadratic.Out
                });
            });

        const settingsButton = this.add.image(0, 0, 'settings_button')
            .setScale(0.5)
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, () => {
                Game.Instance.sfx.PlayButton();
                Game.Instance.scene.start(SettingsScene.SceneName);
                this.tweens.killTweensOf(settingsButton);
                this.tweens.add({
                    targets: settingsButton,
                    scale: 0.5,
                    duration: 100,
                    ease: Phaser.Math.Easing.Quadratic.Out
                });
            })
            .on(Phaser.Input.Events.POINTER_OVER, () => {
                this.tweens.killTweensOf(settingsButton);
                this.tweens.add({
                    targets: settingsButton,
                    scale: 0.65,
                    duration: 100,
                    ease: Phaser.Math.Easing.Quadratic.Out
                });
            })
            .on(Phaser.Input.Events.POINTER_OUT, () => {
                this.tweens.killTweensOf(settingsButton);
                this.tweens.add({
                    targets: settingsButton,
                    scale: 0.5,
                    duration: 100,
                    ease: Phaser.Math.Easing.Quadratic.Out
                });
            });
        Phaser.Display.Align.In.BottomLeft(settingsButton, bg);

        Game.Instance.music.play('title', false);
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
    }

    shutdown(): void {
        super.shutdown();
    }
}