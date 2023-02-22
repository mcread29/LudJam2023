import Game from "../Game";
import { PowerUp } from "../player/attacks/Attack";
import { PowerUpDisplay } from "./LevelUpScene";
import BaseScene from "./Scene";

export default class ChooseStartAttackScene extends BaseScene {
    public static SceneName = 'ChooseStartAttackScene';

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
            const powerUP = new PowerUpDisplay(this, 300, 200 + space, attack);
            powerUP.select = this.selectCurrent.bind(this);
            powerUP.over = () => {
                this.selectedIndex = i;
                this.setSelection();
            };
            powerUP.setMask(mask);
            this.powerUps.push(powerUP);
            space += 105;
        }

        this.add.rexBBCodeText(480, 150, 'Choose Start', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '50px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5).setResolution(5);

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
        if ((Phaser.Input.Keyboard.JustDown(this.up) || Phaser.Input.Keyboard.JustDown(this.w)) && this.canChangeSelection)
        {
            this.selectedIndex -= 1;
            this.selectedIndex = ((this.selectedIndex % this.attacks.length) + this.attacks.length) % this.attacks.length;
            this.setSelection();
        }
        if ((Phaser.Input.Keyboard.JustDown(this.down) || Phaser.Input.Keyboard.JustDown(this.s)) && this.canChangeSelection)
        {
            this.selectedIndex += 1;
            this.selectedIndex = ((this.selectedIndex % this.attacks.length) + this.attacks.length) % this.attacks.length;
            this.setSelection();
        }
    }

    close() {
        Game.Instance.manager.ChooseStartClosed();
    }
}