
import { BasicEnemy, Enemy } from "../enemies/Enemy";
import { EnemySpawner } from "../enemies/EnemySpawner";
import Game, { GameConfig } from "../Game";
import { Level } from "../Level";
import { Pickup } from "../objects/Chickmen";
import { Gem } from "../objects/Gem";
import { SwipeAttack } from "../player/attacks/SwipeAttack";
import { PLayer } from "../player/Player";
import ChooseStartAttackScene from "./ChooseStartAttack";
import { LevelUpScene } from "./LevelUpScene";
import MainMenu from "./MainMenu";
import BaseScene, { SceneInit } from "./Scene";
import { UIScene } from "./UIScene";

interface GameSceneInit extends SceneInit { }

export default class GameScene extends BaseScene {
    public static SceneName = 'GameScene';

    enemies: Phaser.GameObjects.Group;
    gems: Phaser.GameObjects.Group;
    destructables: Phaser.GameObjects.Group;
    pickups: Phaser.GameObjects.Group;
    player: PLayer;

    spawner: EnemySpawner;

    init(data: GameSceneInit) {
        super.init(data);
    }

    shutdown(): void {
        this.spawner.Destroy();
        this.physics.shutdown();
        Game.Instance.scene.stop(UIScene.SceneName);

        super.shutdown();
    }

    create(): void {
        super.create();

        this.enemies = this.add.group();
        this.gems = this.add.group();
        this.destructables = this.add.group();
        this.pickups = this.add.group();

        this.cameras.main.setRoundPixels(true);

        Game.Instance.manager.SetupAttacks(this);

        this.cameras.main.setBounds(0, 0, 4096, 4096);
        this.physics.world.setBounds(0, 0, 4096, 4096, true, true, true, true);

        const level = new Level(this, 'map', { key: 'tileset_1', image: 'tiles' });

        let player = this.player = new PLayer(this, 2048, 2048);
        Game.Instance.manager.SetPlayer(player);

        this.physics.add.collider(player, this.enemies, (p: PLayer, e: Enemy) => {
            p.collide();
        });

        this.physics.add.overlap(player, this.gems, (p: PLayer, g: Gem) => {
            g.destroy();
            Game.Instance.manager.GiveExp(g.exp);
        });

        this.physics.add.overlap(player.attractBody, this.gems, (p: PLayer, g: Gem) => {
            g.startCollect();
        });

        this.physics.add.overlap(player, this.pickups, (player: PLayer, pickup: Pickup) => {
            pickup.Pickup(player);
        });

        this.physics.add.collider(this.enemies, this.enemies);

        this.physics.add.collider(level.collision, player);
        this.physics.add.collider(level.bounds, player);

        this.physics.add.collider(level.collision, this.enemies);

        Game.Instance.manager.eventCenter.once('player_die', () => {
            Game.Instance.music.play('death', false);
            Game.Instance.scene.stop(GameScene.SceneName).start(MainMenu.SceneName);
        });

        this.cameras.main.startFollow(player, true, 0.5, 0.5);

        this.spawner = new EnemySpawner(this, GameConfig.maps[ 0 ]);

        this.events.once(Phaser.Scenes.Events.UPDATE, () => {
            Game.Instance.scene.pause(GameScene.SceneName).pause(UIScene.SceneName).start(ChooseStartAttackScene.SceneName, { attacks: Game.Instance.manager.attacks });
        });

        Game.Instance.music.play('music');
    }

    onLevelUp() {
        Game.Instance.scene.pause(GameScene.SceneName);
    }
}