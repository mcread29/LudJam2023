import GameScene from "../scenes/GameScene";
import { Enemy } from "./Enemy";

export class SadgeGhost extends Enemy {
    protected _Type: string = 'SadgeGhost';
    protected _maxHealth: number = 100;
    protected _exp: number = 5;
    protected _speed: number = 200;
    protected _power: number = 5;

    constructor(scene: GameScene) {
        super(scene, 'sadge_ghost_01');
        this.body.setCircle(this.width / 3).setBounce(1, 1);
    }
}

export class SadgeGhost2 extends Enemy {
    protected _Type: string = 'SadgeGhost2';
    protected _maxHealth: number = 200;
    protected _exp: number = 10;
    protected _speed: number = 150;
    protected _power: number = 10;

    constructor(scene: GameScene) {
        super(scene, 'sadge_ghost_02');
        this.body.setCircle(this.width / 3).setBounce(1, 1);
    }
}

export class SadgeGhost3 extends Enemy {
    protected _Type: string = 'SadgeGhost3';
    protected _maxHealth: number = 300;
    protected _exp: number = 15;
    protected _speed: number = 100;
    protected _power: number = 15;

    constructor(scene: GameScene) {
        super(scene, 'sadge_ghost_03');
        this._isBoss = true;
        this.setScale(1.5);
        this.body.setCircle(this.width / 3).setBounce(1, 1);
    }
}