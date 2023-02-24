import GameScene from "../scenes/GameScene";
import { Enemy } from "./Enemy";

export class Bat extends Enemy {
    protected _Type: string = 'Bat';
    protected _maxHealth: number = 1;
    protected _exp: number = 1;
    protected _speed: number = 140;
    protected _power: number = 5;

    constructor(scene: GameScene) {
        super(scene, 'pog_bat_01');
        this.body.setCircle(this.width / 2).setBounce(1, 1);
    }
}

export class Bat2 extends Enemy {
    protected _Type: string = 'Bat2';
    protected _maxHealth: number = 5;
    protected _exp: number = 1;
    protected _speed: number = 140;
    protected _power: number = 5;

    constructor(scene: GameScene) {
        super(scene, 'pog_bat_02');
        this.body.setCircle(this.width / 2).setBounce(1, 1);
    }
}

export class Bat3 extends Enemy {
    protected _Type: string = 'Bat3';
    protected _maxHealth: number = 20;
    protected _exp: number = 1;
    protected _speed: number = 140;
    protected _power: number = 5;

    constructor(scene: GameScene) {
        super(scene, 'pog_bat_03');
        this.setScale(1.5);
        this.body.setCircle(this.width / 2).setBounce(1, 1);
    }
}