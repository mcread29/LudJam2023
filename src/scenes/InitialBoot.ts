import { getGPUTier } from 'detect-gpu';
import Game from '../Game';
import BootScene from './BootScene';

import BaseScene from "./Scene";

export default class InitialBoot extends BaseScene {
    public static SceneName: string = 'InitialBoot';

    init() {
        (async () => {
            const gpuTier = await getGPUTier();
            if (gpuTier.tier <= 1)
            {
                alert('PLEASE ENABLE HARDWARE ACCELERATION FOR BEST PERFORMANCE\nchrome: chrome://settings/system\nedge: edge://settings/system\nfirefox: about:preferences#general scroll to performance and toggle "Use recommended performance settings"');
            }
        })();

        console.log(`If you're interested in how this was developed, you can DM me on twitter https://twitter.com/GENGEE_`);
    }

    preload(): void {
        super.preload();

        this.load.json('testConfig', 'assets/config.json');

        this.load.webfont('Comic Sans MS', 'Comic Sans MS');

        this.load.image('loadBG', 'assets/images/load_bg.png');
        this.load.image('loadFG', 'assets/images/load_fg.png');
    }

    create(): void {
        Game.Instance.scene.stop(InitialBoot.SceneName).start(BootScene.SceneName);
    }
}