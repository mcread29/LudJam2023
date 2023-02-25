
import { BasicEnemy, Enemy } from "../enemies/Enemy";
import { EnemySpawner } from "../enemies/EnemySpawner";
import Game, { GameConfig } from "../Game";
import { Level } from "../Level";
import { Gem } from "../objects/Gem";
import { Pickup } from "../objects/PIckup";
import { SwipeAttack } from "../player/attacks/SwipeAttack";
import { PLayer } from "../player/Player";
import ChooseStartAttackScene from "./ChooseStartAttack";
import { GameOverScene } from "./GameOver";
import { InGameSettingsScene } from "./InGameSettings";
import { LevelUpScene } from "./LevelUpScene";
import MainMenu from "./MainMenu";
import BaseScene, { SceneInit } from "./Scene";
import { StoryScene } from "./Story";
import { UIScene } from "./UIScene";

interface GameSceneInit extends SceneInit { }

export default class GameScene extends BaseScene {
    public static SceneName = 'GameScene';

    enemies: Phaser.GameObjects.Group;
    gems: Phaser.GameObjects.Group;
    destructables: Phaser.GameObjects.Group;
    pickups: Phaser.GameObjects.Group;
    player: PLayer;
    esc: Phaser.Input.Keyboard.Key;

    spawner: EnemySpawner;

    init(data: GameSceneInit) {
        super.init(data);
    }

    shutdown(): void {
        Game.Instance.scene.stop(UIScene.SceneName);

        this.enemies = null;
        this.gems = null;
        this.destructables = null;
        this.pickups = null;
        this.player = null;
        this.spawner = null;

        super.shutdown();
    }

    create(): void {
        super.create();
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.enemies = this.add.group();
        this.gems = this.add.group();
        this.destructables = this.add.group();
        this.pickups = this.add.group();

        this.cameras.main.setRoundPixels(true);

        Game.Instance.manager.SetupAttacks(this);

        const level = new Level(this, 'map', { key: 'tileset_1', image: 'tiles' });

        this.cameras.main.setBounds(0, 0, level.collision.width, level.collision.height);
        this.physics.world.setBounds(0, 0, level.collision.width, level.collision.height, true, true, true, true);

        let player = this.player = new PLayer(this, level.collision.width / 2, level.collision.height / 2);
        Game.Instance.manager.SetPlayer(player);

        this.physics.add.collider(player, this.enemies, (p: PLayer, e: Enemy) => p.collide());

        this.physics.add.overlap(player.attractBody, this.gems, (p: PLayer, g: Gem) => {
            g.startCollect();
            this.gems.remove(g);
        }, (o1: PLayer, o2: Gem) => this.cameras.main.worldView.contains(o2.x, o2.y));

        this.physics.add.overlap(
            player,
            this.pickups,
            (player: PLayer, pickup: Pickup) => pickup.Pickup(player),
            (player: PLayer, pickup: Pickup) => this.cameras.main.worldView.contains(pickup.x, pickup.y));

        this.physics.add.collider(this.enemies, this.enemies);
        this.physics.add.collider(level.collision, this.enemies);

        this.physics.add.collider([ level.collision, level.bounds ], player);

        Game.Instance.manager.eventCenter.once('player_die', () => {
            Game.Instance.music.play('death', false);
            this.spawner.Destroy();
            Game.Instance.scene.pause(UIScene.SceneName).start(GameOverScene.SceneName).start(StoryScene.SceneName, { intro: false });
        });

        this.cameras.main.startFollow(player, true, 0.5, 0.5);

        this.spawner = new EnemySpawner(this, GameConfig.maps[ 0 ]);

        this.events.once(Phaser.Scenes.Events.UPDATE, () => {
            Game.Instance.scene.pause(GameScene.SceneName).pause(UIScene.SceneName).start(ChooseStartAttackScene.SceneName, { attacks: Game.Instance.manager.attacks });
        });

        Game.Instance.music.play('music');
    }

    update(time: number, delta: number): void {
        if (Phaser.Input.Keyboard.JustDown(this.esc))
        {
            Game.Instance.scene.start(InGameSettingsScene.SceneName).pause(GameScene.SceneName).pause(UIScene.SceneName);
        }
    }

    onLevelUp() {
        Game.Instance.scene.pause(GameScene.SceneName);
    }
}