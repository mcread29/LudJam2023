export class Timer extends Phaser.GameObjects.Container {
    protected _text: BBCodeText.BBCodeText;
    protected static _timeElapsed: number = 0;
    public static get timeElapsed(): number { return this._timeElapsed; }
    protected _paused: boolean = true;

    public OnTimerEnd: () => void;

    constructor(scene: Phaser.Scene, x = 0, y = 0) {
        super(scene, x, y);
        scene.add.existing(this);

        Timer._timeElapsed = 0;

        this._text = scene.add.rexBBCodeText(0, 0, '0:00', {
            fontFamily: 'FutilePro',
            color: '#ffffff',
            fontSize: '30px',
            halign: 'center',
            valign: 'center'
        }).setOrigin(0.5, 0);
        this.add(this._text);
        this.setTime(Timer._timeElapsed);
    }

    public Start(): void {
        this._paused = false;
        Timer._timeElapsed = 0;
    }
    public Pause(): void {
        this._paused = true;
    }
    public Resume(): void {
        this._paused = false;
    }

    public Update(time: number, delta: number): void {
        if (this._paused) return;

        Timer._timeElapsed += delta / 1000;
        this.setTime(Timer._timeElapsed);
    }

    protected setTime(timeRemaining: number): void {
        let seconds: number = timeRemaining;
        seconds = Math.round(seconds);
        let mins: number = Math.floor(seconds / 60);
        seconds = seconds - (mins * 60);

        if (timeRemaining <= 0)
        {
            this.end();
            this._text.text = '0:00';
            return;
        }

        var secs = `${seconds}`;
        secs = (seconds == 60) ? `00` : secs;
        this._text.text = `${mins}:${secs.padStart(2, '0')}`;
    }

    protected end(): void {
        if (this.OnTimerEnd) this.OnTimerEnd();
        this.Pause();
    }
}