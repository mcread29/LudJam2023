import Game from "../Game";
import GameScene from "./GameScene";
import BaseScene from "./Scene";
import { UIScene } from "./UIScene";

export class StoryScene extends BaseScene {
    public static SceneName: string = 'StoryScene';

    bg: Phaser.GameObjects.Image;
    storyIndex: number;

    create(): void {
        super.create();
        console.log('what');
        this.bg = this.add.image(0, 0, 'story_0').setOrigin(0);
        this.storyIndex = 0;
        this.advanceStory();
    }

    advanceStory() {
        setTimeout(() => {
            this.storyIndex++;
            if (this.storyIndex >= 6)
            {
                Game.Instance.scene.stop(StoryScene.SceneName).start(GameScene.SceneName).start(UIScene.SceneName);;
            }
            else
            {
                this.bg.setTexture(`story_${this.storyIndex}`);
                this.advanceStory();
            }
        }, 2000);
    }
}