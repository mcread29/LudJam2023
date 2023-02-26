export namespace Utils {
    export type tintable = Phaser.GameObjects.Image | Phaser.GameObjects.RenderTexture | Phaser.GameObjects.Sprite;

    export function tintBG(scene: Phaser.Scene, to: number, from: number, target: tintable) {
        scene.tweens.addCounter({
            from: 100,
            to: 0,
            duration: 100,
            onUpdate: (tween) => {
                const value = Math.floor(tween.getValue());
                var hexColor = Phaser.Display.Color.Interpolate.ColorWithColor(valueToColor(to), valueToColor(from), 100, value);
                target.setTint(Phaser.Display.Color.ObjectToColor(hexColor).color);
            }
        });
    }

    function valueToColor(input: string | number | Phaser.Types.Display.InputColorObject): Phaser.Display.Color {
        return Phaser.Display.Color.ValueToColor(input);
    }

    export type Displayable = Phaser.GameObjects.Image | Phaser.GameObjects.RenderTexture;
    export function AddButtonBounce(scene: Phaser.Scene, button: Displayable, onClick: () => void, text?: BBCodeText.BBCodeText) {
        button.setOrigin(0.5)
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, () => {
                onClick();
                scene.tweens.killTweensOf([ button, text ]);
                scene.tweens.add({
                    targets: [ button, text ],
                    scale: 1,
                    duration: 100,
                    ease: Phaser.Math.Easing.Quadratic.Out,
                    onComplete: () => {
                        scene.tweens.killTweensOf([ button, text ]);
                        scene.tweens.add({
                            targets: [ button, text ],
                            scale: 1.15,
                            duration: 100,
                            ease: Phaser.Math.Easing.Quadratic.Out
                        });
                    }
                });
            })
            .on(Phaser.Input.Events.POINTER_OVER, () => {
                scene.tweens.killTweensOf([ button, text ]);
                scene.tweens.add({
                    targets: [ button, text ],
                    scale: 1.15,
                    duration: 100,
                    ease: Phaser.Math.Easing.Quadratic.Out
                });
            })
            .on(Phaser.Input.Events.POINTER_OUT, () => {
                scene.tweens.killTweensOf([ button, text ]);
                scene.tweens.add({
                    targets: [ button, text ],
                    scale: 1,
                    duration: 100,
                    ease: Phaser.Math.Easing.Quadratic.Out
                });
            });
    }
}