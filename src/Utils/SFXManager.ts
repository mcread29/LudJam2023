import Game from "../Game";

const hurtSounds = [
    'coots_21',
    'coots_22',
    'coots_23',
];

const upgradeSounds = [
    'coots_20',
];

const deathSounds = [
    'coots_13',
    'coots_18',
    'coots_19',
];

const buttonSounds = [
    'coots_8',
    'coots_9',
    'coots_10',
    'coots_12',
    'coots_14',
    'coots_15',
    'coots_25',
    'coots_26',
    'coots_28',
];

export class SFXManager {
    public get volume(): number { return this._volume; }

    private _sounds: Map<string, Phaser.Sound.BaseSound>;

    constructor(private _game: Game, private _volume: number) {
        this._sounds = new Map<string, Phaser.Sound.BaseSound>();
    }

    public Play(key: string, volume?: number) {
        let sound: Phaser.Sound.BaseSound;
        if (this._sounds.has(key))
        {
            sound = this._sounds.get(key);

        }
        else
        {
            sound = this._game.sound.add(key, { volume: this._volume });
            this._sounds.set(key, sound);
        }
        (sound as any).volume = volume ? volume : this._volume;
        sound.play();
    }

    public PlayButton(volume?: number) {
        const key = buttonSounds[ Math.floor(Math.random() * buttonSounds.length) ];
        this.Play(key, volume);
    }

    public PlayDeath() {
        const key = deathSounds[ Math.floor(Math.random() * deathSounds.length) ];
        this.Play(key);
    }

    public PlayHurt() {
        const key = hurtSounds[ Math.floor(Math.random() * hurtSounds.length) ];
        this.Play(key);
    }

    public PlayUpgrade() {
        this.Play('coots_20');
    }

    public LowerVolume(amount: number = 0.1) {
        this.SetVolume(Math.max(0, this._volume - amount));
    }

    public RaiseVolume(amount: number = 0.1) {
        this.SetVolume(Math.min(1, this._volume + amount));
    }

    public SetVolume(volume: number) {
        this._volume = volume;
        Game.Instance.playerData.saveData.sfxVolume = volume;

        for (let [ key, sound ] of this._sounds)
        {
            (sound as any).volume = this._volume;
        }
    }
}