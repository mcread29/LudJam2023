declare namespace BBCodeText {
    interface TextStyle extends Phaser.Types.GameObjects.Text.TextStyle {
        backgroundColor?: string | undefined;
        backgroundColor2?: null | string | number;
        backgroundHorizontalGradient?: boolean,
        backgroundStrokeColor?: null | string | number;
        backgroundStrokeLineWidth?: number;
        backgroundCornerRadius?: number;
        backgroundCornerIteration?: undefined | 0;
        underline?: {
            color: string;
            thickness: number;
            offset: number;
        };
        halign?: string;
        valign?: string;
        lineSpacing?: number,
        images?: {
            [ k: string ]: {
                key: string,
                frame?: string,
                width?: number,
                height?: number,
                y?: number,
                left?: number,
                right?: number;
            };
        },
        wrap?: {
            width?: number,
            mode?: 0 | 1 | 2 | 'none' | 'word' | 'char';
        };
    }

    class BBCodeText extends Phaser.GameObjects.Text { }
}

declare interface NineSlice extends Phaser.GameObjects.RenderTexture { }

declare interface NineSliceButton extends NineSlice {
    addText(text: string, style: Phaser.Types.GameObjects.Text.TextStyle): this;
    tweenIn();
    tweenOut();
    press();
    setEnabled(enabled: boolean);
    setDefaultScale(x: number, y?: number): this;

    _defaultScale: number;
    _audio: Phaser.Sound.BaseSound;
}

declare namespace Phaser.GameObjects {
    interface GameObjectFactory {
        nineslice(x: number, y: number, width: number, height: number, key: { key: string, frame: number | string; },
            offset: number, safeArea?: number): NineSlice;

        nineslice(x: number, y: number, width: number, height: number, key: { key: string, frame: number | string; },
            nonUniform: number[]): NineSlice;

        rexBBCodeText(x: number, y: number, content: string, config: BBCodeText.TextStyle): BBCodeText.BBCodeText;
        nineSliceButton(x: number, y: number, width: number, height: number, key: { key: string; frame: string | number; }, offset: number[], safeArea: number[], callback: Function, callbackcontext: any, soundKey: string = ''): NineSliceButton;
    }
}

declare type RexFontConfig = Object;

declare namespace Phaser.Loader {
    interface LoaderPlugin {
        webfont(key: string, url: string, overwrite: boolean = true): Phaser.Loader.LoaderPlugin;
        rexWebFont(config: RexFontConfig): Phaser.Loader.LoaderPlugin;
    }
}