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

        const text: BBCodeText.BBCodeText = this.add.rexBBCodeText(Game.Instance.DefaultWidth / 2, Game.Instance.DefaultHeight / 2, 'Lud Jam', {
            fontFamily: 'Comic Sans MS',
            color: '#ffffff',
            fontSize: '100px',
            halign: 'center',
            valign: 'center'
        }).setDepth(100).setOrigin(0.5);

        const startButton = this.add.image(Game.Instance.DefaultWidth / 2, Game.Instance.DefaultHeight / 2 + 100, 'box')
            .setScale(1, 0.3)
            .setInteractive().on(Phaser.Input.Events.POINTER_DOWN, () => {
                Game.Instance.manager.StartGame();
            });

        const startText = this.add.rexBBCodeText(Game.Instance.DefaultWidth / 2, Game.Instance.DefaultHeight / 2, 'Start Game', {
            fontFamily: 'Comic Sans MS',
            color: '#ff0000',
            fontSize: '25px',
            halign: 'center',
            valign: 'center'
        }).setDepth(100).setOrigin(0.5);
        Phaser.Display.Align.In.Center(startText, startButton);
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