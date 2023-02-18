export class HitBox extends Phaser.Physics.Arcade.Sprite {
    declare body: Phaser.Physics.Arcade.Body;
    public get damage(): number { return this._damage; }

    enableTimeout: NodeJS.Timeout;
    duration = 50;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, private _damage: number, private _autoDisable = false) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    destroy(fromScene?: boolean): void {
        if (fromScene) return;
        clearTimeout(this.enableTimeout);
        super.destroy(fromScene);
    }

    disable(): this {
        this.disableBody(true, true);
        return this;
    }

    enable(x: number, y: number): this {
        super.enableBody(true, x, y, true, true);
        if (this._autoDisable) this.enableTimeout = setTimeout(() => this.disable(), this.duration);
        return this;
    }
}