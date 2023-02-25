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
// import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';
import GrayScalePipelinePlugin from 'phaser3-rex-plugins/plugins/grayscalepipeline-plugin.js';
import BBCodeTextPlugin from 'phaser3-rex-plugins/plugins/bbcodetext-plugin.js';
import { GameObjectFactoryPlugin } from "./Plugins/GameObjectFactoryPlugin";
import SoundFadePlugin from 'phaser3-rex-plugins/plugins/soundfade-plugin.js';

import { Plugin as NineSlicePlugin } from 'phaser3-nineslice';
import Phaser from "phaser";
import InitialBoot from "./scenes/InitialBoot";
import { UIScene } from "./scenes/UIScene";
import { GameManager } from "./GameManager";
import { LevelUpScene } from "./scenes/LevelUpScene";
import ChooseStartAttackScene from "./scenes/ChooseStartAttack";
import { PickupChestScene } from "./scenes/PickupChest";
import { GameOverScene } from "./scenes/GameOver";
import { UpgradeScene } from "./scenes/UpgradeScene";
import { SettingsScene } from "./scenes/Settings";
import { SFXManager } from "./Utils/SFXManager";
import { StoryScene } from "./scenes/Story";
import { InGameSettingsScene } from "./scenes/InGameSettings";

export type gameConfig = {};

export type Wave = {
    interval: number,
    enemies: string[],
    boss?: string;
    minimum: number;
    clearAll?: boolean;
};
// waves: Map<number, Wave>;

export type MapData = {
    max: number,
    waves: {
        [ k: number ]: Wave;
    };
};

const enum EnemyTypes {
    BasicEnemy = 'BasicEnemy',
    BasicEnemyBoss = 'BasicEnemyBoss',
    Bat = 'Bat',
    Bat2 = 'Bat2',
    Bat3 = 'Bat3',
    Zambie = 'Zambie',
    Zambie2 = 'Zambie2',
    ZambieBoss = 'Zambie3',
    Skeleton = 'Skeleton',
    Skeleton2 = 'Skeleton2',
    SkeletonBoss = 'Skeleton3',
    SadgeGhost = 'SadgeGhost',
    SadgeGhost2 = 'SadgeGhost2',
    SadgeGhostBoss = 'SadgeGhost3',
    KreyFlower = 'KreyFlower',
    KreyFlower2 = 'KreyFlower2',
    FlowerBoss = 'KreyFlower3',
    PogMan = 'PogMan',
    PogMan2 = 'PogMan2',
    PogMan3 = 'PogMan3',
    LudBoss = 'LudBoss',
}

