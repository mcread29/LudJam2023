
import { Enemy } from "../enemies/Enemy";
import Game from "../Game";
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
    }

    create(): void {
        super.create();

        this.physics.world.setFPS(120);

        this.enemies = this.add.group();
        let player = this.player = new PLayer(this, Game.Instance.DefaultWidth / 2, Game.Instance.DefaultHeight / 2);

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

        this.events.once('player_die', () => {
            this.physics.shutdown();
            Game.Instance.scene.stop(GameScene.SceneName).start(MainMenu.SceneName);
        });
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
    }
}