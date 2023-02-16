import { NineSlice, NineSliceConfig, PositionConfig } from "phaser3-nineslice";
const processsOffsetArray = (arr: Array<any>) => {
    switch (arr.length) {
        case 1:
            // topRightBottomLeft
            return [arr[0], arr[0], arr[0], arr[0]]
        case 2:
            // topBottom rightLeft
            return [arr[0], arr[1], arr[0], arr[1]]
        case 3:
            // top rightLeft bottom
            return [arr[0], arr[1], arr[2], arr[1]]
        case 4:
            // top right bottom left
            return arr
    }
    throw new Error('Received ${arr.length} offset values, expected 1 to 4.')
}

export class NineSliceButton extends NineSlice {
    _defaultScale: number = 1;
    _audio: Phaser.Sound.BaseSound;
    _enabled: boolean = true;
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, key: { key: string; frame: string | number; }, offset: number[], safeArea: number[], callback: Function, callbackcontext: any, soundKey = 'button2') {
        super(scene,
            {
                sourceKey: key.key,
                sourceFrame: key.frame,
                sourceLayout: {
                    topLeft: { width: processsOffsetArray(offset)[1], height: processsOffsetArray(offset)[0] },
                    topRight: { width: processsOffsetArray(offset)[3], height: processsOffsetArray(offset)[0] },
                    bottomRight: { width: processsOffsetArray(offset)[3], height: processsOffsetArray(offset)[2] },
                    bottomLeft: { width: processsOffsetArray(offset)[1], height: processsOffsetArray(offset)[2] },
                },
                safeOffsets: { top: processsOffsetArray(safeArea)[0], right: processsOffsetArray(safeArea)[1], bottom: processsOffsetArray(safeArea)[2], left: processsOffsetArray(safeArea)[3] }
            },
            {
                x: x,
                y: y,
                width: width,
                height: height
            }
        );

        this.setInteractive()
            .on(Phaser.Input.Events.POINTER_OVER, this.tweenIn, this)
            .on(Phaser.Input.Events.POINTER_OUT, this.tweenOut, this)
            .on(Phaser.Input.Events.POINTER_UP, this.tweenOut, this)
            .on(Phaser.Input.Events.POINTER_UP, callback, callbackcontext)
            .on(Phaser.Input.Events.POINTER_DOWN, this.press, this);

        this._audio = scene.sound.add(soundKey);
    }

    public setEnabled(enabled: boolean) {
        this._enabled = enabled;
    }

    public setDefaultScale(x: number, y?: number): this {
        this._defaultScale = x;
        return this;
        // return super.setScale(x, y);
    }

    public addText(text: string, style: Phaser.Types.GameObjects.Text.TextStyle): this {
        const textObj = new Phaser.GameObjects.Text(this.scene, this.x, this.y, text, style).setOrigin(0.5);
        if (textObj.width > this.width - 20) textObj.setScale((this.width - 20) / textObj.width);
        this.draw(textObj, this.width / 2, this.height / 2);
        textObj.destroy();
        return this;
    }

    tweenIn() {
        if (this._enabled === false) return;

        this.scene.tweens.killTweensOf(this);
        this.scene.add.tween({
            targets: this,
            scale: this._defaultScale * 1.1,
            duration: 200,
            ease: Phaser.Math.Easing.Back.Out
        });
    }

    tweenOut() {
        if (this._enabled === false) return;

        this.scene.tweens.killTweensOf(this);
        this.scene.add.tween({
            targets: this,
            scale: this._defaultScale,
            duration: 150,
            ease: Phaser.Math.Easing.Sine.Out
        });
    }

    press() {
        if (this._enabled === false) return;

        this._audio.play();
        this.scene.tweens.killTweensOf(this);
        this.scene.add.tween({
            targets: this,
            scale: this._defaultScale * 0.85,
            duration: 150,
            ease: Phaser.Math.Easing.Back.Out
        })
    }
}