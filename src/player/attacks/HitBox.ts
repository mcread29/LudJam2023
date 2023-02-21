export class HitBox extends Phaser.Physics.Arcade.Sprite {
    declare body: Phaser.Physics.Arcade.Body;
    public get damage(): number { return this._damage; }

    enableTimeout: NodeJS.Timeout;
    duration = 50;

    protected _baseScale: { x: number, y: number; } = { x: 1, y: 1 };
    public get baseScale(): { x: number, y: number; } { return this._baseScale; };

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, private _damage: number, private _autoDisable = false, private _showBox = true) {
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
        super.enableBody(true, x, y, this._showBox, this._showBox);
        if (this._autoDisable) this.enableTimeout = setTimeout(() => this.disable(), this.duration);
        return this;
    }

    setBaseScale(scaleX: number, scaleY?: number): this {
        this._baseScale = { x: scaleX, y: scaleY || scaleX };
        return super.setScale(scaleX, scaleY);
    }

    setScale(x: number, y?: number): this {
        super.setScale(x * this._baseScale.x, (y || x) * this.baseScale.y);
        return this;
    }
}