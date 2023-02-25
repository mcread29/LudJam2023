import Game from "./Game";
import { Destructable } from "./objects/Destructable";
import GameScene from "./scenes/GameScene";

export class Level {
    map: Phaser.Tilemaps.Tilemap;
    tileset: Phaser.Tilemaps.Tileset;
    bounds: Phaser.Tilemaps.TilemapLayer;
    collision: Phaser.Tilemaps.TilemapLayer;

    constructor(scene: GameScene, key: string, tileset: { key: string, image: string; }) {
        this.map = scene.make.tilemap({ key: key });
        this.tileset = this.map.addTilesetImage(tileset.key, tileset.image);

        this.map.createLayer('Background', this.tileset);

        this.collision = this.map.createLayer('COLLISION', this.tileset).setVisible(false);
        this.collision.setCollisionByExclusion([ -1 ], true);

        this.map.createLayer('FG', this.tileset);
        this.map.createLayer('FG2', this.tileset);
        this.map.createLayer('FG3', this.tileset).setDepth(Game.maxDepth);

        this.bounds = this.map.createLayer('BOUNDS', this.tileset).setVisible(false);
        this.bounds.setCollisionByExclusion([ -1 ], true);

        const destructables = this.map.createLayer('destructables', this.tileset);
        destructables.setVisible(false);
        for (let row of destructables.layer.data)
        {
            for (let tile of row)
            {
                if (tile.index !== -1)
                {
                    new Destructable(scene, tile.getCenterX(), tile.getCenterY());
                }
            }
        }
    }
}