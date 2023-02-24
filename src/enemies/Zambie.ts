import GameScene from "../scenes/GameScene";
import { Enemy } from "./Enemy";

export class Zambie extends Enemy {
    protected _Type: string = 'Zambie';
    protected _maxHealth: number = 10;
    protected _exp: number = 1;
    protected _speed: number = 100;
    protected _power: number = 10;

    constructor(scene: GameScene) {
        super(scene, 'zambie_01');
        this.body.setCircle(this.width / 3, this.width / 6, this.height - (this.height / 3)).setBounce(1, 1);
    }
}

export class Zambie2 extends Enemy {
    protected _Type: string = 'Zambie2';
    protected _maxHealth: number = 30;
    protected _exp: number = 5;
    protected _speed: number = 100;
    protected _power: number = 10;

    constructor(scene: GameScene) {
        super(scene, 'zambie_02');
        this.body.setCircle(this.width / 3, this.width / 6, this.height - (this.height / 3)).setBounce(1, 1);
    }
}

export class Zambie3 extends Enemy {
    protected _Type: string = 'Zambie3';
    protected _maxHealth: number = 60;
    protected _exp: number = 5;
    protected _speed: number = 100;
    protected _power: number = 15;

    constructor(scene: GameScene) {
        super(scene, 'zambie_03');
        this.setScale(1.5);
        this._isBoss = true;
        this.body.setCircle(this.width / 3, this.width / 6, this.height - (this.height / 3)).setBounce(1, 1);
    }
}