import Game from "./Game";
import { Attack } from "./player/attacks/Attack";
import { BookAttack } from "./player/attacks/BookAttack";
import { HissAttack } from "./player/attacks/HissAttack";
import { LightningAttack } from "./player/attacks/LightningAttack";
import { SantaWaterAttack } from "./player/attacks/SantaWaterAttack";
import { SwipeAttack } from "./player/attacks/SwipeAttack";
import { PLayer } from "./player/Player";
import GameScene from "./scenes/GameScene";
import { LevelUpScene } from "./scenes/LevelUpScene";
import MainMenu from "./scenes/MainMenu";
import { UIScene } from "./scenes/UIScene";

export class GameManager {

    private _eventCenter: Phaser.Events.EventEmitter;
    public get eventCenter(): Phaser.Events.EventEmitter {
        return this._eventCenter;
    }

    private playerLevel: number;
    private playerExp: number;

    private _player: PLayer;
    private _attacks: Attack[];

    constructor() {
        this._eventCenter = new Phaser.Events.EventEmitter();

        this._eventCenter.on('level_up_closed', this.LevelUpClosed, this);
    }

    public SetPlayer(player: PLayer) {
        this._player = player;
        // this._player.AddAttack(this._attacks[ Math.floor(Math.random() * this._attacks.length) ]);
        this._player.AddAttack(this._attacks[ 0 ]);
    }

    public AddAttack(attack: Attack) {
        this._player.AddAttack(attack);
    }

    public SetupAttacks(scene: GameScene) {
        this._attacks = [
            new SwipeAttack(scene),
            new BookAttack(scene),
            new LightningAttack(scene),
            new SantaWaterAttack(scene),
            new HissAttack(scene)
        ];
    }

    public StartGame() {
        this.playerLevel = 1;
        this.playerExp = 0;

        Game.Instance.scene.stop(MainMenu.SceneName).start(GameScene.SceneName).start(UIScene.SceneName);
    }

    public ReturnToMenu() {
        Game.Instance.scene.stop(GameScene.SceneName).start(MainMenu.SceneName);
    }

    public GiveExp(exp: number) {
        this.playerExp += exp;
        // if (this.playerExp >= this.playerLevel * 10 - 5)
        if (this.playerExp >= 1)
        {
            this.LevelUp();
        }
        else
        {
            this.eventCenter.emit('meterProgress', this.playerExp / (this.playerLevel * 10 - 5));
        }
    }

    public LevelUp() {
        let attacks: Attack[] = [];
        if (this._player.attacks.length >= this._player.maxAttacks) attacks = this._player.attacks;
        else
        {
            this._attacks.sort(() => 0.5 - Math.random());
            attacks = [ this._attacks[ 0 ], this._attacks[ 1 ], this._attacks[ 2 ] ];
        }

        attacks = attacks.filter((value, index, array) => value.level < value.maxLevel);

        // this.playerExp -= this.playerLevel * 10 - 5;
        this.playerExp = 0;
        this.playerLevel++;

        this.eventCenter.emit('levelup', this.playerLevel);
        Game.Instance.scene.pause(GameScene.SceneName).pause(UIScene.SceneName).start(LevelUpScene.SceneName, { attacks: attacks });
    }

    public LevelUpClosed() {
        Game.Instance.scene.stop(LevelUpScene.SceneName).resume(GameScene.SceneName).resume(UIScene.SceneName);
        this.eventCenter.emit('meterProgress', this.playerExp / (this.playerLevel * 10 - 5));
    }
}