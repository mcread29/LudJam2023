import GameScene from "../scenes/GameScene";
import { Enemy } from "./Enemy";

export class PogMan extends Enemy {
    protected _Type: string = 'PogMan';
    protected _maxHealth: number = 500;
    protected _exp: number = 5;
    protected _speed: number = 100;
    protected _power: number = 5;

    constructor(scene: GameScene) {
        super(scene, 'pog_man_01');
        this._isBoss = true;
        this.body.setCircle(this.width / 3, this.width / 6, this.width / 3).setBounce(1, 1);
    }
}

export class PogMan2 extends Enemy {
    protected _Type: string = 'PogMan2';
    protected _maxHealth: number = 750;
    protected _exp: number = 10;
    protected _speed: number = 100;
    protected _power: number = 10;

    constructor(scene: GameScene) {
        super(scene, 'pog_man_02');
        this.setScale(1.25);
        this._isBoss = true;
        this.body.setCircle(this.width / 3, this.width / 6, this.width / 3).setBounce(1, 1);
    }
}

export class PogMan3 extends Enemy {
    protected _Type: string = 'PogMan3';
    protected _maxHealth: number = 1000;
    protected _exp: number = 15;
    protected _speed: number = 100;
    protected _power: number = 15;

    constructor(scene: GameScene) {
        super(scene, 'pog_man_03');
        this.setScale(1.5);
        this._isBoss = true;
        this.body.setCircle(this.width / 3, this.width / 6, this.width / 3).setBounce(1, 1);
    }
}