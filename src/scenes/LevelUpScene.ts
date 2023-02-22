import Game from "../Game";
import { Attack, PowerUp } from "../player/attacks/Attack";
import BaseScene from "./Scene";

export class PowerUpDisplay extends Phaser.GameObjects.Container {
    public select: () => void;
    public over: () => void;
    public get attack(): PowerUp { return this._attack; }

    constructor(scene: Phaser.Scene, x: number, y: number, private _attack: PowerUp) {
        super(scene, x, y,);
        scene.add.existing(this);

        const bg = scene.add.nineslice(0, 0, 360, 100, 'border_1', [ 44, 44, 44, 44 ])
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, () => {
                this.select();
            })
            .on(Phaser.Input.Events.POINTER_OVER, () => {
                this.over();
            });

        const icon = scene.add.image(25, 25, _attack.icon);

        const name = scene.add.rexBBCodeText(30 + icon.width / 2, 25, _attack.name, {
            fontFamily: 'ExpressionPro',
            color: '#ffffff',
            fontSize: '30px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0, 0.5).setResolution(5);

        const desc = scene.add.rexBBCodeText(25, 30 + icon.height / 2, _attack.desc, {
            fontFamily: 'ExpressionPro',
            color: '#ffffff',
            fontSize: '20px',
            halign: 'left',
            valign: 'center',
            wrap: {
                mode: 'word',
                width: 240
            }
        }).setOrigin(0, 0).setResolution(5);

        const text = _attack.level < 1 ? 'New!' : `Lvl. ${_attack.level + 1}`;
        const lvl = scene.add.rexBBCodeText(bg.width - 12.5, 12.5, text, {
            fontFamily: 'ExpressionPro',
            color: '#ffffff',
            fontSize: '20px',
            halign: 'right',
            valign: 'center',
            wrap: {
                mode: 'word',
                width: 240
            }
        }).setOrigin(1, 0).setResolution(5);

        this.add([ bg, icon, name, desc, lvl ]);
    }
}

export class LevelUpScene extends BaseScene {
    public static SceneName = 'LevelUpScene';

    attacks: PowerUp[];

    selectedIndex: number = 0;
    powerUps: PowerUpDisplay[];

    spaceBar: Phaser.Input.Keyboard.Key;
    enter: Phaser.Input.Keyboard.Key;
    up: Phaser.Input.Keyboard.Key;
    w: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;

    arrow: Phaser.GameObjects.Image;

    canChangeSelection = false;

    init(data: { attacks: PowerUp[]; }) {
        this.attacks = data.attacks;
    }

    create(): void {
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        const meterBG = this.add.nineslice(0, 0, Game.Instance.DefaultWidth, 32, 'meter', [ 9, 9, 9, 9 ]);
        const meterFill = this.add.nineslice(0, 0, Game.Instance.DefaultWidth, 32, 'meter-fill', [ 9, 9, 9, 9 ])
            .setTint(0x7556e8);

        this.tweens.addCounter({
            from: 255,
            to: 0,
            duration: 500,
            onUpdate: function (tween) {
                const value = Math.floor(tween.getValue());
                meterFill.setTint(Phaser.Display.Color.GetColor(value, value, value));
            },
            loop: -1,
            yoyo: true
        });

        const bg = this.add.nineslice(280, 100, 400, 115 + 105 * this.attacks.length, 'panel_bg', [ 5, 5, 5, 5 ]);

        const meterFillMask = this.make.graphics({});
        meterFillMask.setPosition(0, 0).fillStyle(0xffffff);
        meterFillMask.beginPath();
        meterFillMask.fillRect(285, 105, 390, 115 + 100 * this.attacks.length);

        const mask = meterFillMask.createGeometryMask();

        this.powerUps = [];
        let space = 0;
        for (let i = 0; i < this.attacks.length; i++)
        {
            const attack = this.attacks[ i ];
            const powerUp = new PowerUpDisplay(this, 300, 200 + space, attack);
            powerUp.setMask(mask);
            powerUp.select = this.selectCurrent.bind(this);
            powerUp.over = () => {
                this.selectedIndex = i;
                this.setSelection();
            };
            this.powerUps.push(powerUp);
            space += 105;
        }

        this.add.rexBBCodeText(480, 150, 'Level Up!', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '50px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5).setResolution(5);;

        const startButton = this.add.image(Game.Instance.DefaultWidth / 2, Game.Instance.DefaultHeight / 2 + 200, 'box')
            .setScale(1, 0.3)
            .setInteractive().on(Phaser.Input.Events.POINTER_DOWN, () => {
                Game.Instance.manager.LevelUpClosed();
            });

        const startText = this.add.rexBBCodeText(Game.Instance.DefaultWidth / 2, Game.Instance.DefaultHeight / 2, 'Close [TEMP]', {
            fontFamily: 'FutilePro',
            color: '#ff0000',
            fontSize: '25px',
            halign: 'center',
            valign: 'center'
        }).setDepth(Game.maxDepth).setOrigin(0.5).setResolution(5);;
        Phaser.Display.Align.In.Center(startText, startButton);

        this.arrow = this.add.image(0, 280, 'arrow_1');
        this.arrow.setMask(mask);

        this.add.tween({
            targets: this.arrow,
            x: 300,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.Out,
            onComplete: () => this.canChangeSelection = true
        });

        this.selectedIndex = 0;
    }

    setSelection() {
        this.canChangeSelection = false;
        this.add.tween({
            targets: this.arrow,
            y: this.powerUps[ this.selectedIndex ].y + 80,
            duration: 100,
            ease: Phaser.Math.Easing.Sine.Out,
            onComplete: () => this.canChangeSelection = true
        });
    }

    selectCurrent() {
        this.canChangeSelection = false;
        this.arrow.setTexture('arrow_2');

        this.add.tween({
            targets: this.arrow,
            x: -100,
            duration: 300,
            delay: 500,
            ease: Phaser.Math.Easing.Sine.Out,
        });

        this.add.tween({
            targets: this.powerUps[ this.selectedIndex ],
            x: -100,
            duration: 300,
            delay: 500,
            ease: Phaser.Math.Easing.Sine.Out,
            onComplete: () => {
                Game.Instance.manager.AddAttack(this.powerUps[ this.selectedIndex ].attack);
                this.close();
            }
        });
    }

    update(time: number, delta: number): void {
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar) || Phaser.Input.Keyboard.JustDown(this.enter))
        {
            this.powerUps[ this.selectedIndex ].select();
        }
        if ((Phaser.Input.Keyboard.JustDown(this.up) || Phaser.Input.Keyboard.JustDown(this.w)) && this.canChangeSelection && this.powerUps.length > 0)
        {
            this.selectedIndex -= 1;
            this.selectedIndex = ((this.selectedIndex % this.attacks.length) + this.attacks.length) % this.attacks.length;
            this.setSelection();
        }
        if ((Phaser.Input.Keyboard.JustDown(this.down) || Phaser.Input.Keyboard.JustDown(this.s)) && this.canChangeSelection && this.powerUps.length > 0)
        {
            this.selectedIndex += 1;
            this.selectedIndex = ((this.selectedIndex % this.attacks.length) + this.attacks.length) % this.attacks.length;
            this.setSelection();
        }
    }

    close() {
        Game.Instance.manager.LevelUpClosed();
    }
}