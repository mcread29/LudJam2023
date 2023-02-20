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

        this.collision = this.map.createLayer('COLLISION', this.tileset);
        this.collision.setCollisionByExclusion([ -1 ], true);

        this.bounds = this.map.createLayer('BOUNDS', this.tileset);
        this.bounds.setCollisionByExclusion([ -1 ], true);
    }
}