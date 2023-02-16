import { Vector } from "../Utils/Vector";

const speed = 300;

export class PLayer extends Phaser.GameObjects.Sprite {
    declare body: Phaser.Physics.Arcade.Body;

    keys: { [ k: string ]: Phaser.Input.Keyboard.Key; };

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'box');
        scene.physics.add.existing(this);

        this.body.setSize(this.width, this.height / 4);
        this.body.setOffset(0, this.displayHeight - this.displayHeight / 4);

        this.setScale(0.15);

        scene.add.existing(this);
        scene.sys.updateList.add(this);

        this.keys = scene.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D,

            up: Phaser.Input.Keyboard.KeyCodes.UP,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        }) as { [ k: string ]: Phaser.Input.Keyboard.Key; };
    }

    protected preUpdate(time: number, delta: number): void {
        this.body.setVelocity(0);
        let inputVector = new Vector(0, 0);

        if (this.keys[ 'w' ].isDown || this.keys[ 'up' ].isDown) inputVector.y--;
        if (this.keys[ 's' ].isDown || this.keys[ 'down' ].isDown) inputVector.y++;
        if (this.keys[ 'a' ].isDown || this.keys[ 'left' ].isDown) inputVector.x--;
        if (this.keys[ 'd' ].isDown || this.keys[ 'right' ].isDown) inputVector.x++;

        const move: Vector = inputVector.normalize();

        this.body.setVelocity(move.x * speed, move.y * speed);
    }
}