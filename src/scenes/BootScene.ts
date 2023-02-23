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
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '100px',
            halign: 'center',
            valign: 'center'
        }).setDepth(Game.maxDepth).setOrigin(0.5, 0).setResolution(5);

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
            this.load.image('border_2', './assets/images/border_2.png');

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

            this.load.image('cat_nip', './assets/images/cat_nip.png');
            this.load.image('wicked', './assets/images/wicked.png');
            this.load.image('succ', './assets/images/succ.png');
            this.load.image('qt_candle', './assets/images/qt_candle.png');
            this.load.image('qt_star', './assets/images/qt_star.png');

            this.load.image('icon_bg', './assets/images/itembg.png');
            this.load.image('upgrade_fill', './assets/images/upgrade_fill.png');

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

            this.load.image('pog_bat_01', './assets/images/pog_bat_01.png');
            this.load.image('skeleton_01', './assets/images/skeleton_01.png');
            this.load.image('zambie_01', './assets/images/zambie_01.png');
            this.load.image('sadge_ghost_01', './assets/images/sadge_ghost_01.png');
            this.load.image('krey_flower_01', './assets/images/krey_flower.png');
            this.load.image('pog_man_01', './assets/images/pog_man.png');

            this.load.image('lud_boss', './assets/images/lud_boss.png');

            this.load.image('tiles', 'assets/tilemaps/map1.png');
            this.load.tilemapTiledJSON('map', 'assets/tilemaps/map1_built.json');

            this.load.image('controls', './assets/images/controls.png');

            this.load.image('slash', './assets/images/slash.png');
            this.load.image('book', './assets/images/book.png');

            this.load.image('arrow_1', './assets/images/cat_arrow_01.png');
            this.load.image('arrow_2', './assets/images/cat_arrow_02.png');

            this.load.image('tree', './assets/images/tree.png');

            this.load.image('chimken', './assets/images/chimken.png');

            this.load.image('chest', './assets/images/chest.png');

            this.load.aseprite('lightning', './assets/animations/lightning.png', './assets/animations/lightning.json');
            this.load.aseprite('waterAnim', './assets/animations/kitty_water_01.png', './assets/animations/kitty_water_01.json');
            this.load.aseprite('chestAnim', './assets/animations/chest_01_64x64.png', './assets/animations/chest_01.json');
            this.load.aseprite('coin_01', './assets/animations/coin.png', './assets/animations/coin.json');

            this.load.image('waterAttack', './assets/images/water.png');

            this.load.audio('title', './assets/music/Coots_Title_01.mp3');
            this.load.audio('death', './assets/music/Coots_Death_01.mp3');
            this.load.audio('music', './assets/music/Coots_Clash_01b.mp3');
        }
    }

    create(): void {
        super.create();

        this.hueShift('pog_bat_01', 'pog_bat_02', 0.1);
        this.hueShift('pog_bat_01', 'pog_bat_03', 0.5);

        this.hueShift('skeleton_01', 'skeleton_02', 0.1);
        this.hueShift('skeleton_01', 'skeleton_03', 0.5);

        this.hueShift('zambie_01', 'zambie_02', 0.1);
        this.hueShift('zambie_01', 'zambie_03', 0.5);

        this.hueShift('sadge_ghost_01', 'sadge_ghost_02', 0.1);
        this.hueShift('sadge_ghost_01', 'sadge_ghost_03', 0.5);

        this.hueShift('krey_flower_01', 'krey_flower_02', 0.1);
        this.hueShift('krey_flower_01', 'krey_flower_03', 0.5);

        this.hueShift('pog_man_01', 'pog_man_02', 0.1);
        this.hueShift('pog_man_01', 'pog_man_03', 0.5);

        this.anims.createFromAseprite('lightning');
        this.anims.createFromAseprite('waterAnim');
        this.anims.createFromAseprite('chestAnim');

        this.anims.createFromAseprite('coin_01');

        Game.Instance.scene.start(MainMenu.SceneName);
    }

    shutdown(): void {
        super.shutdown();
    }

    hueShift(textureKey: string, newTextureKey, shiftAmount: number) {
        const originalTexture = this.textures.get(textureKey).getSourceImage();
        const newTexture = this.textures.createCanvas(newTextureKey, originalTexture.width, originalTexture.height);
        const context = (newTexture.getSourceImage() as any).getContext('2d');
        context.drawImage(originalTexture, 0, 0);


        const pixels = context.getImageData(0, 0, originalTexture.width, originalTexture.height);

        for (let i = 0; i < pixels.data.length / 4; i++)
        {
            const r = pixels.data[ i * 4 ];
            const g = pixels.data[ i * 4 + 1 ];
            const b = pixels.data[ i * 4 + 2 ];

            const hsv = Phaser.Display.Color.RGBToHSV(r, g, b);

            const h = hsv.h + shiftAmount;

            const rgb = Phaser.Display.Color.HSVToRGB(h, hsv.s, hsv.v) as Phaser.Types.Display.ColorObject;

            pixels.data[ i * 4 ] = rgb.r;
            pixels.data[ i * 4 + 1 ] = rgb.g;
            pixels.data[ i * 4 + 2 ] = rgb.b;
        }

        context.putImageData(pixels, 0, 0);

        newTexture.refresh();
    }
}