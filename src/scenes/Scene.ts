export interface SceneInit { };

export default class BaseScene extends Phaser.Scene {
    public static SceneName: string;
    init(data: SceneInit = {}): void { }
    preload(): void { };
    create(): void {
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
        this.events.on(Phaser.Scenes.Events.SLEEP, this.sleep, this);
    };
    update(time: number, delta: number): void { };
    shutdown(): void { };
    sleep(): void { }
}