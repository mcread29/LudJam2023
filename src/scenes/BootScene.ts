import Game from "../Game";
import Net from "../Utils/Net";
import ObjectUtils from "../Utils/ObjectUtils";
import GameScene from "./GameScene";
import MainMenu from "./MainMenu";
import BaseScene from "./Scene";

import { getGPUTier } from 'detect-gpu';

export default class BootScene extends BaseScene {
    public static SceneName = 'BootScene';

    preload(): void {
        super.preload();

        const loadText = this.add.rexBBCodeText(Game.Instance.DefaultWidth / 2, 250, 'Loading...', {
            fontFamily: 'Comic Sans MS',
            color: '#ffffff',
            fontSize: '100px',
            halign: 'center',
            valign: 'center'
        }).setDepth(100).setOrigin(0.5, 0);

        const loadBG = this.add.image(0, 0, 'loadBG').setOrigin(0, 0.5);
        loadBG.setPosition(Game.Instance.DefaultWidth / 2 - loadBG.displayWidth / 2, 1080 / 2);
        const loadFG = this.add.image(0, 0, 'loadFG').setOrigin(0, 0.5);
        loadFG.setPosition(Game.Instance.DefaultWidth / 2 - loadFG.displayWidth / 2, 1080 / 2);

        const mask = this.make.graphics({});
        mask.setPosition(loadFG.x, loadFG.y - loadFG.displayHeight / 2);
        mask.fillStyle(0xffffff);
        mask.beginPath();
        loadFG.setMask(mask.createGeometryMask());

        this.load.on('progress', function (value) {
            mask.fillRect(0, 0, loadFG.displayWidth * value, loadFG.displayHeight);
        });

        this.load.on('complete', () => {
            loadText.destroy();
            loadBG.destroy();
            loadFG.destroy();
            mask.destroy();
        });

        {
            this.load.image('box', './assets/box.png');
            this.load.image('box2', './assets/box_2.png');
            this.load.image('coots', './assets/coots.png');
            this.load.image('circle_hitbox', './assets/circle_hitbox.png');

            this.load.image('meter', './assets/meter.png');
            this.load.image('meter-fill', './assets/meter-fill.png');

            this.load.image('panel_bg', './assets/panel_bg.png');

            this.load.image('book_icon', './assets/book_of_pawbs.png');
            this.load.image('lit_icon', './assets/kitty_lit.png');
            this.load.image('slash_icon', './assets/kitty_slash.png');
            this.load.image('water_icon', './assets/kitty_water.png');
            this.load.image('uhoh_icon', './assets/uh_oh.png');

            this.load.image('nip_icon', './assets/cat_nip.png');

            this.load.image('icon_bg', './assets/itembg.png');

            this.load.image('gem_1', './assets/gem_1.png');
            this.load.image('gem_2', './assets/gem_2.png');
            this.load.image('gem_3', './assets/gem_3.png');
            this.load.image('gem_4', './assets/gem_4.png');
            this.load.image('gem_5', './assets/gem_5.png');

            this.load.image('gem_a', './assets/gem_a.png');
            this.load.image('gem_b', './assets/gem_b.png');
            this.load.image('gem_c', './assets/gem_c.png');

            this.load.image('clover_kitty', './assets/clover_kitty.png');

            this.load.image('tiles', 'assets/tilemaps/map1.png');
            this.load.tilemapTiledJSON('map', 'assets/tilemaps/map1_built.json');
        }
    }

    create(): void {
        super.create();

        Game.Instance.scene.stop(BootScene.SceneName).start(MainMenu.SceneName);
    }

    shutdown(): void {
        super.shutdown();
    }
}