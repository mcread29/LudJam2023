import Game from "../Game";
import GameScene from "./GameScene";
import BaseScene from "./Scene";
import { UIScene } from "./UIScene";

export class StoryScene extends BaseScene {
    public static SceneName: string = 'StoryScene';

    intro: boolean;
    init(data: { intro: boolean; }) {
        this.intro = data.intro;
        console.log(data.intro);
    }

    create(): void {
        super.create();
        const bg = this.add.sprite(0, 0, 'story')
            .setOrigin(0);
        if (this.intro)
        {
            bg.play('intro_story').on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                Game.Instance.scene.stop(StoryScene.SceneName).start(GameScene.SceneName).start(UIScene.SceneName);
            });
        }
        else
        {
            bg.play('outro_story').on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                Game.Instance.scene.stop(StoryScene.SceneName);
            });
        }
    }
}