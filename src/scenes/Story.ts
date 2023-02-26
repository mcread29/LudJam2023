import Game from "../Game";
import GameScene from "./GameScene";
import BaseScene from "./Scene";
import { UIScene } from "./UIScene";

export class StoryScene extends BaseScene {
    public static SceneName: string = 'StoryScene';

    intro: boolean;

    shutdown() {
        this.intro = null;
        super.shutdown();
    }

    init(data: { intro: boolean; }) {
        this.intro = data.intro;
    }

    create(): void {
        super.create();

        if (this.intro)
        {
            Game.Instance.music.play('Coots_Intro_01');
        }

        this.add.sprite(0, 0, 'story')
            .setOrigin(0)
            .setInteractive()
            .play(this.intro ? 'intro_story' : 'outro_story')
            .once(Phaser.Animations.Events.ANIMATION_COMPLETE, this.intro ? this.startGame : this.endGame, this);
    }

    startGame() {
        Game.Instance.sfx.Play('startGame');
        Game.Instance.scene.stop(StoryScene.SceneName).start(GameScene.SceneName).start(UIScene.SceneName);
    }

    endGame() {
        Game.Instance.scene.stop(StoryScene.SceneName);
    }
}