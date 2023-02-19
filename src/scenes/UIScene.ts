import Game from "../Game";
import { Timer } from "../objects/Timer";
import BaseScene from "./Scene";

export class UIScene extends BaseScene {
    public static SceneName = 'UIScene';

    meterBG: NineSlice;
    meterFill: NineSlice;
    meterFillMask: Phaser.GameObjects.Graphics;

    levelText: BBCodeText.BBCodeText;

    timer: Timer;

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
            fontFamily: 'Comic Sans MS',
            color: '#ffffff',
            fontSize: '20px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(1, 0.5);

        this.timer = new Timer(this, Game.Instance.DefaultWidth / 2, 48);
        this.timer.Start();

        Game.Instance.manager.eventCenter.on('meterProgress', this.setMeterFillProgress, this);
    }

    update(time: number, delta: number): void {
        this.timer.Update(time, delta);
    }

    shutdown(): void {
        Game.Instance.manager.eventCenter.off('meterProgress', this.setMeterFillProgress, this);
    }

    setMeterFillProgress(progress: number) {
        this.meterFillMask.clear();
        this.meterFillMask.fillRect(0, 0, Game.Instance.DefaultWidth * progress, 32);
    }
}