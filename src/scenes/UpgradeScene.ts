import Game from "../Game";
import BaseScene from "./Scene";

const coinCosts = {
    'Wicked': [
        300, 600, 900, 1300, 1800
    ],
    'SUCC': [
        300, 600, 900
    ],
    'QT Candle': [
        300, 600, 900, 1400, 1800
    ],
    'Catnip': [
        400, 800, 1200, 1800, 2400
    ],
    'QT Star': [
        200, 500, 800, 1200, 1600
    ],
};

class UpgradeDisplay extends Phaser.GameObjects.Container {
    fills: Phaser.GameObjects.Image[];
    costText: BBCodeText.BBCodeText;

    constructor(scene: Phaser.Scene, x: number, y: number, private _name: string, private currentLevel: number, private maxLevel: number, private _onUpgrade: () => void) {
        super(scene, x, y);
        scene.add.existing(this);

        const text = scene.add.rexBBCodeText(0, -65, _name, {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '30px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5).setResolution(5);
        const bg = scene.add.nineslice(0, 0, 20 + 40 * this.maxLevel + 5 * (this.maxLevel - 1), 60, 'border_2', [ 10, 10, 10, 10 ]).setOrigin(0.5);

        const costString = this.currentLevel < this.maxLevel ? `[color=#FFD700]${coinCosts[ this._name ][ this.currentLevel ]}[/color]` : `[color=green]MAXED![/color]`;
        const costText = this.costText = scene.add.rexBBCodeText(0, -40, costString, {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '15px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5).setResolution(5);

        this.add([ bg, text, costText ]);

        this.fills = [];
        for (let i = 0; i < this.maxLevel; i++)
        {
            const icon = scene.add.image((i - Math.floor(this.maxLevel / 2)) * 45, 0, 'icon_bg');
            const fill = scene.add.image((i - Math.floor(this.maxLevel / 2)) * 45, 0, 'upgrade_fill');
            if (i < currentLevel) fill.setTint(0x00ffff);
            this.fills.push(fill);

            this.add([ icon, fill ]);
        }

        let canClick = true;
        const button = scene.add.nineslice(0, 70, 120, 50, 'meter', [ 9, 9, 9, 9 ])
            .setOrigin(0.5)
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, () => {
                if (canClick === false) return;

                canClick = false;
                this.upgrade();
                scene.tweens.killTweensOf([ buttonText, button ]);
                scene.tweens.add({
                    targets: [ buttonText, button ],
                    scale: 1,
                    duration: 200,
                    ease: Phaser.Math.Easing.Back.InOut,
                    onComplete: () => {
                        scene.tweens.add({
                            targets: [ buttonText, button ],
                            scale: 1.3,
                            duration: 150,
                            ease: Phaser.Math.Easing.Back.Out,
                            onComplete: () => canClick = true
                        });
                    }
                });
            })
            .on(Phaser.Input.Events.POINTER_OVER, () => {
                scene.tweens.killTweensOf([ buttonText, button ]);
                scene.tweens.add({
                    targets: [ buttonText, button ],
                    scale: 1.3,
                    duration: 100,
                    ease: Phaser.Math.Easing.Quadratic.Out
                });
            })
            .on(Phaser.Input.Events.POINTER_OUT, () => {
                canClick = true;
                scene.tweens.killTweensOf([ buttonText, button ]);
                scene.tweens.add({
                    targets: [ buttonText, button ],
                    scale: 1,
                    duration: 100,
                    ease: Phaser.Math.Easing.Quadratic.Out
                });
            });
        const buttonText = scene.add.rexBBCodeText(0, 70, 'UPGRADE', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '22px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5).setResolution(5);
        this.add([ button, buttonText ]);
    }

    upgrade() {
        if (this.currentLevel >= this.maxLevel || Game.Instance.playerData.saveData.coinCount < coinCosts[ this._name ][ this.currentLevel ]) return;

        Game.Instance.playerData.saveData.coinCount -= coinCosts[ this._name ][ this.currentLevel ];

        this.fills[ this.currentLevel ].setTint(0x00ffff);
        this.currentLevel++;
        this._onUpgrade();
        const costString = this.currentLevel < this.maxLevel ? `[color=#FFD700]${coinCosts[ this._name ][ this.currentLevel ]}[/color]` : `[color=green]MAXED![/color]`;
        this.costText.setText(`[color=#FFD700]${coinCosts[ this._name ][ this.currentLevel ]}[/color]`);
    }
}

export class UpgradeScene extends BaseScene {
    public static SceneName: string = 'UpgradeScene';

    create() {
        const bg = this.add.image(0, 0, 'box')
            .setTint(0x000000)
            .setAlpha(0.7)
            .setInteractive()
            .setOrigin(0)
            .setDisplaySize(Game.Instance.DefaultWidth, Game.Instance.DefaultHeight);

        const panel = this.add.nineslice(100, 100, Game.Instance.DefaultWidth - 200, Game.Instance.DefaultHeight - 200, 'panel_bg', [ 10, 10, 10, 10 ]);

        this.add.rexBBCodeText(Game.Instance.DefaultWidth / 2, 125, 'Upgrades', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '50px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5, 0).setResolution(5);

        const coinText = this.add.rexBBCodeText(Game.Instance.DefaultWidth / 2, 180, `Coins: [color=#FFD700]${Game.Instance.playerData.saveData.coinCount}[/color]`, {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '30px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5, 0).setResolution(5);

        const save = Game.Instance.playerData.saveData;

        const WickedUpgrade = new UpgradeDisplay(this, 235, 327, 'Wicked', save.WickedTier, 5, () => {
            Game.Instance.playerData.saveData.WickedTier++;
            Game.Instance.playerData.save();
            coinText.setText(`Coins: ${Game.Instance.playerData.saveData.coinCount}`);
        });
        const SuccUpgrade = new UpgradeDisplay(this, 480, 327, 'SUCC', save.SuccTier, 3, () => {
            Game.Instance.playerData.saveData.SuccTier++;
            Game.Instance.playerData.save();
            coinText.setText(`Coins: ${Game.Instance.playerData.saveData.coinCount}`);
        });
        const QTCandleUpgrade = new UpgradeDisplay(this, 725, 327, 'QT Candle', save.CandleTier, 5, () => {
            Game.Instance.playerData.saveData.CandleTier++;
            Game.Instance.playerData.save();
            coinText.setText(`Coins: ${Game.Instance.playerData.saveData.coinCount}`);
        });
        const CatnipUpgrade = new UpgradeDisplay(this, 320, 527, 'Catnip', save.CatNipTier, 5, () => {
            Game.Instance.playerData.saveData.CatNipTier++;
            Game.Instance.playerData.save();
            coinText.setText(`Coins: ${Game.Instance.playerData.saveData.coinCount}`);
        });
        const QTStarUpgrade = new UpgradeDisplay(this, 640, 527, 'QT Star', save.StarTier, 5, () => {
            Game.Instance.playerData.saveData.StarTier++;
            Game.Instance.playerData.save();
            coinText.setText(`Coins: ${Game.Instance.playerData.saveData.coinCount}`);
        });

        const close = this.add.nineslice(Game.Instance.DefaultWidth / 2, 660, 180, 56, 'meter', [ 9, 9, 9, 9 ])
            .setOrigin(0.5)
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, () => {
                Game.Instance.scene.stop(UpgradeScene.SceneName);
                this.tweens.killTweensOf([ close, buttonText ]);
                this.tweens.add({
                    targets: [ close, buttonText ],
                    scale: 1,
                    duration: 100,
                    ease: Phaser.Math.Easing.Quadratic.Out
                });
            })
            .on(Phaser.Input.Events.POINTER_OVER, () => {
                this.tweens.killTweensOf([ close, buttonText ]);
                this.tweens.add({
                    targets: [ close, buttonText ],
                    scale: 1.15,
                    duration: 100,
                    ease: Phaser.Math.Easing.Quadratic.Out
                });
            })
            .on(Phaser.Input.Events.POINTER_OUT, () => {
                this.tweens.killTweensOf([ close, buttonText ]);
                this.tweens.add({
                    targets: [ close, buttonText ],
                    scale: 1,
                    duration: 100,
                    ease: Phaser.Math.Easing.Quadratic.Out
                });
            });
        const buttonText = this.add.rexBBCodeText(Game.Instance.DefaultWidth / 2, 660, 'CLOSE', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '40px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5).setResolution(5);
    }
}