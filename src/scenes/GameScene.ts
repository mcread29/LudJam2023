import Game from "../Game";
import { PLayer } from "../player/Player";
import BaseScene, { SceneInit } from "./Scene";

interface GameSceneInit extends SceneInit { }

export default class GameScene extends BaseScene {
    public static SceneName = 'GameScene';

    init(data: GameSceneInit) {
        super.init(data);
    }

    shutdown(): void {
        super.shutdown();
    }

    create(): void {
        super.create();

        new PLayer(this, Game.Instance.DefaultWidth / 2, Game.Instance.DefaultHeight / 2);
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
    }
}