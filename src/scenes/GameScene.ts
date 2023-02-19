
import { Enemy } from "../enemies/Enemy";
import Game from "../Game";
import { Gem } from "../objects/Gem";
import { SwipeAttack } from "../player/attacks/SwipeAttack";
import { PLayer } from "../player/Player";
import MainMenu from "./MainMenu";
import BaseScene, { SceneInit } from "./Scene";
import { UIScene } from "./UIScene";

interface GameSceneInit extends SceneInit { }

export default class GameScene extends BaseScene {
    public static SceneName = 'GameScene';

    enemies: Phaser.GameObjects.Group;
    gems: Phaser.GameObjects.Group;
    player: PLayer;

    init(data: GameSceneInit) {
        super.init(data);
    }

    shutdown(): void {
        super.shutdown();
        this.physics.shutdown();

        Game.Instance.scene.stop(UIScene.SceneName);
    }

    create(): void {
        super.create();

        Game.Instance.manager.SetupAttacks(this);

        this.cameras.main.setBounds(0, 0, 4096, 4096);
        this.physics.world.setBounds(0, 0, 4096, 4096, true, true, true, true);

        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tileset_1', 'tiles');
        const bg = map.createLayer('Background', tileset, 0, 0);
        const collision = map.createLayer('COLLISION', tileset, 0, 0);
        collision.setCollisionByExclusion([ -1 ], true);

        this.enemies = this.add.group();
        this.gems = this.add.group();
        let player = this.player = new PLayer(this, 2048, 2048);
        Game.Instance.manager.SetPlayer(player);

        for (let i = 0; i < 20; i++)
        {
            const e = new Enemy(this, i * 50, 0, 'box2', player);
            this.enemies.add(e);
        }

        this.physics.add.collider(player, this.enemies, (p, e) => {
            const player = p as PLayer;
            const enemy = e as Enemy;
            player.collide();
        });

        this.physics.add.overlap(player, this.gems, (p: PLayer, g: Gem) => {
            g.destroy();
            Game.Instance.manager.GiveExp(g.exp);
        });

        this.physics.add.collider(this.enemies, this.enemies);

        this.physics.add.collider(collision, player);
        this.physics.add.collider(collision, this.enemies);

        Game.Instance.manager.eventCenter.once('player_die', () => {
            Game.Instance.scene.stop(GameScene.SceneName).start(MainMenu.SceneName);
        });

        this.cameras.main.startFollow(player, true, 0.5, 0.5);
    }

    update(time: number, delta: number): void {
        super.update(time, delta);

        if (this.enemies.children.size <= 0)
        {
            for (let item of this.sys.displayList.list)
            {
                item.destroy();
            }

            Game.Instance.manager.ReturnToMenu();
        }
    }

    onLevelUp() {
        Game.Instance.scene.pause(GameScene.SceneName);
        // start level up screen
    }
}