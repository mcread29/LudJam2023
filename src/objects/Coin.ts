import Game from "../Game";
import { PLayer } from "../player/Player";
import GameScene from "../scenes/GameScene";
import { Pickup } from "./PIckup";

export class Coin extends Pickup {

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, 'coin_01');
        this.play({ key: 'Coin', repeat: -1 });
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    Pickup(player: PLayer) {
        const count = Math.floor(Math.random() * 50);
        const text = this.scene.add.rexBBCodeText(Math.round(this.x), Math.round(this.y), `[b]${count}[/b]`, {
            fontFamily: 'FutilePro',
            color: '#FFD700',
            fontSize: '30px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5)
            .setDepth(Game.maxDepth + 20)
            .setResolution(5)
            .setStroke('0x000000', 5);

        this.scene.add.tween({
            targets: text,
            scale: 1.5,
            ease: Phaser.Math.Easing.Back.Out,
            duration: 700
        });
        this.scene.add.tween({
            targets: text,
            alpha: 0,
            duration: 300,
            delay: 400,
            onComplete: () => text.destroy()
        });

        Game.Instance.playerData.saveData.coinCount += count;
        Game.Instance.playerData.save();

        this.destroy();
    }
}