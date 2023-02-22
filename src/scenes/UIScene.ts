import Game from "../Game";
import { Timer } from "../objects/Timer";
import { Attack, PowerUp } from "../player/attacks/Attack";
import BaseScene from "./Scene";

export class UIScene extends BaseScene {
    public static SceneName = 'UIScene';

    meterBG: NineSlice;
    meterFill: NineSlice;
    meterFillMask: Phaser.GameObjects.Graphics;

    levelText: BBCodeText.BBCodeText;

    timer: Timer;

    attackIconIndex: number;
    attackIcons: Phaser.GameObjects.Image[];

    itemIconInexx: number;
    itemIcons: Phaser.GameObjects.Image[];

    create() {
        super.create();

        this.meterBG = this.add.nineslice(0, 0, Game.Instance.DefaultWidth, 32, 'meter', [ 9, 9, 9, 9 ]);
        this.meterFill = this.add.nineslice(0, 0, Game.Instance.DefaultWidth, 32, 'meter-fill', [ 9, 9, 9, 9 ])
            .setTint(0x7556e8);

        this.meterFillMask = this.make.graphics({});
        this.meterFillMask.setPosition(0, 0).fillStyle(0xffffff);
        this.meterFillMask.beginPath();
        this.meterFillMask.fillRect(0, 32, 0, 0);

        this.meterFill.setMask(this.meterFillMask.createGeometryMask());

        this.levelText = this.add.rexBBCodeText(Game.Instance.DefaultWidth - 16, 16, 'Lv. 1', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '20px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(1, 0.5).setResolution(5);

        this.timer = new Timer(this, Game.Instance.DefaultWidth / 2, 48);
        this.timer.Start();

        this.attackIconIndex = 0;
        this.attackIcons = [
            this.add.image(3, 35, 'icon_bg').setOrigin(0),
            this.add.image(45, 35, 'icon_bg').setOrigin(0),
            this.add.image(87, 35, 'icon_bg').setOrigin(0)
        ];

        this.itemIconInexx = 0;
        this.itemIcons = [
            this.add.image(3, 77, 'icon_bg').setOrigin(0),
            this.add.image(45, 77, 'icon_bg').setOrigin(0),
            this.add.image(87, 77, 'icon_bg').setOrigin(0)
        ];

        Game.Instance.manager.eventCenter.on('meterProgress', this.setMeterFillProgress, this);
        Game.Instance.manager.eventCenter.on('levelup', this.levelUP, this);
        Game.Instance.manager.eventCenter.on('add_powerup', this.AddPowerup, this);
    }

    update(time: number, delta: number): void {
        this.timer.Update(time, delta);
    }

    shutdown(): void {
        Game.Instance.manager.eventCenter.off('meterProgress', this.setMeterFillProgress, this);
        Game.Instance.manager.eventCenter.off('levelup', this.levelUP, this);
    }

    setMeterFillProgress(progress: number) {
        this.meterFillMask.clear();
        this.meterFillMask.fillRect(0, 0, Game.Instance.DefaultWidth * progress, 32);
    }

    levelUP(level: number) {
        this.levelText.setText(`Lvl. ${level}`);
    }

    AddPowerup(powerUp: PowerUp) {
        const icon = this.add.image(0, 0, powerUp.icon);
        if (powerUp instanceof Attack)
        {
            Phaser.Display.Align.In.Center(icon, this.attackIcons[ this.attackIconIndex ]);
            this.attackIconIndex++;
        }
        else
        {
            Phaser.Display.Align.In.Center(icon, this.itemIcons[ this.itemIconInexx ]);
            this.itemIconInexx++;
        }
    }
}