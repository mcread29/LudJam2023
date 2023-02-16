import { NineSliceButton } from "./NineSliceButton";


export class GameObjectFactoryPlugin extends Phaser.Plugins.BasePlugin {
    scene: Phaser.Scene;
    displayList: Phaser.GameObjects.DisplayList;
    updateList: Phaser.GameObjects.UpdateList;
    constructor(pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);
        pluginManager.registerGameObject('nineSliceButton', this.nineSliceButtonCallback);
    }

    private nineSliceButtonCallback(
        x: number,
        y: number,
        width: number,
        height: number,
        key: { key: string; frame: string | number; },
        offset: number[],
        safeArea: number[],
        callback: Function,
        callbackcontext: any,
        soundKey = 'button2'
    ): NineSliceButton {
        const button = new NineSliceButton(this.scene, x, y, width, height, key, offset, safeArea, callback, callbackcontext, soundKey);
        this.scene.add.existing(button);
        return button;
    }
}