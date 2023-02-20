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
            this.load.image('coots_clash', './assets/images/coots_clash.jpg');
            this.load.image('start_button', './assets/images/press_start.png');

            this.load.image('border_1', './assets/images/border_1.png');

            this.load.image('box', './assets/images/box.png');
            this.load.image('box2', './assets/images/box_2.png');
            this.load.image('coots', './assets/images/coots.png');
            this.load.image('circle_hitbox', './assets/images/circle_hitbox.png');

            this.load.image('meter', './assets/images/meter.png');
            this.load.image('meter-fill', './assets/images/meter-fill.png');

            this.load.image('panel_bg', './assets/images/panel_bg.png');

            this.load.image('book_of_pawbs', './assets/images/book_of_pawbs.png');
            this.load.image('kitty_lit', './assets/images/kitty_lit.png');
            this.load.image('kitty_slash', './assets/images/kitty_slash.png');
            this.load.image('kitty_water', './assets/images/kitty_water.png');
            this.load.image('uh_oh', './assets/images/uh_oh.png');

            this.load.image('nip_icon', './assets/images/cat_nip.png');

            this.load.image('icon_bg', './assets/images/itembg.png');

            this.load.image('gem_1', './assets/images/gem_1.png');
            this.load.image('gem_2', './assets/images/gem_2.png');
            this.load.image('gem_3', './assets/images/gem_3.png');
            this.load.image('gem_4', './assets/images/gem_4.png');
            this.load.image('gem_5', './assets/images/gem_5.png');

            this.load.image('gem_a', './assets/images/gem_a.png');
            this.load.image('gem_b', './assets/images/gem_b.png');
            this.load.image('gem_c', './assets/images/gem_c.png');

            this.load.image('clover_kitty', './assets/images/clover_kitty.png');
            this.load.image('clover_kitty_boss', './assets/images/clover_kitty_boss.png');

            this.load.image('lud_boss', './assets/images/lud_boss.png');

            this.load.image('tiles', 'assets/tilemaps/map1.png');
            this.load.tilemapTiledJSON('map', 'assets/tilemaps/map1_built.json');

            this.load.image('controls', './assets/images/controls.png');
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