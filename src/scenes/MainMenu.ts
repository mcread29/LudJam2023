import BaseScene, { SceneInit } from "./Scene";
import Game from "../Game";
import GameScene from "./GameScene";

interface MainMenuInit extends SceneInit { }

export default class MainMenu extends BaseScene {
    public static SceneName = 'MainMenu';

    init(data: MainMenuInit) {
        super.init(data);
    }

    create(): void {
        super.create();

        this.add.image(0, 0, 'coots_clash').setOrigin(0);

        const startButton = this.add.image(189.5, 480.5, 'start_button');
        startButton.setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, () => {
                Game.Instance.manager.StartGame();
            })
            .on(Phaser.Input.Events.POINTER_OVER, () => {
                console.log('over');
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
    }

    startGame() {
        Game.Instance.scene.stop(MainMenu.SceneName).start(GameScene.SceneName);
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
    }

    shutdown(): void {
        super.shutdown();
    }
}