export const GameConfig: { maps: MapData[]; } = {
    maps: [ {
        max: 540,
        waves: {
            0: {
                interval: 1,
                enemies: [ EnemyTypes.Bat ],
                minimum: 10
            },
            30: {
                interval: 1,
                enemies: [ EnemyTypes.Bat, EnemyTypes.Zambie ],
                minimum: 30
            },
            60: {
                interval: 1,
                enemies: [ EnemyTypes.Zambie, EnemyTypes.Zambie2 ],
                minimum: 30,
                boss: EnemyTypes.BasicEnemyBoss
            },
            90: {
                interval: 1,
                enemies: [ EnemyTypes.Bat2, EnemyTypes.Bat3, EnemyTypes.Skeleton ],
                minimum: 30
            },
            120: {
                interval: 0.5,
                enemies: [ EnemyTypes.Bat, EnemyTypes.Zambie2 ],
                minimum: 50,
                boss: EnemyTypes.ZambieBoss
            },
            150: {
                interval: 1,
                enemies: [ EnemyTypes.Zambie2, EnemyTypes.Skeleton ],
                minimum: 30
            },
            180: {
                interval: 3,
                enemies: [ EnemyTypes.Bat, EnemyTypes.Bat2, EnemyTypes.Bat3 ],
                minimum: 40,
                boss: EnemyTypes.SkeletonBoss
            },
            210: {
                interval: 1,
                enemies: [ EnemyTypes.Skeleton, EnemyTypes.Skeleton2 ],
                minimum: 30
            },
            240: {
                interval: 3,
                enemies: [ EnemyTypes.Bat3, EnemyTypes.Zambie, EnemyTypes.Skeleton ],
                minimum: 50,
                boss: EnemyTypes.SadgeGhostBoss
            },
            270: {
                interval: 1,
                enemies: [ EnemyTypes.SadgeGhost, EnemyTypes.Zambie2 ],
                minimum: 30
            },
            300: {
                interval: 3,
                enemies: [ EnemyTypes.Zambie2, EnemyTypes.Skeleton, EnemyTypes.Skeleton2 ],
                minimum: 60,
                boss: EnemyTypes.FlowerBoss
            },
            330: {
                interval: 1,
                enemies: [ EnemyTypes.KreyFlower, EnemyTypes.Zambie, EnemyTypes.Zambie2, EnemyTypes.Skeleton ],
                minimum: 30
            },
            360: {
                interval: 3,
                enemies: [ EnemyTypes.KreyFlower2, EnemyTypes.Zambie2, EnemyTypes.SadgeGhost ],
                minimum: 70,
                boss: EnemyTypes.PogMan
            },
            390: {
                interval: 1,
                enemies: [ EnemyTypes.SadgeGhost2, EnemyTypes.KreyFlower ],
                minimum: 30
            },
            420: {
                interval: 3,
                enemies: [ EnemyTypes.KreyFlower2, EnemyTypes.KreyFlower, EnemyTypes.Bat ],
                minimum: 80,
                boss: EnemyTypes.PogMan2
            },
            450: {
                interval: 1,
                enemies: [ EnemyTypes.SadgeGhost2, EnemyTypes.KreyFlower2, EnemyTypes.Zambie ],
                minimum: 30
            },
            480: {
                interval: 3,
                enemies: [ EnemyTypes.SadgeGhost2, EnemyTypes.Skeleton2, EnemyTypes.Bat3 ],
                minimum: 90,
                boss: EnemyTypes.PogMan3
            },
            510: {
                interval: 1,
                enemies: [ EnemyTypes.KreyFlower, EnemyTypes.KreyFlower2, EnemyTypes.Skeleton, EnemyTypes.Skeleton2 ],
                minimum: 30
            },
            540: {
                interval: 1,
                enemies: [],
                minimum: 0,
                boss: 'LudBoss',
                clearAll: true
            }
        }
    } ]
};

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

    protected _playerData: PlayerData;
    public get playerData(): PlayerData { return this._playerData; }

    protected static _instance: Game;
    public static get Instance(): Game {
        return this._instance;
    }

    protected _music: MusicManager;
    public get music(): MusicManager {
        return this._music;
    }

    protected _sfx: SFXManager;
    public get sfx(): SFXManager {
        return this._sfx;
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

    private _manager: GameManager;
    public get manager(): GameManager { return this._manager; }

    private static _maxDepth = 1000;
    public static get maxDepth(): number { return this._maxDepth; }

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
                    fps: 300,
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
                    { key: 'rexSoundFade', plugin: SoundFadePlugin, start: true },
                    NineSlicePlugin.DefaultCfg
                ]
            }
        });

        this._manager = new GameManager();

        this._defaultWidth = 960;
        this._defaultHeight = 800;

        Game._instance = this;

        this._playerData = new PlayerData("Coots-Clash");
        this._playerData.load();

        this._music = new MusicManager(this, this._playerData.saveData.musicVolume);
        this._sfx = new SFXManager(this, this._playerData.saveData.sfxVolume);

        Game._instance = this;

        this.scene.add(InitialBoot.SceneName, InitialBoot, true);
        this.scene.add(BootScene.SceneName, BootScene);
        this.scene.add(MainMenu.SceneName, MainMenu);
        this.scene.add(GameScene.SceneName, GameScene);
        this.scene.add(UIScene.SceneName, UIScene);
        this.scene.add(LevelUpScene.SceneName, LevelUpScene);
        this.scene.add(ChooseStartAttackScene.SceneName, ChooseStartAttackScene);
        this.scene.add(PickupChestScene.SceneName, PickupChestScene);
        this.scene.add(GameOverScene.SceneName, GameOverScene);
        this.scene.add(UpgradeScene.SceneName, UpgradeScene);
        this.scene.add(SettingsScene.SceneName, SettingsScene);
        this.scene.add(InGameSettingsScene.SceneName, InGameSettingsScene);
        this.scene.add(StoryScene.SceneName, StoryScene);
    }

    public step(time: number, delta: number): void {
        super.step(time, delta);
    }
}