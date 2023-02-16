import LoaderPlugin from "./Plugins/LoaderPlugin";
import { MusicManager } from "./Utils/MusicManager";
import Net from "./Utils/Net";
import ObjectUtils from "./Utils/ObjectUtils";
import PlayerData from "./Utils/PlayerData";
import { ScaleManager } from "./Utils/ScaleManager";
import BootScene from "./scenes/BootScene";
import MainMenu from "./scenes/MainMenu";
import HiddenInputTextPlugin from 'phaser3-rex-plugins/plugins/hiddeninputtext-plugin.js';
import GameScene from "./scenes/GameScene";
import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js';
import GrayScalePipelinePlugin from 'phaser3-rex-plugins/plugins/grayscalepipeline-plugin.js';
import BBCodeTextPlugin from 'phaser3-rex-plugins/plugins/bbcodetext-plugin.js';
import { GameObjectFactoryPlugin } from "./Plugins/GameObjectFactoryPlugin";

import { Plugin as NineSlicePlugin } from 'phaser3-nineslice';
import Phaser from "phaser";
import InitialBoot from "./scenes/InitialBoot";

export type gameConfig = {};

export default class Game extends Phaser.Game {
    protected _defaultWidth: number;
    protected _defaultHeight: number;

    public get DefaultWidth(): number {
        return this._defaultWidth;
    }

    public get DefaultHeight(): number {
        return this._defaultHeight;
    }

    protected _scaleManager: ScaleManager;
    public get ScaleManager(): ScaleManager {
        return this._scaleManager;
    }

    protected playerData: PlayerData;
    protected static _instance: Game;
    public static get Instance(): Game {
        return this._instance;
    }

    protected _music: MusicManager;
    public get music(): MusicManager {
        return this._music;
    }

    public getBounds(): Phaser.Geom.Rectangle {
        return new Phaser.Geom.Rectangle(0, 0, this.scale.width, this.scale.height);
    }

    protected _gameConfig: gameConfig;
    public get gameConfig(): gameConfig {
        return this._gameConfig;
    }
    public set gameConfig(value: gameConfig) {
        this._gameConfig = value;
    }

    boot() {
        super.boot();
    }

    constructor() {
        super({
            type: Phaser.WEBGL,
            dom: {
                createContainer: true
            },
            physics: {
                default: 'arcade',
                arcade: {
                    debug: document.location.href.includes('debug')
                }
            },
            input: {
                activePointers: 2,
            },
            scale: {
                autoCenter: Phaser.Scale.CENTER_BOTH,
                mode: Phaser.Scale.FIT,
                width: 960,
                height: 800
            },
            plugins: {
                global: [
                    { key: 'LoaderPlugin', plugin: LoaderPlugin, start: true },
                    { key: 'rexWebFontLoader', plugin: WebFontLoaderPlugin, start: true },
                    { key: 'rexHiddenInputTextPlugin', plugin: HiddenInputTextPlugin, start: true },
                    { key: 'rexGrayScalePipeline', plugin: GrayScalePipelinePlugin, start: true },
                    { key: 'rexBBCodeTextPlugin', plugin: BBCodeTextPlugin, start: true },
                    { key: 'GameObjectFactoryPlugin', plugin: GameObjectFactoryPlugin, start: true },
                    NineSlicePlugin.DefaultCfg
                ]
            }
        });

        this._defaultWidth = 960;
        this._defaultHeight = 800;

        Game._instance = this;

        this._music = new MusicManager(this, 0.4);

        this.playerData = new PlayerData("GAME-NAME");

        Game._instance = this;

        this.scene.add(InitialBoot.SceneName, InitialBoot, true);
        this.scene.add(BootScene.SceneName, BootScene);
        this.scene.add(MainMenu.SceneName, MainMenu);
        this.scene.add(GameScene.SceneName, GameScene);
    }

    public step(time: number, delta: number): void {
        super.step(time, delta);
    }
}