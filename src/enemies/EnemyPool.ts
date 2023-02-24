import GameScene from "../scenes/GameScene";
import { BasicEnemy, BasicEnemyBoss, Enemy, LudBoss } from "./Enemy";
import { Bat, Bat2, Bat3 } from "./Bat";
import { Zambie, Zambie2, Zambie3 } from './Zambie';
import { Skeleton, Skeleton2, Skeleton3 } from './Skeleton';
import { SadgeGhost, SadgeGhost2, SadgeGhost3 } from "./Ghost";
import { KreyFlower, KreyFlower2, KreyFlower3 } from "./Flower";
import { PogMan, PogMan2, PogMan3 } from "./PogMan";

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

        this._enemies.set('Bat', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new Bat(scene);
            enemy.Disable();
            this._enemies.get('Bat').push(enemy);
        }

        this._enemies.set('Bat2', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new Bat2(scene);
            enemy.Disable();
            this._enemies.get('Bat2').push(enemy);
        }

        this._enemies.set('Bat3', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new Bat3(scene);
            enemy.Disable();
            this._enemies.get('Bat3').push(enemy);
        }

        this._enemies.set('Skeleton', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new Skeleton(scene);
            enemy.Disable();
            this._enemies.get('Skeleton').push(enemy);
        }

        this._enemies.set('Skeleton2', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new Skeleton2(scene);
            enemy.Disable();
            this._enemies.get('Skeleton2').push(enemy);
        }

        this._enemies.set('Skeleton3', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new Skeleton3(scene);
            enemy.Disable();
            this._enemies.get('Skeleton3').push(enemy);
        }

        this._enemies.set('Zambie', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new Zambie(scene);
            enemy.Disable();
            this._enemies.get('Zambie').push(enemy);
        }

        this._enemies.set('Zambie2', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new Zambie2(scene);
            enemy.Disable();
            this._enemies.get('Zambie2').push(enemy);
        }

        this._enemies.set('Zambie3', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new Zambie3(scene);
            enemy.Disable();
            this._enemies.get('Zambie3').push(enemy);
        }

        this._enemies.set('SadgeGhost', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new SadgeGhost(scene);
            enemy.Disable();
            this._enemies.get('SadgeGhost').push(enemy);
        }

        this._enemies.set('SadgeGhost2', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new SadgeGhost2(scene);
            enemy.Disable();
            this._enemies.get('SadgeGhost2').push(enemy);
        }

        this._enemies.set('SadgeGhost3', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new SadgeGhost3(scene);
            enemy.Disable();
            this._enemies.get('SadgeGhost3').push(enemy);
        }

        this._enemies.set('KreyFlower', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new KreyFlower(scene);
            enemy.Disable();
            this._enemies.get('KreyFlower').push(enemy);
        }

        this._enemies.set('KreyFlower2', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new KreyFlower2(scene);
            enemy.Disable();
            this._enemies.get('KreyFlower2').push(enemy);
        }

        this._enemies.set('KreyFlower3', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new KreyFlower3(scene);
            enemy.Disable();
            this._enemies.get('KreyFlower3').push(enemy);
        }

        this._enemies.set('PogMan', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new PogMan(scene);
            enemy.Disable();
            this._enemies.get('PogMan').push(enemy);
        }

        this._enemies.set('PogMan2', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new PogMan2(scene);
            enemy.Disable();
            this._enemies.get('PogMan2').push(enemy);
        }

        this._enemies.set('PogMan3', []);
        for (let i = 0; i < 100; i++)
        {
            const enemy = new PogMan3(scene);
            enemy.Disable();
            this._enemies.get('PogMan3').push(enemy);
        }
    }

    public static GetEnemies(type: string, count: number): Enemy[] {
        return this._enemies.get(type).splice(0, count);
    }

    public static ReturnEnemy(enemy: Enemy) {
        this._enemies.get(enemy.Type).push(enemy);
    }
}