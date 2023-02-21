import Game from "./Game";
import { Attack, PowerUp } from "./player/attacks/Attack";
import { BookAttack } from "./player/attacks/BookAttack";
import { HissAttack } from "./player/attacks/HissAttack";
import { LightningAttack } from "./player/attacks/LightningAttack";
import { SantaWaterAttack } from "./player/attacks/SantaWaterAttack";
import { SwipeAttack } from "./player/attacks/SwipeAttack";
import AreaItem from "./player/items/AreaItem";
import AttractItem from "./player/items/AttractItem";
import Catnip from "./player/items/Catnip";
import HealthItem from "./player/items/HealthItem";
import { Item } from "./player/items/Item";
import SpeedItem from "./player/items/SpeedItem";
import { PLayer } from "./player/Player";
import ChooseStartAttackScene from "./scenes/ChooseStartAttack";
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

    public get player(): PLayer { return this._player; }
    private _player: PLayer;
    private _powerups: PowerUp[];
    public get attacks(): Attack[] { return this._powerups.filter((powerup) => (powerup instanceof Attack)) as Attack[]; }
    public get items(): Item[] { return this._powerups.filter((powerup) => (powerup instanceof Item)) as Item[]; }

    private _startingAttack: PowerUp;

    constructor() {
        this._eventCenter = new Phaser.Events.EventEmitter();

        this._eventCenter.on('level_up_closed', this.LevelUpClosed, this);
    }

    public SetPlayer(player: PLayer) {
        this._player = player;
        // this._startingAttack.Activate(player);
    }

    public AddAttack(attack: PowerUp) {
        if (attack.active) attack.Upgrade();
        else attack.Activate(this._player);
    }

    public SetupAttacks(scene: GameScene) {
        this._powerups = [
            new SwipeAttack(scene),
            new BookAttack(scene),
            new LightningAttack(scene),
            new SantaWaterAttack(scene),
            new HissAttack(scene),
            new Catnip(),
            new HealthItem(),
            new SpeedItem(),
            new AreaItem(),
            new AttractItem()
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
        if (this.playerExp >= this.playerLevel * 10 - 5)
        {
            this.LevelUp();
        }
        else
        {
            this.eventCenter.emit('meterProgress', this.playerExp / (this.playerLevel * 10 - 5));
        }
    }

    public LevelUp() {
        let powerups: PowerUp[] = [];
        if (this._player.attacks.length >= this._player.maxAttacks) powerups.push(...this._player.attacks);
        else
        {
            console.log(this.attacks);
            console.log(this.attacks.sort(() => 0.5 - Math.random()));
            powerups.push(...this.attacks.sort(() => 0.5 - Math.random()));
        }

        if (this._player.items.length >= this._player.maxItems) powerups.push(...this._player.items);
        else
        {
            console.log(this.items);
            console.log(this.items.sort(() => 0.5 - Math.random()));
            powerups.push(...this.items.sort(() => 0.5 - Math.random()));
        }

        powerups = powerups.filter((value, index, array) => value.level < value.maxLevel);

        this.playerExp -= this.playerLevel * 10 - 5;
        this.playerLevel++;

        this.eventCenter.emit('levelup', this.playerLevel);
        console.log(powerups);
        Game.Instance.scene.pause(GameScene.SceneName).pause(UIScene.SceneName).start(LevelUpScene.SceneName, { attacks: powerups.sort(() => 0.5 - Math.random()).splice(0, 3) });
    }

    public LevelUpClosed() {
        Game.Instance.scene.stop(LevelUpScene.SceneName).resume(GameScene.SceneName).resume(UIScene.SceneName);
        this.eventCenter.emit('meterProgress', this.playerExp / (this.playerLevel * 10 - 5));
    }

    public ChooseStartClosed() {
        Game.Instance.scene.stop(ChooseStartAttackScene.SceneName).resume(GameScene.SceneName).resume(UIScene.SceneName);
    }
}