
import { Enemy } from "../enemies/Enemy";
import Game from "../Game";
import { SwipeAttack } from "../player/attacks/SwipeAttack";
import { PLayer } from "../player/Player";
import MainMenu from "./MainMenu";
import BaseScene, { SceneInit } from "./Scene";

interface GameSceneInit extends SceneInit { }

export default class GameScene extends BaseScene {
    public static SceneName = 'GameScene';

    enemies: Phaser.GameObjects.Group;
    player: PLayer;

    init(data: GameSceneInit) {
        super.init(data);
    }

    shutdown(): void {
        super.shutdown();
        this.physics.shutdown();
    }

    create(): void {
        super.create();

        this.cameras.main.setBounds(0, 0, 4096, 4096);
        this.physics.world.setBounds(0, 0, 4096, 4096, true, true, true, true);

        this.physics.world.setFPS(120);

        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tileset_1', 'tiles');
        const bg = map.createLayer('Background', tileset, 0, 0);
        const collision = map.createLayer('COLLISION', tileset, 0, 0);
        collision.setCollisionByExclusion([ -1 ], true);

        this.enemies = this.add.group();
        let player = this.player = new PLayer(this, 2048, 2048);

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

        this.physics.add.collider(this.enemies, this.enemies);

        this.physics.add.collider(collision, player);
        this.physics.add.collider(collision, this.enemies);

        this.events.once('player_die', () => {
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

            Game.Instance.scene.stop(GameScene.SceneName).start(MainMenu.SceneName);
        }
    }
}