import GameScene from "../scenes/GameScene";
import { Enemy } from "./Enemy";

export class KreyFlower extends Enemy {
    protected _Type: string = 'KreyFlower';
    protected _maxHealth: number = 250;
    protected _exp: number = 5;
    protected _speed: number = 150;
    protected _power: number = 5;

    constructor(scene: GameScene) {
        super(scene, 'krey_flower_01');
        this.body.setCircle(this.width / 3, this.width / 6, this.height - (this.height / 3)).setBounce(1, 1);
    }
}

export class KreyFlower2 extends Enemy {
    protected _Type: string = 'KreyFlower2';
    protected _maxHealth: number = 375;
    protected _exp: number = 5;
    protected _speed: number = 150;
    protected _power: number = 5;

    constructor(scene: GameScene) {
        super(scene, 'krey_flower_02');
        this.body.setCircle(this.width / 3, this.width / 6, this.height - (this.height / 3)).setBounce(1, 1);
    }
}

export class KreyFlower3 extends Enemy {
    protected _Type: string = 'KreyFlower3';
    protected _maxHealth: number = 500;
    protected _exp: number = 10;
    protected _speed: number = 100;
    protected _power: number = 10;

    constructor(scene: GameScene) {
        super(scene, 'krey_flower_03');
        this.body.setCircle(this.width / 3, this.width / 6, this.height - (this.height / 3)).setBounce(1, 1);
    }
}