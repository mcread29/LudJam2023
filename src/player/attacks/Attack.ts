import GameScene from "../../scenes/GameScene";
import { PLayer } from "../Player";
import { HitBox } from "./HitBox";

export abstract class Attack {
    declare abstract hitboxes: HitBox[];
    public abstract attacRate: number;
    public abstract attackTimeout: number;
    public abstract damage: number;

    constructor(protected scene: GameScene, protected player: PLayer) {
        scene.events.on(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    }

    public Destroy() {
        if (this.scene)
        {
            this.scene.events.off(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
        }
    }

    protected preUpdate(time: number, delta: number): void {
        this.attackTimeout -= delta / 1000;
        if (this.attackTimeout <= 0)
        {
            this.Attack();
            this.attackTimeout = this.attacRate;
        }
    }

    abstract Attack();
}