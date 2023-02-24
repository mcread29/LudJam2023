import GameScene from "../scenes/GameScene";
import { Enemy } from "./Enemy";

export class Skeleton extends Enemy {
    protected _Type: string = 'Skeleton';
    protected _maxHealth: number = 25;
    protected _exp: number = 5;
    protected _speed: number = 100;
    protected _power: number = 5;

    constructor(scene: GameScene) {
        super(scene, 'skeleton_01');
        this.body.setCircle(this.width / 3, this.width / 6, this.width / 3).setBounce(1, 1);
    }
}

export class Skeleton2 extends Enemy {
    protected _Type: string = 'Skeleton2';
    protected _maxHealth: number = 50;
    protected _exp: number = 10;
    protected _speed: number = 100;
    protected _power: number = 10;

    constructor(scene: GameScene) {
        super(scene, 'skeleton_02');
        this.body.setCircle(this.width / 3, this.width / 6, this.width / 3).setBounce(1, 1);
    }
}

export class Skeleton3 extends Enemy {
    protected _Type: string = 'Skeleton3';
    protected _maxHealth: number = 100;
    protected _exp: number = 15;
    protected _speed: number = 100;
    protected _power: number = 15;

    constructor(scene: GameScene) {
        super(scene, 'skeleton_03');
        this.setScale(1.5);
        this._isBoss = true;
        this.body.setCircle(this.width / 3, this.width / 6, this.width / 3).setBounce(1, 1);
    }
}