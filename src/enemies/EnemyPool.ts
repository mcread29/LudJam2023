import GameScene from "../scenes/GameScene";
import { BasicEnemy, BasicEnemyBoss, Enemy, LudBoss } from "./Enemy";

export class EnemyPool {
    public static get enemies(): Map<string, Enemy[]> { return this._enemies; }
    private static _enemies: Map<string, Enemy[]>;

    public static Initialize(scene: GameScene) {
        this._enemies = new Map<string, Enemy[]>();
        this._enemies.set('BasicEnemy', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new BasicEnemy(scene);
            enemy.Disable();
            this._enemies.get('BasicEnemy').push(enemy);
        }

        this._enemies.set('BasicEnemyBoss', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new BasicEnemyBoss(scene);
            enemy.Disable();
            this._enemies.get('BasicEnemyBoss').push(enemy);
        }

        this._enemies.set('LudBoss', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new LudBoss(scene);
            enemy.Disable();
            this._enemies.get('LudBoss').push(enemy);
        }
    }

    public static GetEnemies(type: string, count: number): Enemy[] {
        return this._enemies.get(type).splice(0, count);
    }

    public static ReturnEnemy(enemy: Enemy) {
        this._enemies.get(enemy.Type).push(enemy);
    }
}