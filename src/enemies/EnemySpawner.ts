import Game, { MapData, Wave } from "../Game";
import GameScene from "../scenes/GameScene";
import { Enemy } from "./Enemy";
import { EnemyPool } from "./EnemyPool";

export class EnemySpawner {

    private _timeElapsed: number;
    private _interval: number;

    private _activeEnemies: number;
    private lastWave: Wave;
    private _spawnedBoss: boolean = false;

    constructor(private scene: GameScene, private data: MapData) {
        this._interval = 0;
        this._timeElapsed = 0;
        this._activeEnemies = 0;

        EnemyPool.Initialize(scene);

        scene.events.on(Phaser.Scenes.Events.UPDATE, this.Update, this);
        Game.Instance.manager.eventCenter.on('enemyKilled', this.enemyKilled, this);

        this.lastWave = this.data.waves[ 0 ];

        this.SpawnWave(this.data.waves[ 0 ]);
    }

    private enemyKilled() {
        this._activeEnemies--;
    }

    private Update(time: number, delta: number) {
        if (this._interval <= 0)
        {
            const wave = this.data.waves[ Math.floor(this._timeElapsed) ];
            if (wave && wave !== this.lastWave)
            {
                if (wave.clearAll)
                {
                    let enemies = this.scene.enemies.getChildren() as Enemy[];
                    while (enemies.length > 0)
                    {
                        const enemy = enemies[ 0 ];
                        enemy.Disable();
                        EnemyPool.ReturnEnemy(enemy);
                        this.enemyKilled();
                    }
                    console.log(this.scene.enemies.getChildren().length);
                }
                this.lastWave = wave;
                this._spawnedBoss = false;
            }
            this.SpawnWave(this.lastWave);
        }

        this._interval -= delta / 1000;
        this._timeElapsed += delta / 1000;
    }

    private SpawnWave(wave: Wave) {
        if (wave.boss && this._spawnedBoss === false)
        {
            this._spawnedBoss = true;
            const boss = EnemyPool.GetEnemies(wave.boss, 1)[ 0 ];
            boss.Enable();
            Phaser.Actions.RotateAroundDistance(
                [ boss ],
                { x: this.scene.cameras.main.scrollX + 480, y: this.scene.cameras.main.scrollY + 400 },
                Math.PI * 2 * Math.random(), // * (i / enemies.length),
                this.scene.cameras.main.width / 2 + 192
            );
        }

        const numToSpawn = wave.minimum - this._activeEnemies;
        if (numToSpawn < 1) return;

        console.log('spawn', numToSpawn);

        const whichToSpawn = wave.enemies;

        const num = splitNParts(numToSpawn, whichToSpawn.length);

        for (let enemyName of whichToSpawn)
        {
            const spawnCount = num.next().value;
            if (spawnCount)
            {
                const enemies = EnemyPool.GetEnemies(enemyName, spawnCount);
                for (let i = 0; i < enemies.length; i++)
                {
                    const enemy = enemies[ i ];
                    enemy.Enable();
                    Phaser.Actions.RotateAroundDistance(
                        [ enemy ],
                        { x: this.scene.cameras.main.scrollX + 480, y: this.scene.cameras.main.scrollY + 400 },
                        Math.PI * 2 * Math.random(), // * (i / enemies.length),
                        this.scene.cameras.main.width / 2 + 192
                    );
                }
            }
        }

        this._activeEnemies += numToSpawn;
        this._interval = wave.interval;
    }
}

function* splitNParts(num, parts) {
    let sumParts = 0;
    for (let i = 0; i < parts - 1; i++)
    {
        const pn = Math.ceil(Math.random() * (num - sumParts));
        yield pn;
        sumParts += pn;
    }
    yield num - sumParts;
}